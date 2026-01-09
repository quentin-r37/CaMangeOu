import React, { useState } from 'react';
import { Header } from './components/Header';
import { LoginScreen } from './components/LoginScreen';
import { HomeScreen } from './components/HomeScreen';
import { PopularScreen } from './components/PopularScreen';
import { SearchScreen } from './components/SearchScreen';
import { SurpriseScreen } from './components/SurpriseScreen';
import { RestaurantDetailScreen } from './components/RestaurantDetailScreen';
import { ConfirmationScreen } from './components/ConfirmationScreen';
import { Restaurant, User } from './types';
import { mockUsers } from './utils';

type ScreenType =
  | 'login'
  | 'home'
  | 'popular'
  | 'search'
  | 'surprise'
  | string;

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationRestaurant, setConfirmationRestaurant] = useState<Restaurant | null>(null);

  const handleLogin = (email: string) => {
    // Find user by email or use first user for demo
    const user = mockUsers.find((u) => u.email === email) || mockUsers[0];
    setCurrentUser(user);
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentScreen('login');
    setSelectedRestaurant(null);
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
  };

  const handleSelectRestaurant = (restaurant: Restaurant | null) => {
    if (restaurant) {
      setConfirmationRestaurant(restaurant);
      setShowConfirmation(true);
    } else {
      setSelectedRestaurant(null);
    }
  };

  const handleConfirmationComplete = () => {
    if (confirmationRestaurant) {
      setSelectedRestaurant(confirmationRestaurant);
    }
    setShowConfirmation(false);
    setCurrentScreen('home');
  };

  // Login Screen
  if (currentScreen === 'login') {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Confirmation Screen
  if (showConfirmation && confirmationRestaurant) {
    return (
      <ConfirmationScreen
        restaurant={confirmationRestaurant}
        onComplete={handleConfirmationComplete}
      />
    );
  }

  // Main App Layout
  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentUser={{ name: currentUser.name, avatar: currentUser.avatar }} onLogout={handleLogout} />

      <main>
        {currentScreen === 'home' && (
          <HomeScreen
            currentUser={currentUser}
            onNavigate={handleNavigate}
            selectedRestaurant={selectedRestaurant}
            onSelectRestaurant={handleSelectRestaurant}
          />
        )}

        {currentScreen === 'popular' && (
          <PopularScreen
            currentUser={currentUser}
            onBack={() => setCurrentScreen('home')}
            onSelectRestaurant={handleSelectRestaurant}
          />
        )}

        {currentScreen === 'search' && (
          <SearchScreen
            currentUser={currentUser}
            onBack={() => setCurrentScreen('home')}
            onSelectRestaurant={handleSelectRestaurant}
          />
        )}

        {currentScreen === 'surprise' && (
          <SurpriseScreen
            currentUser={currentUser}
            onBack={() => setCurrentScreen('home')}
            onSelectRestaurant={handleSelectRestaurant}
          />
        )}

        {currentScreen.startsWith('restaurant-') && (
          <RestaurantDetailScreen
            restaurantId={currentScreen.replace('restaurant-', '')}
            currentUser={currentUser}
            onBack={() => setCurrentScreen('home')}
            onSelectRestaurant={handleSelectRestaurant}
          />
        )}
      </main>
    </div>
  );
};

export default App;