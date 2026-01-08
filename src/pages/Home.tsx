import React, { useState } from 'react';
import { Users, Clock, ChevronRight, Zap, Search, Dices } from 'lucide-react';
import { type User, type Vote } from '../types';
import { RestaurantCard } from '../components/RestaurantCard';
import { AvatarGroup } from '../components/AvatarGroup';
import { mockRestaurants, mockRecentVotes, mockTeamMembers } from '../data/mockData';

interface HomeProps {
  user: User;
  userVotes: Vote[];
  onNavigate: (page: 'search' | 'details' | 'groups') => void;
  onSelectRestaurant: (restaurant: any) => void;
}

export function Home({ user, userVotes, onNavigate, onSelectRestaurant }: HomeProps) {
  const currentVote = userVotes.length > 0 ? userVotes[0] : null;
  const [expandedRestaurantId, setExpandedRestaurantId] = useState<string | null>(null);

  // Get restaurants with vote counts
  const restaurantsWithVotes = mockRestaurants.map((restaurant) => ({
    ...restaurant,
    voteCount: mockRecentVotes.filter((v) => v.restaurantId === restaurant.id).length,
    voters: mockRecentVotes
      .filter((v) => v.restaurantId === restaurant.id)
      .map((v) => mockTeamMembers.find((m) => m.id === v.userId))
      .filter(Boolean) as User[],
  }));

  const sortedRestaurants = [...restaurantsWithVotes].sort(
    (a, b) => b.voteCount - a.voteCount
  );

  const topRestaurants = sortedRestaurants.slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Bonjour, {user.name}! 👋
        </h1>
        <p className="text-gray-600 text-lg">Où veux-tu manger ce midi?</p>
      </div>

      {/* Current Vote Card */}
      {currentVote && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-green-700 mb-1">✨ Ton choix actuel</p>
              <h2 className="text-2xl font-bold text-gray-900">{currentVote.restaurantName}</h2>
            </div>
            <div className="text-right">
              <button
                onClick={() => onNavigate('search')}
                className="inline-flex items-center px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
              >
                Changer
                <ChevronRight size={18} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <button
          onClick={() => onNavigate('groups')}
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow text-left group border-2 border-transparent hover:border-cyan-300"
        >
          <Users className="text-cyan-500 mb-3 group-hover:scale-110 transition-transform" size={28} />
          <h3 className="font-bold text-gray-900 text-lg mb-1">Voir les groupes</h3>
          <p className="text-gray-600 text-sm">Rejoignez vos collègues</p>
        </button>

        <button
          onClick={() => onNavigate('search')}
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow text-left group border-2 border-transparent hover:border-teal-300"
        >
          <Search className="text-teal-500 mb-3 group-hover:scale-110 transition-transform" size={28} />
          <h3 className="font-bold text-gray-900 text-lg mb-1">Filtrer</h3>
          <p className="text-gray-600 text-sm">Par cuisine, distance...</p>
        </button>

        <button
          onClick={() => onNavigate('search')}
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow text-left group border-2 border-transparent hover:border-purple-300"
        >
          <Dices className="text-purple-500 mb-3 group-hover:scale-110 transition-transform" size={28} />
          <h3 className="font-bold text-gray-900 text-lg mb-1">Me surprendre</h3>
          <p className="text-gray-600 text-sm">Recommandation surprise</p>
        </button>
      </div>

      {/* Popular Restaurants */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-6">
          <Zap className="text-orange-400" size={24} />
          <h2 className="text-2xl font-bold text-gray-900">Les plus votés ce midi</h2>
        </div>

        <div className="space-y-4">
          {topRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onSelectRestaurant(restaurant)}
            >
              <div className="flex items-start gap-4 p-4">
                {/* Image */}
                <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{restaurant.name}</h3>
                      <p className="text-gray-600 text-sm">{restaurant.cuisine}</p>
                    </div>
                    {restaurant.voteCount > 0 && (
                      <div className="flex items-center justify-center w-8 h-8 bg-cyan-500 text-white rounded-full text-sm font-bold">
                        {restaurant.voteCount}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="font-semibold text-gray-900">{restaurant.rating}</span>
                      <span className="text-gray-500 text-sm">({restaurant.reviews})</span>
                    </div>
                    <span className="text-gray-600 text-sm">📍 {restaurant.distance}km</span>
                  </div>

                  {/* Voters Avatars */}
                  {restaurant.voters.length > 0 && (
                    <div className="flex items-center gap-2">
                      <AvatarGroup users={restaurant.voters.slice(0, 3)} size="sm" />
                      {restaurant.voters.length > 3 && (
                        <span className="text-gray-600 text-xs">+{restaurant.voters.length - 3}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent History */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="text-gray-400" size={24} />
          <h2 className="text-2xl font-bold text-gray-900">Historique récent</h2>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="space-y-3">
            {mockRestaurants.slice(0, 3).map((restaurant) => (
              <div key={restaurant.id} className="flex items-center justify-between py-2 border-b last:border-0 border-gray-100">
                <div>
                  <p className="font-semibold text-gray-900">{restaurant.name}</p>
                  <p className="text-gray-600 text-sm">{restaurant.cuisine}</p>
                </div>
                <button
                  onClick={() => onSelectRestaurant(restaurant)}
                  className="text-cyan-500 hover:text-cyan-600 font-semibold text-sm"
                >
                  Revoir
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}