
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { GroupedOrder } from '@/app/dashboard/ngo/cart/page';

// Mock user data. In a real app, this would come from an auth context.
const mockUser = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  role: 'Provider',
  avatar: 'https://picsum.photos/seed/user-avatar/100/100',
};

type Role = 'provider' | 'ngo' | 'driver' | 'admin';

export interface Offer {
  id: string;
  item: string;
  provider: string;
  location: string;
  providerLogo: string;
  foodPhoto: string;
  dietaryType: "veg" | "non-veg";
  category: "cooked" | "raw" | "packaged" | "bakery" | "other";
  quantity: number;
  quantityUnit: string;
  timeCooked: string;
  bestBefore: string;
  status: 'Active' | 'Reserved' | 'Picked Up' | 'Delivered' | 'Expired';
  createdAt: string;
}

export interface CartItem {
  offer: Offer;
  quantity: number;
}

export interface Driver {
    id: string;
    name: string;
    phone: string;
    avatar: string;
    status: 'active' | 'inactive';
    vehicleId: string;
}

export interface HistoryEntry {
  id: string;
  item: string;
  provider: string;
  ngo: string;
  driver: string;
  date: string;
  status: 'Completed' | 'Rejected' | 'Expired';
  tokens: number;
  quantity: number;
  quantityUnit: string;
}

export interface Reservation {
  id: string;
  item: string;
  quantity: number;
  quantityUnit: string;
  provider: string;
  providerLogo: string;
  providerAddress: string;
  providerContact: { name: string; phone: string; };
  status: "Awaiting Pickup" | "In Transit" | "Delivered";
  pickupTime: string;
  ngo: string;
  ngoAddress: string;
  driverName: string;
  driverAvatar: string;
}

export interface Task {
    id: string;
    provider: string;
    providerLogo: string;
    pickupLocation: string;
    distance: string;
    items: {
      name: string;
      quantity: string;
    }[];
    ngo: string;
    pickupWindow: string;
}


interface AppContextType {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  currentRole: Role;
  setCurrentRole: React.Dispatch<React.SetStateAction<Role>>;
  pageTitle: string;
  setPageTitle: React.Dispatch<React.SetStateAction<string>>;
  user: typeof mockUser;
  handleLogout: () => void;
  offers: Offer[];
  setOffers: React.Dispatch<React.SetStateAction<Offer[]>>;
  addOffer: (offer: Offer) => void;
  drivers: Driver[];
  setDrivers: React.Dispatch<React.SetStateAction<Driver[]>>;
  history: HistoryEntry[];
  addHistory: (entry: HistoryEntry) => void;
  reservations: Reservation[];
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
  addReservation: (reservation: Reservation) => void;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  addTask: (task: Task) => void;
  pendingOrder: GroupedOrder | null;
  setPendingOrder: React.Dispatch<React.SetStateAction<GroupedOrder | null>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

const initialOffers: Offer[] = [
  {
    id: "OFF-001",
    item: "Vegetable Biryani",
    provider: "The Grand Restaurant",
    location: "Indiranagar, Bangalore",
    providerLogo: "https://picsum.photos/seed/p-logo2/40/40",
    foodPhoto: "/assets/vegetable-biryani.jpg",
    dietaryType: "veg",
    category: "cooked",
    quantity: 5,
    quantityUnit: 'kg',
    timeCooked: '2 hours ago',
    bestBefore: "in 2 hours",
    status: 'Active',
    createdAt: '2 hours ago',
  },
  {
    id: "OFF-002",
    item: "Surplus Bread & Pastries",
    provider: "City Bakery",
    location: "Koramangala, Bangalore",
    providerLogo: "https://picsum.photos/seed/p-logo1/40/40",
    foodPhoto: "https://picsum.photos/seed/food1/600/400",
    dietaryType: "veg",
    category: "bakery",
    quantity: 10,
    quantityUnit: "kg",
    timeCooked: "Today, 6:00 AM",
    bestBefore: "Today, 8:00 PM",
    status: 'Active',
    createdAt: '6 hours ago',
  },
  {
    id: "OFF-005",
    item: "Paneer Butter Masala",
    provider: "The Grand Restaurant",
    location: "Indiranagar, Bangalore",
    providerLogo: "https://picsum.photos/seed/p-logo2/40/40",
    foodPhoto: "https://picsum.photos/seed/food2/600/400",
    dietaryType: "veg",
    category: "cooked",
    quantity: 4,
    quantityUnit: "kg",
    timeCooked: "Today, 12:00 PM",
    bestBefore: "Today, 10:00 PM",
    status: 'Active',
    createdAt: '8 hours ago'
  },
    {
    id: "OFF-008",
    item: "Leftover Sandwiches",
    provider: "City Bakery",
    location: "Koramangala, Bangalore",
    providerLogo: "https://picsum.photos/seed/p-logo1/40/40",
    foodPhoto: "https://picsum.photos/seed/food8/600/400",
    dietaryType: "non-veg",
    category: "bakery",
    quantity: 15,
    quantityUnit: "units",
    timeCooked: "Today, 8:00 AM",
    bestBefore: "Today, 9:00 PM",
    status: 'Active',
    createdAt: '1 hour ago'
  },
  {
    id: "OFF-006",
    item: "Fresh Vegetables",
    provider: "Local Farm Co-op",
    location: "HSR Layout, Bangalore",
    providerLogo: "https://picsum.photos/seed/p-logo3/40/40",
    foodPhoto: "https://picsum.photos/seed/food3/600/400",
    dietaryType: "veg",
    category: "raw",
    quantity: 25,
    quantityUnit: "kg",
    timeCooked: "N/A",
    bestBefore: "In 2 days",
    status: 'Active',
    createdAt: 'Yesterday'
  },
  {
    id: "OFF-007",
    item: "Chicken Biryani",
    provider: "Spicy Delights",
    location: "Koramangala, Bangalore",
    providerLogo: "https://picsum.photos/seed/p-logo4/40/40",
    foodPhoto: "https://picsum.photos/seed/food4/600/400",
    dietaryType: "non-veg",
    category: "cooked",
    quantity: 8,
    quantityUnit: "kg",
    timeCooked: "Today, 1:00 PM",
    bestBefore: "Today, 11:00 PM",
    status: 'Active',
    createdAt: '30 mins ago'
  },
];

const initialDrivers: Driver[] = [
  { id: 'DRV-01', name: 'Ravi Kumar', phone: '+91 98765 43210', avatar: 'https://picsum.photos/seed/driver1/100/100', vehicleId: 'KA 01 AB 1234', status: 'active' },
  { id: 'DRV-02', name: 'Sunita Sharma', phone: '+91 98765 43211', avatar: 'https://picsum.photos/seed/driver2/100/100', vehicleId: 'MH 02 CD 5678', status: 'active' },
  { id: 'DRV-03', name: 'Amit Patel', phone: '+91 98765 43212', avatar: 'https://picsum.photos/seed/driver3/100/100', vehicleId: 'GJ 03 EF 9012', status: 'inactive' },
];


export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [pendingOrder, setPendingOrder] = useState<GroupedOrder | null>(null);
  const [currentRole, setCurrentRole] = useState<Role>('provider');
  const [pageTitle, setPageTitle] = useState('Provider Dashboard');

  const [offers, setOffers] = useState<Offer[]>(() => {
    if (typeof window === 'undefined') return initialOffers;
    try {
      const saved = localStorage.getItem('offers');
      return saved ? JSON.parse(saved) : initialOffers;
    } catch (error) {
      console.error("Failed to parse offers from localStorage", error);
      return initialOffers;
    }
  });

  const [drivers, setDrivers] = useState<Driver[]>(() => {
    if (typeof window === 'undefined') return initialDrivers;
    try {
      const saved = localStorage.getItem('drivers');
      return saved ? JSON.parse(saved) : initialDrivers;
    } catch (error) {
      console.error("Failed to parse drivers from localStorage", error);
      return initialDrivers;
    }
  });

  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('history');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to parse history from localStorage", error);
      return [];
    }
  });

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('reservations');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to parse reservations from localStorage", error);
      return [];
    }
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('tasks');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to parse tasks from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('offers', JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem('drivers', JSON.stringify(drivers));
  }, [drivers]);

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('reservations', JSON.stringify(reservations));
  }, [reservations]);
  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mockUserEmail');
    }
  };

  const addOffer = (offer: Offer) => {
    setOffers(prevOffers => [offer, ...prevOffers]);
  };
  
  const addHistory = (entry: HistoryEntry) => {
    setHistory(prevHistory => [entry, ...prevHistory]);
  };

  const addReservation = (reservation: Reservation) => {
    setReservations(prev => [...prev, reservation]);
  };

  const addTask = (task: Task) => {
    setTasks(prev => [...prev, task]);
  };

  useEffect(() => {
    const mockEmail = typeof window !== 'undefined' ? localStorage.getItem('mockUserEmail') : null;
    if (mockEmail?.includes('ngo')) {
      setCurrentRole('ngo');
      setPageTitle('NGO Dashboard');
    } else if (mockEmail?.includes('driver')) {
      setCurrentRole('driver');
      setPageTitle('Driver Dashboard');
    } else if (mockEmail?.includes('admin')) {
      setCurrentRole('admin');
      setPageTitle('Admin Console');
    } else {
      setCurrentRole('provider');
      setPageTitle('Provider Dashboard');
    }
  }, []);

  const contextValue = {
    cart, setCart,
    currentRole, setCurrentRole,
    pageTitle, setPageTitle,
    user: mockUser,
    handleLogout,
    offers, setOffers,
    addOffer,
    drivers, setDrivers,
    history, addHistory,
    reservations, setReservations,
    addReservation,
    tasks, setTasks,
    addTask,
    pendingOrder, setPendingOrder
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
