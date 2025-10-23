import { Link } from 'react-router';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';


const portfolioNews = [
    {
        symbol: 'AAPL',
        headline: 'Apple Announces New M4 Chip with Advanced AI Capabilities',
        summary: 'Apple Inc. today unveiled its next-generation M4 processor, promising significant performance boosts for AI-driven tasks...',
        source: 'Reuters',
        time: '15 minutes ago',
        link: '#', // Placeholder link
        isPositive: true,
    },
    {
        symbol: 'TSLA',
        headline: 'Tesla Faces New Scrutiny Over Autopilot Safety Features',
        summary: 'Regulators are opening a new investigation into Tesla\'s Autopilot system following a series of recent incidents...',
        source: 'Bloomberg',
        time: '1 hour ago',
        link: '#',
        isPositive: false,
    },
    {
        symbol: 'GOOGL',
        headline: 'Google I/O 2025: All the Biggest Announcements',
        summary: 'From new AI models to Android 16, here\'s everything Alphabet\'s Google announced at its annual developer conference.',
        source: 'TechCrunch',
        time: '3 hours ago',
        link: '#',
        isPositive: true,
    }
];

const generalNews = [
    {
        headline: 'Federal Reserve Holds Interest Rates Steady, Citing "Moderate" Economic Growth',
        summary: 'The Federal Reserve concluded its two-day meeting today, announcing that it will keep its key interest rate unchanged...',
        source: 'The Wall Street Journal',
        time: '45 minutes ago',
        link: '#',
    },
    {
        headline: 'Oil Prices Dip as OPEC+ Signals Potential Increase in Production',
        summary: 'Crude oil futures fell more than 2% after reports suggested that OPEC+ may ease its current production cuts...',
        source: 'MarketWatch',
        time: '2 hours ago',
        link: '#',
    },
];

const trendingTopics = [
    { name: 'Artificial Intelligence', link: '#' },
    { name: 'EV Market', link: '#' },
    { name: 'Federal Reserve', link: '#' },
    { name: 'Semiconductors', link: '#' },
    { name: 'Earnings Reports', link: '#' },
];

const NewsArticleCard = ({ article }) => {
    // Determine badge color
    const badgeClass = article.isPositive === true
        ? 'bg-success-subtle text-success-emphasis'
        : article.isPositive === false
            ? 'bg-danger-subtle text-danger-emphasis'
            : 'bg-secondary-subtle text-secondary-emphasis'; // Neutral

    const badgeLabel = article.isPositive === true
        ? 'Positive'
        : article.isPositive === false
            ? 'Negative'
            : 'Neutral';

    return (
        <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="card shadow-sm h-100 text-decoration-none text-dark"
            style={{ borderRadius: '12px', transition: 'transform 0.2s, box-shadow 0.2s' }}
            onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
            }}
            onMouseOut={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)';
            }}
        >
            <div className="card-body p-4 d-flex flex-column justify-content-between h-100">
                <div>
                    {/* Header with symbol and badge */}
                    {article.symbol && (
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <h5 className="card-title fw-bold text-primary mb-0">{article.symbol}</h5>
                            <span
                                className={`badge rounded-pill px-3 py-2 ${badgeClass}`}
                                style={{ fontSize: '0.85rem' }}
                            >
                                {badgeLabel}
                            </span>
                        </div>
                    )}
                    {/* Headline and Summary */}
                    <h6 className="card-subtitle mb-2 fw-semibold text-dark">{article.headline}</h6>
                    <p className="card-text text-muted small">{article.summary}</p>
                </div>

                {/* Footer with source and time */}
                <div className="mt-4 pt-3 border-top d-flex justify-content-between align-items-center">
                    <span className="text-muted small fw-medium">{article.source}</span>
                    <span className="text-muted small">{article.time}</span>
                </div>
            </div>
        </a>
    );
};

const News = () => {
    // ... (Your state and useEffect logic remains unchanged) ...
    // ...
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState(null);

    // Placeholder: In your app, 'hasPortfolio' would be based on user data
    const hasPortfolio = portfolioNews.length > 0;

    // ... (Your useEffect for fetching data remains unchanged) ...
    // ...
    //     fetchNews();
    // }, []); 

    // ... (Your loading/error returns remain unchanged) ...
    // ...
    //     return <div className="text-center p-20 text-red-600">Error: {error}</div>;
    // }

    return (
        <div className="min-vh-100 d-flex flex-column">
            <Navbar />

            <div className="container py-5">
                <h1 className="display-5 fw-bold mb-4">Market News & Analysis</h1>

                <div className="row g-4">

                    {/* Main News Feed (Portfolio & General) */}
                    <div className="col-lg-8">
                        <div className="d-flex flex-column" style={{ gap: '2.5rem' }}>

                            {/* Section 1: Portfolio News */}
                            <section>
                                <h2 className="h4 fw-bold mb-3">For Your Portfolio</h2>
                                {hasPortfolio ? (
                                    <div className="row g-4">
                                        {portfolioNews.map((article, index) => (
                                            <div className="col-12" key={index}>
                                                <NewsArticleCard article={article} />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    // Show this if the user's portfolio is empty
                                    <div className="card shadow-sm border-0" style={{ borderRadius: '12px' }}>
                                        <div className="card-body p-4 p-md-5 text-center">
                                            <h5 className="fw-semibold">No portfolio news yet!</h5>
                                            <p className="text-muted mb-3">
                                                Add stocks to your portfolio to see personalized news updates here.
                                            </p>
                                            <Link to="/dashboard" className="btn btn-primary fw-semibold">
                                                Go to Dashboard
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </section>

                            {/* Section 2: General Market News */}
                            <section>
                                <h2 className="h4 fw-bold mb-3">General Market News</h2>
                                <div className="row g-4">
                                    {generalNews.map((article, index) => (
                                        <div className="col-12" key={index}>
                                            <NewsArticleCard article={article} />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="col-lg-4">
                        <div className="card shadow-sm border-0 sticky-top" style={{ top: '2rem', borderRadius: '12px' }}>
                            <div className="card-header bg-white p-4 border-0" style={{ borderRadius: '12px 12px 0 0' }}>
                                <h5 className="fw-bold mb-0">Trending Topics</h5>
                            </div>
                            <ul className="list-group list-group-flush">
                                {trendingTopics.map((topic, index) => (
                                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <a href={topic.link} className="text-decoration-none text-dark fw-medium">
                                            {topic.name}
                                        </a>
                                        <span className="text-muted">→</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default News;