"use client";
import Image from 'next/image';
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
        <div className={`top-0 w-full z-50 bg-white`}>
            <nav className="">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image
                            src="/sigmalogo.png"
                            alt="Logo"
                            width={256}
                            height={256}
                            className="h-16 w-auto"
                        />
                    </Link>
                    <button onClick={toggleNavbar} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-default" aria-expanded={isOpen}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className={`w-full md:block md:w-auto ${isOpen ? 'block' : 'hidden'}`} id="navbar-default">
                        <ul className="items-center flex  flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                            <li>
                                <Link href="/dashboard" className={currentPath === "/dashboard" ? "block py-2 px-3 font-bold text-dark-500 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 " : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 "}>Dasbor</Link>
                            </li>
                            <li>
                                <Link href="/about" className={currentPath === "/about" ? "block py-2 px-3 font-bold text-dark-500 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 " : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 "}>Tentang</Link>
                            </li>
                            <li>
                                <Link href="/credits" className={currentPath === "/credits" ? "block py-2 px-3 font-bold text-dark-500 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 " : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 "}>Bantuan</Link>
                            </li>
                            <li>
                                <Link href="/credits" className={`${currentPath === "/credits" ? "block py-2 px-3 font-bold text-white bg-#8735EB;" : "block py-3 px-6 font-light text-white bg-customPurple hover:bg-purple-500 rounded-lg"}`}>
                                    Masuk
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
