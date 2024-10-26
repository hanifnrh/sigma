// page.tsx

"use client";
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import GrafikAmonia from '@/components/ui/GrafikAmonia';
import GrafikKelembapan from '@/components/ui/GrafikKelembapan';
import GrafikKeseluruhan from '@/components/ui/GrafikKeseluruhan';
import GrafikSuhu from '@/components/ui/GrafikSuhu';
import { ModeToggle } from '@/components/ui/mode-toggle';
import dynamic from 'next/dynamic';
import { GrMapLocation } from "react-icons/gr";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";

import Navbar from "../navbar";

const AreaChart = dynamic(() => import('@/components/ui/AreaChart'), { ssr: false });

export default function Grafik() {
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
                        Grafik
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
                <div className="flex flex-col justify-between items-center w-full h-full">
                    <div className="flex flex-col lg:flex-row justify-between items-center w-full h-full">
                        <div className='mr-2 w-full h-full'>
                            <GrafikKeseluruhan />
                        </div>
                        <div className='ml-2 w-full h-full'>
                            <GrafikAmonia />
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row justify-between items-center w-full h-full mt-4">
                        <div className='mr-2 w-full h-full'>
                            <GrafikSuhu />
                        </div>
                        <div className='ml-2 w-full h-full'>
                            <GrafikKelembapan />
                        </div>
                    </div>
                </div>
            </div>

        </main>
    );
}
