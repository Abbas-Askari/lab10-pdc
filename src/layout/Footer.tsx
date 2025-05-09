import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © Abbas Askari, CMS: 420209, Lab 11
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;