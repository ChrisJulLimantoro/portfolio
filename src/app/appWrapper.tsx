'use client'; // This directive marks the component as a Client Component.

import React, { useState } from 'react';
import MicroscopicBackground from '../components/microsocpicBackground';
import ChatWidget from '../components/chatWidget';
import HomePage from './page';
import ProjectsPage from './projects/page';
import AboutPage from './about/page';

// Define the possible page names as a type for better type safety
type Page = 'home' | 'projects' | 'about';

// This component acts as a wrapper to manage the state for the current page
// and to include client-side components like the background and chat widget.
export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  // ADD a function to toggle the theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const NavLink = ({ page, label }: { page: Page; label: string }) => (
    <button
      onClick={() => setCurrentPage(page)}
      className={`px-2 py-1 transition-colors duration-300 relative text-lg ${
        currentPage === page
          ? 'text-gray-900'
          : 'text-gray-500 hover:text-gray-900'
      }`}
    >
      {label}
      {currentPage === page && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-blue-600" />
      )}
    </button>
  );

  // This function determines which page component to render based on the state.
  const renderPage = () => {
    switch (currentPage) {
      case 'projects':
        return <ProjectsPage />;
      case 'about':
        return <AboutPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen font-['Inter'] text-gray-800">
      <MicroscopicBackground theme={theme} />
      <nav className="w-full p-6 fixed top-0 z-40 bg-white/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button
            onClick={() => setCurrentPage('home')}
            className="text-2xl font-bold text-gray-900"
          >
            Ceje
          </button>
          <div className=" flex items-center space-x-8">
            <NavLink page="home" label="Home" />
            <NavLink page="projects" label="Projects" />
            <NavLink page="about" label="About" />
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-blue text-gray-700 dark:text-gray-300"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </nav>
      {/* The main content area will now render the page based on the state */}
      <main className="pt-24">{renderPage()}</main>
      <ChatWidget />
    </div>
  );
}
