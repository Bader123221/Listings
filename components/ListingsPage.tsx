import React, { useState, useMemo } from 'react';
import { FilterPanel } from './FilterPanel';
import { ListingCard } from './ListingCard';
import type { Listing } from '../types';

interface ListingsPageProps {
  allListings: Listing[];
  onSelectListing: (id: number) => void;
}

export const ListingsPage: React.FC<ListingsPageProps> = ({ allListings, onSelectListing }) => {
  const [filters, setFilters] = useState({
    country: '',
    state: '',
    city: '',
    type: '',
  });

  const filteredListings = useMemo(() => {
    return allListings.filter(listing => {
      return (
        (filters.country ? listing.country === filters.country : true) &&
        (filters.state ? listing.state === filters.state : true) &&
        (filters.city ? listing.city === filters.city : true) &&
        (filters.type ? listing.type === filters.type : true)
      );
    });
  }, [allListings, filters]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">All Listings</h1>
        <FilterPanel filters={filters} setFilters={setFilters} />
      </div>
      <section>
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {filteredListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} onSelect={() => onSelectListing(listing.id)} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-lg shadow">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">No listings found.</p>
            <p className="text-sm text-gray-500">Try adjusting your filters.</p>
          </div>
        )}
      </section>
    </div>
  );
};
