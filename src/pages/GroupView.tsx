import React, { useState } from 'react';
import { Users, MapPin, ChevronRight, LogOut } from 'lucide-react';
import { type User, type Restaurant } from '../types';
import { AvatarGroup } from '../components/AvatarGroup';
import { mockRestaurants, mockRecentVotes, mockTeamMembers, mockGroupSessions } from '../data/mockData';

interface GroupViewProps {
  user: User;
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onNavigate: (page: 'home') => void;
}

export function GroupView({ user, onSelectRestaurant, onNavigate }: GroupViewProps) {
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  // Simulate user joining a group
  const handleJoinGroup = (groupId: string, restaurantId: string) => {
    const restaurant = mockRestaurants.find((r) => r.id === restaurantId);
    if (restaurant) {
      onSelectRestaurant(restaurant);
      onNavigate('home');
    }
  };

  const selectedGroup = selectedGroupId
    ? mockGroupSessions.find((g) => g.id === selectedGroupId)
    : null;

  if (selectedGroup) {
    // Group Details View
    const restaurantVotes = Object.entries(selectedGroup.votes);
    const restaurantDetails = restaurantVotes.map(([restaurantId, userIds]) => {
      const restaurant = mockRestaurants.find((r) => r.id === restaurantId);
      const voters = userIds
        .map((userId) => mockTeamMembers.find((m) => m.id === userId))
        .filter(Boolean) as User[];
      return { restaurant, voters, count: userIds.length };
    });

    const topRestaurant = restaurantDetails.sort((a, b) => b.count - a.count)[0];

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => setSelectedGroupId(null)}
          className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold mb-6 transition-colors"
        >
          ← Retour aux groupes
        </button>

        {/* Group Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{selectedGroup.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <Users className="text-cyan-500" size={24} />
            <p className="text-gray-700">
              <span className="font-bold text-lg">{selectedGroup.participants.length}</span> participant{selectedGroup.participants.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Participants */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 text-lg mb-4">Participants</h3>
            <div className="flex flex-wrap gap-3">
              {selectedGroup.participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full"
                >
                  <img
                    src={participant.avatar}
                    alt={participant.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-semibold text-gray-900">{participant.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vote Results */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Résultats des votes</h2>

          {topRestaurant && topRestaurant.restaurant && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 mb-6">
              <p className="text-sm font-semibold text-green-700 mb-2">🏆 En tête</p>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {topRestaurant.restaurant.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl font-bold text-cyan-600">
                      {topRestaurant.count} vote{topRestaurant.count !== 1 ? 's' : ''}
                    </span>
                    <AvatarGroup users={topRestaurant.voters.slice(0, 3)} size="sm" />
                  </div>
                </div>
                <button
                  onClick={() => handleJoinGroup(selectedGroup.id, topRestaurant.restaurant!.id)}
                  className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                  Rejoindre
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Other Options */}
          <div className="space-y-4">
            {restaurantDetails
              .filter((item) => item.restaurant !== topRestaurant?.restaurant)
              .map((item) => (
                <div
                  key={item.restaurant?.id}
                  className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between hover:shadow-lg transition-shadow"
                >
                  <div className="flex-grow">
                    <h4 className="font-bold text-gray-900 mb-2">{item.restaurant?.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-600 font-bold">{item.count} vote{item.count !== 1 ? 's' : ''}</span>
                      <AvatarGroup users={item.voters.slice(0, 3)} size="sm" />
                    </div>
                  </div>
                  <button
                    onClick={() => handleJoinGroup(selectedGroup.id, item.restaurant!.id)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Rejoindre
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Groupes de déjeuner</h1>
        <p className="text-gray-600 text-lg">Rejoins tes collègues ou crée un nouveau groupe</p>
      </div>

      {/* Active Groups */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Groupes actifs</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockGroupSessions.map((group) => {
            const totalVotes = Object.values(group.votes).reduce((sum, votes) => sum + votes.length, 0);
            const restaurantVotes = Object.entries(group.votes);
            const topVote = restaurantVotes.sort((a, b) => b[1].length - a[1].length)[0];
            const topRestaurant = topVote
              ? mockRestaurants.find((r) => r.id === topVote[0])
              : null;

            return (
              <div
                key={group.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
                onClick={() => setSelectedGroupId(group.id)}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{group.name}</h3>
                      <p className="text-gray-600 text-sm">
                        Créé par {group.participants.find((p) => p.id === group.createdBy)?.name}
                      </p>
                    </div>
                    <div className="flex items-center justify-center w-10 h-10 bg-cyan-100 rounded-full">
                      <Users size={20} className="text-cyan-600" />
                    </div>
                  </div>

                  {/* Participants */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-900">{group.participants.length} participants</span>
                    </div>
                    <AvatarGroup users={group.participants.slice(0, 4)} size="sm" />
                  </div>

                  {/* Top Choice */}
                  {topRestaurant && (
                    <div className="p-3 bg-gray-50 rounded-lg mb-4">
                      <p className="text-xs font-semibold text-gray-600 mb-1">En tête</p>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">{topRestaurant.name}</span>
                        <span className="text-sm text-cyan-600 font-bold">
                          {topVote[1].length} vote{topVote[1].length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Total Votes */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-gray-600 text-sm">{totalVotes} vote{totalVotes !== 1 ? 's' : ''}</span>
                    <ChevronRight className="text-gray-400" size={20} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Create Group CTA */}
      <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl border-2 border-cyan-200 p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Créer un nouveau groupe</h2>
        <p className="text-gray-600 mb-6">Invite tes collègues à voter pour le déjeuner</p>
        <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold rounded-lg hover:from-cyan-600 hover:to-teal-600 transition-all">
          + Créer un groupe
        </button>
      </div>
    </div>
  );
}