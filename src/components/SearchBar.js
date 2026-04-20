import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ onSearch, isCentered }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <form 
      className={`search-form ${isCentered ? 'centered' : 'top'}`} 
      onSubmit={handleSubmit}
    >
      <div className="search-input-wrapper">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          className="search-input"
          placeholder="Search THE WEB..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        {query && (
          <button type="button" className="clear-btn" onClick={handleClear}>
            <X size={18} />
          </button>
        )}
      </div>
      <button type="submit" className="search-btn" disabled={!query.trim()}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
