import { Restaurant, User, HistoryEntry } from './types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alice Martin',
    email: 'alice@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    preferences: ['Italian', 'French', 'Asian'],
  },
  {
    id: '2',
    name: 'Bob Johnson',
    email: 'bob@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    preferences: ['Japanese', 'Mexican', 'American'],
  },
  {
    id: '3',
    name: 'Carol White',
    email: 'carol@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carol',
    preferences: ['Thai', 'Italian', 'Indian'],
  },
  {
    id: '4',
    name: 'David Lee',
    email: 'david@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    preferences: ['Korean', 'French', 'Mediterranean'],
  },
  {
    id: '5',
    name: 'Emma Chen',
    email: 'emma@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    preferences: ['Chinese', 'Vietnamese', 'American'],
  },
];

export const mockRestaurants: Restaurant[] = [
  {
    id: 'r1',
    name: 'La Bella Italia',
    cuisine: 'Italian',
    rating: 4.7,
    reviewCount: 342,
    image: 'https://spark.nextdev.net/api/serve-image/pixabay/527286/1767980317401_webformat.jpg',
    distance: 0.8,
    address: '123 Restaurant Street, Downtown',
    hours: '11:30 AM - 10:00 PM',
    priceRange: '$$',
    votes: 3,
    votedBy: [mockUsers[0], mockUsers[2], mockUsers[4]],
  },
  {
    id: 'r2',
    name: 'Tokyo Dreams',
    cuisine: 'Japanese',
    rating: 4.8,
    reviewCount: 521,
    image: 'https://spark.nextdev.net/api/serve-image/pixabay/949552/1767980311836_webformat.jpg',
    distance: 1.2,
    address: '456 Sushi Avenue, Midtown',
    hours: '12:00 PM - 11:00 PM',
    priceRange: '$$$',
    votes: 2,
    votedBy: [mockUsers[1], mockUsers[3]],
  },
  {
    id: 'r3',
    name: 'Spice Market',
    cuisine: 'Thai',
    rating: 4.5,
    reviewCount: 278,
    image: 'https://spark.nextdev.net/api/serve-image/pixabay/6859074/1767980318235_webformat.jpg',
    distance: 1.5,
    address: '789 Flavor Lane, Uptown',
    hours: '11:00 AM - 10:30 PM',
    priceRange: '$$',
    votes: 4,
    votedBy: [mockUsers[0], mockUsers[2], mockUsers[3], mockUsers[4]],
  },
  {
    id: 'r4',
    name: 'The Grill House',
    cuisine: 'American',
    rating: 4.3,
    reviewCount: 189,
    image: 'https://spark.nextdev.net/api/serve-image/pixabay/949550/1767980316764_webformat.jpg',
    distance: 0.6,
    address: '321 Burger Boulevard, Downtown',
    hours: '10:00 AM - 11:00 PM',
    priceRange: '$$',
    votes: 1,
    votedBy: [mockUsers[1]],
  },
  {
    id: 'r5',
    name: 'Le Petit Bistro',
    cuisine: 'French',
    rating: 4.9,
    reviewCount: 412,
    image: 'https://spark.nextdev.net/api/serve-image/pixabay/4851996/1767980318090_webformat.jpg',
    distance: 2.1,
    address: '555 Elegance Court, Arts District',
    hours: '12:00 PM - 10:00 PM',
    priceRange: '$$$',
    votes: 0,
    votedBy: [],
  },
];

export const mockHistory: HistoryEntry[] = [
  {
    id: 'h1',
    restaurant: mockRestaurants[0],
    date: '2024-01-15',
    groupSize: 5,
  },
  {
    id: 'h2',
    restaurant: mockRestaurants[1],
    date: '2024-01-10',
    groupSize: 4,
  },
  {
    id: 'h3',
    restaurant: mockRestaurants[2],
    date: '2024-01-05',
    groupSize: 6,
  },
];

export const getRestaurantsByPopularity = (): Restaurant[] => {
  return [...mockRestaurants].sort((a, b) => b.votes - a.votes);
};

export const getRestaurantsByFilter = (cuisine?: string, maxDistance?: number): Restaurant[] => {
  return mockRestaurants.filter((r) => {
    if (cuisine && r.cuisine !== cuisine) return false;
    if (maxDistance && r.distance > maxDistance) return false;
    return true;
  });
};

export const getRandomRestaurant = (): Restaurant => {
  return mockRestaurants[Math.floor(Math.random() * mockRestaurants.length)];
};

export const getCuisineTypes = (): string[] => {
  return Array.from(new Set(mockRestaurants.map((r) => r.cuisine)));
};