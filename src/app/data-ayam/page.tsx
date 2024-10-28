// page.tsx

"use client";
import AyamCounter from '@/components/ui/AyamCounter';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import GrafikMortalitas from '@/components/ui/GrafikMortalitas';
import JumlahAyam from '@/components/ui/JumlahAyam';
import { ModeToggle } from '@/components/ui/mode-toggle';
import MortalitasAyam from '@/components/ui/MortalitasAyam';
import UsiaAyam from '@/components/ui/UsiaAyam';
import dynamic from 'next/dynamic';
import { FaPlay, FaStop } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import Navbar from "../navbar";

const AreaChart = dynamic(() => import('@/components/ui/AreaChart'), { ssr: false });

export default function DataAyam() {
    return (
        <main className="w-full bg-white dark:bg-zinc-900 relative">
            <Navbar />
            <div className='flex flex-col mt-10 sm:mt-0 sm:pl-44 md:pl-56 xl:pl-64 w-full'>
                <div className="sticky top-10 sm:top-0 z-10">
                    <div className="flex header w-full py-2 px-4 body-light justify-between items-center border-b bg-white">
                        <div className='flex items-center navbar-title body-bold text-sm sm:text-xs body-light'>
                            <GrMapLocation className='text-xl' />
                            <span className='ml-2 dark:text-white text-xs sm:text-sm'>
                                Lokasi: Jl. Coba No. 30, Musuk, Boyolali, Jawa Tengah
                            </span>
                        </div>
                        <div className="flex justify-center items-center text-4xl">
                            <div className='flex justify-center items-center pr-3'>
                                <IoIosNotificationsOutline className="dark:text-white mr-4 cursor-pointer text-xl sm:text-2xl" />
                                <ModeToggle />
                            </div>
                            <img src="/profile.png" alt="Profile Picture" className='border-l ml-3 pl-5' />
                            <RiArrowDropDownLine className="dark:text-white mx-1" />
                        </div>
                    </div>
                    <div className="flex header py-2 px-4 body-light justify-between items-center border-b bg-white">
                        <div className='flex body-bold text-2xl'>
                            Grafik
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-4xl">
                            <DropdownMenu>
                                <DropdownMenuTrigger className='border p-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>
                                    30 menit
                                    <RiArrowDropDownLine className="dark:text-white text-center text-2xl" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='body-light'>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>30 Menit</DropdownMenuItem>
                                    <DropdownMenuItem>1 Jam</DropdownMenuItem>
                                    <DropdownMenuItem>1 Hari</DropdownMenuItem>
                                    <DropdownMenuItem>1 Minggu</DropdownMenuItem>
                                    <DropdownMenuItem>1 Bulan</DropdownMenuItem>
                                    <DropdownMenuItem>1 Kelompok</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Button variant={"green"}>
                                <MdOutlineFileDownload className='text-4xl pr-2' />
                                Unduh data
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="page flex items-center justify-between p-4 w-full">
                    <div className="flex flex-col justify-between items-center w-full">
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-10 w-full'>
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-y-4'>
                                <div className='flex flex-col justify-center sm:justify-start sm:items-start items-center'>
                                    <Button variant={"mulaiTernak"}>
                                        <div className='h-full px-4 py-4 flex justify-center items-center text-xl'>
                                            <FaPlay className='' />
                                            Mulai Ternak
                                        </div>
                                    </Button>
                                    <p className='mt-2 text-customGreen'>
                                        Ternak sedang berlangsung
                                    </p>
                                </div>
                                <div className='flex flex-col justify-center sm:justify-start sm:items-end lg:items-start items-center'>
                                    <Button variant={"panen"}>
                                        <div className='h-full px-4 py-4 flex justify-center items-center text-xl'>
                                            <FaStop className='' />
                                            Panen
                                        </div>
                                    </Button>
                                    <p className='mt-2 text-customRed'>
                                        Panen dalam 22 hari lagi
                                    </p>
                                </div>
                            </div>
                            <div className='flex w-full justify-center lg:justify-end'>
                                <Button variant={"jumlahAyam"} className='w-full lg:w-72'>
                                    <div className='text-xl'>
                                        Jumlah ayam awal: 12.500
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className='w-full grid grid-cols-1 lg:grid-cols-3 gap-4 mt-10'>
                            <div>
                                <div className='navbar-title body-bold text-sm sm:text-xs mb-2'>
                                    USIA AYAM
                                </div>
                                <UsiaAyam />
                            </div>
                            <div>
                                <div className='navbar-title body-bold text-sm sm:text-xs mb-2'>
                                    JUMLAH AYAM
                                </div>
                                <JumlahAyam />
                            </div>
                            <div>
                                <div className='navbar-title body-bold text-sm sm:text-xs mb-2'>
                                    MORTALITAS AYAM
                                </div>
                                <MortalitasAyam />
                            </div>
                        </div>

                        <div className='mt-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-4'>
                            <div className='w-full h-full'>
                                <p className='navbar-title body-bold text-sm sm:text-xs mb-2'>
                                    GRAFIK MORTALITAS
                                </p>
                                <GrafikMortalitas></GrafikMortalitas>
                            </div>
                            <div className='w-full h-full'>
                                <p className='navbar-title body-bold text-sm sm:text-xs mb-2'>
                                    KENDALI JUMLAH AYAM
                                </p>
                                <div className='border rounded-lg'>
                                    <AyamCounter></AyamCounter>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}
