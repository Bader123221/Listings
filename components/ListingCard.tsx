import React from 'react';
import type { Listing } from '../types';

interface ListingCardProps {
  listing: Listing;
  onSelect: () => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing, onSelect }) => {
  const { title, description, country, state, city, type, eventDate, eventTime } = listing;

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
    <button onClick={onSelect} className="text-left w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
      <div className="h-40 bg-gray-200 dark:bg-gray-700">
        <img 
          src={`https://picsum.photos/seed/${listing.id}/400/200`}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex-grow">
          <p className="text-xs text-blue-500 dark:text-blue-400 font-semibold uppercase tracking-wide">{type}</p>
          <h3 className="text-lg font-bold mt-1 text-gray-900 dark:text-white line-clamp-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-xs line-clamp-3">{description}</p>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 space-y-2">
          <div className="flex items-center">
            <svg className="w-3.5 h-3.5 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
            <span className="truncate">{city}, {state}, {country}</span>
          </div>
          <div className="flex items-center">
            <svg className="w-3.5 h-3.5 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
            <span>{formatDate(eventDate)} at {formatTime(eventTime)}</span>
          </div>
        </div>
      </div>
    </button>
  );
};
