"use client";

import { ModeToggle } from '@/components/ui/mode-toggle';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const currentPath = usePathname();

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="fixed w-full z-50">
            <nav className="border-b bg-white dark:bg-black">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 bg-white dark:bg-black">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="/sigma.png" className="h-8 navbar-logo" alt="Sigma Logo" />
                        <span className="self-center text-2xl font-mono font-bold whitespace-nowrap dark:text-white">Sigma</span>
                    </a>
                    <button onClick={toggleNavbar} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400" aria-controls="navbar-default" aria-expanded={isOpen}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className={`bg-white dark:bg-black w-full md:block md:w-auto ${isOpen ? 'block' : 'hidden'}`} id="navbar-default">
                        <ul className="bg-white dark:bg-black items-center flex font-mono flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                            <li>
                                <Link href="/" className={currentPath === "/" ? "block py-2 px-3 text-cyan-600 md:bg-transparent md:p-0 dark:text-white" : "block py-2 px-3 text-gray-900 rounded md:bg-transparent md:p-0 dark:text-white"} aria-current="page">Dashboard</Link>
                            </li>
                            <li>
                                <Link href="/graph" className={currentPath === "/graph" ? "block py-2 px-3 text-cyan-600 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"}>Graph</Link>
                            </li>
                            <li>
                                <Link href="/about" className={currentPath === "/about" ? "block py-2 px-3 text-cyan-600 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"}>About</Link>
                            </li>
                            <li>
                                <Link href="/credits" className={currentPath === "/credits" ? "block py-2 px-3 text-cyan-600 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"}>Credits</Link>
                            </li>
                            <li>
                                <ModeToggle />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
