import React, { useState } from 'react';
import { ArrowLeft, MapPin, Phone, Clock, Globe, Star, AlertCircle } from 'lucide-react';
import { type Restaurant } from '../types';

interface RestaurantDetailsProps {
  restaurant: Restaurant;
  onVote: (restaurant: Restaurant) => void;
  onBack: () => void;
}

export function RestaurantDetails({ restaurant, onVote, onBack }: RestaurantDetailsProps) {
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = () => {
    setIsVoting(true);
    setTimeout(() => {
      onVote(restaurant);
      setIsVoting(false);
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Retour
      </button>

      {/* Hero Image */}
      <div className="mb-8">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-96 object-cover rounded-xl shadow-lg"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
                <p className="text-xl text-gray-600">{restaurant.cuisine}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="text-yellow-400 fill-yellow-400" size={24} />
                  <span className="text-3xl font-bold text-gray-900">{restaurant.rating}</span>
                </div>
                <p className="text-gray-600">{restaurant.reviews} avis</p>
              </div>
            </div>
            <p className="text-gray-700 text-lg">{restaurant.description}</p>
          </div>

          {/* Photos */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Photos</h2>
            <div className="grid grid-cols-2 gap-4">
              {restaurant.photos.map((photo, idx) => (
                <img
                  key={idx}
                  src={photo}
                  alt={`${restaurant.name} photo ${idx + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
                />
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="text-cyan-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <p className="font-semibold text-gray-900">{restaurant.address}</p>
                  <p className="text-gray-600 text-sm">📍 {restaurant.distance}km de distance</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="text-teal-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <p className="font-semibold text-gray-900">
                    {restaurant.hours.open} - {restaurant.hours.close}
                  </p>
                  <p className="text-gray-600 text-sm">Heures d'ouverture</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-orange-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <a
                    href={`tel:${restaurant.phone}`}
                    className="font-semibold text-cyan-600 hover:text-cyan-700"
                  >
                    {restaurant.phone}
                  </a>
                  <p className="text-gray-600 text-sm">Appeler pour réserver</p>
                </div>
              </div>

              {restaurant.website && (
                <div className="flex items-start gap-4">
                  <Globe className="text-purple-500 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <a
                      href={restaurant.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-cyan-600 hover:text-cyan-700"
                    >
                      Visiter le site
                    </a>
                    <p className="text-gray-600 text-sm">Site web du restaurant</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4">
                <span className="text-2xl">💰</span>
                <div>
                  <p className="font-semibold text-gray-900">{restaurant.priceRange}</p>
                  <p className="text-gray-600 text-sm">Gamme de prix</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-xl shadow-lg p-6">
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 text-lg mb-2">Résumé</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Note</span>
                  <span className="font-semibold text-gray-900">{restaurant.rating}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Distance</span>
                  <span className="font-semibold text-gray-900">{restaurant.distance}km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Prix</span>
                  <span className="font-semibold text-gray-900">{restaurant.priceRange}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleVote}
              disabled={isVoting}
              className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold py-4 rounded-lg hover:from-cyan-600 hover:to-teal-600 transition-all duration-200 shadow-md disabled:opacity-50 text-lg"
            >
              {isVoting ? 'Choix en cours...' : 'Voter pour ce restaurant'}
            </button>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg flex gap-3">
              <AlertCircle className="text-blue-500 flex-shrink-0" size={20} />
              <p className="text-blue-700 text-sm">
                Tes collègues pourront voir que tu as choisi ce restaurant!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}