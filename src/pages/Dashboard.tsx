/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  TrendingUp, 
  Package, 
  Truck, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  QrCode
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { useApp } from '../AppContext.tsx';
import { motion } from 'motion/react';

const data = [
  { name: 'Sen', sales: 4000 },
  { name: 'Sel', sales: 3000 },
  { name: 'Rab', sales: 2000 },
  { name: 'Kam', sales: 2780 },
  { name: 'Jum', sales: 1890 },
  { name: 'Sab', sales: 2390 },
  { name: 'Min', sales: 3490 },
];

export default function Dashboard() {
  const { products, sales } = useApp();

  const stats = [
    { label: 'Total Distribusi', value: `${products.length * 500} Kg`, icon: Truck, color: 'text-primary' },
    { label: 'Produk Terjual', value: products.filter(p => p.status === 'Sold').length, icon: CheckCircle2, color: 'text-primary' },
    { label: 'Stok Tersedia', value: products.filter(p => p.status === 'In Stock').length, icon: Package, color: 'text-primary' },
    { label: 'QR Expired (Alert)', value: '42', icon: AlertCircle, color: 'text-accent' },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">System Overview</h2>
          <p className="text-slate-500 mt-1">Berikut adalah ringkasan performa distribusi hari ini.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-accent text-white px-5 py-2 rounded-lg text-sm font-medium shadow-sm hover:opacity-90 transition-all">
            + Register New Stock
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
          >
            <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
            <div className="flex items-center justify-between">
              <h3 className={`text-3xl font-bold ${stat.color}`}>{stat.value}</h3>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            {stat.label === 'Stok Tersedia' ? (
              <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-primary"></div>
              </div>
            ) : (
              <div className={`mt-4 text-xs font-semibold ${stat.label === 'QR Expired (Alert)' ? 'text-accent' : 'text-emerald-600'}`}>
                {stat.label === 'QR Expired (Alert)' ? 'Action Required Soon' : '↑ 12% vs Last Month'}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Table Area */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <h4 className="font-bold text-slate-800">Tracking Distribusi Terakhir</h4>
            <button className="text-primary text-sm font-medium hover:underline">Lihat Semua</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-400 text-xs uppercase tracking-wider">
                <tr className="border-b border-slate-100">
                  <th className="px-6 py-4 font-semibold">ID QR</th>
                  <th className="px-6 py-4 font-semibold">Jenis Ikan</th>
                  <th className="px-6 py-4 font-semibold">Lokasi</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {products.slice(0, 5).map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">#{product.qrCode}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{product.location || 'Warehouse'}</td>
                    <td className="px-6 py-4 text-xs">
                      <span className={`px-2 py-1 rounded-full font-semibold ${
                        product.status === 'Sold' ? 'bg-green-100 text-green-800' :
                        product.status === 'In Distribution' ? 'bg-blue-100 text-blue-800' :
                        'bg-slate-100 text-slate-800'
                      }`}>
                        {product.status === 'Sold' ? 'Diterima' : product.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Scan CTA Card */}
        <div className="bg-primary text-white p-8 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <QrCode className="w-32 h-32" />
          </div>
          <h4 className="text-lg font-bold mb-2">Scan & Monitor</h4>
          <p className="text-sm text-white/70 mb-6 font-medium">Arahkan scanner ke QR Code produk untuk detail instan</p>
          <div className="bg-white p-6 rounded-2xl mb-8 shadow-xl">
             <QrCode className="w-32 h-32 text-primary" />
          </div>
          <button className="w-full bg-white text-primary py-3 rounded-xl font-bold hover:bg-brand-light transition-colors transform active:scale-95 shadow-lg">
            Aktifkan Kamera
          </button>
        </div>
      </div>
    </div>
  );
}
