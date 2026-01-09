import React, { useState } from 'react';
import { Mail, Lock, Utensils } from 'lucide-react';
import { type User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication - in real app would call backend
    if (email && password) {
      const mockUser: User = {
        id: '1',
        name: email.split('@')[0],
        email: email,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email,
        department: 'Marketing',
        company: 'TechCorp',
      };
      onLogin(mockUser);
    }
  };

  const handleDemoLogin = () => {
    const demoUser: User = {
      id: '1',
      name: 'Sarah',
      email: 'sarah@techcorp.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      department: 'Marketing',
      company: 'TechCorp',
    };
    onLogin(demoUser);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full mb-4">
            <Utensils className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">FoodVote</h1>
          <p className="text-gray-600 text-lg">Décidez ensemble où manger</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@entreprise.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold py-3 rounded-lg hover:from-cyan-600 hover:to-teal-600 transition-all duration-200 shadow-md"
            >
              Se connecter
            </button>
          </form>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">ou</span>
            </div>
          </div>

          <button
            onClick={handleDemoLogin}
            className="w-full mt-6 bg-gray-100 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-200 transition-all duration-200"
          >
            Essayer la démo
          </button>
        </div>

        {/* Info Text */}
        <div className="text-center text-gray-600 text-sm">
          <p>Première visite? Utilisez les identifiants de démo</p>
        </div>
      </div>
    </div>
  );
}