'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Mock user data. In a real app, this would come from an auth context.
const mockUser = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  role: 'Provider',
  avatar: 'https://picsum.photos/seed/user-avatar/100/100',
};

type Role = 'provider' | 'ngo' | 'driver' | 'admin';

interface Offer {
  id: string;
  item: string;
  provider: string;
  providerLogo: string;
  foodPhoto: string;
  dietaryType: string;
  category: string;
  quantity: number;
  quantityUnit: string;
  timeCooked: string;
  bestBefore: string;
}

interface CartItem {
  offer: Offer;
  quantity: number;
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
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentRole, setCurrentRole] = useState<Role>('provider');
  const [pageTitle, setPageTitle] = useState('Provider Dashboard');

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mockUserEmail');
    }
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

  return (
    <AppContext.Provider value={{ cart, setCart, currentRole, setCurrentRole, pageTitle, setPageTitle, user: mockUser, handleLogout }}>
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
