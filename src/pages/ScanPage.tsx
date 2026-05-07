/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode';
import { 
  QrCode, 
  X, 
  CheckCircle2, 
  Package, 
  MapPin, 
  Calendar,
  AlertCircle,
  Truck,
  ShoppingCart
} from 'lucide-react';
import { useApp } from '../AppContext.tsx';
import { Product } from '../types.ts';
import { motion, AnimatePresence } from 'motion/react';

export default function ScanPage() {
  const { products, addSale } = useApp();
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const scannerContainerId = 'qr-reader';

  useEffect(() => {
    if (scanning) {
      scannerRef.current = new Html5QrcodeScanner(
        scannerContainerId,
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      scannerRef.current.render(onScanSuccess, onScanFailure);
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(err => console.error("Failed to clear scanner", err));
      }
    };
  }, [scanning]);

  function onScanSuccess(decodedText: string) {
    const product = products.find(p => p.qrCode === decodedText);
    if (product) {
      setScannedProduct(product);
      setScanning(false);
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    } else {
      setError("Produk tidak ditemukan. Pastikan QR Code valid.");
      setTimeout(() => setError(null), 3000);
    }
  }

  function onScanFailure(error: string) {
    // console.warn(`Code scan error = ${error}`);
  }

  const handleSale = () => {
    if (scannedProduct) {
      addSale({
        productId: scannedProduct.id,
        productName: scannedProduct.name,
        amount: 100000, // Mock price
        location: 'Toko Pusat'
      });
      setScannedProduct(null);
      alert('Produk berhasil ditandai sebagai terjual!');
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-20">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
          <QrCode className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Scan QR Code</h2>
        <p className="text-slate-500">Arahkan kamera ke QR Code produk untuk melihat detail.</p>
      </div>

      {!scanning && !scannedProduct && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-10 flex flex-col items-center justify-center border-dashed border-2 border-slate-200"
        >
          <div className="w-48 h-48 bg-slate-50 rounded-3xl flex items-center justify-center mb-8">
            <QrCode className="w-24 h-24 text-slate-200" />
          </div>
          <button 
            onClick={() => setScanning(true)}
            className="btn-primary w-full max-w-xs"
          >
            Mulai Scanning
          </button>
        </motion.div>
      )}

      {scanning && (
        <div className="glass-card p-4 overflow-hidden relative">
          <button 
            onClick={() => setScanning(false)}
            className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-lg shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
          <div id={scannerContainerId} className="w-full"></div>
        </div>
      )}

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm font-medium">{error}</p>
        </motion.div>
      )}

      {scannedProduct && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 space-y-6"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shrink-0 font-bold text-xl">
                {scannedProduct.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{scannedProduct.name}</h3>
                <p className="text-slate-500">{scannedProduct.type}</p>
              </div>
            </div>
            <span className={`badge ${
              scannedProduct.status === 'In Stock' ? 'bg-emerald-100 text-emerald-700' :
              scannedProduct.status === 'In Distribution' ? 'bg-blue-100 text-blue-700' :
              'bg-slate-100 text-slate-700'
            }`}>
              {scannedProduct.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase">
                <Package className="w-3 h-3" />
                Berat
              </div>
              <p className="font-bold text-slate-900">{scannedProduct.weight}g</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase">
                <MapPin className="w-3 h-3" />
                Lokasi
              </div>
              <p className="font-bold text-slate-900">{scannedProduct.location || 'N/A'}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase">
                <Calendar className="w-3 h-3" />
                Produksi
              </div>
              <p className="font-bold text-slate-900">{scannedProduct.productionDate}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase">
                <AlertCircle className="w-3 h-3 text-accent" />
                Expired
              </div>
              <p className="font-bold text-accent">{scannedProduct.expiryDate}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex gap-3">
             <button 
              onClick={() => setScannedProduct(null)}
              className="btn-outline flex-1"
            >
              Scan Lagi
            </button>
            {scannedProduct.status !== 'Sold' && (
              <button 
                onClick={handleSale}
                className="btn-primary flex-1 bg-emerald-600 hover:bg-emerald-700"
              >
                <ShoppingCart className="w-4 h-4" />
                Mark as Sold
              </button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
