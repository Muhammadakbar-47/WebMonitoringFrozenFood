/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './AppContext.tsx';
import Layout from './components/Layout.tsx';
import LandingPage from './pages/LandingPage.tsx';
import Dashboard from './pages/Dashboard.tsx';
import ProductsPage from './pages/ProductsPage.tsx';
import ScanPage from './pages/ScanPage.tsx';
import SalesPage from './pages/SalesPage.tsx';
import AuthPage from './pages/AuthPage.tsx';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useApp();
  return user ? <Layout>{children}</Layout> : <Navigate to="/auth" />;
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/products" element={<PrivateRoute><ProductsPage /></PrivateRoute>} />
          <Route path="/scan" element={<PrivateRoute><ScanPage /></PrivateRoute>} />
          <Route path="/sales" element={<PrivateRoute><SalesPage /></PrivateRoute>} />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
