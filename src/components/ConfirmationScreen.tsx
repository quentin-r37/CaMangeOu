import React, { useEffect } from 'react';
import { CheckCircle, MapPin, Clock, Users } from 'lucide-react';
import { Restaurant } from '../types';

interface ConfirmationScreenProps {
  restaurant: Restaurant;
  onComplete: () => void;
}

export const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({ restaurant, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden text-center p-8 sm:p-12">
          {/* Checkmark Animation */}
          <div className="mb-8">
            <div className="inline-block text-6xl animate-bounce">
              <CheckCircle size={80} className="text-green-500" />
            </div>
          </div>

          {/* Message */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Excellent choix!
          </h2>
          <p className="text-gray-600 mb-8">
            Vous avez voté pour <strong>{restaurant.name}</strong>
          </p>

          {/* Restaurant Summary */}
          <div className="bg-gradient-to-r from-green-50 to-cyan-50 rounded-xl p-6 mb-8 border-2 border-green-500">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{restaurant.name}</h3>

            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3">
                <MapPin size={20} className="text-blue-500" />
                <div>
                  <p className="text-xs text-gray-500 uppercase">Adresse</p>
                  <p className="text-sm font-semibold text-gray-900">{restaurant.address}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock size={20} className="text-orange-500" />
                <div>
                  <p className="text-xs text-gray-500 uppercase">Horaires</p>
                  <p className="text-sm font-semibold text-gray-900">{restaurant.hours}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Users size={20} className="text-purple-500" />
                <div>
                  <p className="text-xs text-gray-500 uppercase">Collègues</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {restaurant.votedBy.length} personne(s) y va
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-left mb-8">
            <p className="text-sm text-blue-900">
              <strong>💡 Prochaines étapes:</strong><br />
              Consultez la réservation dans vos emails et confirmez votre présence auprès de votre manager.
            </p>
          </div>

          {/* Loading Indicator */}
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              Retour à l'accueil dans quelques secondes...
            </p>
            <div className="flex justify-center space-x-2 mt-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};