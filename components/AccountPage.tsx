
import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { UserDashboard } from './UserDashboard';
import type { Listing, User } from '../types';

interface AccountPageProps {
  currentUser: User | null;
  onLogin: (email: string) => void;
  userListings: Listing[];
  addListing: (newListing: Omit<Listing, 'id' | 'authorId'>) => void;
  updateListing: (updatedListing: Listing) => void;
  deleteListing: (listingId: number) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ currentUser, onLogin, userListings, addListing, updateListing, deleteListing }) => {
  if (!currentUser) {
    return <LoginForm onLogin={onLogin} />;
  }

  return (
    <UserDashboard 
      user={currentUser}
      listings={userListings}
      addListing={addListing}
      updateListing={updateListing}
      deleteListing={deleteListing}
    />
  );
};
