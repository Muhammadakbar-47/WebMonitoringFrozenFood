/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Sale, User } from './types.ts';

interface AppContextType {
  products: Product[];
  sales: Sale[];
  user: User | null;
  addProduct: (product: Omit<Product, 'id' | 'qrCode'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addSale: (sale: Omit<Sale, 'id' | 'date'>) => void;
  login: (email: string, role: 'Admin' | 'Staff') => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock initial data
const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'Tuna Fillet Premium', type: 'Tuna', weight: 500, productionDate: '2024-05-01', expiryDate: '2024-11-01', status: 'In Stock', qrCode: 'PROD-1', location: 'Gudang Utama' },
  { id: '2', name: 'Salmon Slice Atlantic', type: 'Salmon', weight: 300, productionDate: '2024-05-02', expiryDate: '2024-11-02', status: 'In Distribution', qrCode: 'PROD-2', location: 'Truk A-01' },
  { id: '3', name: 'Udang Vannamei Frozen', type: 'Udang', weight: 1000, productionDate: '2024-05-03', expiryDate: '2024-08-03', status: 'Sold', qrCode: 'PROD-3', location: 'Pasar Modern Jaksel' },
];

const INITIAL_SALES: Sale[] = [
  { id: 'S1', productId: '3', productName: 'Udang Vannamei Frozen', amount: 150000, date: '2024-05-05T10:00:00Z', location: 'Jakarta Selatan' },
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [sales, setSales] = useState<Sale[]>(() => {
    const saved = localStorage.getItem('sales');
    return saved ? JSON.parse(saved) : INITIAL_SALES;
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sales', JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const addProduct = (product: Omit<Product, 'id' | 'qrCode'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newProduct: Product = {
      ...product,
      id,
      qrCode: `PROD-${id}`,
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addSale = (sale: Omit<Sale, 'id' | 'date'>) => {
    const newSale: Sale = {
      ...sale,
      id: `S${Math.random().toString(36).substr(2, 5)}`,
      date: new Date().toISOString(),
    };
    setSales([newSale, ...sales]);
    // Also update product status to Sold
    updateProduct(sale.productId, { status: 'Sold' });
  };

  const login = (email: string, role: 'Admin' | 'Staff') => {
    setUser({ id: 'U1', name: email.split('@')[0], email, role });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AppContext.Provider value={{ products, sales, user, addProduct, updateProduct, deleteProduct, addSale, login, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
