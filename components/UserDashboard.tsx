
import React, { useState } from 'react';
import { ListingForm } from './ListingForm';
import type { Listing, User } from '../types';

interface UserDashboardProps {
  user: User;
  listings: Listing[];
  addListing: (newListing: Omit<Listing, 'id' | 'authorId'>) => void;
  updateListing: (updatedListing: Listing) => void;
  deleteListing: (listingId: number) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ user, listings, addListing, updateListing, deleteListing }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);

  const handleAddNew = () => {
    setEditingListing(null);
    setIsFormVisible(true);
  };
  
  const handleEdit = (listing: Listing) => {
    setEditingListing(listing);
    setIsFormVisible(true);
  };
  
  const handleFormClose = () => {
      setIsFormVisible(false);
      setEditingListing(null);
  }

  const handleFormSubmit = (listingData: Omit<Listing, 'id' | 'authorId'>) => {
    if(editingListing) {
        updateListing({ ...listingData, id: editingListing.id, authorId: user.id });
    } else {
        addListing(listingData);
    }
    handleFormClose();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">My Listings</h1>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          Add New Listing
        </button>
      </div>
      
      {isFormVisible && (
        <div className="mb-8">
            <ListingForm 
                onSubmit={handleFormSubmit}
                onCancel={handleFormClose}
                initialData={editingListing}
            />
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        {listings.length > 0 ? (
          <div className="space-y-4">
            {listings.map(listing => (
              <div key={listing.id} className="flex items-center justify-between p-4 border dark:border-gray-700 rounded-md">
                <div>
                  <h4 className="font-semibold text-lg text-gray-800 dark:text-white">{listing.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{listing.city}, {listing.country} - Type: {listing.type}</p>
                </div>
                <div className="space-x-2">
                  <button onClick={() => handleEdit(listing)} className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
                  <button onClick={() => deleteListing(listing.id)} className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">You haven't created any listings yet.</p>
        )}
      </div>
    </div>
  );
};
