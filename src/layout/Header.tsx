import React from 'react';
import { Database, BookOpen } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">BibliSearch</span>
            </div>
          </div>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;