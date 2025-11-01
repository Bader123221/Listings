import React from 'react';
import type { Listing } from '../types';

interface SingleListingPageProps {
  listing: Listing;
  onBack: () => void;
}

export const SingleListingPage: React.FC<SingleListingPageProps> = ({ listing, onBack }) => {
  const { title, description, country, state, city, type, eventDate, eventTime, location } = listing;

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const formatTime = (timeString: string) => {
    if (!timeString) return '';
    const [hour, minute] = timeString.split(':');
    const h = parseInt(hour, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const formattedHour = h % 12 || 12;
    return `${formattedHour}:${minute} ${ampm}`;
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg animate-fade-in">
        <div className="mb-6">
            <button onClick={onBack} className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Back to Listings
            </button>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
           <p className="text-sm text-blue-500 dark:text-blue-400 font-semibold uppercase tracking-wide">{type}</p>
           <h1 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900 dark:text-white">{title}</h1>
          
           <div className="mt-6">
                <img 
                  src={`https://picsum.photos/seed/${listing.id}/800/400`}
                  alt={title}
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                />
            </div>
            
           <div className="mt-8">
                <h2 className="text-2xl font-semibold border-b pb-2 dark:border-gray-600">Description</h2>
                <p className="text-gray-700 dark:text-gray-300 mt-4 whitespace-pre-wrap">{description}</p>
           </div>
        </div>
        
        <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-inner">
                <h3 className="text-xl font-semibold mb-4">Details</h3>
                <div className="space-y-4 text-sm">
                    <div className="flex items-start">
                         <svg className="w-5 h-5 mr-3 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                        <div>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Date & Time</p>
                            <p>{formatDate(eventDate)} at {formatTime(eventTime)}</p>
                        </div>
                    </div>
                     <div className="flex items-start">
                        <svg className="w-5 h-5 mr-3 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                        <div>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Location</p>
                            <p>{city}, {state}, {country}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4">Map</h3>
                <div className="h-64 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                   <p className="text-gray-500 dark:text-gray-400 text-center text-sm p-4">
                        Interactive map would be displayed here.<br/>
                        Lat: {location.lat}, Lng: {location.lng}
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// Simple animation
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out forwards;
  }
`;
document.head.appendChild(style);
