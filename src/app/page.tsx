"use client";

import Navbar from '@/components/NavbarHome';
import { DasborMonitoring } from '@/components/ui/dasbormonitoring';
import { EvaluasiMortalitas } from '@/components/ui/evaluasimortalitas';
import { Notifikasi } from '@/components/ui/notifikasi';
import { PenyesuaianParameter } from '@/components/ui/penyesuaianparameter';
import Link from 'next/link';
import Clock from '../components/ui/Clock';
import SwipeButton from '../components/ui/SwipeButton';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center px-4 md:px-10 xl:px-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <div className="flex flex-col w-full h-full justify-center items-center bg-hero py-32 sm:py-64 px-4">
        <Clock locale="en-CA" />
        <h1 className="heading-hero text-white dark:text-gray-200 text-center text-5xl xl:text-7xl pt-5">
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
      <div className='p-20'>
        <div className='grid grid-cols-3'>
          <svg className='-mx-2' xmlns="http://www.w3.org/2000/svg" width="74" height="74" viewBox="0 0 74 74" fill="none">
            <circle cx="36.5742" cy="36.5742" r="36.5742" fill="#69A5EB" fillOpacity="0.4" />
          </svg>
          <svg className='-mx-2' xmlns="http://www.w3.org/2000/svg" width="74" height="74" viewBox="0 0 74 74" fill="none">
            <circle cx="37" cy="36.5742" r="36.5742" fill="#38BE9A" fillOpacity="0.4" />
          </svg>
          <svg className='-mx-2' xmlns="http://www.w3.org/2000/svg" width="74" height="74" viewBox="0 0 74 74" fill="none">
            <circle cx="37.4258" cy="36.5742" r="36.5742" fill="#8735EB" fillOpacity="0.7" />
          </svg>
        </div>
      </div>

      <div className='px-10 sm:px-20 lg:px-30 pb-20'>
        <div className='mb-10 text-center text-5xl xl:text-7xl title-head text-transparent cliptext bg-[linear-gradient(107deg,#802696_8.32%,#6348CF_60.18%,#5DAEDB_105.75%)]'>
          Monitor Kandang <br />
          Ayam Anda
        </div>
        <div className='text-justify body-light text-2xl'>
          Sigma adalah solusi digital yang dirancang khusus untuk memantau kondisi lingkungan di dalam kandang ayam. Dengan menggunakan sensor yang terintegrasi, Sigma memungkinkan pemantauan real-time terhadap beberapa parameter penting seperti kadar amonia, kadar oksigen, dan tingkat kelembaban.
        </div>
      </div>

      <div>
        <div className='grid grid-cols-1 lg:grid-cols-2 px-10 gap-x-20  gap-y-10 sm:px-20 lg:px-30 pb-20 justify-items-center'>
          <div className='w-96 h-96'>
            <DasborMonitoring></DasborMonitoring>
          </div>
          <div className='flex flex-col justify-center items-center text-center lg:text-start'>
            <div>
              <div className='text-3xl'>
                Dasbor Monitoring
              </div>
              <div className='text-3xl text-slate-400'>
                Fitur
              </div>
              <div className='text-2xl body-light mt-5 w-96'>
                Pantau parameter lingkungan secara visual melalui grafik yang mudah dipahami.
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 px-10 gap-x-20  gap-y-10 sm:px-20 lg:px-30 pb-20 justify-items-center'>
          <div className='flex flex-col justify-center items-center text-center lg:text-start order-2 lg:order-1'>
            <div>
              <div className='text-3xl'>
                Evaluasi Mortalitas
              </div>
              <div className='text-3xl text-slate-400'>
                Fitur
              </div>
              <div className='text-2xl body-light mt-5 w-96'>
                Fitur yang menghitung jumlah ayam yang mati untuk membantu mengevaluasi indeks performa kandang.
              </div>
            </div>
          </div>
          <div className='w-96 h-96 order-1 lg:order-2'>
            <EvaluasiMortalitas />
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 px-10 gap-x-20  gap-y-10 sm:px-20 lg:px-30 pb-20 justify-items-center'>
          <div className='w-96 h-96'>
            <PenyesuaianParameter />
          </div>
          <div className='flex flex-col justify-center items-center text-center lg:text-start'>
            <div>
              <div className='text-3xl'>
                Penyesuaian Parameter
              </div>
              <div className='text-3xl text-slate-400'>
                Fitur
              </div>
              <div className='text-2xl body-light mt-5 w-96'>
                Parameter lingkungan akan disesuaikan secara otomatis berdasarkan usia ayam, memberikan kondisi optimal sesuai kebutuhan.
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 px-10 gap-x-20  gap-y-10 sm:px-20 lg:px-30 pb-20 justify-items-center'>
          <div className='flex flex-col justify-center items-center text-center lg:text-start order-2 lg:order-1'>
            <div>
              <div className='text-3xl'>
                Notifikasi Cepat
              </div>
              <div className='text-3xl text-slate-400'>
                Fitur
              </div>
              <div className='text-2xl body-light mt-5 w-96'>
                Dapatkan pemberitahuan segera jika salah satu parameter melewati batas aman, memastikan tindakan cepat dan tepat.
              </div>
            </div>
          </div>
          <div className='w-96 h-96 order-1 lg:order-2'>
            <Notifikasi />
          </div>
        </div>
      </div>

    </main>
  );
}
