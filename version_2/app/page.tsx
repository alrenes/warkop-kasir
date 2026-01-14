'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image, { StaticImageData } from 'next/image';
import menuData from '@/data/menuData';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  img: StaticImageData;
  promo?: boolean;
  quantity?: number;
}

interface MenuGroup {
  category: 'Makanan' | 'Minuman' | 'Snack';
  items: MenuItem[];
}

export default function Home() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [showNotif, setShowNotif] = useState(false);
  const router = useRouter();

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === item.id);

      const newCart = exist ? prev.map((i) => (i.id === item.id ? { ...i, quantity: (i.quantity ?? 0) + 1 } : i)) : [...prev, { ...item, quantity: 1 }];

      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });

    setShowNotif(true);
    setTimeout(() => setShowNotif(false), 1500);
  };

  const totalItems = cart.reduce((total, item) => total + (item.quantity ?? 0), 0);

  const proceedToOrder = () => {
    localStorage.setItem('currentOrder', JSON.stringify(cart));
    router.push('/order');
  };

  const categoryColor: Record<MenuGroup['category'], string> = {
    Makanan: 'bg-orange-100',
    Minuman: 'bg-amber-100',
    Snack: 'bg-green-100',
  };

  return (
    <div className="min-h-screen bg-gray-100 px-5 py-8">
      {/* View Order Button */}
      {cart.length > 0 && (
        <button onClick={proceedToOrder} className="fixed right-5 top-5 z-50 rounded-xl bg-green-500 px-5 py-3 font-bold text-white shadow-lg transition hover:bg-green-600">
          Lihat Pesanan ({totalItems})
        </button>
      )}

      {/* Notification */}
      {showNotif && <div className="fixed right-5 top-20 z-50 rounded-xl bg-orange-500 px-4 py-2 font-bold text-white shadow-lg animate-bounce">Berhasil ditambahkan!</div>}

      <h1 className="mb-2 text-center text-5xl font-bold text-black">Warkop Bang Fen</h1>
      <p className="mb-10 text-center text-gray-600">Daftar menu dan harga</p>

      {(menuData as MenuGroup[]).map((group) => {
        const isOpen = openCategory === group.category;
        const itemsToShow = isOpen ? group.items : group.items.slice(0, 2);

        return (
          <section key={group.category} className="mx-auto mb-12 max-w-6xl">
            {/* Category Header */}
            <div onClick={() => toggleCategory(group.category)} className={`flex cursor-pointer items-center gap-3 rounded-xl p-4 transition hover:-translate-y-1 hover:shadow-lg ${categoryColor[group.category]}`}>
              <span className="h-8 w-1.5 rounded bg-orange-500" />
              <h2 className="text-3xl font-semibold text-black">{group.category}</h2>
            </div>

            {/* Menu Grid */}
            <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
              {itemsToShow.map((item) => (
                <div key={item.id} className="relative overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1 hover:shadow-xl">
                  {item.promo && <span className="absolute left-3 top-3 z-10 rounded-lg bg-orange-500 px-3 py-1 text-xs font-bold text-white">Promo</span>}

                  <div className="relative h-40 w-full">
                    <Image src={item.img} alt={item.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 220px" />
                  </div>

                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-black">{item.name}</h3>
                    <p className="mt-1 text-lg font-bold text-gray-600">Rp {item.price.toLocaleString('id-ID')}</p>

                    {isOpen && (
                      <button onClick={() => addToCart(item)} className="mt-4 w-full rounded-xl bg-orange-500 py-3 font-bold text-white transition hover:bg-orange-600">
                        Tambah
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
