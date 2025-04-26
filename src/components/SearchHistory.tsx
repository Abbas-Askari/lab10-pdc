import React from 'react';
import { Clock, X } from 'lucide-react';
import { SearchParams } from '../services/searchService';

interface SearchHistoryProps {
  history: Array<{
    id: string;
    params: SearchParams;
    timestamp: Date;
  }>;
  onSelectSearch: (params: SearchParams) => void;
  onClearHistory: () => void;
  onDeleteHistoryItem: (id: string) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({
  history,
  onSelectSearch,
  onClearHistory,
  onDeleteHistoryItem
}) => {
  if (history.length === 0) return null;

  const formatSearchParams = (params: SearchParams): string => {
    const parts = [];
    
    if (params.query) parts.push(`"${params.query}"`);
    if (params.category) parts.push(`Category: ${params.category}`);
    if (params.author) parts.push(`Author: ${params.author}`);
    if (params.publishedOnly) parts.push('Published only');
    
    return parts.join(', ') || 'Empty search';
  };

  const formatTime = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Search History</h3>
        </div>
        <button
          onClick={onClearHistory}
          className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          Clear all
        </button>
      </div>
      
      <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-60 overflow-y-auto">
        {history.map((item) => (
          <li key={item.id} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
            <div className="flex items-center justify-between">
              <button
                onClick={() => onSelectSearch(item.params)}
                className="flex-1 flex items-start text-left"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                    {formatSearchParams(item.params)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {formatTime(item.timestamp)}
                  </p>
                </div>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteHistoryItem(item.id);
                }}
                className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;