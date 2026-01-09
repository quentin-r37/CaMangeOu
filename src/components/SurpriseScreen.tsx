import React, { useState } from 'react';
import { ArrowLeft, RotateCw, Sparkles } from 'lucide-react';
import { Restaurant, User } from '../types';
import { mockRestaurants, getRandomRestaurant } from '../utils';

interface SurpriseScreenProps {
  currentUser: User;
  onBack: () => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

export const SurpriseScreen: React.FC<SurpriseScreenProps> = ({
  currentUser,
  onBack,
  onSelectRestaurant,
}) => {
  const [randomRestaurant, setRandomRestaurant] = useState<Restaurant>(getRandomRestaurant());
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSurprise = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setRandomRestaurant(getRandomRestaurant());
      setIsSpinning(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700 font-semibold mb-6 transition"
        >
          <ArrowLeft size={20} className="mr-2" />
          Retour à l'accueil
        </button>

        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 flex items-center justify-center mb-2">
            <Sparkles size={32} className="mr-3 text-pink-500" />
            Me surprendre!
          </h2>
          <p className="text-gray-600">Découvrez un restaurant aléatoire basé sur vos préférences</p>
        </div>

        {/* Fortune Wheel Animation */}
        <div className="text-center mb-12">
          <div
            className={`inline-block mb-6 transition-transform ${
              isSpinning ? 'animate-spin' : ''
            }`}
            style={{
              animationDuration: '0.6s',
            }}
          >
            <div className="text-8xl">🎡</div>
          </div>
        </div>

        {/* Restaurant Card */}
        <div
          className={`bg-white rounded-2xl shadow-2xl overflow-hidden transition-opacity ${
            isSpinning ? 'opacity-50' : 'opacity-100'
          }`}
        >
          {/* Image */}
          <div className="h-64 sm:h-96 bg-gray-200 overflow-hidden relative">
            <img
              src={randomRestaurant.image}
              alt={randomRestaurant.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30"></div>
          </div>

          {/* Content */}
          <div className="p-8">
            <h3 className="text-4xl font-bold text-gray-900 mb-2">
              {randomRestaurant.name}
            </h3>

            <p className="text-xl text-gray-600 mb-6">{randomRestaurant.cuisine}</p>

            {/* Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg">
                <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Rating</p>
                <p className="text-2xl font-bold text-yellow-600">⭐ {randomRestaurant.rating}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Distance</p>
                <p className="text-2xl font-bold text-blue-600">{randomRestaurant.distance} km</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Prix</p>
                <p className="text-2xl font-bold text-green-600">{randomRestaurant.priceRange}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Votes</p>
                <p className="text-2xl font-bold text-purple-600">{randomRestaurant.votes}</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-50 p-6 rounded-xl mb-8 border-l-4 border-pink-500">
              <p className="text-gray-700">
                <strong>📍 Adresse:</strong> {randomRestaurant.address}
              </p>
              <p className="text-gray-700 mt-2">
                <strong>🕐 Horaires:</strong> {randomRestaurant.hours}
              </p>
              <p className="text-gray-700 mt-2">
                <strong>👥 Avis:</strong> {randomRestaurant.reviewCount} commentaires clients
              </p>
            </div>

            {/* Voters */}
            {randomRestaurant.votedBy.length > 0 && (
              <div className="mb-8 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm font-semibold text-gray-900 mb-3">
                  {randomRestaurant.votedBy.length} collègue(s) ont déjà voté pour ce restaurant
                </p>
                <div className="flex flex-wrap gap-2">
                  {randomRestaurant.votedBy.map((voter) => (
                    <div
                      key={voter.id}
                      className="flex items-center space-x-2 bg-white px-3 py-2 rounded-full border border-blue-200"
                    >
                      <img
                        src={voter.avatar}
                        alt={voter.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm font-semibold text-gray-900">{voter.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleSurprise}
                disabled={isSpinning}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <RotateCw size={20} />
                <span>Encore une surprise!</span>
              </button>
              <button
                onClick={() => onSelectRestaurant(randomRestaurant)}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-cyan-500 text-white font-bold rounded-lg hover:shadow-lg transition flex items-center justify-center space-x-2"
              >
                <Sparkles size={20} />
                <span>Je prends celui-ci!</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};