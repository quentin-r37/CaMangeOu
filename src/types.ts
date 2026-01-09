export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  department: string;
  company: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviews: number;
  distance: number;
  address: string;
  phone: string;
  hours: {
    open: string;
    close: string;
  };
  image: string;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  latitude: number;
  longitude: number;
  website?: string;
  description?: string;
  photos: string[];
}

export interface Vote {
  userId: string;
  restaurantId: string;
  restaurantName: string;
  timestamp: Date;
}

export interface GroupSession {
  id: string;
  name: string;
  createdBy: string;
  participants: User[];
  votes: {
    [restaurantId: string]: string[];
  };
  createdAt: Date;
}