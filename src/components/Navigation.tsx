import React from 'react';
import { Home, Search, Users, LogOut, UserCircle, Utensils } from 'lucide-react';
import { type User } from '../types';

interface NavigationProps {
  currentPage: 'home' | 'search' | 'details' | 'groups';
  onNavigate: (page: 'home' | 'search' | 'details' | 'groups') => void;
  onLogout: () => void;
  currentUser: User | null;
}

export function Navigation({
  currentPage,
  onNavigate,
  onLogout,
  currentUser,
}: NavigationProps) {
  const navItems = [
    { page: 'home' as const, label: 'Accueil', icon: Home },
    { page: 'search' as const, label: 'Chercher', icon: Search },
    { page: 'groups' as const, label: 'Groupes', icon: Users },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full">
            <Utensils className="text-white" size={20} />
          </div>
          <span className="font-bold text-xl text-gray-900">FoodVote</span>
        </div>

        {/* Navigation Items */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map(({ page, label, icon: Icon }) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                currentPage === page
                  ? 'bg-cyan-100 text-cyan-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon size={20} />
              {label}
            </button>
          ))}
        </div>

        {/* User Profile & Logout */}
        <div className="flex items-center gap-4">
          {currentUser && (
            <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="hidden sm:inline font-semibold text-gray-900 text-sm">
                {currentUser.name}
              </span>
            </div>
          )}
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg font-semibold transition-colors"
            title="Déconnexion"
          >
            <LogOut size={20} />
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center justify-center gap-4 px-4 py-3 border-t border-gray-200">
        {navItems.map(({ page, label, icon: Icon }) => (
          <button
            key={page}
            onClick={() => onNavigate(page)}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
              currentPage === page
                ? 'bg-cyan-100 text-cyan-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Icon size={18} />
          </button>
        ))}
      </div>
    </nav>
  );
}