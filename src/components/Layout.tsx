/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  QrCode, 
  History, 
  LogOut, 
  Menu, 
  X, 
  User as UserIcon,
  Search,
  Maximize,
  Bell
} from 'lucide-react';
import { useApp } from '../AppContext.tsx';
import { motion, AnimatePresence } from 'motion/react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Manajemen Produk', path: '/products', icon: Package },
    { name: 'Scan QR', path: '/scan', icon: QrCode },
    { name: 'Riwayat Penjualan', path: '/sales', icon: History },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#F4F7F5] flex overflow-hidden">
      {/* Sidebar Desktop */}
      <aside 
        className={`bg-primary flex flex-col text-white shadow-2xl transition-all duration-300 hidden lg:flex z-30 ${isSidebarOpen ? 'w-64' : 'w-20'}`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0">
            <QrCode className="text-primary w-5 h-5" />
          </div>
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-xl tracking-tight"
            >
              FROZEN<span className="text-brand-light">QR</span>
            </motion.div>
          )}
        </div>

        <nav className="flex-1 px-4 mt-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `sidebar-link group ${isActive ? 'sidebar-link-active' : ''}`
              }
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {isSidebarOpen && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10">
          {isSidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center font-bold text-white shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold truncate">{user.name}</p>
                <p className="text-xs text-white/50 truncate">{user.role}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="ml-auto p-2 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
             <button 
              onClick={handleLogout}
              className="w-full flex justify-center p-3 hover:bg-white/10 rounded-xl text-white/50 hover:text-white transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {!isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(true)}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden overflow-y-auto">
        {/* Navbar */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-bottom border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-all text-slate-500"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-lg font-semibold text-slate-800 hidden md:block">
              {menuItems.find(item => location.pathname.startsWith(item.path))?.name || 'Monitoring'}
            </h1>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari data..." 
                className="bg-slate-100 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 w-48 lg:w-64 transition-all"
              />
            </div>
            
            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
              <Bell className="w-5 h-5" />
            </button>
            
            <div className="h-8 w-px bg-slate-200 mx-2" />
            
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-900 leading-none">{user.name}</p>
                <p className="text-xs text-slate-500 mt-1">{user.role}</p>
              </div>
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-primary font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 lg:p-8 max-w-(--breakpoint-2xl) mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
