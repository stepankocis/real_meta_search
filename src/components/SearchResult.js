import React from 'react';
import { ExternalLink } from 'lucide-react';
import './SearchResult.css';

const SearchResult = ({ title, url, description, source, index }) => {
  // Add animation delay based on index for a cascading entrance effect
  const animationStyle = {
    animationDelay: `${index * 0.1}s`
  };

  const getSourceColor = (src) => {
    switch(src?.toLowerCase()) {
      case 'google': return 'var(--google)';
      case 'brave': return 'var(--brave)';
      case 'github': return 'var(--github)';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <article className="search-result-card" style={animationStyle}>
      <div className="card-header">
        <div className="source-pill" style={{ '--source-color': getSourceColor(source) }}>
          {source || 'Web'}
        </div>
        <span className="result-url">{new URL(url).hostname}</span>
      </div>
      
      <a href={url} target="_blank" rel="noopener noreferrer" className="result-title-link">
        <h2 className="result-title">
          {title}
          <ExternalLink size={16} className="external-icon" />
        </h2>
      </a>
      
      <p className="result-description">{description}</p>
    </article>
  );
};

export default SearchResult;
