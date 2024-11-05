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
    onOverallStatusChange: (overallStatus: { text: string; color: string }) => void;
};

const THRESHOLDS = {
    ammonia: { optimal: 20, good: 25, bad: 30 },
    temperature: { veryGood: [26, 32], good: [[20, 25], [33, 34]], bad: [[18, 19], [35, 36]] },
    humidity: { veryGood: [62, 68], good: [[60, 61], [69, 70]], bad: [[58, 59], [71, 72]] },
};

const StatsWidget: React.FC<StatsWidgetProps> = ({ onNewNotification, onDataUpdate, onOverallStatusChange }) => {
    const [ammonia, setAmmonia] = useState(18);
    const [temperature, setTemperature] = useState(35);
    const [humidity, setHumidity] = useState(40);

    const [status, setStatus] = useState({
        ammonia: { text: "Sangat Baik", color: "text-green-500" },
        temperature: { text: "Baik", color: "text-blue-500" },
        humidity: { text: "Baik", color: "text-blue-500" },
        overall: { text: "Baik", color: "text-blue-500" },
    });
    const [warnings, setWarnings] = useState({
        ammonia: "",
        temperature: "",
        humidity: "",
    });

    const getTemperatureIcon = (temp: number) =>
        temp > 32 ? <FaTemperatureHigh /> : <FaTemperatureLow />;

    const checkTemperatureStatus = (temp: number) => {
        if (temp >= THRESHOLDS.temperature.veryGood[0] && temp <= THRESHOLDS.temperature.veryGood[1]) {
            return { text: "Sangat Baik", color: "text-green-500" };
        }
        if (
            (temp >= THRESHOLDS.temperature.good[0][0] && temp <= THRESHOLDS.temperature.good[0][1]) ||
            (temp >= THRESHOLDS.temperature.good[1][0] && temp <= THRESHOLDS.temperature.good[1][1])
        ) {
            return { text: "Baik", color: "text-blue-500" };
        }
        if (
            (temp >= THRESHOLDS.temperature.bad[0][0] && temp <= THRESHOLDS.temperature.bad[0][1]) ||
            (temp >= THRESHOLDS.temperature.bad[1][0] && temp <= THRESHOLDS.temperature.bad[1][1])
        ) {
            return { text: "Buruk", color: "text-yellow-500" };
        }
        return { text: "Bahaya", color: "text-red-500" };
    };

    const checkHumidityStatus = (hum: number) => {
        if (hum >= THRESHOLDS.humidity.veryGood[0] && hum <= THRESHOLDS.humidity.veryGood[1]) {
            return { text: "Sangat Baik", color: "text-green-500" };
        }
        if (
            (hum >= THRESHOLDS.humidity.good[0][0] && hum <= THRESHOLDS.humidity.good[0][1]) ||
            (hum >= THRESHOLDS.humidity.good[1][0] && hum <= THRESHOLDS.humidity.good[1][1])
        ) {
            return { text: "Baik", color: "text-blue-500" };
        }
        if (
            (hum >= THRESHOLDS.humidity.bad[0][0] && hum <= THRESHOLDS.humidity.bad[0][1]) ||
            (hum >= THRESHOLDS.humidity.bad[1][0] && hum <= THRESHOLDS.humidity.bad[1][1])
        ) {
            return { text: "Buruk", color: "text-yellow-500" };
        }
        return { text: "Bahaya", color: "text-red-500" };
    };

    useEffect(() => {
        const updatedStatus = { ...status };
        const updatedWarnings = { ...warnings };

        // Check ammonia
        if (ammonia < THRESHOLDS.ammonia.optimal) {
            updatedStatus.ammonia = { text: "Sangat Baik", color: "text-green-500" };
            updatedWarnings.ammonia = "";
        } else if (ammonia >= THRESHOLDS.ammonia.optimal && ammonia < THRESHOLDS.ammonia.good) {
            updatedStatus.ammonia = { text: "Baik", color: "text-blue-500" };
            updatedWarnings.ammonia = "";
        } else if (ammonia >= THRESHOLDS.ammonia.good && ammonia < THRESHOLDS.ammonia.bad) {
            updatedStatus.ammonia = { text: "Buruk", color: "text-yellow-500" };
            updatedWarnings.ammonia = "Segera bersihkan kandang!";
            onNewNotification({
                parameter: "Amonia",
                status: "Buruk",
                timestamp: new Date(),
                message: "Segera bersihkan kandang!",
                icon: <TbAtom2Filled />,
                color: updatedStatus.ammonia.color,
            });
        } else {
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
        }

        // Check temperature
        updatedStatus.temperature = checkTemperatureStatus(temperature);
        if (updatedStatus.temperature.text === "Bahaya") {
            updatedWarnings.temperature = temperature < 18 || temperature > 36
                ? "Segera atur suhu kandang!"
                : "";
            if (updatedWarnings.temperature) {
                onNewNotification({
                    parameter: "Suhu",
                    status: "Bahaya",
                    timestamp: new Date(),
                    message: updatedWarnings.temperature,
                    icon: getTemperatureIcon(temperature),
                    color: updatedStatus.temperature.color,
                });
            }
        } else {
            updatedWarnings.temperature = "";
        }

        // Check humidity
        updatedStatus.humidity = checkHumidityStatus(humidity);
        if (updatedStatus.humidity.text === "Bahaya") {
            updatedWarnings.humidity = humidity < 58 || humidity > 72
                ? "Segera atur ventilasi kandang!"
                : "";
            if (updatedWarnings.humidity) {
                onNewNotification({
                    parameter: "Kelembapan",
                    status: "Bahaya",
                    timestamp: new Date(),
                    message: updatedWarnings.humidity,
                    icon: <IoWater />,
                    color: updatedStatus.humidity.color,
                });
            }
        } else {
            updatedWarnings.humidity = "";
        }

        // Set overall status
        const allStatuses = [updatedStatus.ammonia, updatedStatus.temperature, updatedStatus.humidity];
        if (allStatuses.some((s) => s.text === "Bahaya")) {
            updatedStatus.overall = { text: "Bahaya", color: "text-red-500" };
        } else if (allStatuses.some((s) => s.text === "Buruk")) {
            updatedStatus.overall = { text: "Buruk", color: "text-yellow-500" };
        } else if (allStatuses.some((s) => s.text === "Baik")) {
            updatedStatus.overall = { text: "Baik", color: "text-blue-500" };
        } else {
            updatedStatus.overall = { text: "Sangat Baik", color: "text-green-500" };
        }

        setStatus(updatedStatus);
        setWarnings(updatedWarnings);
        onOverallStatusChange(updatedStatus.overall);
        onDataUpdate([
            { Parameter: "Amonia", Value: `${ammonia} ppm`, Status: updatedStatus.ammonia.text, Timestamp: new Date() },
            { Parameter: "Suhu", Value: `${temperature} °C`, Status: updatedStatus.temperature.text, Timestamp: new Date() },
            { Parameter: "Kelembapan", Value: `${humidity}%`, Status: updatedStatus.humidity.text, Timestamp: new Date() },
        ]);
    }, [ammonia, temperature, humidity]);

    return (
        <div className="flex justify-between items-center w-full p-4">
            <div className="w-full grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
                {[
                    { label: "Amonia", value: `${ammonia} ppm`, icon: <TbAtom2Filled />, status: status.ammonia, warning: warnings.ammonia },
                    { label: "Suhu", value: `${temperature} °C`, icon: getTemperatureIcon(temperature), status: status.temperature, warning: warnings.temperature },
                    { label: "Kelembapan", value: `${humidity}%`, icon: <IoWater />, status: status.humidity, warning: warnings.humidity },
                    { label: "Status Total", value: status.overall.text, icon: <BiStats />, status: status.overall, warning: "" }
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
