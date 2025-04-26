import React from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="flex-grow">
        <SearchPage />
      </main>
      <Footer />
    </div>
  );
}

export default App;