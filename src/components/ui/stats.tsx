import { useEffect, useState } from "react";
import { BiStats } from "react-icons/bi";
import { FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";
import { IoWater } from "react-icons/io5";
import { TbAtom2Filled } from "react-icons/tb";

type Notification = {
    parameter: string;
    status: string;
    timestamp: Date;
    message: string;
    icon: React.ReactNode; // Ensure this matches the updated Notification type
};

type StatsWidgetProps = {
    onNewNotification: (notif: Notification) => void;
};

type Status = {
    text: string;
    color: string;
};

const AMONIA_THRESHOLD = 25;
const TEMPERATURE_THRESHOLD = { min: 26, max: 32 };
const HUMIDITY_THRESHOLD = { min: 40, max: 60 };

const StatsWidget: React.FC<StatsWidgetProps> = ({ onNewNotification }) => {
    const [ammonia, setAmmonia] = useState(30); // Dummy initial value
    const [temperature, setTemperature] = useState(34); // Dummy initial value
    const [humidity, setHumidity] = useState(62); // Dummy initial value

    const [ammoniaStatus, setAmmoniaStatus] = useState({ text: "Sangat Baik", color: "text-green-500" });
    const [temperatureStatus, setTemperatureStatus] = useState({ text: "Baik", color: "text-blue-500" });
    const [humidityStatus, setHumidityStatus] = useState({ text: "Baik", color: "text-blue-500" });

    const [ammoniaWarning, setAmmoniaWarning] = useState("");
    const [temperatureWarning, setTemperatureWarning] = useState("");
    const [humidityWarning, setHumidityWarning] = useState("");

    const [overallStatus, setOverallStatus] = useState<Status>({ text: "Baik", color: "text-blue-500" });
    useEffect(() => {

        let countAmmoniaStatus: Status = { text: "Baik", color: "text-green-500" };
        let countTemperatureStatus: Status = { text: "Baik", color: "text-green-500" };
        let countHumidityStatus: Status = { text: "Baik", color: "text-green-500" };

        // Update ammonia status
        if (ammonia > AMONIA_THRESHOLD) {
            countAmmoniaStatus = { text: "Bahaya", color: "text-red-500" };
            setAmmoniaStatus({ text: "Bahaya", color: "text-red-500" });
            setAmmoniaWarning("Segera bersihkan kandang!");
            onNewNotification({
                parameter: "Amonia",
                status: "Bahaya",
                timestamp: new Date(),
                message: "Segera bersihkan kandang!",
                icon: <TbAtom2Filled />
            });
        } else {
            setAmmoniaStatus({ text: "Sangat Baik", color: "text-green-500" });
            setAmmoniaWarning("");
            countAmmoniaStatus = { text: "Sangat Baik", color: "text-green-500" };
        }

        // Update temperature status
        if (temperature < TEMPERATURE_THRESHOLD.min) {
            countTemperatureStatus = { text: "Buruk", color: "text-yellow-500" };
            setTemperatureStatus({ text: "Buruk", color: "text-yellow-500" });
            setTemperatureWarning("Segera nyalakan lampu dan hangatkan kandang!");
            onNewNotification({
                parameter: "Suhu",
                status: temperature < TEMPERATURE_THRESHOLD.min ? "Buruk" : "Bahaya",
                timestamp: new Date(),
                message: "Segera nyalakan lampu dan hangatkan kandang!",
                icon: <FaTemperatureLow />
            });
        } else if (temperature > TEMPERATURE_THRESHOLD.max) {
            countTemperatureStatus = { text: "Bahaya", color: "text-red-500" };
            setTemperatureStatus({ text: "Bahaya", color: "text-red-500" });
            setTemperatureWarning("Segera matikan lampu dan dinginkan kandang!");
            onNewNotification({
                parameter: "Suhu",
                status: temperature < TEMPERATURE_THRESHOLD.min ? "Buruk" : "Bahaya",
                timestamp: new Date(),
                message: "Segera matikan lampu dan dinginkan kandang!",
                icon: <FaTemperatureHigh />
            });
        } else {
            setTemperatureStatus({ text: "Baik", color: "text-blue-500" });
            setTemperatureWarning("");
            countTemperatureStatus = { text: "Baik", color: "text-blue-500" };
        }

        // Update humidity status
        if (humidity < HUMIDITY_THRESHOLD.min) {
            countHumidityStatus = { text: "Buruk", color: "text-yellow-500" };
            setHumidityStatus({ text: "Buruk", color: "text-yellow-500" });
            setHumidityWarning("Segera atur ventilasi kandang!");
            onNewNotification({
                parameter: "Kelembapan",
                status: humidity < HUMIDITY_THRESHOLD.min ? "Buruk" : "Bahaya",
                timestamp: new Date(),
                message: "Segera atur ventilasi kandang!",
                icon: <IoWater />
            });
        } else if (humidity > HUMIDITY_THRESHOLD.max) {
            countHumidityStatus = { text: "Bahaya", color: "text-red-500" };
            setHumidityStatus({ text: "Bahaya", color: "text-red-500" });
            setHumidityWarning("Segera atur ventilasi kandang!");
            onNewNotification({
                parameter: "Kelembapan",
                status: humidity < HUMIDITY_THRESHOLD.min ? "Buruk" : "Bahaya",
                timestamp: new Date(),
                message: "Segera atur ventilasi kandang!",
                icon: <IoWater />
            });
        } else {
            setHumidityStatus({ text: "Baik", color: "text-blue-500" });
            setHumidityWarning("");
            countHumidityStatus = { text: "Baik", color: "text-blue-500" };
        }

        if (
            countAmmoniaStatus.text === "Bahaya" ||
            countTemperatureStatus.text === "Bahaya" ||
            countHumidityStatus.text === "Bahaya"
        ) {
            setOverallStatus({ text: "Bahaya", color: "text-red-500" });
        } else if (
            countAmmoniaStatus.text === "Buruk" ||
            countTemperatureStatus.text === "Buruk" ||
            countHumidityStatus.text === "Buruk"
        ) {
            setOverallStatus({ text: "Buruk", color: "text-orange-500" });
        } else {
            setOverallStatus({ text: "Baik", color: "text-green-500" });
        }


    }, [ammonia, temperature, humidity]);


    return (
        <div className="flex justify-between items-center w-full p-4">
            <div className="w-full grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-4">
                <div className="relative flex flex-grow !flex-row flex-col items-center justify-center rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:bg-black dark:text-white dark:shadow-none p-7">
                    <div className="flex h-[90px] w-auto flex-row items-center">
                        <div className="rounded-full bg-lightPrimary  dark:bg-navy-700">
                            <span className="flex items-center text-brand-500 dark:text-white">
                                <TbAtom2Filled size={30} />
                            </span>
                        </div>
                    </div>
                    <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                        <p className="font-dm text-xl font-medium text-gray-600 dark:text-white">Amonia</p>
                        <h4 className={`text-3xl body-bold ${ammoniaStatus.color}`}>{ammonia} ppm</h4>
                        {ammoniaWarning && <p className="text-red-500 text-sm">{ammoniaWarning}</p>}
                    </div>
                </div>
                <div className="relative flex flex-grow !flex-row flex-col items-center justify-center rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:bg-black dark:text-white dark:shadow-none p-7">
                    <div className="flex h-[90px] w-auto flex-row items-center">
                        <div className="rounded-full bg-lightPrimary  dark:bg-navy-700">
                            <span className="flex items-center text-brand-500 dark:text-white">
                                <FaTemperatureLow size={30} />
                            </span>
                        </div>
                    </div>
                    <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                        <p className="font-dm text-xl font-medium text-gray-600 dark:text-white">Suhu</p>
                        <h4 className={`text-3xl body-bold ${temperatureStatus.color}`}>{temperature} °C</h4>
                        {temperatureWarning && <p className="text-red-500 text-sm">{temperatureWarning}</p>}
                    </div>
                </div>
                <div className="relative flex flex-grow !flex-row flex-col items-center justify-center rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:bg-black dark:text-white dark:shadow-none p-7">
                    <div className="flex h-[90px] w-auto flex-row items-center">
                        <div className="rounded-full bg-lightPrimary  dark:bg-navy-700">
                            <span className="flex items-center text-brand-500 dark:text-white">
                                <IoWater size={30} />
                            </span>
                        </div>
                    </div>
                    <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                        <p className="font-dm text-xl font-medium text-gray-600 dark:text-white">Kelembapan</p>
                        <h4 className={`text-3xl body-bold ${humidityStatus.color}`}>{humidity}%</h4>
                        {humidityWarning && <p className="text-red-500 text-sm">{humidityWarning}</p>}
                    </div>
                </div>
                <div className="relative flex flex-grow !flex-row flex-col items-center justify-center rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:bg-black dark:text-white dark:shadow-none p-7">
                    <div className="flex h-[90px] w-auto flex-row items-center">
                        <div className="rounded-full bg-lightPrimary dark:bg-navy-700">
                            <span className="flex items-center text-brand-500 dark:text-white">
                                <BiStats size={30} />
                            </span>
                        </div>
                    </div>
                    <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                        <p className="font-dm text-xl font-medium text-gray-600 dark:text-white">Status total</p>
                        <h4 className={`text-3xl body-bold ${overallStatus.color}`}>{overallStatus.text}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsWidget;
