import indomie from '@/assets/indomie.avif';
import nasgor from '@/assets/nasgor.avif';
import pizza from '@/assets/pizza.avif';
import kopi from '@/assets/kopi.avif';
import susu from '@/assets/susu.avif';
import mandi from '@/assets/mandi.jpg';
import kentang from '@/assets/kentang.avif';
import pisang from '@/assets/pisang.jpeg';
import roti from '@/assets/roti.jpg';
import { StaticImageData } from 'next/image';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  img: StaticImageData;
  promo?: boolean;
}

interface MenuGroup {
  category: 'Makanan' | 'Minuman' | 'Snack';
  items: MenuItem[];
}

const menuData: MenuGroup[] = [
  {
    category: 'Makanan',
    items: [
      {
        id: 1,
        name: 'Indomie Goreng',
        price: 10000,
        img: indomie,
      },
      {
        id: 2,
        name: 'Nasi Goreng',
        price: 15000,
        img: nasgor,
      },
      {
        id: 3,
        name: 'Pizza Mini',
        price: 25000,
        img: pizza,
        promo: true,
      },
    ],
  },
  {
    category: 'Minuman',
    items: [
      {
        id: 4,
        name: 'Kopi Hitam',
        price: 5000,
        img: kopi,
      },
      {
        id: 5,
        name: 'Kopi Susu',
        price: 7000,
        img: susu,
      },
      {
        id: 6,
        name: 'Teh Manis',
        price: 4000,
        img: mandi,
      },
    ],
  },
  {
    category: 'Snack',
    items: [
      {
        id: 7,
        name: 'Kentang Goreng',
        price: 10000,
        img: kentang,
      },
      {
        id: 8,
        name: 'Pisang Goreng',
        price: 8000,
        img: pisang,
      },
      {
        id: 9,
        name: 'Roti Bakar',
        price: 12000,
        img: roti,
      },
    ],
  },
];

export default menuData;
