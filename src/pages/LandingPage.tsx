/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  QrCode, 
  ShieldCheck, 
  Zap, 
  BarChart3,
  Globe
} from 'lucide-react';
import { motion } from 'motion/react';

export default function LandingPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <QrCode className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-primary">FROZEN<span className="text-brand-light">QR</span></span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/auth" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">Login</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
            <Zap className="w-3 h-3" />
            TERBARU: QR TRACKING SYSTEM V2.0
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight">
            Monitoring <span className="text-primary">Ikan Frozen</span> Lebih Pintar & Akurat.
          </h1>
          <p className="text-lg text-slate-500 max-w-lg leading-relaxed">
            Sistem distribusi dan penjualan berbasis QR Code yang dirancang khusus untuk industri perikanan. Pantau stok, lokasi, dan riwayat penjualan dalam satu dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/auth" className="btn-primary py-4 px-8 text-base">
              Mulai Monitoring Sekarang
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="btn-outline py-4 px-8 text-base">
              Lihat Demo Video
            </button>
          </div>
          <div className="flex items-center gap-8 pt-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="user" className="w-full h-full rounded-full" />
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500">
              <span className="font-bold text-slate-900">1,200+</span> Pengusaha Perikanan Aktif
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-primary/5 rounded-[40px] blur-3xl -z-10" />
          <div className="bg-white p-6 rounded-[32px] shadow-2xl border border-slate-100 relative overflow-hidden">
            <div className="bg-slate-50 rounded-2xl p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dashboard Preview</div>
              </div>
              <div className="grid grid-cols-2 gap-3 pb-4">
                <div className="h-20 bg-white rounded-xl border border-slate-100 shadow-sm p-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-lg mb-2" />
                  <div className="h-2 w-12 bg-slate-200 rounded" />
                </div>
                <div className="h-20 bg-white rounded-xl border border-slate-100 shadow-sm p-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-lg mb-2" />
                  <div className="h-2 w-12 bg-slate-200 rounded" />
                </div>
              </div>
              <div className="h-32 bg-white rounded-xl border border-slate-100 shadow-sm" />
            </div>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <QrCode className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">QR Tracking System</h4>
                  <p className="text-xs text-slate-500">Scan dan pantau logistik secara real-time dari mana saja.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <BarChart3 className="text-accent w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Data Analytics</h4>
                  <p className="text-xs text-slate-500">Analisis penjualan dengan grafik performa yang mendetail.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Solusi Terbaik Untuk Supply Chain Anda</h2>
            <p className="text-slate-500">Fitur lengkap yang memudahkan operasional bisnis ikan frozen dari hulu ke hilir.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: 'QR Code Generation', 
                desc: 'Generate QR Code unik untuk setiap batch produk dengan mudah.', 
                icon: QrCode, 
                color: 'bg-primary' 
              },
              { 
                title: 'Real-time Tracking', 
                desc: 'Pantau status produk dari gudang hingga ke tangan konsumen.', 
                icon: Globe, 
                color: 'bg-blue-600' 
              },
              { 
                title: 'Data Security', 
                desc: 'Log transaksi terenkripsi dan riwayat yang tidak dapat diubah.', 
                icon: ShieldCheck, 
                color: 'bg-emerald-600' 
              },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                <div className={`w-12 h-12 ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-${feature.color.split('-')[1]}/20`}>
                  <feature.icon className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-primary rounded-[48px] p-12 lg:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/4 translate-y-1/4" />
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">Siap Untuk Mendigitalkan Bisnis Anda?</h2>
            <p className="text-emerald-100 text-lg max-w-xl mx-auto opacity-80">
              Bergabunglah dengan ribuan pengusaha lainnya yang telah meningkatkan efisiensi operasional mereka.
            </p>
            <div className="flex justify-center">
              <Link to="/auth" className="bg-white text-primary px-10 py-5 rounded-2xl font-bold hover:bg-emerald-50 transition-all active:scale-95 shadow-xl">
                Coba Demo Sekarang
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
             <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <QrCode className="text-white w-4 h-4" />
            </div>
            <span className="font-bold text-slate-900">FrozenMonitor</span>
          </div>
          <p className="text-slate-400 text-sm">© 2024 FrozenMonitor. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-slate-500 hover:text-primary">Syarat & Ketentuan</a>
            <a href="#" className="text-sm text-slate-500 hover:text-primary">Kebijakan Privasi</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
