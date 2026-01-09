import React, { useState } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, Star, Users } from 'lucide-react';
import { Restaurant, User } from '../types';
import { mockRestaurants } from '../utils';

interface RestaurantDetailScreenProps {
  restaurantId: string;
  currentUser: User;
  onBack: () => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

export const RestaurantDetailScreen: React.FC<RestaurantDetailScreenProps> = ({
  restaurantId,
  currentUser,
  onBack,
  onSelectRestaurant,
}) => {
  const restaurant = mockRestaurants.find((r) => r.id === restaurantId);
  const [isConfirming, setIsConfirming] = useState(false);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Restaurant not found</p>
      </div>
    );
  }

  const handleConfirm = () => {
    setIsConfirming(true);
    setTimeout(() => {
      onSelectRestaurant(restaurant);
      onBack();
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Image */}
      <div className="relative h-80 bg-gray-200 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40"></div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 bg-white text-gray-900 p-3 rounded-full shadow-lg hover:shadow-xl transition"
        >
          <ArrowLeft size={24} />
        </button>

        {/* Votes Badge */}
        {restaurant.votes > 0 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-3 shadow-lg">
            <p className="text-2xl font-bold">{restaurant.votes}</p>
            <p className="text-xs font-semibold">votes</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Title */}
        <div className="relative -mt-12 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
            <p className="text-xl text-gray-600 mb-4">{restaurant.cuisine} • {restaurant.priceRange}</p>

            {/* Rating */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-2">
                <Star size={24} className="text-yellow-500 fill-yellow-500" />
                <span className="text-3xl font-bold text-gray-900">{restaurant.rating}</span>
              </div>
              <div className="text-gray-600">
                <p className="font-semibold">{restaurant.reviewCount} avis</p>
                <p className="text-sm">Sur Google Maps</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {/* Location */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-start space-x-4">
              <MapPin className="text-blue-500 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Localisation</h3>
                <p className="text-gray-600">{restaurant.address}</p>
                <p className="text-sm text-gray-500 mt-2">📍 {restaurant.distance} km de distance</p>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-start space-x-4">
              <Clock className="text-green-500 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Horaires</h3>
                <p className="text-gray-600">{restaurant.hours}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Colleagues Section */}
        {restaurant.votedBy.length > 0 && (
          <div className="bg-blue-50 border-2 border-blue-500 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Users size={24} className="mr-2 text-blue-500" />
              {restaurant.votedBy.length} collègue(s) ont déjà voté
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {restaurant.votedBy.map((voter) => (
                <div key={voter.id} className="bg-white rounded-lg p-4 text-center hover:shadow-md transition">
                  <img
                    src={voter.avatar}
                    alt={voter.name}
                    className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-blue-500"
                  />
                  <p className="font-semibold text-gray-900 text-sm">{voter.name}</p>
                  <p className="text-xs text-green-600 mt-2">✓ Y ira</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Caractéristiques</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: '🍽️', label: 'Restaurant' },
              { icon: '🪑', label: 'Sur place' },
              { icon: '📱', label: 'Réservation' },
              { icon: '🚗', label: 'Parking' },
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-2">
                <div className="text-3xl">{feature.icon}</div>
                <p className="text-sm text-gray-600 text-center">{feature.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleConfirm}
            disabled={isConfirming}
            className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition transform ${
              isConfirming
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-cyan-500 text-white hover:shadow-lg hover:scale-105'
            }`}
          >
            {isConfirming ? (
              <span className="flex items-center justify-center space-x-2">
                <span className="animate-spin">⏳</span>
                <span>Confirmation en cours...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center space-x-2">
                <span>✓</span>
                <span>Je vote pour ce restaurant!</span>
              </span>
            )}
          </button>

          <button
            onClick={onBack}
            className="w-full py-3 px-6 rounded-xl font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition"
          >
            Continuer la recherche
          </button>
        </div>
      </div>
    </div>
  );
};