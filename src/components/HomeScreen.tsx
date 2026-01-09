import React, { useState } from 'react';
import { Users, Plus, Utensils } from 'lucide-react';
import { Restaurant, User } from '../types';
import { mockRestaurants, mockUsers } from '../utils';

interface HomeScreenProps {
  currentUser: User;
  onNavigate: (screen: string) => void;
  selectedRestaurant: Restaurant | null;
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  currentUser,
  onNavigate,
  selectedRestaurant,
  onSelectRestaurant,
}) => {
  const sortedRestaurants = [...mockRestaurants].sort((a, b) => b.votes - a.votes);
  
  // Get colleagues who voted
  const allVoters = new Map<string, User>();
  mockRestaurants.forEach(r => {
    r.votedBy.forEach(user => {
      if (user.id !== currentUser.id) {
        allVoters.set(user.id, user);
      }
    });
  });

  const colleaguesVoted = Array.from(allVoters.values()).slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Où mangeons-nous aujourd'hui?
          </h2>
          <p className="text-gray-600">Explorez les choix en cours et faites votre sélection</p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => onNavigate('popular')}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition transform border-l-4 border-blue-500"
          >
            <div className="text-3xl mb-2">👥</div>
            <h3 className="font-bold text-gray-900 mb-1">Choix des collègues</h3>
            <p className="text-sm text-gray-600">Voir les restaurants les plus votés</p>
          </button>

          <button
            onClick={() => onNavigate('search')}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition transform border-l-4 border-cyan-500"
          >
            <div className="text-3xl mb-2">🔍</div>
            <h3 className="font-bold text-gray-900 mb-1">Filtrer</h3>
            <p className="text-sm text-gray-600">Par cuisine, distance ou avis</p>
          </button>

          <button
            onClick={() => onNavigate('surprise')}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition transform border-l-4 border-sky-500"
          >
            <div className="text-3xl mb-2">🎲</div>
            <h3 className="font-bold text-gray-900 mb-1">Me surprendre</h3>
            <p className="text-sm text-gray-600">Découvrez quelque chose de nouveau</p>
          </button>
        </div>

        {/* Current Selection */}
        {selectedRestaurant && (
          <div className="mb-8 bg-green-50 border-2 border-green-500 rounded-xl p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-green-700 font-semibold mb-1">✅ VOTRE CHOIX</p>
                <h3 className="text-2xl font-bold text-gray-900">{selectedRestaurant.name}</h3>
                <p className="text-green-700 mt-2">{selectedRestaurant.cuisine} • {selectedRestaurant.distance} km</p>
              </div>
              <button
                onClick={() => onSelectRestaurant(null)}
                className="text-red-600 hover:bg-red-100 px-3 py-1 rounded text-sm font-semibold transition"
              >
                Changer
              </button>
            </div>
          </div>
        )}

        {/* Colleagues Info */}
        {colleaguesVoted.length > 0 && (
          <div className="mb-8 bg-white rounded-xl shadow-md p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <Users size={20} className="mr-2 text-blue-500" />
              Collègues ayant voté ({colleaguesVoted.length})
            </h3>
            <div className="flex flex-wrap gap-4">
              {colleaguesVoted.map((user) => (
                <div key={user.id} className="flex items-center space-x-2">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full border-2 border-blue-500"
                  />
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-gray-600 text-xs">Prêt à y aller</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Restaurants List */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Restaurants disponibles</h3>
            {sortedRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer transform hover:scale-102 ${
                  selectedRestaurant?.id === restaurant.id ? 'ring-4 ring-green-500' : ''
                }`}
                onClick={() => onNavigate(`restaurant-${restaurant.id}`)}
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="sm:w-40 h-40 flex-shrink-0 bg-gray-200 overflow-hidden relative">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                    {restaurant.votes > 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                        {restaurant.votes}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{restaurant.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {restaurant.cuisine} • {restaurant.priceRange} • {restaurant.distance} km
                      </p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-yellow-500 font-semibold">⭐ {restaurant.rating}</span>
                        <span className="text-gray-500">({restaurant.reviewCount} avis)</span>
                      </div>
                    </div>

                    {/* Voters */}
                    {restaurant.votedBy.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-500 mb-2">Votants:</p>
                        <div className="flex flex-wrap gap-2">
                          {restaurant.votedBy.slice(0, 3).map((user) => (
                            <img
                              key={user.id}
                              src={user.avatar}
                              alt={user.name}
                              title={user.name}
                              className="w-6 h-6 rounded-full border border-blue-500"
                            />
                          ))}
                          {restaurant.votedBy.length > 3 && (
                            <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold">
                              +{restaurant.votedBy.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Join Button */}
                  <div className="sm:flex items-center justify-center p-4 border-t sm:border-t-0 sm:border-l border-gray-200">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectRestaurant(restaurant);
                      }}
                      className={`px-4 py-2 rounded-lg font-semibold transition w-full sm:w-auto ${
                        selectedRestaurant?.id === restaurant.id
                          ? 'bg-green-500 text-white'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      {selectedRestaurant?.id === restaurant.id ? '✓ Choisi' : 'Rejoindre'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar - Recent History */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <Utensils size={20} className="mr-2 text-blue-500" />
                Historique récent
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'La Bella Italia', date: '15 jan' },
                  { name: 'Tokyo Dreams', date: '10 jan' },
                  { name: 'Spice Market', date: '5 jan' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                    <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                    <p className="text-gray-500 text-xs mt-1">{item.date}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <span className="font-bold">💡 Conseil:</span> Vous pouvez aussi créer un nouveau groupe de discussion
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};