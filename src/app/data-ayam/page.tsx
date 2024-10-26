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
        <main className="p-4 pt-0 sm:ml-64 bg-white dark:bg-zinc-900">
            <Navbar />
            <div className="sticky top-0 z-10">
                <div className="flex header py-2 px-4 body-light justify-between items-center border-b bg-white">
                    <div className='flex navbar-title'>
                        <GrMapLocation />
                        <span className='ml-2 dark:text-white'>
                            Lokasi: Jl. Coba No. 30, Musuk, Boyolali, Jawa Tengah
                        </span>
                    </div>
                    <div className="flex justify-center items-center text-4xl">
                        <div className='flex justify-center items-center pr-3'>
                            <IoIosNotificationsOutline className="dark:text-white mx-1 cursor-pointer" />
                            <ModeToggle />
                        </div>
                        <img src="/profile.png" alt="Profile Picture" className='border-l ml-3 pl-5' />
                        <RiArrowDropDownLine className="dark:text-white mx-1" />
                    </div>
                </div>
                <div className="flex header py-2 px-4 body-light justify-between items-center border-b bg-white">
                    <div className='flex body-bold text-2xl'>
                        Data Ayam
                    </div>
                    <div className="flex justify-center items-center text-4xl">
                        <DropdownMenu>
                            <DropdownMenuTrigger className='border p-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 mr-2'>
                                30 menit
                                <RiArrowDropDownLine className="dark:text-white text-center ml-1 text-2xl" />
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

            <div className="page flex items-center justify-between p-4">
                <div className="flex flex-col justify-between items-center w-full">
                    <div className='flex justify-between items-start w-full'>
                        <div className='flex justify-start w-full'>
                            <div>
                                <Button variant={"mulaiTernak"}>
                                    <div className='h-full px-4 py-4 flex justify-center items-center text-xl'>
                                        <FaPlay className='mr-2' />
                                        Mulai Ternak
                                    </div>
                                </Button>
                                <p className='mt-2 text-customGreen'>
                                    Ternak sedang berlangsung
                                </p>
                            </div>
                            <div className='ml-4'>
                                <Button variant={"panen"}>
                                    <div className='h-full px-4 py-4 flex justify-center items-center text-xl'>
                                        <FaStop className='mr-2' />
                                        Panen
                                    </div>
                                </Button>
                                <p className='mt-2 text-customRed'>
                                    Panen dalam 22 hari lagi
                                </p>
                            </div>
                        </div>
                        <Button variant={"jumlahAyam"}>
                            <div className='text-xl'>
                                Jumlah ayam awal: 12.500
                            </div>
                        </Button>
                    </div>

                    <div className='w-full flex items-center justify-between mt-10'>
                        <div>
                            <div className='navbar-title mb-2'>
                                USIA AYAM
                            </div>
                            <UsiaAyam />
                        </div>
                        <div>
                            <div className='navbar-title mb-2'>
                                JUMLAH AYAM
                            </div>
                            <JumlahAyam />
                        </div>
                        <div>
                            <div className='navbar-title mb-2'>
                                MORTALITAS AYAM
                            </div>
                            <MortalitasAyam />
                        </div>
                    </div>

                    <div className='mt-10 w-full flex justify-between'>
                        <div className='w-full h-full mr-2'>
                            <p className='navbar-title mb-2'>
                                GRAFIK MORTALITAS
                            </p>
                            <GrafikMortalitas></GrafikMortalitas>
                        </div>
                        <div className='w-full h-full ml-2'>
                            <p className='navbar-title mb-2'>
                                KENDALI JUMLAH AYAM
                            </p>
                            <div className='border rounded-lg'>
                            <AyamCounter></AyamCounter>
                            </div>
                        </div>
                    </div>

                </div>
            </div>



        </main>
    );
}
