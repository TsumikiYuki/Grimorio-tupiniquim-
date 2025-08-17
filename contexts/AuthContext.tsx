
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const MOCK_USER: User = {
  id: 'user-3',
  username: 'Aventureiro Nato',
  avatarUrl: 'https://picsum.photos/seed/user3/100',
  bio: 'Explorando masmorras e descobrindo novos homebrews!'
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string) => {
    // In a real app, you'd call an API. Here we just mock it.
    console.log(`Logging in as ${username}`);
    setUser(MOCK_USER);
  };

  const logout = () => {
    setUser(null);
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
