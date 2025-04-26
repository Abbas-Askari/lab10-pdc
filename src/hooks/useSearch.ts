import { useState, useCallback } from 'react';
import { SearchParams, SearchResponse, searchService } from '../services/searchService';

export const useSearch = () => {
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentParams, setCurrentParams] = useState<SearchParams>({ query: '', page: 1, pageSize: 5 });

  const performSearch = useCallback(async (params: SearchParams) => {
    try {
      setIsLoading(true);
      setError(null);
      setCurrentParams(params);
      
      // Apply default page size if not specified
      if (!params.pageSize) {
        params.pageSize = 5;
      }
      
      const searchResults = await searchService.search(params);
      setResults(searchResults);
    } catch (err) {
      console.error('Search error:', err);
      setError('An error occurred during search. Please try again.');
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const changePage = useCallback((page: number) => {
    performSearch({ ...currentParams, page });
  }, [currentParams, performSearch]);

  return {
    results,
    isLoading,
    error,
    currentParams,
    performSearch,
    changePage
  };
};

export default useSearch;