import React, { useState } from 'react';
import { ArrowLeft, Search, Sliders } from 'lucide-react';
import { Restaurant, User } from '../types';
import { mockRestaurants, getCuisineTypes } from '../utils';

interface SearchScreenProps {
  currentUser: User;
  onBack: () => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  currentUser,
  onBack,
  onSelectRestaurant,
}) => {
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [maxDistance, setMaxDistance] = useState(5);
  const [minRating, setMinRating] = useState(0);

  const cuisineTypes = getCuisineTypes();

  const filteredRestaurants = mockRestaurants.filter((r) => {
    if (selectedCuisine && r.cuisine !== selectedCuisine) return false;
    if (r.distance > maxDistance) return false;
    if (r.rating < minRating) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
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
            <Sliders size={32} className="mr-3 text-cyan-500" />
            Filtrer les restaurants
          </h2>
          <p className="text-gray-600">Affinez votre recherche selon vos préférences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Filters Panel */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-bold text-gray-900 mb-6 text-lg">Filtres</h3>

            {/* Cuisine Filter */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Cuisine
              </label>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCuisine('')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    selectedCuisine === ''
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Toutes les cuisines
                </button>
                {cuisineTypes.map((cuisine) => (
                  <button
                    key={cuisine}
                    onClick={() => setSelectedCuisine(cuisine)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${
                      selectedCuisine === cuisine
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
            </div>

            {/* Distance Filter */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Distance: jusqu'à {maxDistance} km
              </label>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={maxDistance}
                onChange={(e) => setMaxDistance(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>0.5 km</span>
                <span>5 km</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Note minimale: {minRating > 0 ? minRating.toFixed(1) : 'Toutes'}
              </label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>⭐ 0</span>
                <span>⭐ 5</span>
              </div>
            </div>

            {/* Results Count */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>{filteredRestaurants.length}</strong> restaurant(s) trouvé(s)
              </p>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {filteredRestaurants.length > 0 ? (
                filteredRestaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Image */}
                      <div className="sm:w-40 h-40 flex-shrink-0 bg-gray-200 overflow-hidden">
                        <img
                          src={restaurant.image}
                          alt={restaurant.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-2">
                            {restaurant.name}
                          </h4>
                          <p className="text-gray-600 text-sm mb-3">
                            {restaurant.cuisine} • {restaurant.priceRange}
                          </p>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="text-yellow-500 font-semibold">
                              ⭐ {restaurant.rating}
                            </span>
                            <span className="text-gray-500">({restaurant.reviewCount})</span>
                            <span className="text-gray-500">📍 {restaurant.distance} km</span>
                          </div>
                        </div>

                        {/* Hours */}
                        <div className="mt-3 text-xs text-gray-500">
                          🕐 {restaurant.hours}
                        </div>
                      </div>

                      {/* Button */}
                      <div className="p-4 border-t sm:border-t-0 sm:border-l border-gray-200 flex items-center">
                        <button
                          onClick={() => onSelectRestaurant(restaurant)}
                          className="px-4 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition w-full sm:w-auto"
                        >
                          Sélectionner
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-xl shadow-md p-12 text-center">
                  <p className="text-gray-600 text-lg">
                    Aucun restaurant ne correspond à vos critères
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCuisine('');
                      setMaxDistance(5);
                      setMinRating(0);
                    }}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};