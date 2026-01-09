import React from 'react';
import { LogOut, User, Settings } from 'lucide-react';

interface HeaderProps {
  currentUser: {
    name: string;
    avatar: string;
  };
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentUser, onLogout }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4">
            <div className="text-3xl font-bold text-white">🍽️</div>
            <div>
              <h1 className="text-2xl font-bold">LunchMatch</h1>
              <p className="text-blue-100 text-sm">Décidez ensemble, mangez ensemble</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <span className="text-sm font-medium hidden sm:inline">{currentUser.name}</span>
            </div>
            
            <button className="p-2 hover:bg-blue-700 rounded-lg transition">
              <Settings size={20} />
            </button>
            
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition font-medium"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};