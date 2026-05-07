/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  QrCode, 
  Mail, 
  Lock, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../AppContext.tsx';
import { motion } from 'motion/react';

export default function AuthPage() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(email, 'Admin');
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <div className="max-w-5xl w-full grid lg:grid-cols-2 bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100">
        {/* Left Side: Illustration/Text */}
        <div className="bg-primary p-12 lg:p-20 flex flex-col justify-between relative overflow-hidden hidden lg:flex">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full -translate-x-1/3 translate-y-1/3" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-12">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <QrCode className="text-primary w-6 h-6" />
              </div>
              <span className="font-bold text-2xl text-white tracking-tight">FROZEN<span className="text-brand-light">QR</span></span>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white leading-tight underline decoration-emerald-400 decoration-4 underline-offset-8">
                Pantau Supply Chain Dalam Genggaman.
              </h2>
              <p className="text-emerald-100 text-lg opacity-80 max-w-md">
                Kelola ribuan SKU produk frozen Anda dengan sistem tracking QR modern yang aman dan terintegrasi.
              </p>
            </div>
          </div>

          <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="text-emerald-400 w-6 h-6" />
              <span className="text-white font-bold">Terverifikasi & Aman</span>
            </div>
            <p className="text-sm text-emerald-50 text-opacity-80">
              Sistem kami telah dipercaya oleh ratusan perusahaan ekspor-impor perikanan di seluruh Asia Tenggara.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-12 lg:p-20 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto space-y-10">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Selamat Datang</h1>
              <p className="text-slate-500 font-medium">Masuk untuk mengelola Dashboard Anda.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Email Kantor</label>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@perusahaan.com"
                    className="input-field pl-12 h-14" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-sm font-semibold text-slate-700">Password</label>
                  <a href="#" className="text-xs font-bold text-primary hover:underline">Lupa Password?</a>
                </div>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-field pl-12 h-14" 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="btn-primary w-full h-14 text-lg"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Masuk Sekarang
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-slate-400 font-bold tracking-widest leading-none">Atau</span>
              </div>
            </div>

            <p className="text-center text-sm font-medium text-slate-500">
              Belum punya akun? <a href="#" className="text-primary font-bold hover:underline">Daftar sekarang</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
