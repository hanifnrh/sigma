"use client";

import Navbar from '@/components/NavbarHome';
import Link from 'next/link';
import Clock from '../components/ui/Clock';
import SwipeButton from '../components/ui/SwipeButton';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center px-4 md:px-10 xl:px-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <div className="flex flex-col w-full h-full justify-center items-center bg-hero py-32 sm:py-64">
          <Clock locale="en-CA" />
          <h1 className="heading-hero text-white dark:text-gray-200 text-center text-3xl md:text-5xl xl:text-7xl pt-5">
            Selamat datang di SIGMA
          </h1>
          <div className="body-light md:text-2xl xl:text-3xl text-center pt-5 text-white dark:text-gray-300">
            Sistem IoT Terintegrasi <br />
            Monitoring Kandang Ayam
          </div>
          <div className='pt-10'>
            <Link href="/dashboard">
              <SwipeButton className=''>Cek Kandang</SwipeButton>
            </Link>
          </div>
      </div>
    </main>
  );
}
