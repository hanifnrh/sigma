"use client";
import { useDataContext } from "@/components/DataContext";
import { Button } from '@/components/ui/button';
import Dynamic from '@/components/ui/Dynamic';
import withIconStyles from "@/components/ui/withIconStyles";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
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
    const { overallStatus, overallColor } = useDataContext();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token); // Set true if token exists
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };
    const getStatusColor = (statusText: string) => ({
        "Sangat Baik": "bg-customGreen",
        "Baik": "bg-blue-500",
        "Buruk": "bg-yellow-400",
        "Bahaya": "bg-customRed",
    }[statusText] || "");

    const toggleNavbar = () => setIsOpen(!isOpen);

    const StyledDashboardIcon = withIconStyles(RxDashboard);
    const StyledGraphIcon = withIconStyles(MdAutoGraph);
    const StyledRoosterIcon = withIconStyles(GiRooster);
    const StyledSensorsIcon = withIconStyles(MdOutlineSensors);
    const StyledHistoryIcon = withIconStyles(GoHistory);
    const StyledFeedbackIcon = withIconStyles(IoRocketOutline);
    const StyledInfoIcon = withIconStyles(IoIosInformationCircleOutline);
    const StyledBookIcon = withIconStyles(LuBook);
    const StyledMenuIcon = withIconStyles(HiMenuAlt2);
    const StyledCloseIcon = withIconStyles(HiX);

    const MenuItem = ({ href, Icon, label }: { href: string; Icon: React.ComponentType; label: string }) => (
        <li>
            <Link href={href} className={`flex items-center p-2 rounded-lg ${currentPath === href ? 'navbar text-white' : 'text-gray-900 dark:text-white'} hover:bg-purple-400 hover:text-white group`}>
                <Icon />
                <span>{label}</span>
            </Link>
        </li>
    );

    return (
        <div className="bg-white dark:bg-zinc-900 w-full mx-auto">
            <div className="fixed top-0 z-50 w-full bg-white dark:bg-gray-800 transition-colors">
                <button onClick={toggleNavbar} className="flex justify-start items-center p-2 text-gray-900 sm:hidden dark:text-white z-50 bg-white w-full border-b relative" aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}>
                    {isOpen ? <><StyledCloseIcon /> Tutup Menu</> : <><StyledMenuIcon /> Buka Menu</>}
                </button>

                <aside id="separator-sidebar" className={`fixed top-0 left-0 z-40 w-64 sm:w-44 md:w-56 xl:w-64 h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`} aria-label="Sidebar">
                    <div className="flex flex-col justify-between items-stretch h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800 border-r dark:border-gray-700">
                        <Link href="/" className="flex items-center ps-2.5">
                            <Image src="/sigmalogo.png" alt="Logo" width={256} height={256} className="h-16 md:h-12 xl:h-16 w-auto mt-8 sm:mt-0" />
                        </Link>

                        <ul className="space-y-2 font-medium mt-5 sm:mt-0">
                            <p className='body-bold navbar-title text-xs mb-2'>MAIN MENU</p>
                            <MenuItem href="/dashboard" Icon={StyledDashboardIcon} label="Dasbor" />
                            <MenuItem href="/grafik" Icon={StyledGraphIcon} label="Grafik" />
                            <MenuItem href="/data-ayam" Icon={StyledRoosterIcon} label="Data Ayam" />
                            <MenuItem href="/perangkat-sensor" Icon={StyledSensorsIcon} label="Perangkat Sensor" />
                            <MenuItem href="/riwayat" Icon={StyledHistoryIcon} label="Riwayat" />
                        </ul>

                        <ul className="pt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                            <p className='body-bold navbar-title text-xs mb-2'>BANTUAN</p>
                            <MenuItem href="/umpan-balik" Icon={StyledFeedbackIcon} label="Umpan balik" />
                            <MenuItem href="/informasi" Icon={StyledInfoIcon} label="Informasi" />
                            <MenuItem href="/standar-operasional" Icon={StyledBookIcon} label="Standar operasional" />
                        </ul>

                        <div className="status-container w-full relative mt-5 sm:mt-0">
                            <div className={`${overallColor} rounded-xl h-16 w-full flex items-center`}>
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
                                    <p className='text-white text-start body-bold text-xl'>Status: {overallStatus}</p>
                                    <Dynamic />
                                </div>
                            </div>
                            <Button variant="outline" className='w-full mt-5 body-bold'onClick={handleLogout}>Log Out</Button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Navbar;
