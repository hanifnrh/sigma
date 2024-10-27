// page.tsx

"use client";
import { Button } from '@/components/ui/button';
import GrafikKeseluruhan from '@/components/ui/GrafikKeseluruhan';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { SensorBattery } from '@/components/ui/SensorBattery';
import { SensorStatus } from '@/components/ui/SensorStatus';
import StatsWidget from '@/components/ui/stats';
import StatusDanger from '@/components/ui/status-danger';
import StatusGood from '@/components/ui/status-good';
import StatusSafe from '@/components/ui/status-safe';
import StatusWarning from '@/components/ui/status-warning';
import dynamic from 'next/dynamic';
import { GrMapLocation } from "react-icons/gr";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import Navbar from "../navbar";

const AreaChart = dynamic(() => import('@/components/ui/AreaChart'), { ssr: false });

export default function Dashboard() {
    return (
        <main className="bg-white dark:bg-zinc-900 w-full">
            <Navbar />
            <div className='flex flex-col mt-10 sm:mt-0 sm:pl-44 md:pl-56 xl:pl-64 w-full'>
                <div className="sticky top-10 sm:top-0 z-10">
                    <div className="flex header w-full py-2 px-4 body-light justify-between items-center border-b bg-white">
                        <div className='flex items-center navbar-title body-light'>
                            <GrMapLocation className='text-xl'/>
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
                            Dasbor
                        </div>
                        <div className="flex justify-center items-center text-4xl">
                            <Button variant={"green"}>
                                <MdOutlineFileDownload className='text-4xl pr-2' />
                                Unduh data
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="page flex flex-col lg:flex-row items-start justify-between w-full">
                    <div className="container-left flex flex-col justify-center items-center w-full border-r">
                        <div className='flex justify-between items-center py-5 px-4 w-full border-b'>
                            <div>
                                <span className='text-2xl md:text-4xl title-head bg-[linear-gradient(107deg,#16CC53_8.32%,#108496_60.18%,#35B6CA_105.75%)] bg-clip-text text-transparent'>
                                    Status Keseluruhan: Baik
                                </span>
                            </div>
                            <div className='border-l px-5'>
                                <div className='navbar-title body-bold text-sm sm:text-xs '>
                                    USIA
                                </div>
                                <div className='text-2xl md:text-4xl title-head'>
                                    24 Hari
                                </div>
                            </div>
                        </div>

                        <div className="status-container flex items-center justify-center py-4 border-b w-full">
                            <div className="status-wrapper grid grid-cols-2 xl:grid-cols-4 gap-4">

                                <div className="status flex items-center justify-center rounded-lg border ">
                                    <StatusSafe className='text-green-500' />
                                </div>
                                <div className="status flex items-center justify-center rounded-lg border ">
                                    <StatusGood className='text-blue-500' />
                                </div>


                                <div className="status flex items-center justify-center rounded-lg border ">
                                    <StatusWarning className='text-yellow-500' />
                                </div>
                                <div className="status flex items-center justify-center rounded-lg border ">
                                    <StatusDanger className='text-red-500' />
                                </div>

                            </div>
                        </div>
                        <StatsWidget />
                        <div className='grid grid-cols-1 xl:grid-cols-2 gap-x-4 gap-y-8 w-full p-4 justify-between'>
                            <div className='w-full'>
                                <p className='navbar-title body-bold text-sm sm:text-xs mb-2'>
                                    PERANGKAT
                                </p>
                                <SensorStatus></SensorStatus>
                            </div>
                            <div className='w-full'>
                                <p className='navbar-title body-bold text-sm sm:text-xs mb-2'>
                                    GRAFIK KESELURUHAN
                                </p>
                                <GrafikKeseluruhan></GrafikKeseluruhan>
                            </div>
                        </div>
                    </div>


                    <div className="container-right flex flex-col items-start justify-center px-5 py-5 h-full lg:mt-0 mt-10">
                        <div className='navbar-title body-bold text-sm sm:text-xs '>
                            DAYA PERANGKAT
                        </div>
                        <div>
                            <SensorBattery></SensorBattery>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    );
}
