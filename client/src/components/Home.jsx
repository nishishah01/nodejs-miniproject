import { Link } from 'react-router';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';
const Home = () => {
    const trendingStocks = [
        { symbol: 'AAPL', name: 'Apple Inc.', change: '+2.5%', price: '$178.50', isPositive: true },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', change: '+1.8%', price: '$142.30', isPositive: true },
        { symbol: 'MSFT', name: 'Microsoft Corp.', change: '+3.2%', price: '$378.90', isPositive: true },
        { symbol: 'TSLA', name: 'Tesla Inc.', change: '-0.5%', price: '$242.80', isPositive: false }
    ];

    return (
        <div className="min-vh-100 d-flex flex-column">
            <Navbar />
            <section className="text-white py-5 flex-grow-1 d-flex align-items-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <div className="container text-center py-5">
                    <h1 className="display-4 fw-bold mb-4">
                        Track Your Investments with Confidence
                    </h1>
                    <p className="lead mb-5 fs-5" style={{ maxWidth: '800px', margin: '0 auto 2rem' }}>
                        Real-time stock market data, portfolio management, and intelligent insights — all in one place.
                    </p>
                    <div>
                        <Link to="/register" className="btn btn-light btn-lg px-5 py-3 me-3 fw-semibold" style={{ color: '#667eea' }}>
                            Get Started Free
                        </Link>
                        <Link to="/dashboard" className="btn btn-outline-light btn-lg px-5 py-3 fw-semibold">
                            Explore Stocks
                        </Link>
                    </div>
                </div>
            </section>
            <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="container">
                    <div className="text-center mb-4">
                        <span className="badge rounded-pill px-4 py-2 mb-3" style={{ backgroundColor: '#e3f2fd', color: '#1976d2', fontSize: '0.9rem' }}>
                            📈 Live Market Data
                        </span>
                        <h2 className="fw-bold mb-2">Trending Stocks Today</h2>
                        <p className="text-muted">Stay updated with the most popular stocks in the market</p>
                    </div>
                    <div className="row g-4 mt-3">
                        {trendingStocks.map((stock, index) => (
                            <div key={index} className="col-md-6 col-lg-3">
                                <div className="card shadow-sm h-100 border-0" style={{ borderRadius: '12px' }}>
                                    <div className="card-body p-4">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div>
                                                <h5 className="card-title fw-bold mb-1">{stock.symbol}</h5>
                                                <p className="card-text text-muted mb-0 small">{stock.name}</p>
                                            </div>
                                            <span 
                                                className="badge rounded-pill px-3 py-2"
                                                style={{ 
                                                    backgroundColor: stock.isPositive ? '#d4edda' : '#f8d7da',
                                                    color: stock.isPositive ? '#155724' : '#721c24',
                                                    fontSize: '0.85rem'
                                                }}
                                            >
                                                {stock.change}
                                            </span>
                                        </div>
                                        <h3 className="mb-0">{stock.price}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-5">
                        <Link to="/register" className="btn btn-lg px-5 py-3 fw-semibold" style={{ backgroundColor: '#0d6efd', color: 'white', borderRadius: '8px' }}>
                            Start Trading Now
                        </Link>
                    </div>
                </div>
            </section>
            <section className="py-5">
                <div className="container">
                    <h2 className="text-center mb-5 fw-bold">Why Choose StockTracker?</h2>
                    <div className="row g-4">
                        <div className="col-md-4 text-center">
                            <div className="mb-3" style={{ fontSize: '3rem' }}>⚡</div>
                            <h4 className="fw-semibold mb-3">Real-Time Data</h4>
                            <p className="text-muted">
                                Get live market updates and instant price alerts for your favorite stocks.
                            </p>
                        </div>
                        <div className="col-md-4 text-center">
                            <div className="mb-3" style={{ fontSize: '3rem' }}>📱</div>
                            <h4 className="fw-semibold mb-3">Portfolio Management</h4>
                            <p className="text-muted">
                                Track all your investments in one place with powerful analytics tools.
                            </p>
                        </div>
                        <div className="col-md-4 text-center">
                            <div className="mb-3" style={{ fontSize: '3rem' }}>🔒</div>
                            <h4 className="fw-semibold mb-3">Secure & Reliable</h4>
                            <p className="text-muted">
                                Your data is protected with bank-level security and encryption.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
};

export default Home;