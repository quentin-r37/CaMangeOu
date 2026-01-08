import React from 'react';
import { type User } from '../types';

interface AvatarGroupProps {
  users: User[];
  size?: 'sm' | 'md' | 'lg';
}

export function AvatarGroup({ users, size = 'md' }: AvatarGroupProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  };

  const classes = sizeClasses[size];

  return (
    <div className="flex -space-x-2">
      {users.map((user, idx) => (
        <img
          key={user.id}
          src={user.avatar}
          alt={user.name}
          title={user.name}
          className={`${classes} rounded-full border-2 border-white object-cover shadow-sm`}
        />
      ))}
    </div>
  );
}