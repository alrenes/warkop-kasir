'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ReceiptItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface PaymentData {
  order: ReceiptItem[];
  paymentMethod: 'Tunai' | 'E-Wallet';
  orderType: 'Ditempat' | 'Bungkus';
  totalPrice: number;
}

export default function ReceiptPage() {
  const router = useRouter();

  const [payment] = useState<PaymentData | null>(() => {
    if (typeof window === 'undefined') return null;

    const saved = localStorage.getItem('lastPayment');
    return saved ? JSON.parse(saved) : null;
  });

  if (!payment) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-lg font-medium text-black">Memuat struk...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-2xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-black">Pembayaran Selesai</h1>

        {/* Receipt List */}
        <h2 className="mb-4 text-2xl font-semibold text-black">Struk Belanja</h2>

        <ul className="space-y-3">
          {payment.order.map((item) => (
            <li key={item.id} className="flex justify-between rounded-xl bg-orange-100 px-4 py-3 text-gray-700">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span className="font-semibold">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
            </li>
          ))}
        </ul>

        {/* Info */}
        <div className="mt-8 space-y-2 text-lg text-gray-700">
          <p>
            <span className="font-semibold">Metode Pembayaran:</span> {payment.paymentMethod}
          </p>
          <p>
            <span className="font-semibold">Jenis Pesanan:</span> {payment.orderType}
          </p>
        </div>

        {/* Total */}
        <h3 className="mt-6 text-right text-2xl font-bold text-black">Total: Rp {payment.totalPrice.toLocaleString('id-ID')}</h3>

        <button onClick={() => router.push('/')} className="mt-8 w-full rounded-xl bg-green-500 py-4 text-xl font-bold text-white transition hover:bg-green-600">
          Kembali ke Menu
        </button>
      </div>
    </div>
  );
}
