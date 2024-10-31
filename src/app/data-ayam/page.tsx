
"use client";
import AyamCounter from '@/components/ui/AyamCounter';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GrafikMortalitas from '@/components/ui/GrafikMortalitas';
import { Input } from "@/components/ui/input";
import { ModeToggle } from '@/components/ui/mode-toggle';
import StatsWidget from '@/components/ui/stats';
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";
import { BsHeartPulse } from "react-icons/bs";
import { FaPlay, FaRegCalendarAlt, FaStop } from "react-icons/fa";
import { GiRooster } from "react-icons/gi";
import { GrMapLocation } from "react-icons/gr";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import Navbar from "../navbar";

const AreaChart = dynamic(() => import('@/components/ui/AreaChart'), { ssr: false });
type Notification = {
    parameter: string;
    status: string;
    timestamp: Date;
    message: string;
    icon: React.ReactNode;
    color: string;
};

export default function DataAyam() {
    const [overallStatus, setOverallStatus] = useState({ text: "Baik", color: "text-blue-500" });
    const handleOverallStatusChange = (status: { text: string; color: string }) => {
        setOverallStatus(status);
    };
    const [date, setDate] = useState<Date | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [ageInDays, setAgeInDays] = useState<number>(0);
    const [jumlahAyam, setJumlahAyam] = useState<number>(0);
    const [jumlahAyamInput, setJumlahAyamInput] = useState<number>(0);
    const [targetTanggal, setTargetTanggal] = useState<Date | null>(null);
    const [countdown, setCountdown] = useState<string>('');
    const [harvested, setHarvested] = useState(false);
    const [showConfirmHarvestDialog, setShowConfirmHarvestDialog] = useState(false);
    const [farmingStarted, setFarmingStarted] = useState(false);
    const [jumlahAwalAyam, setJumlahAwalAyam] = useState<number>(0); // Menyimpan jumlah ayam awal
    const [mortalitas, setMortalitas] = useState<number>(0);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [statsData, setStatsData] = useState<Array<{ Parameter: string; Value: string; Status: string; Timestamp: Date }>>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [harvestDialogOpen, setHarvestDialogOpen] = useState(false);

    const updateMortalitas = (ayamMati: number) => {
        if (jumlahAwalAyam > 0) {
            const mortalitasPersen = ((ayamMati / jumlahAwalAyam) * 100).toFixed(1); // Persentase mortalitas
            setMortalitas(parseFloat(mortalitasPersen));
        }
    };

    const handleNewNotification = (notif: Notification) => {
        const exists = notifications.some(
            (n) => n.parameter === notif.parameter && n.status === notif.status
        );
        if (!exists) {
            setNotifications((prev) => [...prev, notif]); // Just add the notification as is
        }
    };

    const calculateAge = () => {
        if (startDate) {
            const now = new Date();
            const ageInDays = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
            setAgeInDays(ageInDays);
        }
    };
    useEffect(() => {
        if (farmingStarted) {
            calculateAge();
            const ageInterval = setInterval(calculateAge, 1000 * 60 * 60 * 24); // Update setiap hari
            return () => clearInterval(ageInterval); // Bersihkan interval saat komponen unmount
        }
    }, [startDate, farmingStarted]);

    const handleDataUpdate = (data: Array<{ Parameter: string; Value: string; Status: string; Timestamp: Date }>) => {
        setStatsData(data);
    };

    function handleStartFarming(initialCount: number, targetDate: Date | null) {
        if (!targetDate) {
            alert("Please select a harvest date.");
            return;
        }

        const target = new Date(targetDate);
        const now = new Date();
        const timeDiff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

        // Check if the harvest date is in the past
        if (target < now) {
            alert("Tanggal panen tidak valid. Harus lebih dari hari ini.");
            return;
        }

        setJumlahAwalAyam(initialCount)
        setJumlahAyam(initialCount);
        setTargetTanggal(target);
        setCountdown(`Tersisa ${timeDiff} hari untuk panen`);
        setFarmingStarted(true);
        setDialogOpen(false);

        // Set up a countdown timer
        let countdownInterval = setInterval(() => {
            const now = new Date();
            const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
            if (diff < 0) {
                clearInterval(countdownInterval);
                setCountdown('Waktu panen telah tiba!');
            } else {
                setCountdown(`Tersisa ${diff} hari untuk panen`);
            }
        }, 1000 * 60 * 60 * 24); // Update every day

        // Cleanup interval on unmount or re-initialization
        return () => clearInterval(countdownInterval);
    }

    function handleHarvest() {
        if (targetTanggal) {
            const today = new Date();
            if (today >= targetTanggal) {
                setJumlahAyam(0);
                setHarvested(true);
            } else {
                setShowConfirmHarvestDialog(true);
            }
        }
    }

    // Confirm harvest action
    const confirmHarvest = () => {
        setJumlahAyam(0);
        setHarvested(true);
        setShowConfirmHarvestDialog(false); // Close dialog after confirming
        setFarmingStarted(false); // Reset farming state after harvest
        setHarvestDialogOpen(false);
    };

    // Fungsi untuk mengupdate jumlah ayam (dikirim ke AyamCounter sebagai prop)
    const updateJumlahAyam = (jumlahAyamBaru: number) => {
        setJumlahAyam(jumlahAyamBaru);
    };

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
                                        <IoIosNotificationsOutline className="dark:text-white cursor-pointer text-xl sm:text-2xl" onClick={() => alert(notifications.map(notif => `${notif.parameter}: ${notif.status} - ${notif.timestamp.toLocaleTimeString()}`).join("\n"))} />
                                        {/* Notification Badge */}
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
                                                        {notif.parameter}: <span className={`${notif.color} body-bold`}>{notif.status}</span> - {notif.timestamp.toLocaleTimeString()}
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
                            Data Ayam
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
                        <div className='grid grid-cols-1 xl:grid-cols-2 gap-y-10 w-full'>
                            <div className='grid grid-cols-2 gap-y-4 w-full xl:w-96'>
                                <div className='flex flex-col justify-center sm:justify-start sm:items-start items-center w-full xl:w-44 h-full'>
                                    <div className='h-full flex justify-center items-center text-xl'>
                                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                            <DialogTrigger disabled={farmingStarted}>
                                                <div onClick={() => setDialogOpen(true)} className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>
                                                    <div className={`flex items-center justify-center text-white ${farmingStarted ? 'bg-customGreen opacity-50' : 'bg-customGreen'} mulaiTernak h-full px-4 py-2 rounded-lg text-sm sm:text-xl`}>
                                                        <FaPlay className='mr-2' />
                                                        Mulai Ternak
                                                    </div>
                                                </div>
                                            </DialogTrigger>

                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Mulai Ternak</DialogTitle>
                                                    <DialogDescription>
                                                        Isi jumlah ayam dan target tanggal panen
                                                    </DialogDescription>
                                                    <div>
                                                        <label className="block mb-2">Jumlah Ayam Awal:</label>
                                                        <Input
                                                            type="number"
                                                            value={jumlahAyamInput}
                                                            onChange={(e) => setJumlahAyamInput(parseInt(e.target.value))}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block mb-2">Tanggal Panen:</label>
                                                        <input
                                                            type="date"
                                                            onChange={(e) => setTargetTanggal(new Date(e.target.value))}
                                                            className="border p-2 rounded w-full mb-4"
                                                            placeholder='Pilih target waktu panen'
                                                        />

                                                        <Button
                                                            variant={'blue'}
                                                            onClick={() => {
                                                                // Ensure to pass the updated targetTanggal
                                                                handleStartFarming(jumlahAyamInput, targetTanggal);
                                                                setDialogOpen(false);
                                                            }}
                                                            type='submit'
                                                            className='w-full'
                                                            disabled={!targetTanggal || jumlahAyamInput <= 0}
                                                        >
                                                            Mulai
                                                        </Button>
                                                    </div>

                                                </DialogHeader>
                                                <DialogClose asChild>
                                                    <Button type="button" variant="secondary">
                                                        Tutup
                                                    </Button>
                                                </DialogClose>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                    {farmingStarted && (
                                        <p className="text-green-500 mt-2 text-sm sm:text-md text-center">Ternak telah dimulai</p>
                                    )}
                                    {!farmingStarted && (
                                        <p className="text-black mt-2 text-sm sm:text-md text-center">Ternak belum dimulai</p>
                                    )}
                                </div>
                                <div className='flex flex-col justify-start sm:items-end 2xl:items-start items-center w-full xl:w-44 h-full'>
                                    <Dialog open={harvestDialogOpen} onOpenChange={setHarvestDialogOpen}>
                                        <DialogTrigger disabled={!farmingStarted} >
                                            <div className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>
                                                <div onClick={() => setHarvestDialogOpen(true)} className={`flex items-center justify-center text-white ${farmingStarted ? 'bg-customRed' : 'bg-customRed opacity-50'} panen h-full px-4 py-2 rounded-lg text-sm sm:text-xl`} >
                                                    <FaStop className='mr-2' />
                                                    Panen
                                                </div>
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Apakah Anda yakin ingin panen sekarang?</DialogTitle>
                                                <DialogDescription>
                                                    Aksi tidak dapat dibatalkan jika sudah dilakukan
                                                </DialogDescription>
                                            </DialogHeader>
                                            <Button variant={"blue"} onClick={() => {
                                                handleHarvest();
                                                setHarvestDialogOpen(false); // Tutup dialog
                                            }} type="submit" disabled={!farmingStarted}>
                                                Ya, saya yakin
                                            </Button>
                                            <DialogClose asChild>
                                                <Button type="button" variant="secondary">
                                                    Tutup
                                                </Button>
                                            </DialogClose>
                                        </DialogContent>
                                    </Dialog>
                                    {harvested && <p className='mt-2 text-sm sm:text-md text-center'>Sudah panen.</p>}
                                </div>

                                <Dialog open={showConfirmHarvestDialog} onOpenChange={setShowConfirmHarvestDialog}>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Konfirmasi Panen</DialogTitle>
                                            <DialogDescription>
                                                Tanggal panen belum tiba. Apakah Anda yakin ingin panen?
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="flex justify-between items-center">
                                            <Button variant={"blue"} onClick={confirmHarvest} className='w-full' type="submit">
                                                Ya, Panen
                                            </Button>
                                        </div>
                                        <DialogClose asChild>
                                            <Button type="button" variant="secondary">
                                                Tutup
                                            </Button>
                                        </DialogClose>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <div className='flex flex-col sm:flex-row justify-center xl:justify-end items-center sm:items-start w-full'>
                                {!harvested && countdown && <div className='flex sm:justify-start justify-center items-start w-full lg:w-72 mb-2 sm:mb-0'>
                                    <div className='text-sm sm:text-xl flex justify-center items-center text-center px-4 py-2'>
                                        {countdown}
                                    </div>
                                </div>}

                                <div className='flex justify-end items-start'>
                                    <Button variant={"jumlahAyam"} className='w-full lg:w-72'>
                                        <div className='text-sm sm:text-xl'>
                                            Jumlah ayam awal: {jumlahAyam}
                                        </div>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className='w-full grid grid-cols-1 lg:grid-cols-3 gap-4 mt-10'>
                            <div>
                                <div className='navbar-title body-bold text-sm sm:text-xs mb-2'>
                                    USIA AYAM
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="w-full flex">
                                        <div className="relative flex flex-grow flex-row items-center justify-center rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:bg-black dark:text-white dark:shadow-none py-7 px-10">
                                            <div className="flex h-[90px] w-auto flex-row items-center">
                                                <div className="rounded-full bg-lightPrimary  dark:bg-navy-700">
                                                    <span className="flex items-center text-brand-500 dark:text-white">
                                                        <FaRegCalendarAlt size={50} />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                                                <p className="font-dm text-2xl font-medium text-gray-600 dark:text-white">Usia Ayam</p>
                                                <h4 className={`${farmingStarted ? "text-4xl" : "text-4xl"
                                                    } body-bold text-blue-500 dark:text-blue-700`}>{farmingStarted ? `${ageInDays} hari` : "0"}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='navbar-title body-bold text-sm sm:text-xs mb-2'>
                                    JUMLAH AYAM
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="w-full flex">
                                        <div className="relative flex flex-grow flex-row items-center justify-center rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:bg-black dark:text-white dark:shadow-none py-7 px-10">
                                            <div className="flex h-[90px] w-auto flex-row items-center">
                                                <div className="rounded-full bg-lightPrimary  dark:bg-navy-700">
                                                    <span className="flex items-center text-brand-500 dark:text-white">
                                                        <GiRooster size={50} />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                                                <p className="font-dm text-2xl font-medium text-gray-600 dark:text-white">Jumlah Ayam</p>
                                                <h4 className="text-4xl body-bold text-blue-500 dark:text-blue-700"> {jumlahAyam}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='navbar-title body-bold text-sm sm:text-xs mb-2'>
                                    MORTALITAS AYAM
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="w-full flex">
                                        <div className="relative flex flex-grow flex-row items-center justify-center rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:bg-black dark:text-white dark:shadow-none py-7 px-10">
                                            <div className="flex h-[90px] w-auto flex-row items-center">
                                                <div className="rounded-full bg-lightPrimary  dark:bg-navy-700">
                                                    <span className="flex items-center text-brand-500 dark:text-white">
                                                        <BsHeartPulse size={50} />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                                                <p className="font-dm text-2xl font-medium text-gray-600 dark:text-white">Mortalitas Ayam</p>
                                                <h4 className="text-4xl body-bold text-blue-500 dark:text-blue-700">{mortalitas}%</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                    <AyamCounter jumlahAyam={jumlahAyam} onUpdateJumlahAyam={updateJumlahAyam} updateMortalitas={updateMortalitas} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className='hidden'>
                <StatsWidget onNewNotification={handleNewNotification} onDataUpdate={handleDataUpdate} onOverallStatusChange={handleOverallStatusChange} />
            </div>
        </main>
    );
}
