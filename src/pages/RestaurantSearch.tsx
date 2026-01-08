import React, { useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { type Restaurant } from '../types';
import { RestaurantCard } from '../components/RestaurantCard';
import { mockRestaurants } from '../data/mockData';

interface RestaurantSearchProps {
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

export function RestaurantSearch({ onSelectRestaurant }: RestaurantSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('');
  const [maxDistance, setMaxDistance] = useState(5);
  const [priceRange, setPriceRange] = useState<string>('');

  const cuisines = Array.from(new Set(mockRestaurants.map((r) => r.cuisine)));
  const priceRanges = ['$', '$$', '$$$', '$$$$'];

  const filteredRestaurants = mockRestaurants.filter((restaurant) => {
    const matchesSearch =
      searchTerm === '' ||
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCuisine = selectedCuisine === '' || restaurant.cuisine === selectedCuisine;
    const matchesDistance = restaurant.distance <= maxDistance;
    const matchesPrice = priceRange === '' || restaurant.priceRange === priceRange;

    return matchesSearch && matchesCuisine && matchesDistance && matchesPrice;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Trouver un restaurant</h1>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Chercher par nom ou cuisine..."
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <Filter size={20} className="text-gray-600" />
          <h2 className="font-bold text-gray-900">Filtres</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cuisine Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Type de cuisine
            </label>
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500 appearance-none bg-white cursor-pointer"
            >
              <option value="">Tous les types</option>
              {cuisines.map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
          </div>

          {/* Distance Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Distance: {maxDistance}km
            </label>
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.5"
              value={maxDistance}
              onChange={(e) => setMaxDistance(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Gamme de prix
            </label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500 appearance-none bg-white cursor-pointer"
            >
              <option value="">Tous les prix</option>
              {priceRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''} trouvé{filteredRestaurants.length !== 1 ? 's' : ''}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onClick={() => onSelectRestaurant(restaurant)}
            />
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">Aucun restaurant ne correspond à tes critères</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCuisine('');
                setMaxDistance(5);
                setPriceRange('');
              }}
              className="px-6 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
}