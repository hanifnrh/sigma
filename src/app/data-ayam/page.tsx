
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
import { useRouter } from 'next/navigation';
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
interface CardProps {
    title: string;
    value: string | number; // value can be either string or number
    Icon: React.ElementType; // Icon is a React component
}

const Card: React.FC<CardProps> = ({ title, value, Icon }) => (
    <div>
        <div className='uppercase navbar-title body-bold text-sm sm:text-xs mb-2'>
            {title}
        </div>
        <div className="flex justify-between items-center">
            <div className="w-full flex">
                <div className="relative flex flex-grow flex-row items-center justify-center rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:bg-black dark:text-white dark:shadow-none py-7 px-10">
                    <div className="flex h-[90px] w-auto flex-row items-center">
                        <div className="rounded-full bg-lightPrimary dark:bg-navy-700">
                            <span className="flex items-center text-brand-500 dark:text-white">
                                <Icon size={50} />
                            </span>
                        </div>
                    </div>
                    <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                        <p className="text-2xl font-medium text-gray-600 dark:text-white">{title}</p>
                        <h4 className="text-4xl body-bold text-blue-500 dark:text-blue-700">{value}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

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
    const router = useRouter(); // Access the router

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/data-ayam/'); // Use the correct endpoint
    
                // Check if the response status is okay (2xx)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const data = await response.json();
    
                // Ensure the data is an array (even if it has one item)
                if (Array.isArray(data) && data.length > 0) {
                    // Access the first item in the array if it's there
                    const latestData = data[0];
                    console.log("Fetched data:", latestData);
    
                    const { jumlah_ayam_awal, tanggal_panen, jumlah_ayam, mortalitas, usia_ayam } = latestData;
                    setJumlahAwalAyam(jumlah_ayam_awal);
                    setTargetTanggal(new Date(tanggal_panen)); // Convert to Date object
                    setJumlahAyam(jumlah_ayam);
                    setMortalitas(mortalitas);
                    setAgeInDays(usia_ayam);

                    setFarmingStarted(true);
                } else {
                    console.error("No data available or invalid format");

                    setFarmingStarted(false);
                }
            } catch (error) {
                console.error("Error fetching ayam data:", error);
    
                // Log additional error details if available
                if (error instanceof Error) {
                    console.error("Error message:", error.message);
                } else {
                    console.error("Unexpected error:", error);
                }

                setFarmingStarted(false);
            }
        };
    
        // Call fetchData immediately when the component mounts
        fetchData();
    
        // Set up interval to fetch data every 10 seconds
        const interval = setInterval(fetchData, 1000);
    
        // Cleanup interval when the component unmounts
        return () => clearInterval(interval);
    }, []);
    
    const handleDataUpdate = (data: Array<{ Parameter: string; Value: string; Status: string; Timestamp: Date }>) => {
        setStatsData(data);
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

    async function handleStartFarming(initialCount: number, targetDate: Date | null) {
        if (!targetDate) {
            alert("Please select a harvest date.");
            return;
        }

        const target = new Date(targetDate);
        const now = new Date();
        const timeDiff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

        // Validasi tanggal panen
        if (target < now) {
            alert("Tanggal panen tidak valid. Harus lebih dari hari ini.");
            return;
        }

        // Set nilai awal ayam dan tanggal target
        setJumlahAwalAyam(initialCount);
        setJumlahAyam(initialCount);
        setTargetTanggal(target);
        setCountdown(`Tersisa ${timeDiff} hari untuk panen`);
        setFarmingStarted(true);
        setDialogOpen(false);

        // Panggil fungsi untuk menyimpan data ke API
        await postJumlahAyam(initialCount, target);

        // Set timer countdown untuk menghitung sisa hari hingga panen
        const countdownInterval = setInterval(() => {
            const now = new Date();
            const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

            if (diff < 0) {
                clearInterval(countdownInterval);
                setCountdown('Waktu panen telah tiba!');
            } else {
                setCountdown(`Tersisa ${diff} hari untuk panen`);
            }
        }, 1000 * 60 * 60 * 24); // Update setiap hari

        // Bersihkan interval saat komponen di-unmount atau timer di-reset
        return () => clearInterval(countdownInterval);
    }

    // Fungsi untuk mengirim data jumlah ayam dan tanggal panen ke API
    const postJumlahAyam = async (jumlahAyam: number, targetTanggal: Date) => {
        const data = {
            jumlah_ayam_awal: jumlahAyam, // Anggap jumlah ayam awal sama dengan jumlah ayam yang dikirim
            tanggal_panen: targetTanggal.toISOString().split('T')[0], // Hanya ambil bagian tanggal saja
            jumlah_ayam: jumlahAyam, // Jumlah ayam saat ini
            mortalitas: 0, // Nilai default, misalnya 0 untuk awal
            usia_ayam: 0 // Usia awal ayam, diisi 0 misalnya
        };

        try {
            const response = await fetch('http://localhost:8000/api/data-ayam/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (!response.ok) {
                console.error('Server response error:', result); // Tampilkan respons server
                throw new Error('Failed to start farming');
            }

            console.log('Farming started:', result);
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat memulai ternak.');
        }
    };

    const updateJumlahAyam = async (id: number, jumlahAyamBaru: number) => {
        const data = {
            jumlah_ayam: jumlahAyamBaru // Hanya field yang ingin diperbarui
        };
    
        try {
            const response = await fetch(`http://localhost:8000/api/data-ayam/${id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            const result = await response.json();
            if (!response.ok) {
                console.error('Server response error:', result);
                throw new Error('Failed to update chicken count');
            }
    
            console.log('Chicken count updated:', result);
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat memperbarui jumlah ayam.');
        }
    };

    const updateMortalitas = async (id: number, ayamMati: number) => {
        if (jumlahAwalAyam > 0) {
            // Hitung persentase mortalitas berdasarkan jumlah ayam yang mati
            const mortalitasPersen = ((ayamMati / jumlahAwalAyam) * 100).toFixed(1);
            const mortalitasValue = parseFloat(mortalitasPersen);
    
            // Update nilai mortalitas di state
            setMortalitas(mortalitasValue);
    
            // Kirim data mortalitas yang baru ke API untuk memperbarui di backend
            try {
                const response = await fetch(`http://localhost:8000/api/data-ayam/${id}/`, {
                    method: 'PATCH', // Gunakan PATCH untuk update sebagian data
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ mortalitas: mortalitasValue }), // Kirim hanya field yang diubah
                });
    
                if (!response.ok) {
                    throw new Error('Failed to update mortalitas');
                }
    
                const result = await response.json();
                console.log('Mortalitas berhasil diupdate:', result);
            } catch (error) {
                console.error('Error updating mortalitas:', error);
                alert('Terjadi kesalahan saat memperbarui mortalitas.');
            }
        }
    };
    
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
                        <div className="flex justify-center items-center text-4xl">
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
                                            Jumlah ayam awal: {jumlahAwalAyam}
                                        </div>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className='w-full grid grid-cols-1 lg:grid-cols-3 gap-4 mt-10'>
                            <Card
                                title="Usia Ayam"
                                value={farmingStarted ? `${ageInDays} hari` : "0"}
                                Icon={FaRegCalendarAlt}
                            />
                            <Card
                                title="Jumlah Ayam"
                                value={jumlahAyam}
                                Icon={GiRooster}
                            />
                            <Card
                                title="Mortalitas Ayam"
                                value={`${mortalitas}%`}
                                Icon={BsHeartPulse}
                            />
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
                                    <AyamCounter jumlahAyam={jumlahAyam} onUpdateJumlahAyam={updateJumlahAyam} updateMortalitas={updateMortalitas} farmingStarted={farmingStarted} />
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
