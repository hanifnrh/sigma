"use client";
import { Button } from '@/components/ui/button';
import Dynamic from '@/components/ui/Dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { GiRooster } from "react-icons/gi";
import { GoHistory } from "react-icons/go";
import { HiMenuAlt2, HiX } from "react-icons/hi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoRocketOutline } from "react-icons/io5";
import { LuBook } from "react-icons/lu";
import { MdAutoGraph, MdOutlineSensors } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const currentPath = usePathname();

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="bg-white dark:bg-zinc-900 w-full mx-auto">
            <div className="fixed top-0 z-50 w-full bg-white dark:bg-gray-800 transition-colors">
                <button
                    onClick={toggleNavbar}
                    className="p-2 text-gray-900 rounded-lg sm:hidden dark:text-white z-50 bg-white w-full border-b relative"
                    aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
                >
                    {/* Mengganti ikon berdasarkan status */}
                    {isOpen ? (
                        <>
                            Tutup Menu <HiX className="inline-block ml-1" />
                        </>
                    ) : (
                        <>
                            Buka Menu <HiMenuAlt2 className="inline-block ml-1" />
                        </>
                    )}
                </button>


                <aside
                    id="separator-sidebar"
                    className={`fixed top-0 left-0 z-40 w-64 sm:w-44 md:w-56 xl:w-64 h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
                    aria-label="Sidebar"
                >
                    <div className="flex flex-col justify-between items-stretch h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800 border-r dark:border-gray-700">
                        <Link href="/" className="flex items-center ps-2.5">
                            <Image src="/sigmalogo.png" alt="Logo" width={256} height={256} className="h-16 md:h-12 xl:h-16 w-auto mt-8 sm:mt-0" />
                        </Link>
                        {/* Menu Items */}
                        <ul className="space-y-2 font-medium">
                            <p className='body-bold navbar-title text-sm sm:text-xs mb-2'>
                                MAIN MENU
                            </p>
                            <li>
                                <Link
                                    href="/dashboard"
                                    className={`flex items-center p-2 rounded-lg ${currentPath === '/dashboard' ? 'navbar text-white' : 'text-gray-900 dark:text-white'} hover:bg-purple-400 hover:text-white group`}
                                >
                                    <RxDashboard />
                                    <span className="ms-3">Dasbor</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/grafik"
                                    className={`flex items-center p-2 rounded-lg ${currentPath === '/grafik' ? 'navbar text-white' : 'text-gray-900 dark:text-white'} hover:bg-purple-400 hover:text-white group`}
                                >
                                    <MdAutoGraph />
                                    <span className="flex-1 ms-3 whitespace-nowrap">Grafik</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/data-ayam"
                                    className={`flex items-center p-2 rounded-lg ${currentPath === '/data-ayam' ? 'navbar text-white' : 'text-gray-900 dark:text-white'} hover:bg-purple-400 hover:text-white group`}
                                >
                                    <GiRooster />
                                    <span className="flex-1 ms-3 whitespace-nowrap">Data Ayam</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/perangkat-sensor"
                                    className={`flex items-center p-2 rounded-lg ${currentPath === '/perangkat-sensor' ? 'navbar text-white' : 'text-gray-900 dark:text-white'} hover:bg-purple-400 hover:text-white group`}
                                >
                                    <MdOutlineSensors />
                                    <span className="flex-1 ms-3 whitespace-nowrap">Perangkat Sensor</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/riwayat"
                                    className={`flex items-center p-2 rounded-lg ${currentPath === '/riwayat' ? 'navbar text-white' : 'text-gray-900 dark:text-white'} hover:bg-purple-400 hover:text-white group`}
                                >
                                    <GoHistory />
                                    <span className="flex-1 ms-3 whitespace-nowrap">Riwayat</span>
                                </Link>
                            </li>
                        </ul>
                        <ul className="pt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                            <p className='body-bold navbar-title text-sm sm:text-xs mb-2'>
                                BANTUAN
                            </p>
                            <li>
                                <Link
                                    href="/umpan-balik"
                                    className={`flex items-center p-2 transition duration-75 rounded-lg ${currentPath === '/sensor' ? 'bg-gray-100 text-white' : 'text-gray-900 dark:text-white'} hover:bg-purple-400 hover:text-white group`}
                                >
                                    <IoRocketOutline />
                                    <span className="ms-3">Umpan balik</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/informasi"
                                    className={`flex items-center p-2 transition duration-75 rounded-lg ${currentPath === '/informasi' ? 'bg-gray-100 text-white' : 'text-gray-900 dark:text-white'} hover:bg-purple-400 hover:text-white group`}
                                >
                                    <IoIosInformationCircleOutline />
                                    <span className="ms-3">Informasi</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/standar-operasional"
                                    className={`flex items-center p-2 transition duration-75 rounded-lg ${currentPath === '/standar-operasional' ? 'bg-gray-100 text-white' : 'text-gray-900 dark:text-white'} hover:bg-purple-400 hover:text-white group`}
                                >
                                    <LuBook />
                                    <span className="ms-3">Standar operasional</span>
                                </Link>
                            </li>
                        </ul>
                        <div className="status-container w-full relative">
                            <div className='bg-purple-400 rounded-xl h-16 w-full flex items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="93" viewBox="0 0 120 93" fill="none" className='absolute top-0 left-0'>
                                    <circle opacity="0.2" cx="60.7009" cy="60.7009" r="60.7009" transform="matrix(0.996195 0.0871557 0.0871557 -0.996195 -74.1056 81.7822)" fill="url(#paint0_linear_58_5)" />
                                    <circle opacity="0.2" cx="60.7009" cy="60.7009" r="60.7009" transform="matrix(0.996195 0.0871557 0.0871557 -0.996195 -11.7125 48.972)" fill="url(#paint1_linear_58_5)" />
                                    <defs>
                                        <linearGradient id="paint0_linear_58_5" x1="60.7009" y1="6.99719e-07" x2="84.1796" y2="121.402" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="white" />
                                            <stop offset="1" stopColor="white" />
                                        </linearGradient>
                                        <linearGradient id="paint1_linear_58_5" x1="60.7009" y1="6.99719e-07" x2="84.1796" y2="121.402" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="white" />
                                            <stop offset="1" stopColor="white" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className='flex w-full items-center justify-between px-8'>
                                    <p className='text-white text-center body-bold text-xl'>
                                        Status: Baik
                                    </p>
                                    <Dynamic></Dynamic>
                                </div>
                            </div>

                            <Button variant="outline" className='w-full mt-5 body-bold'>Log Out</Button>
                        </div>
                    </div>
                </aside>

            </div>
        </div>
    );
};

export default Navbar;
