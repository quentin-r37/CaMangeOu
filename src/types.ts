export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  preferences: string[];
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  image: string;
  distance: number;
  address: string;
  hours: string;
  priceRange: string;
  votes: number;
  votedBy: User[];
}

export interface SearchFilters {
  cuisine: string;
  distance: number;
  priceRange: string;
  rating: number;
}

export interface GroupSession {
  id: string;
  date: string;
  participants: User[];
  restaurantChoices: { [restaurantId: string]: User[] };
}

export interface HistoryEntry {
  id: string;
  restaurant: Restaurant;
  date: string;
  groupSize: number;
}