"use client";
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from '@/components/ui/mode-toggle';
import { SensorBattery2 } from '@/components/ui/SensorBattery2';
import { SensorStatus } from '@/components/ui/SensorStatus';
import dynamic from 'next/dynamic';
import { FaTemperatureLow } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { TbAtom2Filled } from "react-icons/tb";
import Navbar from "../navbar";

const AreaChart = dynamic(() => import('@/components/ui/AreaChart'), { ssr: false });

export default function PerangkatSensor() {
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
                        <div className='flex body-bold text-2xl w-32 lg:w-56'>
                            Perangkat Sensor
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

                <div className="page flex items-center justify-between p-4">
                    <div className="flex flex-col justify-between items-center w-full">
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 w-full'>
                            <div className="relative flex flex-grow !flex-row flex-col items-center justify-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:bg-black dark:text-white dark:shadow-none p-7">
                                <div className="flex h-[90px] w-auto flex-row items-center">
                                    <div className="rounded-full bg-lightPrimary  dark:bg-navy-700">
                                        <span className="flex items-center text-brand-500 dark:text-white">
                                            <FaTemperatureLow size={30} />
                                        </span>
                                    </div>
                                </div>
                                <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                                    <p className="font-dm text-xl font-medium text-gray-600 dark:text-white">Suhu & Kelembapan DHT 22</p>
                                    <h4 className="text-3xl body-bold">4 buah</h4>
                                </div>
                            </div>
                            <div className="relative flex flex-grow !flex-row flex-col items-center justify-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:bg-black dark:text-white dark:shadow-none p-7">
                                <div className="flex h-[90px] w-auto flex-row items-center">
                                    <div className="rounded-full bg-lightPrimary  dark:bg-navy-700">
                                        <span className="flex items-center text-brand-500 dark:text-white">
                                            <TbAtom2Filled size={30} />
                                        </span>
                                    </div>
                                </div>
                                <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                                    <p className="font-dm text-xl font-medium text-gray-600 dark:text-white">Amonia DFRobot MEMS NH3</p>
                                    <h4 className="text-3xl body-bold">2 buah</h4>
                                </div>
                            </div>
                        </div>

                        <div className='mt-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-10'>
                            <div className='w-full h-full'>
                                <p className='navbar-title body-bold text-sm sm:text-xs mb-2'>
                                    PERANGKAT
                                </p>
                                <SensorStatus></SensorStatus>
                            </div>
                            <div className='w-full h-full'>
                                <p className='navbar-title body-bold text-sm sm:text-xs mb-2'>
                                    DAYA PERANGKAT
                                </p>
                                <div className='border rounded-lg p-6'>
                                    <SensorBattery2></SensorBattery2>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>



        </main>
    );
}
