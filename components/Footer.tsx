
import React from 'react';

const SocialIcon: React.FC<{ href: string, path: string }> = ({ href, path }) => (
    <a href={href} className="text-gray-400 hover:text-blue-500 transition-colors">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d={path} />
        </svg>
    </a>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center space-x-6 md:order-2">
            <SocialIcon href="#" path="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 2.9,4.79C2.53,5.42 2.33,6.16 2.33,6.94C2.33,8.43 3.1,9.78 4.2,10.59C3.47,10.57 2.78,10.36 2.17,10.03V10.08C2.17,12.11 3.54,13.84 5.46,14.22C5.12,14.31 4.75,14.36 4.37,14.36C4.1,14.36 3.84,14.34 3.58,14.29C4.1,15.93 5.58,17.06 7.3,17.1C5.96,18.12 4.29,18.76 2.5,18.76C2.17,18.76 1.85,18.74 1.53,18.7C3.18,19.79 5.17,20.43 7.3,20.43C16,20.43 20.25,13.37 20.25,8.79C20.25,8.61 20.25,8.43 20.24,8.25C21.16,7.63 21.88,6.87 22.46,6Z" />
            <SocialIcon href="#" path="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-1 15v-5h-2v-2h2v-1.1c0-1.8.9-2.9 2.9-2.9h1.6v2h-1c-.6 0-.7.3-.7.7V10h2l-.3 2h-1.7v5h-2z" />
            <SocialIcon href="#" path="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,17.5H4.5V8.5H7.07V17.5M5.79,7.44A1.67,1.67 0 0,1 4.12,5.79A1.67,1.67 0 0,1 5.79,4.12A1.67,1.67 0 0,1 7.44,5.79A1.67,1.67 0 0,1 5.79,7.44M19,17.5H16.5V12.72C16.5,10.36 15.48,9.24 13.79,9.24C12.09,9.24 11,10.36 11,12.72V17.5H8.5V8.5H11V9.75H11.07C11.45,8.9 12.5,8.25 14.18,8.25C17.2,8.25 19,10.09 19,13.11V17.5Z" />
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-500 dark:text-gray-400">
              Your one-stop platform for local listings and services.
            </p>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              Contact us at: <a href="mailto:contact@prolistings.com" className="text-blue-600 dark:text-blue-400 hover:underline">contact@prolistings.com</a>
            </p>
          </div>
        </div>
        <div className="mt-8">
            <p className="text-center text-sm text-gray-400">
              &copy; {new Date().getFullYear()} ProListings. All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  );
};
