import React, { useState } from 'react';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { RestaurantSearch } from './pages/RestaurantSearch';
import { RestaurantDetails } from './pages/RestaurantDetails';
import { GroupView } from './pages/GroupView';
import { Navigation } from './components/Navigation';
import { type User, type Restaurant, type Vote } from './types';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<'login' | 'home' | 'search' | 'details' | 'groups'>('login');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [userVotes, setUserVotes] = useState<Vote[]>([]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setCurrentPage('login');
    setUserVotes([]);
  };

  const handleNavigate = (page: 'home' | 'search' | 'details' | 'groups') => {
    setCurrentPage(page);
  };

  const handleSelectRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentPage('details');
  };

  const handleVoteRestaurant = (restaurant: Restaurant) => {
    if (currentUser) {
      setUserVotes([
        {
          userId: currentUser.id,
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
          timestamp: new Date(),
        },
      ]);
      setCurrentPage('home');
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage !== 'login' && (
        <Navigation 
          currentPage={currentPage} 
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          currentUser={currentUser}
        />
      )}
      
      <main className="pt-16">
        {currentPage === 'home' && currentUser && (
          <Home
            user={currentUser}
            userVotes={userVotes}
            onNavigate={handleNavigate}
            onSelectRestaurant={handleSelectRestaurant}
          />
        )}
        {currentPage === 'search' && (
          <RestaurantSearch
            onSelectRestaurant={handleSelectRestaurant}
          />
        )}
        {currentPage === 'details' && selectedRestaurant && currentUser && (
          <RestaurantDetails
            restaurant={selectedRestaurant}
            onVote={handleVoteRestaurant}
            onBack={() => setCurrentPage('home')}
          />
        )}
        {currentPage === 'groups' && currentUser && (
          <GroupView
            user={currentUser}
            onSelectRestaurant={handleSelectRestaurant}
            onNavigate={handleNavigate}
          />
        )}
      </main>
    </div>
  );
}