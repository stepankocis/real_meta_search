import React, { useState, useEffect } from 'react';
import './App.css';
import ThemeToggle from './components/ThemeToggle';
import SearchBar from './components/SearchBar';
import SearchResult from './components/SearchResult';

function App() {
  const [theme, setTheme] = useState('dark');
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleSearch = async (query) => {
    setHasSearched(true);
    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

      const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResults(data.results || []);
    } catch (err) {
      console.error("Search failed:", err);
      setError("Failed to fetch search results. Ensure the scraping backend is running.");

      // Fallback mock data for demonstration if backend is down
      setResults([
        {
          title: "Mock Result: " + query,
          url: "https://example.com/mock",
          description: "This is a beautiful glassmorphic mock description since the backend might be down. The backend query attempt failed.",
          source: "Brave"
        },
        {
          title: "Another cool result for " + query,
          url: "https://github.com/mock/repo",
          description: "GitHub repository providing the source code. The UI looks premium and handles error states gracefully.",
          source: "GitHub"
        },
        {
          title: "Google result right here",
          url: "https://google.com/search?q=" + query,
          description: "Standard google scrape result here.",
          source: "Google"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="brand-title">omegasearch</div>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </header>

      <main className={`main-content ${hasSearched ? 'has-results' : ''}`}>
        <SearchBar onSearch={handleSearch} isCentered={!hasSearched} />

        {isLoading && <div className="spinner"></div>}

        {error && <div className="error-message">{error}</div>}

        {!isLoading && results.length > 0 && (
          <div className="results-container">
            {results.map((res, index) => (
              <SearchResult
                key={index}
                index={index}
                title={res.title}
                url={res.url}
                description={res.description}
                source={res.source}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
