'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

type PaymentMethod = 'Tunai' | 'E-Wallet';
type OrderType = 'Ditempat' | 'Bungkus';

export default function OrderPage() {
  const [order, setOrder] = useState<OrderItem[]>(() => {
    if (typeof window === 'undefined') return [];

    const savedOrder = localStorage.getItem('cart');
    return savedOrder ? JSON.parse(savedOrder) : [];
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Tunai');
  const [orderType, setOrderType] = useState<OrderType>('Ditempat');

  const router = useRouter();

  const updateQuantity = (id: number, value: number) => {
    setOrder((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, value) } : item)));
  };

  const removeItem = (id: number) => {
    setOrder((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrice = order.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePayment = () => {
    localStorage.setItem(
      'lastPayment',
      JSON.stringify({
        order,
        paymentMethod,
        orderType,
        totalPrice,
      })
    );

    localStorage.removeItem('cart');
    router.push('/receipt');
  };

  // Empty state
  if (order.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
          <h1 className="mb-6 text-3xl font-bold text-black">Pesanan Kosong</h1>
          <button onClick={() => router.push('/')} className="w-full rounded-xl bg-green-500 py-3 font-bold text-black transition hover:bg-green-600">
            Kembali ke Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-3xl bg-orange-50 p-8 shadow-2xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-black">Kasir – Pesanan Aktif</h1>

        {/* Order List */}
        <h2 className="mb-4 text-2xl font-semibold text-black">Daftar Pesanan</h2>

        <ul className="space-y-3">
          {order.map((item) => (
            <li key={item.id} className="flex items-center justify-between rounded-xl bg-orange-100 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="font-medium text-gray-700">{item.name}</span>
                <input type="number" min={1} value={item.quantity} onChange={(e) => updateQuantity(item.id, Number(e.target.value))} className="w-16 rounded-lg border border-gray-300 px-2 py-1 text-center text-black" />
              </div>

              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-700">Rp {item.price.toLocaleString('id-ID')}</span>
                <button onClick={() => removeItem(item.id)} className="rounded-lg bg-red-500 px-3 py-1 text-sm font-bold text-black transition hover:bg-red-600">
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Order Type */}
        <h2 className="mt-8 mb-3 text-2xl font-semibold text-black">Jenis Pesanan</h2>
        <div className="flex gap-6">
          {(['Ditempat', 'Bungkus'] as OrderType[]).map((type) => (
            <label key={type} className="flex cursor-pointer items-center gap-2">
              <input type="radio" checked={orderType === type} onChange={() => setOrderType(type)} />
              <span className="font-medium text-black">{type}</span>
            </label>
          ))}
        </div>

        {/* Payment */}
        <h2 className="mt-8 mb-3 text-2xl font-semibold text-black">Metode Pembayaran</h2>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)} className="w-full rounded-xl border border-gray-300 px-4 py-3 text-lg text-black">
          <option value="Tunai">Tunai</option>
          <option value="E-Wallet">E-Wallet</option>
        </select>

        {/* Total */}
        <h3 className="mt-8 text-right text-2xl font-bold text-black">Total: Rp {totalPrice.toLocaleString('id-ID')}</h3>

        <button onClick={handlePayment} className="mt-6 w-full rounded-xl bg-green-500 py-4 text-xl font-bold text-black transition hover:bg-green-600">
          Lakukan Pembayaran
        </button>
      </div>
    </div>
  );
}
