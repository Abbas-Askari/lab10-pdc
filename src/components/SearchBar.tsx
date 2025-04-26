import React, { useState, useCallback } from 'react';
import { Search, XCircle, Filter } from 'lucide-react';
import { SearchParams } from '../services/searchService';

interface SearchBarProps {
  onSearch: (params: SearchParams) => void;
  initialQuery?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [showFilters, setShowFilters] = useState(false);
  const [category, setCategory] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [publishedOnly, setPublishedOnly] = useState(false);

  const handleSearch = useCallback(() => {
    onSearch({
      query,
      category: category || undefined,
      author: author || undefined,
      publishedOnly: publishedOnly || undefined,
      page: 1
    });
  }, [query, category, author, publishedOnly, onSearch]);

  const handleClear = () => {
    setQuery('');
    setCategory('');
    setAuthor('');
    setPublishedOnly(false);
    onSearch({ query: '', page: 1 });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative flex items-center">
        <div className="relative flex-grow group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <Search size={20} />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="block w-full pl-10 pr-12 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Search for articles, books, or authors..."
            autoComplete="off"
          />
          {query && (
            <button
              onClick={handleClear}
              className="absolute inset-y-0 right-14 flex items-center pr-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            >
              <XCircle size={18} />
            </button>
          )}
        </div>
        <button
          onClick={handleSearch}
          className="ml-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;