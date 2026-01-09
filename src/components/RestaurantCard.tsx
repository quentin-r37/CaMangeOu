import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { type Restaurant } from '../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

export function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer transform hover:scale-105"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-md">
          <span className="text-sm font-bold text-gray-900">{restaurant.priceRange}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
          {restaurant.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3">{restaurant.cuisine}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <Star className="text-yellow-400 fill-yellow-400" size={18} />
          <span className="font-semibold text-gray-900">{restaurant.rating}</span>
          <span className="text-gray-500 text-sm">({restaurant.reviews})</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <MapPin size={16} />
          <span>{restaurant.distance}km away</span>
        </div>
      </div>
    </div>
  );
}