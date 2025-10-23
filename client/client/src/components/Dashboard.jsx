import React, { useState } from "react";
import Plot from "react-plotly.js";
import * as yahooFinance from "yahoo-finance2";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  Grid,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";

// -------- Helper functions -------- //
function calculateSMA(data, window = 20) {
  return data.map((_, i) => {
    if (i < window) return null;
    const slice = data.slice(i - window, i);
    const sum = slice.reduce((a, b) => a + b, 0);
    return sum / window;
  });
}

function calculateEMA(data, window = 20) {
  const k = 2 / (window + 1);
  let emaArray = [data[0]];
  for (let i = 1; i < data.length; i++) {
    emaArray.push(data[i] * k + emaArray[i - 1] * (1 - k));
  }
  return emaArray;
}

// -------- Main Dashboard -------- //
export default function Dashboard() {
  const [params, setParams] = useState({
    ticker: "AAPL",
    timePeriod: "1mo",
    chartType: "Candlestick",
    indicators: [],
  });

  const [data, setData] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setParams({ ...params, [field]: value });
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await yahooFinance.chart(params.ticker, {
        range: params.timePeriod,
        interval: "1d",
      });
      const raw = result.quotes.map((q) => ({
        date: q.date,
        open: q.open,
        high: q.high,
        low: q.low,
        close: q.close,
        volume: q.volume,
      }));

      const closes = raw.map((d) => d.close);
      const SMA_20 = calculateSMA(closes);
      const EMA_20 = calculateEMA(closes);

      const processed = raw.map((d, i) => ({
        ...d,
        SMA_20: SMA_20[i],
        EMA_20: EMA_20[i],
      }));

      const lastClose = closes[closes.length - 1];
      const prevClose = closes[0];
      const change = lastClose - prevClose;
      const pctChange = (change / prevClose) * 100;
      const high = Math.max(...raw.map((d) => d.high));
      const low = Math.min(...raw.map((d) => d.low));
      const volume = raw.reduce((a, b) => a + b.volume, 0);

      setData(processed);
      setMetrics({ lastClose, change, pctChange, high, low, volume });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const x = data.map((d) => d.date);
  const close = data.map((d) => d.close);
  const traces = [];

  if (params.chartType === "Candlestick") {
    traces.push({
      x,
      open: data.map((d) => d.open),
      high: data.map((d) => d.high),
      low: data.map((d) => d.low),
      close,
      type: "candlestick",
      name: "Price",
    });
  } else {
    traces.push({
      x,
      y: close,
      type: "scatter",
      mode: "lines",
      name: "Close",
    });
  }

  if (params.indicators.includes("SMA_20")) {
    traces.push({
      x,
      y: data.map((d) => d.SMA_20),
      type: "scatter",
      mode: "lines",
      name: "SMA 20",
      line: { color: "orange" },
    });
  }
  if (params.indicators.includes("EMA_20")) {
    traces.push({
      x,
      y: data.map((d) => d.EMA_20),
      type: "scatter",
      mode: "lines",
      name: "EMA 20",
      line: { color: "blue" },
    });
  }

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Box
        sx={{
          p: 2,
          width: 250,
          borderRight: "1px solid #ddd",
          overflowY: "auto",
        }}
      >
        <h3>Chart Parameters</h3>
        <TextField
          label="Ticker"
          variant="outlined"
          size="small"
          fullWidth
          value={params.ticker}
          onChange={(e) => handleChange("ticker", e.target.value.toUpperCase())}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Time Period</InputLabel>
          <Select
            value={params.timePeriod}
            onChange={(e) => handleChange("timePeriod", e.target.value)}
          >
            {["1d", "1wk", "1mo", "1yr", "max"].map((p) => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Chart Type</InputLabel>
          <Select
            value={params.chartType}
            onChange={(e) => handleChange("chartType", e.target.value)}
          >
            {["Candlestick", "Line"].map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormGroup sx={{ mb: 2 }}>
          {["SMA_20", "EMA_20"].map((ind) => (
            <FormControlLabel
              key={ind}
              control={
                <Checkbox
                  checked={params.indicators.includes(ind)}
                  onChange={(e) => {
                    const newIndicators = e.target.checked
                      ? [...params.indicators, ind]
                      : params.indicators.filter((i) => i !== ind);
                    handleChange("indicators", newIndicators);
                  }}
                />
              }
              label={ind}
            />
          ))}
        </FormGroup>
        <Button variant="contained" fullWidth onClick={fetchData}>
          Update
        </Button>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 2, overflowY: "auto" }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Stock Market Dashboard
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {metrics && (
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={2}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6">Last Price</Typography>
                    <Typography>{metrics.lastClose?.toFixed(2)} USD</Typography>
                    <Typography
                      color={metrics.change >= 0 ? "green" : "red"}
                    >
                      {metrics.change?.toFixed(2)} ({metrics.pctChange?.toFixed(2)}%)
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Paper sx={{ p: 2 }}>
                    <Typography>High: {metrics.high?.toFixed(2)}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Paper sx={{ p: 2 }}>
                    <Typography>Low: {metrics.low?.toFixed(2)}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Paper sx={{ p: 2 }}>
                    <Typography>Volume: {metrics.volume?.toLocaleString()}</Typography>
                  </Paper>
                </Grid>
              </Grid>
            )}

            {data.length > 0 && (
              <Plot
                data={traces}
                layout={{
                  title: `${params.ticker} (${params.timePeriod})`,
                  xaxis: { title: "Time" },
                  yaxis: { title: "Price (USD)" },
                  height: 600,
                }}
                useResizeHandler
                style={{ width: "100%" }}
              />
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
