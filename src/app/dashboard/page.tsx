"use client"
import { useDataAyam } from "@/components/DataAyamContext";
import { useNotifications } from "@/components/NotificationContext";
import { useStats } from "@/components/StatsContext";
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import GrafikKeseluruhan from '@/components/ui/GrafikKeseluruhan';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { SensorBattery } from '@/components/ui/SensorBattery';
import { SensorStatus } from '@/components/ui/SensorStatus';
import StatCard from '@/components/ui/StatCard';
import StatusIndicator from '@/components/ui/status-indicator';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { BsHeartPulse } from "react-icons/bs";
import { FaRegCalendarAlt, FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";
import { GiRooster } from "react-icons/gi";
import { GrMapLocation } from "react-icons/gr";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoWater } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { TbAtom2Filled } from "react-icons/tb";
import { utils, writeFile } from "xlsx";
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

export default function Dashboard() {
    const { jumlahAyam, setJumlahAyam, mortalitas, setMortalitas, ageInDays, setAgeInDays, jumlahAwalAyam, targetTanggal } = useDataAyam();
    const pathname = usePathname(); // Get the current pathname
    const { notifications } = useNotifications();
    const {
        ammonia,
        temperature,
        humidity,
        setAmmonia,
        setTemperature,
        setHumidity,
        overallStatus,
        setOverallStatus,
        status,
        warnings,
    } = useStats();

    const getTemperatureIcon = (temp: number) =>
        temp > 32 ? <FaTemperatureHigh /> : <FaTemperatureLow />;

    const parameterCards = [
        {
            label: "Amonia",
            value: `${ammonia ?? 0} ppm`,
            icon: <TbAtom2Filled />,
            statusColor: status.ammonia.color,
            warning: warnings.ammonia,
        },
        {
            label: "Suhu",
            value: `${temperature ?? 0} °C`,
            icon: getTemperatureIcon(temperature ?? 0),
            statusColor: status.temperature.color,
            warning: warnings.temperature,
        },
        {
            label: "Kelembapan",
            value: `${humidity ?? 0}%`,
            icon: <IoWater />,
            statusColor: status.humidity.color,
            warning: warnings.humidity,
        },
    ];

    const ayamDecreasePercentage =
        jumlahAwalAyam > 0 ? ((jumlahAwalAyam - jumlahAyam) / jumlahAwalAyam) * 100 : 0;

    const daysToTarget = targetTanggal
        ? Math.floor((targetTanggal.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) - ageInDays
        : null;

    const getAgeStatusColor = () => {
        if (daysToTarget !== null) {
            if (daysToTarget > 14) return "text-red-500";
            if (daysToTarget > 7) return "text-yellow-500";
            if (daysToTarget > 0) return "text-blue-500";
            return "text-green-500";
        }
        return "text-black";
    };

    const generalCards = [
        {
            label: "Mortalitas Ayam",
            value: `${mortalitas}%`,
            icon: <BsHeartPulse />,
            statusColor: mortalitas > 5 ? "text-red-500" : "text-green-500",
            warning: mortalitas > 5 ? "Bahaya, mortalitas ayam sudah melewati batas!" : "",
        },
        {
            label: "Jumlah Ayam",
            value: `${jumlahAyam}`,
            icon: <GiRooster />,
            statusColor: ayamDecreasePercentage > 5 ? "text-red-500" : "text-green-500",
            warning:
                ayamDecreasePercentage > 5 ? "Bahaya, jumlah ayam berkurang banyak!" : "",
        },
        {
            label: "Usia Ayam",
            value: `${ageInDays} hari`,
            icon: <FaRegCalendarAlt />,
            statusColor: getAgeStatusColor(),
            warning:
                daysToTarget !== null && daysToTarget <= 7
                    ? `${daysToTarget} hari lagi untuk panen.`
                    : "",
        },
    ];

    const getStatusGradient = (statusText: string) => {
        switch (statusText) {
            case "Sangat Baik":
                return "bg-[linear-gradient(107deg,#16CC53_8.32%,#108496_60.18%,#35B6CA_105.75%)]";
            case "Baik":
                return "bg-[linear-gradient(107deg,#3B82F6_8.32%,#1D4ED8_60.18%,#1E40AF_105.75%)]";
            case "Buruk":
                return "bg-[linear-gradient(107deg,#FBBF24_8.32%,#F59E0B_60.18%,#D97706_105.75%)]";
            case "Bahaya":
                return "bg-[linear-gradient(107deg,#EF4444_8.32%,#B91C1C_60.18%,#7F1D1D_105.75%)]";
            default:
                return "";
        }
    };
    const handleDownload = () => {
        const timestamp = new Date().toLocaleString();
        const data = [
            {
                Amonia: ammonia,
                Suhu: temperature,
                Kelembapan: humidity,
                UsiaAyam: ageInDays,
                Mortalitas: mortalitas,
                JumlahAyam: jumlahAyam,
                Timestamp: timestamp,
            },
        ];
        const ws = utils.json_to_sheet(data);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "StatsData");
        writeFile(wb, "Dashboard.xlsx");
    };

    return (
        <main className="bg-white dark:bg-zinc-900 w-full">
            <Navbar />
            <div className='flex flex-col mt-10 sm:mt-0 sm:pl-44 md:pl-56 xl:pl-64 w-full'>
                <div className="sticky top-10 sm:top-0 z-10">
                    <div className="flex header w-full py-2 px-4 body-light justify-between items-center border-b bg-white">
                        <div className='flex items-center navbar-title body-light'>
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
                            Dasbor
                        </div>
                        <div className="flex justify-center items-center text-4xl">
                            <Button variant={"green"} onClick={handleDownload}>
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
                                <span className={`text-2xl md:text-4xl title-head ${getStatusGradient(overallStatus.text)} cliptext text-transparent`}>
                                    Status Keseluruhan: {overallStatus.text}
                                </span>
                            </div>
                            <div className='border-l px-5'>
                                <div className='navbar-title body-bold text-sm sm:text-xs'>
                                    USIA
                                </div>
                                <div className='text-2xl md:text-4xl title-head'>
                                    {ageInDays} hari
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center w-full p-4">
                            <div className="w-full grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                                {parameterCards.map(({ label, value, icon, statusColor, warning }) => (
                                    <StatCard key={label} label={label} value={value} icon={icon} statusColor={statusColor} warning={warning} />
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between items-center w-full p-4">
                            <div className="w-full grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                                {generalCards.map(({ label, value, icon, statusColor, warning }) => (
                                    <StatCard key={label} label={label} value={value} icon={icon} statusColor={statusColor} warning={warning} />
                                ))}
                            </div>
                        </div>


                        <div className="status-container flex items-center justify-center py-4 border-b w-full">
                            <div className="status-wrapper grid grid-cols-2 xl:grid-cols-4 gap-4">
                                <div className="status flex items-center justify-center">
                                    <StatusIndicator status="success">Sangat Baik</StatusIndicator>
                                </div>
                                <div className="status flex items-center justify-center">
                                    <StatusIndicator status="info">Baik</StatusIndicator>
                                </div>
                                <div className="status flex items-center justify-center">
                                    <StatusIndicator status="warning">Buruk</StatusIndicator>
                                </div>
                                <div className="status flex items-center justify-center">
                                    <StatusIndicator status="error">Bahaya</StatusIndicator>
                                </div>

                            </div>
                        </div>
                        <div className='grid grid-cols-1 xl:grid-cols-2 gap-x-4 gap-y-8 w-full p-4 justify-between'>
                            <div className='w-full'>
                                <p className='navbar-title body-bold text-sm sm:text-xs mb-2'>
                                    PERANGKAT
                                </p>
                                <SensorStatus />
                            </div>
                            <div className='w-full'>
                                <p className='navbar-title body-bold text-sm sm:text-xs mb-2'>
                                    GRAFIK KESELURUHAN
                                </p>
                                <GrafikKeseluruhan />
                            </div>
                        </div>
                    </div>

                    <div className="container-right flex flex-col items-start justify-center px-5 py-5 h-full lg:mt-0 mt-10">
                        <div className='navbar-title body-bold text-sm sm:text-xs '>
                            DAYA PERANGKAT
                        </div>
                        <div>
                            <SensorBattery />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
