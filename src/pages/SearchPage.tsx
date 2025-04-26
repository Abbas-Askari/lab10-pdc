import React, { useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import Pagination from '../components/Pagination';
import SearchHistory from '../components/SearchHistory';
import useSearch from '../hooks/useSearch';
import useSearchHistory from '../hooks/useSearchHistory';

const SearchPage: React.FC = () => {
  const {
    results,
    isLoading,
    error,
    currentParams,
    performSearch,
    changePage
  } = useSearch();

  const {
    history,
    addToHistory,
    clearHistory,
    deleteHistoryItem
  } = useSearchHistory();

  // Initial search on component mount
  useEffect(() => {
    performSearch({ query: '', page: 1 });
  }, [performSearch]);

  const handleSearch = (searchParams: any) => {
    performSearch(searchParams);
    addToHistory(searchParams);
  };

  const handleHistorySelect = (searchParams: any) => {
    performSearch(searchParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Abbas Askari Lab 10
        </h1>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Bibliographic Search
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Search our comprehensive database of articles, books, and publications.
          Use filters to refine your results.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-4">
          <SearchBar onSearch={handleSearch} initialQuery={currentParams.query} />

          {results && (
            <>
              <SearchResults
                results={results.results}
                totalResults={results.totalResults}
                isLoading={isLoading}
                error={error || undefined}
              />

            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;