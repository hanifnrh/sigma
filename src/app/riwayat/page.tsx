"use client";
import { useDataContext } from "@/components/DataContext";
import { useNotifications } from "@/components/NotificationContext";
import { Aktivitas } from '@/components/ui/Aktivitas';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import GrafikCard from "@/components/ui/GrafikCard";
import { ModeToggle } from '@/components/ui/mode-toggle';
import { RiwayatTable } from '@/components/ui/RiwayatTable';
import dynamic from 'next/dynamic';
import { GrMapLocation } from "react-icons/gr";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import Navbar from "../navbar";

const AreaChart = dynamic(() => import('@/components/ui/AreaChart'), { ssr: false });

export default function Riwayat() {
    const { overallColor, overallStatus, averageScore } = useDataContext();
    const { notifications } = useNotifications();
    const grafikData = [
        {
            title: "Skor Keseluruhan",
            value: averageScore ?? 0, // Contoh rata-rata
            statusColor: overallColor || "text-gray-500",
            statusText: overallStatus || "N/A",
            chartId: "overall",
            apiUrl: "http://127.0.0.1:8000/api/parameters/",
            dataType: "score",
        }
    ];
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
                        <div className="flex justify-center items-center text-4xl relative">
                            <div className="relative mr-4">
                                <DropdownMenu>
                                    <DropdownMenuTrigger className='p-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>
                                        <IoIosNotificationsOutline className="dark:text-white cursor-pointer text-xl sm:text-2xl" onClick={() => alert(notifications.map(notif => `${notif.data}: ${notif.status} - ${notif.timestamp.toLocaleTimeString()}`).join("\n"))} />
                                        {notifications.length > 0 && (
                                            <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>
                                        )}
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className='body-light w-72'>
                                        <DropdownMenuLabel>Notifikasi</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {notifications.map((notif, index) => (
                                            <DropdownMenuItem key={index} className='flex justify-center items-center border-b'>
                                                <div className='mx-2'>
                                                    {notif.icon}
                                                </div>
                                                <div className='flex flex-col items-start w-full'>
                                                    <div>
                                                        {notif.data}: <span className={`${notif.color} body-bold`}>{notif.status}</span> - {notif.timestamp.toLocaleTimeString()}
                                                    </div>
                                                    <div>
                                                        {notif.message}
                                                    </div>
                                                </div>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <ModeToggle />
                            <img src="/profile.png" alt="Profile Picture" className='border-l ml-3 pl-5' />
                            <RiArrowDropDownLine className="dark:text-white mx-1" />
                        </div>
                    </div>
                    <div className="flex header py-2 px-4 body-light justify-between items-center border-b bg-white">
                        <div className='flex body-bold text-2xl'>
                            Riwayat
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
                        <RiwayatTable></RiwayatTable>

                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 w-full mt-10'>
                            <div className='w-full h-full'>
                                <p className='navbar-title body-bold text-sm sm:text-xs mb-2'>
                                    GRAFIK KESELURUHAN
                                </p>
                                {grafikData.map((grafik) => (
                                    <div key={grafik.chartId}>
                                        <GrafikCard {...grafik} />
                                    </div>
                                ))}
                            </div>
                            <div className='w-full'>
                                <p className='navbar-title body-bold text-sm sm:text-xs mb-2'>
                                    AKTIVITAS
                                </p>
                                <Aktivitas />
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </main>
    );
}
