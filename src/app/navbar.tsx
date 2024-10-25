"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { GiRooster } from "react-icons/gi";
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
        <div className={`sticky top-0 w-full z-50 bg-white dark:bg-gray-800 transition-colors`}>
            <button
                onClick={toggleNavbar}
                className="p-2 text-gray-900 rounded-lg sm:hidden dark:text-white"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
                {isOpen ? 'Close' : 'Open'} Menu
            </button>

            <aside
                id="separator-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800 border-r dark:border-gray-700">
                    <Link href="/" className="flex items-center ps-2.5 mb-12">
                        <Image
                            src="/sigmalogo.png"
                            alt="Logo"
                            width={256} // Equivalent to Tailwind's `h-16` (16 * 4px = 64px)
                            height={256}
                            className="h-16 w-auto"
                        />
                    </Link>
                    <ul className="space-y-2 font-medium">
                        <p className='body-bold navbar-title mb-2'>
                            MAIN MENU
                        </p>
                        <li>
                            <Link
                                href="/dashboard"
                                className={`flex items-center p-2 rounded-lg ${currentPath === '/dashboard' ? 'navbar text-white' : 'text-gray-900 dark:text-white'} hover:bg-gray-100 dark:hover:bg-gray-700 group`}
                            >
                                <RxDashboard />
                                <span className="ms-3">Dasbor</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/grafik"
                                className={`flex items-center p-2 rounded-lg ${currentPath === '/grafik' ? 'navbar text-white' : 'text-gray-900 dark:text-white'} hover:bg-gray-100 dark:hover:bg-gray-700 group`}
                            >
                                <MdAutoGraph />
                                <span className="flex-1 ms-3 whitespace-nowrap">Grafik</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/data-ayams"
                                className={`flex items-center p-2 rounded-lg ${currentPath === '/data-ayams' ? 'navbar text-white' : 'text-gray-900 dark:text-white'} hover:bg-gray-100 dark:hover:bg-gray-700 group`}
                            >
                                <GiRooster />
                                <span className="flex-1 ms-3 whitespace-nowrap">Data Ayam</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/perangkat-sensor"
                                className={`flex items-center p-2 rounded-lg ${currentPath === '/perangkat-sensor' ? 'navbar text-white' : 'text-gray-900 dark:text-white'} hover:bg-gray-100 dark:hover:bg-gray-700 group`}
                            >
                                <MdOutlineSensors />
                                <span className="flex-1 ms-3 whitespace-nowrap">Perangkat Sensor</span>
                            </Link>
                        </li>
                    </ul>
                    <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                        <p className='body-bold navbar-title mb-2'>
                            BANTUAN
                        </p>
                        <li>
                            <Link
                                href="#"
                                className={`flex items-center p-2 transition duration-75 rounded-lg ${currentPath === '/sensor' ? 'bg-gray-100 text-white' : 'text-gray-900 dark:text-white'} hover:bg-gray-100 dark:hover:bg-gray-700 group`}
                            >
                                <IoRocketOutline />
                                <span className="ms-3">Umpan balik</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className={`flex items-center p-2 transition duration-75 rounded-lg ${currentPath === '/informasi' ? 'bg-gray-100 text-white' : 'text-gray-900 dark:text-white'} hover:bg-gray-100 dark:hover:bg-gray-700 group`}
                            >
                                <IoIosInformationCircleOutline />
                                <span className="ms-3">Informasi</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className={`flex items-center p-2 transition duration-75 rounded-lg ${currentPath === '/standar-operasional' ? 'bg-gray-100 text-white' : 'text-gray-900 dark:text-white'} hover:bg-gray-100 dark:hover:bg-gray-700 group`}
                            >
                                <LuBook />
                                <span className="ms-3">Standar operasional</span>
                            </Link>
                        </li>
                    </ul>

                    <div className="status-container bg-purple-400 rounded-xl mt-10 w-full h-16 p-5 relative">
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
                        <p className='text-white text-center body-bold text-xl'>
                            Status: Baik
                        </p>
                    </div>

                    <Button variant="outline" className='w-full mt-5'>Log Out</Button>
                </div>
            </aside>
        </div>
    );
};

export default Navbar;
