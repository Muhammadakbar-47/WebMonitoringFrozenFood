/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  Filter,
  Calendar,
  MapPin,
  TrendingUp,
  CreditCard
} from 'lucide-react';
import { useApp } from '../AppContext.tsx';

export default function SalesPage() {
  const { sales } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSales = sales.filter(s => 
    s.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = sales.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Riwayat Penjualan</h2>
          <p className="text-slate-500">Pantau semua transaksi dan log distribusi.</p>
        </div>
        <div className="flex gap-3">
          <div className="glass-card px-6 py-3 flex items-center gap-4">
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase">Total Revenue</p>
              <h3 className="text-lg font-bold text-primary">Rp {totalRevenue.toLocaleString()}</h3>
            </div>
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari transaksi..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="btn-outline">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="btn-primary">
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Produk</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Lokasi</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Jumlah</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSales.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-slate-400">
                    Belum ada riwayat transaksi.
                  </td>
                </tr>
              ) : (
                filteredSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(sale.date).toLocaleDateString()}
                        <span className="text-slate-300">|</span>
                        {new Date(sale.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">{sale.productName}</p>
                      <p className="text-xs text-slate-500">ID: {sale.productId}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin className="w-3.5 h-3.5" />
                        {sale.location}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <CreditCard className="w-4 h-4 text-slate-400" />
                        Rp {sale.amount.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="badge bg-emerald-100 text-emerald-700">Success</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
