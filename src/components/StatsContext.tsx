"use client"
import { useNotifications } from "@/components/NotificationContext";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";
import { IoWater } from "react-icons/io5";
import { TbAtom2Filled } from "react-icons/tb";
// Define the types for parameters and status

type Status = { text: string; color: string };

type StatsContextType = {
    ammonia: number | null;
    temperature: number | null;
    humidity: number | null;
    setAmmonia: (value: number) => void;
    setTemperature: (value: number) => void;
    setHumidity: (value: number) => void;
    overallStatus: { text: string; color: string };
    setOverallStatus: (status: { text: string; color: string }) => void;
    status: { ammonia: Status; temperature: Status; humidity: Status };
    warnings: { ammonia: string; temperature: string; humidity: string };
};

type Notification = {
    parameter: string;
    status: string;
    timestamp: Date;
    message: string;
    icon: React.ReactNode;
    color: string;
};

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export const useStats = (): StatsContextType => {
    const context = useContext(StatsContext);
    if (!context) {
        throw new Error("useStats must be used within a StatsProvider");
    }
    return context;
};

// Define thresholds
const THRESHOLDS = {
    ammonia: { optimal: 20, good: 25, bad: 30 },
    temperature: { veryGood: [26, 32], good: [[20, 25], [33, 34]], bad: [[18, 19], [35, 36]] },
    humidity: { veryGood: [62, 68], good: [[60, 61], [69, 70]], bad: [[58, 59], [71, 72]] },
};

type StatsProviderProps = {
    children: ReactNode;
};

export const StatsProvider: React.FC<StatsProviderProps> = ({ children }) => {
    const { addNotification } = useNotifications();
    const [ammonia, setAmmonia] = useState<number | null>(null);
    const [temperature, setTemperature] = useState<number | null>(null);
    const [humidity, setHumidity] = useState<number | null>(null);
    const [overallStatus, setOverallStatus] = useState<{ text: string; color: string }>({
        text: "Baik",
        color: "text-blue-500",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/parameters");
                const data = await response.json();

                if (data && Array.isArray(data)) {
                    const latestData = data
                        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
                    const { ammonia, temperature, humidity } = latestData;

                    setAmmonia(ammonia);
                    setTemperature(temperature);
                    setHumidity(humidity);
                }
            } catch (error) {
                console.error("Error fetching parameter data:", error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 10000); // Poll every 10 seconds

        return () => clearInterval(interval); // Cleanup
    }, []);

    const sendNotification = (notification: Notification) => {
        addNotification(notification);
    };

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

    const [prevStatus, setPrevStatus] = useState({
        ammonia: "Sangat Baik",
        temperature: "Baik",
        humidity: "Baik",
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
        if (ammonia === null || temperature === null || humidity === null) return;

        const updatedStatus = { ...status };
        const updatedWarnings = { ...warnings };
        setOverallStatus(updatedStatus.overall);

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
            if (prevStatus.ammonia !== "Buruk") {
                sendNotification({
                    parameter: "Amonia",
                    status: "Buruk",
                    timestamp: new Date(),
                    message: "Segera bersihkan kandang!",
                    icon: <TbAtom2Filled />,
                    color: updatedStatus.ammonia.color,
                });
            }
        } else {
            updatedStatus.ammonia = { text: "Bahaya", color: "text-red-500" };
            updatedWarnings.ammonia = "Segera bersihkan kandang!";
            if (prevStatus.ammonia !== "Bahaya") {
                sendNotification({
                    parameter: "Amonia",
                    status: "Bahaya",
                    timestamp: new Date(),
                    message: "Segera bersihkan kandang!",
                    icon: <TbAtom2Filled />,
                    color: updatedStatus.ammonia.color,
                });
            }
        }

        // Check temperature
        updatedStatus.temperature = checkTemperatureStatus(temperature);
        if (updatedStatus.temperature.text === "Bahaya" || updatedStatus.temperature.text === "Buruk") {
            const statusText = updatedStatus.temperature.text;
            updatedWarnings.temperature = "Segera atur suhu kandang!";
            if (prevStatus.temperature !== updatedStatus.temperature.text) {
                sendNotification({
                    parameter: "Suhu",
                    status: updatedStatus.temperature.text,
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
        if (updatedStatus.humidity.text === "Bahaya" || updatedStatus.humidity.text === "Buruk") {
            const statusText = updatedStatus.humidity.text;
            updatedWarnings.humidity = "Segera atur ventilasi kandang!";
            if (prevStatus.humidity !== updatedStatus.humidity.text) {
                sendNotification({
                    parameter: "Kelembapan",
                    status: updatedStatus.humidity.text,
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
            setOverallStatus(updatedStatus.overall = { text: "Bahaya", color: "text-red-500" });
        } else if (allStatuses.some((s) => s.text === "Buruk")) {
            setOverallStatus(updatedStatus.overall = { text: "Buruk", color: "text-yellow-500" });
        } else if (allStatuses.every((s) => s.text === "Sangat Baik")) {
            setOverallStatus(updatedStatus.overall = { text: "Sangat Baik", color: "text-green-500" });
        } else {
            setOverallStatus(updatedStatus.overall = { text: "Baik", color: "text-blue-500" });
        }


        if (
            prevStatus.ammonia !== updatedStatus.ammonia.text ||
            prevStatus.temperature !== updatedStatus.temperature.text ||
            prevStatus.humidity !== updatedStatus.humidity.text
        ) {
            setPrevStatus({
                ammonia: updatedStatus.ammonia.text,
                temperature: updatedStatus.temperature.text,
                humidity: updatedStatus.humidity.text,
            });

            setStatus(updatedStatus);
            setWarnings(updatedWarnings);
        }

    }, [ammonia, temperature, humidity]);

    return (
        <StatsContext.Provider
            value={{
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
            }}
        >
            {children}
        </StatsContext.Provider>
    );
};
