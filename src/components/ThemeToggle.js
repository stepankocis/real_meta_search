import React from 'react';
import { Moon, Sun } from 'lucide-react';
import './ThemeToggle.css';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? (
        <Moon size={20} className="icon-moon" />
      ) : (
        <Sun size={20} className="icon-sun" />
      )}
    </button>
  );
};

export default ThemeToggle;
