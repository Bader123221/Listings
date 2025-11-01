
import React from 'react';
import type { User } from '../types';

interface HeaderProps {
  currentPage: 'listings' | 'account';
  setCurrentPage: (page: 'listings' | 'account') => void;
  currentUser: User | null;
  onLogout: () => void;
}

const NavLink: React.FC<{
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ isActive, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`}
  >
    {children}
  </button>
);

export const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, currentUser, onLogout }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <svg className="h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0v-4a2 2 0 012-2h6a2 2 0 012 2v4m-6 0h-2" />
            </svg>
            <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">ProListings</span>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <NavLink isActive={currentPage === 'listings'} onClick={() => setCurrentPage('listings')}>
              Listings
            </NavLink>
            <NavLink isActive={currentPage === 'account'} onClick={() => setCurrentPage('account')}>
              Account
            </NavLink>
          </nav>
          <div className="flex items-center">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">Welcome, {currentUser.name}</span>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentPage('account')}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
       <nav className="md:hidden bg-gray-50 dark:bg-gray-700 p-2 flex justify-around">
            <NavLink isActive={currentPage === 'listings'} onClick={() => setCurrentPage('listings')}>
              Listings
            </NavLink>
            <NavLink isActive={currentPage === 'account'} onClick={() => setCurrentPage('account')}>
              Account
            </NavLink>
        </nav>
    </header>
  );
};
