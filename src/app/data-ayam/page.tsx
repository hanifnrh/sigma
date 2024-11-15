
"use client";
import { useDataAyam } from "@/components/DataAyamContext";
import { useNotifications } from "@/components/NotificationContext";
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
    // Use context values
    const { jumlahAyam, setJumlahAyam, mortalitas, setMortalitas, ageInDays, setAgeInDays, jumlahAwalAyam, setJumlahAwalAyam, tanggalMulai, setTanggalMulai, targetTanggal, setTargetTanggal, farmingStarted, setFarmingStarted } = useDataAyam();

    // Component-specific state
    const [jumlahAyamInput, setJumlahAyamInput] = useState<number>(0);
    const [countdown, setCountdown] = useState<string>('');
    const [harvested, setHarvested] = useState(false);
    const [showConfirmHarvestDialog, setShowConfirmHarvestDialog] = useState(false);
    const [statsData, setStatsData] = useState<Array<{ Parameter: string; Value: string; Status: string; Timestamp: Date }>>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [harvestDialogOpen, setHarvestDialogOpen] = useState(false);
    const [lastPostedDate, setLastPostedDate] = useState<string>("");
    const router = useRouter(); // Access the router
    const { notifications } = useNotifications();

    const handleDataUpdate = (data: Array<{ Parameter: string; Value: string; Status: string; Timestamp: Date }>) => {
        setStatsData(data);
    };

    useEffect(() => {
        if (farmingStarted && tanggalMulai && targetTanggal) {
            const calculateAge = () => {
                const startDate = new Date(tanggalMulai);
                const harvestDate = new Date(targetTanggal);
                const now = new Date();

                // Calculate the age in days
                const ageInDays = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
                const daysUntilHarvest = Math.floor((harvestDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

                setAgeInDays(ageInDays);
                setCountdown(`Tersisa ${daysUntilHarvest} hari untuk panen`);

                // Cek jika usia ayam sudah berubah dan belum diposting hari ini
                const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
                if (today !== lastPostedDate) {
                    setLastPostedDate(today);
                    updateAgeInDays(ageInDays); // Lakukan post jika tanggal berbeda
                }
            };

            // Initial calculation of age
            calculateAge();

            // Update age every day
            const ageInterval = setInterval(calculateAge, 1000 * 60 * 60 * 24); // Update every day

            return () => clearInterval(ageInterval); // Cleanup when component unmounts
        }
    }, [farmingStarted, tanggalMulai, targetTanggal]);

    async function handleStartFarming(initialCount: number, targetDate: Date | null) {
        if (!targetDate) {
            alert("Please select a harvest date.");
            return;
        }

        const now = new Date();
        const target = new Date(targetDate);

        // Cek jika tanggal yang dipilih kurang dari hari ini
        if (target <= now) {
            alert("Tanggal panen harus lebih dari hari ini.");
            return;
        }

        // // Set kondisi untuk memeriksa apakah tanggal input sudah lewat dalam tahun ini
        // // Jika target bulan dan tanggal lebih kecil dari bulan dan tanggal hari ini, maka set tahun target ke tahun depan
        // if (target.getFullYear() === now.getFullYear() && target.getMonth() < now.getMonth()) {
        //     target.setFullYear(now.getFullYear() + 1);
        // } else if (target.getFullYear() === now.getFullYear() && target.getMonth() === now.getMonth() && target.getDate() <= now.getDate()) {
        //     target.setFullYear(now.getFullYear() + 1);
        // }

        // Set nilai awal ayam dan tanggal target
        setJumlahAwalAyam(initialCount);
        setJumlahAyam(initialCount);
        setTargetTanggal(target);
        setTanggalMulai(now);
        setCountdown(`Tersisa ${Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))} hari untuk panen`);
        setFarmingStarted(true);
        setDialogOpen(false);

        // Panggil fungsi untuk menyimpan data ke API
        await postJumlahAyam(initialCount, target, now);

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

    const updateAgeInDays = async (ageInDays: number) => {
        const data = {
            usia_ayam: ageInDays,  // Send the updated age
        };

        try {
            // Fetch the existing record
            const response = await fetch('http://localhost:8000/api/data-ayam/');
            if (!response.ok) {
                throw new Error('Failed to fetch ayam data');
            }

            const allData = await response.json();

            // If there's existing data, update it using the first (or only) record
            if (allData.length > 0) {
                const record = allData[0];  // Assuming there's only one record, we take the first one

                // Send the PATCH request to update the age in the record
                const updateResponse = await fetch(`http://localhost:8000/api/data-ayam/${record.id}/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await updateResponse.json();
                if (!updateResponse.ok) {
                    console.error('Server response error:', result);
                    throw new Error('Failed to update chicken age');
                }

                console.log('Age updated successfully:', result);
            } else {
                console.error('No ayam data found to update.');
            }
        } catch (error) {
            console.error('Error updating age:', error);
            alert('Terjadi kesalahan saat memperbarui usia ayam.');
        }
    };



    // Fungsi untuk mengirim data jumlah ayam dan tanggal panen ke API
    const postJumlahAyam = async (jumlahAyam: number, targetTanggal: Date, startDate: Date) => {
        const data = {
            jumlah_ayam_awal: jumlahAyam, // Anggap jumlah ayam awal sama dengan jumlah ayam yang dikirim
            tanggal_mulai: startDate.toISOString().split('T')[0],
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

    const updateJumlahAyam = async (jumlahAyamAwal: number, jumlahAyamBaru: number) => {
        const data = {
            jumlah_ayam: jumlahAyamBaru // Only the field you want to update
        };

        try {
            // Fetch all data
            const response = await fetch('http://localhost:8000/api/data-ayam/');
            if (!response.ok) {
                throw new Error('Failed to fetch ayam data');
            }

            const allData = await response.json();

            // If there's existing data, update it using the first (or only) item
            if (allData.length > 0) {
                const record = allData[0];  // Assuming there's only one record, we take the first one

                // If record exists, we can patch the data
                const updateResponse = await fetch(`http://localhost:8000/api/data-ayam/${record.id}/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await updateResponse.json();
                if (!updateResponse.ok) {
                    console.error('Server response error:', result);
                    throw new Error('Failed to update chicken count');
                }

                console.log('Chicken count updated:', result);
                setJumlahAyam(jumlahAyamBaru);
            } else {
                // If no existing data, create new data
                const createResponse = await fetch('http://localhost:8000/api/data-ayam/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        jumlah_ayam_awal: jumlahAyamAwal,  // Set initial count
                        jumlah_ayam: jumlahAyamBaru,       // Set new chicken count
                        tanggal_panen: new Date(),         // Set current harvest date
                        mortalitas: 0,                     // Set initial mortalitas (0)
                        usia_ayam: 0                       // Set initial age (0)
                    }),
                });

                const result = await createResponse.json();
                if (!createResponse.ok) {
                    console.error('Server response error:', result);
                    throw new Error('Failed to create new ayam data');
                }

                console.log('New chicken data created:', result);
                setJumlahAyam(jumlahAyamBaru);
            }

        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat memperbarui jumlah ayam.');
        }
    };

    useEffect(() => {
        // Calculate mortality whenever jumlahAyam changes
        if (jumlahAyam !== jumlahAwalAyam) {
            const mortalityPercentage = (((jumlahAwalAyam - jumlahAyam) / jumlahAwalAyam) * 100).toFixed(1);
            setMortalitas(Number(mortalityPercentage));

            // Update the backend
            updateMortalitas(jumlahAwalAyam, jumlahAyam);
        }
    }, [jumlahAyam, jumlahAwalAyam]); // This effect runs when jumlahAyam or jumlahAwalAyam changes


    const updateMortalitas = async (JumlahAwalAyam: number, ayamMati: number) => {
        // Pastikan perhitungan mortalitas tidak menghasilkan nilai yang tidak valid
        const mortalityPercentage = (JumlahAwalAyam > 0 && jumlahAyam > 0)
            ? (((JumlahAwalAyam - jumlahAyam) / JumlahAwalAyam) * 100).toFixed(1)
            : '0'; // Set ke 0 jika perhitungan tidak valid

        const data = {
            mortalitas: parseFloat(mortalityPercentage), // Pastikan nilai mortalitas adalah angka
        };

        try {
            // Ambil data ayam yang ada
            const response = await fetch('http://localhost:8000/api/data-ayam/');
            if (!response.ok) {
                throw new Error('Failed to fetch ayam data');
            }

            const allData = await response.json();
            if (allData.length === 0) {
                console.log('Data ayam tidak ada, kemungkinan panen sudah selesai atau data sudah dihapus.');
                // Buat data baru jika tidak ada data yang ditemukan
                const createResponse = await fetch('http://localhost:8000/api/data-ayam/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        mortalitas: parseFloat(mortalityPercentage) || 0,  // Pastikan mortalitas adalah angka
                        jumlah_ayam: jumlahAyam,                 // Jumlah ayam saat ini
                        jumlah_ayam_awal: JumlahAwalAyam,        // Jumlah ayam awal
                        tanggal_panen: new Date(),               // Tanggal panen sekarang
                        usia_ayam: 0                             // Usia ayam (0 untuk awal)
                    }),
                });

                if (!createResponse.ok) {
                    const errorData = await createResponse.json();
                    console.error('Server response error:', errorData);
                    throw new Error('Failed to create new ayam data');
                }

                const result = await createResponse.json();
                console.log('New mortalitas data created:', result);
                setMortalitas(parseFloat(mortalityPercentage));
                return;  // Keluar dari fungsi setelah membuat data baru
            }

            // Jika data ada, pastikan kita hanya memperbarui jika mortalitas berubah
            const record = allData[0];  // Mengambil data pertama

            // Cek apakah mortalitas perlu diupdate
            if (record.mortalitas !== data.mortalitas) {
                // Jika mortalitas berbeda, lakukan pembaruan
                const updateResponse = await fetch(`http://localhost:8000/api/data-ayam/${record.id}/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (!updateResponse.ok) {
                    const errorData = await updateResponse.json();
                    console.error('Server response error:', errorData);
                    throw new Error('Failed to update mortalitas');
                }

                const result = await updateResponse.json();
                console.log('Mortalitas updated:', result);
                setMortalitas(parseFloat(mortalityPercentage));
            } else {
                console.log('Mortalitas tidak berubah, tidak perlu update');
            }

        } catch (error) {
            // console.error('Error:', error);
            // alert('Terjadi kesalahan saat memperbarui mortalitas.');
        }
    };


    async function handleDeleteData() {
        try {
            // Ambil semua data ayam
            const response = await fetch('http://localhost:8000/api/data-ayam/');
            if (!response.ok) {
                throw new Error('Failed to fetch ayam data');
            }

            const allData = await response.json();
            if (allData.length > 0) {
                // Mengambil ID ayam pertama yang ditemukan (atau bisa memilih berdasarkan kriteria lainnya)
                const record = allData[0];  // Misalnya Anda ingin menghapus record pertama

                // Kirim permintaan DELETE berdasarkan ID
                const deleteResponse = await fetch(`http://localhost:8000/api/data-ayam/${record.id}/`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (deleteResponse.ok) {
                    console.log('Data ayam berhasil dihapus');

                    // Setelah penghapusan, set mortalitas ke 0
                    await updateMortalitas(0, 0); // Reset mortalitas karena ayam sudah dihapus
                } else {
                    const result = await deleteResponse.json();
                    console.error('Server response error:', result);
                    throw new Error('Failed to delete chicken data');
                }
            } else {
                console.log('Tidak ada data ayam untuk dihapus');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat menghapus data ayam.');
        }
    }


    function handleHarvest() {
        if (targetTanggal) {
            const today = new Date();
            if (today >= targetTanggal) {
                setHarvested(true);
            } else {
                setShowConfirmHarvestDialog(true);
            }
        }
    }

    // Confirm harvest action
    const confirmHarvest = async () => {
        setHarvested(true);
        setShowConfirmHarvestDialog(false); // Close dialog after confirming
        setFarmingStarted(false); // Reset farming state after harvest
        setHarvestDialogOpen(false);
        await handleDeleteData();
        window.location.reload();
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
                                    <AyamCounter jumlahAyam={jumlahAyam} jumlahAwalAyam={jumlahAwalAyam} onUpdateJumlahAyam={updateJumlahAyam} updateMortalitas={updateMortalitas} farmingStarted={farmingStarted} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}
