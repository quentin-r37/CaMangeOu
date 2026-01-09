import React from 'react';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { Restaurant, User } from '../types';
import { mockRestaurants } from '../utils';

interface PopularScreenProps {
  currentUser: User;
  onBack: () => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

export const PopularScreen: React.FC<PopularScreenProps> = ({
  currentUser,
  onBack,
  onSelectRestaurant,
}) => {
  const sortedByVotes = [...mockRestaurants].sort((a, b) => b.votes - a.votes);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700 font-semibold mb-6 transition"
        >
          <ArrowLeft size={20} className="mr-2" />
          Retour à l'accueil
        </button>

        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 flex items-center mb-2">
            <TrendingUp size={32} className="mr-3 text-blue-500" />
            Choix populaires
          </h2>
          <p className="text-gray-600">Les restaurants les plus votés par vos collègues</p>
        </div>

        {/* Rankings */}
        <div className="space-y-4">
          {sortedByVotes.map((restaurant, index) => (
            <div
              key={restaurant.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex items-start gap-6">
                {/* Rank */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                </div>

                {/* Image */}
                <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{restaurant.name}</h3>
                  <p className="text-gray-600 mb-3">{restaurant.cuisine}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Rating</p>
                      <p className="text-lg font-bold text-yellow-500">⭐ {restaurant.rating}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Distance</p>
                      <p className="text-lg font-bold text-gray-900">{restaurant.distance} km</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Prix</p>
                      <p className="text-lg font-bold text-gray-900">{restaurant.priceRange}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Votes</p>
                      <p className="text-lg font-bold text-red-500">{restaurant.votes}</p>
                    </div>
                  </div>

                  {/* Voters */}
                  {restaurant.votedBy.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 uppercase mb-2">Votants ({restaurant.votedBy.length})</p>
                      <div className="flex flex-wrap gap-2">
                        {restaurant.votedBy.map((voter) => (
                          <div
                            key={voter.id}
                            className="flex items-center space-x-1 bg-blue-50 px-3 py-1 rounded-full"
                          >
                            <img
                              src={voter.avatar}
                              alt={voter.name}
                              className="w-5 h-5 rounded-full"
                            />
                            <span className="text-xs font-semibold text-gray-900">{voter.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action */}
                <button
                  onClick={() => onSelectRestaurant(restaurant)}
                  className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition whitespace-nowrap self-center"
                >
                  Voter
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};