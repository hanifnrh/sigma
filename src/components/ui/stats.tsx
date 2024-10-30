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
    icon: React.ReactNode;
    color: string;
};

type StatsWidgetProps = {
    onNewNotification: (notif: Notification) => void;
    onDataUpdate: (data: Array<{ Parameter: string; Value: string; Status: string; Timestamp: Date }>) => void;
};

const THRESHOLDS = {
    ammonia: 25,
    temperature: { min: 26, max: 32 },
    humidity: { min: 40, max: 60 },
};

const StatsWidget: React.FC<StatsWidgetProps> = ({ onNewNotification, onDataUpdate }) => {
    const [ammonia, setAmmonia] = useState(20);
    const [temperature, setTemperature] = useState(24);
    const [humidity, setHumidity] = useState(62);

    const [status, setStatus] = useState({
        ammonia: { text: "Sangat Baik", color: "text-green-500" },
        temperature: { text: "Baik", color: "text-blue-500" },
        humidity: { text: "Baik", color: "text-blue-500" },
        overall: { text: "Baik", color: "text-blue-500" }
    });
    const [warnings, setWarnings] = useState({
        ammonia: "",
        temperature: "",
        humidity: ""
    });

    const getTemperatureIcon = (temp: number) =>
        temp > THRESHOLDS.temperature.max ? <FaTemperatureHigh /> : <FaTemperatureLow />;

    useEffect(() => {
        // Define updated statuses and warnings based on the conditions
        const updatedStatus = { ...status };
        const updatedWarnings = { ...warnings };

        // Check ammonia
        if (ammonia > THRESHOLDS.ammonia) {
            updatedStatus.ammonia = { text: "Bahaya", color: "text-red-500" };
            updatedWarnings.ammonia = "Segera bersihkan kandang!";
            onNewNotification({
                parameter: "Amonia",
                status: "Bahaya",
                timestamp: new Date(),
                message: "Segera bersihkan kandang!",
                icon: <TbAtom2Filled />,
                color: updatedStatus.ammonia.color,
            });
        } else {
            updatedStatus.ammonia = { text: "Sangat Baik", color: "text-green-500" };
            updatedWarnings.ammonia = "";
        }

        // Check temperature
        if (temperature < THRESHOLDS.temperature.min) {
            updatedStatus.temperature = { text: "Buruk", color: "text-yellow-500" };
            updatedWarnings.temperature = "Segera nyalakan lampu dan hangatkan kandang!";
            onNewNotification({
                parameter: "Suhu",
                status: "Buruk",
                timestamp: new Date(),
                message: "Segera nyalakan lampu dan hangatkan kandang!",
                icon: <FaTemperatureLow />,
                color: updatedStatus.temperature.color,
            });
        } else if (temperature > THRESHOLDS.temperature.max) {
            updatedStatus.temperature = { text: "Bahaya", color: "text-red-500" };
            updatedWarnings.temperature = "Segera matikan lampu dan dinginkan kandang!";
            onNewNotification({
                parameter: "Suhu",
                status: "Bahaya",
                timestamp: new Date(),
                message: "Segera matikan lampu dan dinginkan kandang!",
                icon: <FaTemperatureHigh />,
                color: updatedStatus.temperature.color,
            });
        } else {
            updatedStatus.temperature = { text: "Baik", color: "text-blue-500" };
            updatedWarnings.temperature = "";
        }

        // Check humidity
        if (humidity < THRESHOLDS.humidity.min) {
            updatedStatus.humidity = { text: "Buruk", color: "text-yellow-500" };
            updatedWarnings.humidity = "Segera atur ventilasi kandang!";
            onNewNotification({
                parameter: "Kelembapan",
                status: "Buruk",
                timestamp: new Date(),
                message: "Segera atur ventilasi kandang!",
                icon: <IoWater />,
                color: updatedStatus.humidity.color,
            });
        } else if (humidity > THRESHOLDS.humidity.max) {
            updatedStatus.humidity = { text: "Bahaya", color: "text-red-500" };
            updatedWarnings.humidity = "Segera atur ventilasi kandang!";
            onNewNotification({
                parameter: "Kelembapan",
                status: "Bahaya",
                timestamp: new Date(),
                message: "Segera atur ventilasi kandang!",
                icon: <IoWater />,
                color: updatedStatus.humidity.color,
            });
        } else {
            updatedStatus.humidity = { text: "Baik", color: "text-blue-500" };
            updatedWarnings.humidity = "";
        }

        // Set overall status
        const allStatuses = [updatedStatus.ammonia, updatedStatus.temperature, updatedStatus.humidity];
        if (allStatuses.some((s) => s.text === "Bahaya")) {
            updatedStatus.overall = { text: "Bahaya", color: "text-red-500" };
        } else if (allStatuses.some((s) => s.text === "Buruk")) {
            updatedStatus.overall = { text: "Buruk", color: "text-orange-500" };
        } else {
            updatedStatus.overall = { text: "Baik", color: "text-green-500" };
        }

        setStatus(updatedStatus);
        setWarnings(updatedWarnings);

        onDataUpdate([
            { Parameter: "Amonia", Value: `${ammonia} ppm`, Status: updatedStatus.ammonia.text, Timestamp: new Date()  },
            { Parameter: "Suhu", Value: `${temperature} °C`, Status: updatedStatus.temperature.text, Timestamp: new Date()  },
            { Parameter: "Kelembapan", Value: `${humidity}%`, Status: updatedStatus.humidity.text, Timestamp: new Date()  },
        ]);
    }, [ammonia, temperature, humidity]);

    return (
        <div className="flex justify-between items-center w-full p-4">
            <div className="w-full grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
                {[
                    { label: "Amonia", value: `${ammonia} ppm`, icon: <TbAtom2Filled/>, status: status.ammonia, warning: warnings.ammonia },
                    { label: "Suhu", value: `${temperature} °C`, icon: getTemperatureIcon(temperature), status: status.temperature, warning: warnings.temperature },
                    { label: "Kelembapan", value: `${humidity}%`, icon: <IoWater/>, status: status.humidity, warning: warnings.humidity },
                    { label: "Status Total", value: status.overall.text, icon: <BiStats/>, status: status.overall, warning: "" }
                ].map(({ label, value, icon, status, warning }) => (
                    <div key={label} className="h-44 relative flex flex-grow flex-col items-center justify-center rounded-[10px] border-[1px] border-gray-200 bg-white shadow-md p-7">
                        <div className="flex items-center">
                            <div className="flex h-[90px] w-auto items-center">
                                <div className="rounded-full bg-lightPrimary dark:bg-navy-700">
                                    <span className="flex items-center text-brand-500 dark:text-white text-4xl">
                                        {icon}
                                    </span>
                                </div>
                            </div>
                            <div className="ml-4 flex flex-col justify-center">
                                <p className="font-dm text-xl font-medium text-gray-600 dark:text-white">{label}</p>
                                <h4 className={`text-3xl body-bold ${status.color}`}>{value}</h4>
                            </div>
                        </div>
                        {warning && <p className={`${status.color} text-sm text-center`}>{warning}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatsWidget;
