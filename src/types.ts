/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  type: string;
  weight: number;
  productionDate: string;
  expiryDate: string;
  status: 'In Stock' | 'In Distribution' | 'Sold';
  imageUrl?: string;
  location?: string;
  qrCode: string;
}

export interface Sale {
  id: string;
  productId: string;
  productName: string;
  amount: number;
  date: string;
  location: string;
  customerName?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Staff';
}
