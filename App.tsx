import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ListingsPage } from './components/ListingsPage';
import { AccountPage } from './components/AccountPage';
import { SingleListingPage } from './components/SingleListingPage';
import type { Listing, User } from './types';
import { MOCK_LISTINGS } from './constants';

type Page = 'listings' | 'account';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('listings');
  const [listings, setListings] = useState<Listing[]>(MOCK_LISTINGS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedListingId, setSelectedListingId] = useState<number | null>(null);

  const handleLogin = (email: string) => {
    const mockUser: User = {
      id: 1,
      email: email,
      name: email.split('@')[0],
    };
    setCurrentUser(mockUser);
    setCurrentPage('account');
    setSelectedListingId(null); // Reset listing view on page change
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };
  
  const navigateToPage = (page: Page) => {
      setCurrentPage(page);
      setSelectedListingId(null); // Reset listing view on page change
  }

  const addListing = (newListing: Omit<Listing, 'id' | 'authorId'>) => {
    if (!currentUser) return;
    const listingToAdd: Listing = {
      ...newListing,
      id: Date.now(),
      authorId: currentUser.id,
    };
    setListings(prev => [listingToAdd, ...prev]);
  };

  const updateListing = (updatedListing: Listing) => {
     if (!currentUser || updatedListing.authorId !== currentUser.id) return;
    setListings(prev => prev.map(l => l.id === updatedListing.id ? updatedListing : l));
  };

  const deleteListing = (listingId: number) => {
    if (!currentUser) return;
    setListings(prev => prev.filter(l => l.id !== listingId || l.authorId !== currentUser.id));
  };

  const userListings = useMemo(() => {
    if (!currentUser) return [];
    return listings.filter(l => l.authorId === currentUser.id);
  }, [listings, currentUser]);

  const selectedListing = useMemo(() => {
    return listings.find(l => l.id === selectedListingId) ?? null;
  }, [listings, selectedListingId]);

  const renderPage = () => {
    if (currentPage === 'account') {
      return (
        <AccountPage 
          currentUser={currentUser}
          onLogin={handleLogin}
          userListings={userListings}
          addListing={addListing}
          updateListing={updateListing}
          deleteListing={deleteListing}
        />
      );
    }
    
    // Listings page logic
    if (selectedListing) {
      return <SingleListingPage listing={selectedListing} onBack={() => setSelectedListingId(null)} />;
    }
    return <ListingsPage allListings={listings} onSelectListing={setSelectedListingId} />;
  }

  return (
    <div className="flex flex-col min-h-screen text-gray-800 dark:text-gray-200">
      <Header 
        currentPage={currentPage}
        setCurrentPage={navigateToPage}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
