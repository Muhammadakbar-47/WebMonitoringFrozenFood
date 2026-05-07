/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Download, 
  QrCode,
  Edit,
  Trash2,
  X
} from 'lucide-react';
import { useApp } from '../AppContext.tsx';
import { Product } from '../types.ts';
import { motion, AnimatePresence } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';

export default function ProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    weight: 0,
    productionDate: '',
    expiryDate: '',
    status: 'In Stock' as Product['status'],
    location: ''
  });

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProduct) {
      updateProduct(selectedProduct.id, formData);
    } else {
      addProduct(formData);
    }
    setIsModalOpen(false);
    setSelectedProduct(null);
    setFormData({
      name: '',
      type: '',
      weight: 0,
      productionDate: '',
      expiryDate: '',
      status: 'In Stock',
      location: ''
    });
  };

  const openEdit = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      type: product.type,
      weight: product.weight,
      productionDate: product.productionDate,
      expiryDate: product.expiryDate,
      status: product.status,
      location: product.location || ''
    });
    setIsModalOpen(true);
  };

  const [showQR, setShowQR] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Manajemen Produk</h2>
          <p className="text-slate-500">Kelola stok dan distribusi ikan frozen Anda.</p>
        </div>
        <button 
          onClick={() => {
            setSelectedProduct(null);
            setFormData({ name: '', type: '', weight: 0, productionDate: '', expiryDate: '', status: 'In Stock', location: '' });
            setIsModalOpen(true);
          }}
          className="btn-primary"
        >
          <Plus className="w-5 h-5" />
          Tambah Produk
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari produk..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="btn-outline flex-1 md:flex-none">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="btn-outline flex-1 md:flex-none">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Produk</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Berat</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Produksi / Exp</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">QR Code</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-primary font-bold">
                        {product.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{product.name}</p>
                        <p className="text-xs text-slate-500">{product.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`badge ${
                      product.status === 'In Stock' ? 'bg-emerald-100 text-emerald-700' :
                      product.status === 'In Distribution' ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{product.weight}g</td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <div>{product.productionDate}</div>
                    <div className="text-xs text-accent">Exp: {product.expiryDate}</div>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => setShowQR(product.qrCode)}
                      className="p-2 hover:bg-slate-100 rounded-lg text-primary transition-all"
                    >
                      <QrCode className="w-5 h-5" />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(product)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => deleteProduct(product.id)} className="p-2 hover:bg-slate-100 rounded-lg text-accent"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal QR */}
      <AnimatePresence>
        {showQR && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full text-center relative"
            >
              <button 
                onClick={() => setShowQR(null)}
                className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold text-slate-900 mb-6">Product QR Code</h3>
              <div className="bg-slate-50 p-6 rounded-2xl inline-block mb-6">
                <QRCodeSVG value={showQR} size={200} />
              </div>
              <p className="text-slate-500 mb-6">{showQR}</p>
              <button className="btn-primary w-full" onClick={() => window.print()}>
                <Download className="w-4 h-4" />
                Cetak QR Code
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-3xl shadow-xl max-w-md w-full overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">
                  {selectedProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Nama Produk</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="Contoh: Tuna Fillet"
                    className="input-field" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Jenis</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.type}
                      onChange={e => setFormData({...formData, type: e.target.value})}
                      placeholder="Ikan Laut"
                      className="input-field" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Berat (g)</label>
                    <input 
                      type="number" 
                      required 
                      value={formData.weight}
                      onChange={e => setFormData({...formData, weight: parseInt(e.target.value)})}
                      className="input-field" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Tgl Produksi</label>
                    <input 
                      type="date" 
                      required 
                      value={formData.productionDate}
                      onChange={e => setFormData({...formData, productionDate: e.target.value})}
                      className="input-field" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Tgl Expired</label>
                    <input 
                      type="date" 
                      required 
                      value={formData.expiryDate}
                      onChange={e => setFormData({...formData, expiryDate: e.target.value})}
                      className="input-field" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Status</label>
                  <select 
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value as Product['status']})}
                    className="input-field"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="In Distribution">In Distribution</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn-outline flex-1">Batal</button>
                  <button type="submit" className="btn-primary flex-1">Simpan</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
