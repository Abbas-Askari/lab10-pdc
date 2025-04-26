import { useState, useEffect } from 'react';
import { SearchParams } from '../services/searchService';

type SearchHistoryItem = {
  id: string;
  params: SearchParams;
  timestamp: Date;
};

const STORAGE_KEY = 'search_history';
const MAX_HISTORY_ITEMS = 10;

export const useSearchHistory = () => {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);

  // Load search history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem(STORAGE_KEY);
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        // Convert string timestamps back to Date objects
        const historyWithDates = parsed.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
        setHistory(historyWithDates);
      } catch (error) {
        console.error('Failed to parse search history:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Save to localStorage whenever history changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  // Add a new search to history
  const addToHistory = (params: SearchParams) => {
    // Don't add empty searches to history
    if (!params.query && !params.category && !params.author && !params.publishedOnly) {
      return;
    }
    
    // Create a new history item with a unique ID
    const newItem: SearchHistoryItem = {
      id: Date.now().toString(),
      params,
      timestamp: new Date()
    };
    
    // Add to the beginning of the array and limit the size
    setHistory(prevHistory => {
      const updatedHistory = [newItem, ...prevHistory.filter(item => 
        // Remove duplicates with the same search parameters
        JSON.stringify(item.params) !== JSON.stringify(params)
      )].slice(0, MAX_HISTORY_ITEMS);
      
      return updatedHistory;
    });
  };

  // Clear all search history
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Delete a specific history item
  const deleteHistoryItem = (id: string) => {
    setHistory(prevHistory => prevHistory.filter(item => item.id !== id));
  };

  return {
    history,
    addToHistory,
    clearHistory,
    deleteHistoryItem
  };
};

export default useSearchHistory;