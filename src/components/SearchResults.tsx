import React from 'react';
import { SearchResult } from '../services/searchService';
import { Book, File, Award, User } from 'lucide-react';

interface SearchResultsProps {
  results: SearchResult[];
  totalResults: number;
  isLoading: boolean;
  error?: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, totalResults, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-12">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-6 w-6 bg-blue-600 rounded-full opacity-75 animate-bounce"></div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Searching...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mt-6">
        <p className="text-red-700 dark:text-red-400 text-center">{error}</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 mt-6 text-center">
        <File className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No results found</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'java':
        return <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">J</div>;
      case 'solr':
        return <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">S</div>;
      default:
        return <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">?</div>;
    }
  };

  return (
    <div className="w-full mt-6">
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Found {totalResults} result{totalResults !== 1 ? 's' : ''}
      </div>
      
      <ul className="space-y-4">
        {results.map((result) => (
          <li 
            key={`${result.id}-${result.title}`}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
          >
            <div className="p-4 sm:p-6 flex items-start">
              <div className="flex-shrink-0 mr-4">
                {getCategoryIcon(result.category)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center mb-1">
                  <span className="text-xs font-medium uppercase px-2 py-0.5 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    {result.category}
                  </span>
                  {result.publisher && (
                    <span className="ml-2 text-xs font-medium uppercase px-2 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Published
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {result.title}
                </h3>
                <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <User size={16} className="mr-1" />
                  <span>{result.author}</span>
                </div>
                <div className="mt-3 flex items-center text-xs text-gray-500 dark:text-gray-500">
                  <span>ID: {result.id}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;