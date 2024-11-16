"use client"
import { useNotifications } from "@/components/NotificationContext";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { BsHeartPulse } from "react-icons/bs";
import { FaRegCalendarAlt, FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";
import { GiRooster } from "react-icons/gi";
import { IoWater } from "react-icons/io5";
import { TbAtom2Filled } from "react-icons/tb";

type Status = { text: string; color: string };
interface HistoryRecord {
    timestamp: Date;
    jumlah_ayam: number;
    mortalitas: number;
    usia_ayam: number;
}

interface ParameterData {
    timestamp: string;
    ammonia: number;
    temperature: number;
    humidity: number;
}
interface DataAyamContextType {
    // CURRENT DATA
    jumlahAyam: number;
    setJumlahAyam: (jumlahAyam: number) => void;
    mortalitas: number;
    setMortalitas: (mortalitas: number) => void;
    ageInDays: number;
    setAgeInDays: (ageInDays: number) => void;
    jumlahAwalAyam: number;
    setJumlahAwalAyam: (jumlahAwalAyam: number) => void;
    tanggalMulai: Date | null;
    setTanggalMulai: (tanggalMulai: Date) => void;
    targetTanggal: Date | null;
    setTargetTanggal: (targetTanggal: Date) => void;
    farmingStarted: boolean;
    setFarmingStarted: (farmingStarted: boolean) => void;
    fetchDataChicken: () => Promise<void>;
    ayamDecreasePercentage: number;
    daysToTarget: number | null;
    statusAyam: { mortalitas: Status; daysToTarget: Status; ayamDecreasePercentage: Status };
    ayamId: number;
    // HISTORY
    historyData: HistoryRecord[];
    setHistoryData: (historyData: HistoryRecord[]) => void;
}

type StatsContextType = {
    timestamp: Date | null;
    setTimestamp: (timestamp: Date) => void;
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
    averageScore: number | null;
    setAverageScore: (averageScore: number) => void;
    statusAndColor: { status: string; color: string } | null;

    // HISTORY
    historyParameter: ParameterData[];
    setHistoryParameter: (historyParameter: ParameterData[]) => void;
};

type Notification = {
    data: string;
    status: string;
    timestamp: Date;
    message: string;
    icon: React.ReactNode;
    color: string;
};

const DataContext = createContext<DataAyamContextType & StatsContextType | undefined>(undefined);

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useDataContext must be used within a DataProvider");
    }
    return context;
};

interface DataProviderProps {
    children: ReactNode;
}

const THRESHOLDS = {
    ammonia: { optimal: 20, good: 25, bad: 30 },
    temperature: { veryGood: [26, 32], good: [[20, 25], [33, 34]], bad: [[18, 19], [35, 36]] },
    humidity: { veryGood: [62, 68], good: [[60, 61], [69, 70]], bad: [[58, 59], [71, 72]] },
};

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    const { addNotification } = useNotifications();

    // Chicken data states
    const [jumlahAyam, setJumlahAyam] = useState<number>(0);
    const [mortalitas, setMortalitas] = useState<number>(0);
    const [ageInDays, setAgeInDays] = useState<number>(0);
    const [jumlahAwalAyam, setJumlahAwalAyam] = useState<number>(0);
    const [tanggalMulai, setTanggalMulai] = useState<Date | null>(null);
    const [targetTanggal, setTargetTanggal] = useState<Date | null>(null);
    const [farmingStarted, setFarmingStarted] = useState<boolean>(false);
    const [ayamId, setAyamId] = useState<number>(0);
    // Chicken data history states
    const [historyData, setHistoryData] = useState<HistoryRecord[]>([]);

    // Stats data states
    const [timestamp, setTimestamp] = useState<Date | null>(null);
    const [ammonia, setAmmonia] = useState<number | null>(null);
    const [temperature, setTemperature] = useState<number | null>(null);
    const [humidity, setHumidity] = useState<number | null>(null);
    const [averageScore, setAverageScore] = useState<number | null>(null);
    const [overallStatus, setOverallStatus] = useState<Status>({ text: "Normal", color: "text-green-500" });
    const [historyParameter, setHistoryParameter] = useState<ParameterData[]>([]);
    const sendNotification = (notification: Notification) => {
        addNotification(notification);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/parameters");
                const data = await response.json();

                if (data && Array.isArray(data)) {
                    const latestData = data
                        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
                    const { timestamp, ammonia, temperature, humidity } = latestData;
                    setTimestamp(timestamp);
                    setAmmonia(ammonia);
                    setTemperature(temperature);
                    setHumidity(humidity);
                }
            } catch (error) {
                console.error("Error fetching parameter data:", error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 300000); // Poll every 5 minutes

        return () => clearInterval(interval); // Cleanup
    }, []);

    useEffect(() => {
        const fetchParameterHistory = async () => {
            try {
                const response = await fetch("/api/parameters");
                const data: ParameterData[] = await response.json(); // Ensure the data is of type ParameterData[]

                if (data && Array.isArray(data)) {
                    // Simpan semua data parameter ke dalam riwayat
                    setHistoryParameter(data);
                }
            } catch (error) {
                console.error("Error fetching parameter history:", error);
            }
        };

        fetchParameterHistory();
    }, []);


    const fetchAyamHistory = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/data-ayam/');
            if (!response.ok) {
                throw new Error('Failed to fetch ayam data');
            }

            const allData = await response.json();
            if (allData.length > 0) {
                const record = allData[0];
                const ayamId = record.id;
                setAyamId(ayamId);
                const historyResponse = await fetch(`http://localhost:8000/api/data-ayam/${ayamId}/history/`);
                if (!historyResponse.ok) {
                    throw new Error(`Failed to fetch history for ayam ID: ${ayamId}`);
                }

                const history = await historyResponse.json();
                if (Array.isArray(history)) {
                    setHistoryData(history); // Set history data untuk grafik
                } else {
                    setHistoryData([]);
                    console.log('No history data found.');
                }
            } else {
                setHistoryData([]);
                console.log('No ayam data found.');
            }
        } catch (error) {
            console.error('Error fetching ayam history:', error);
            setHistoryData([]);
        }
    };

    useEffect(() => {
        fetchAyamHistory();
    }, []);


    const getStatusAndColor = (score: number): { status: string; color: string } => {
        if (score >= 90) {
            return { status: "Sangat Baik", color: "text-green-500" };
        } else if (score >= 75) {
            return { status: "Baik", color: "text-blue-500" };
        } else if (score >= 50) {
            return { status: "Buruk", color: "text-yellow-500" };
        } else {
            return { status: "Bahaya", color: "text-red-500" };
        }
    };

    const calculateScore = (value: number | null, type: string): { score: number; status: string; color: string } => {
        let score = 0;

        if (value === null) {
            return { score, ...getStatusAndColor(score) }; // Return default status if value is null
        }

        switch (type) {
            case "ammonia":
                if (value <= THRESHOLDS.ammonia.optimal) score = 100;
                else if (value <= THRESHOLDS.ammonia.good)
                    score =
                        75 +
                        (100 - 75) *
                        (THRESHOLDS.ammonia.good - value) /
                        (THRESHOLDS.ammonia.good - THRESHOLDS.ammonia.optimal);
                else if (value <= THRESHOLDS.ammonia.bad)
                    score =
                        50 +
                        (75 - 50) *
                        (THRESHOLDS.ammonia.bad - value) /
                        (THRESHOLDS.ammonia.bad - THRESHOLDS.ammonia.good);
                else score = 1 + (50 - 1) * (value - THRESHOLDS.ammonia.bad) / (value - THRESHOLDS.ammonia.bad + 1);
                break;

            case "temperature":
                if (value >= THRESHOLDS.temperature.veryGood[0] && value <= THRESHOLDS.temperature.veryGood[1]) score = 100;
                else if (
                    (value >= THRESHOLDS.temperature.good[0][0] && value <= THRESHOLDS.temperature.good[0][1]) ||
                    (value >= THRESHOLDS.temperature.good[1][0] && value <= THRESHOLDS.temperature.good[1][1])
                ) {
                    score =
                        75 +
                        (100 - 75) *
                        (THRESHOLDS.temperature.veryGood[0] - value) /
                        (THRESHOLDS.temperature.veryGood[1] - THRESHOLDS.temperature.veryGood[0]);
                } else if (
                    (value >= THRESHOLDS.temperature.bad[0][0] && value <= THRESHOLDS.temperature.bad[0][1]) ||
                    (value >= THRESHOLDS.temperature.bad[1][0] && value <= THRESHOLDS.temperature.bad[1][1])
                ) {
                    score =
                        50 +
                        (75 - 50) *
                        (THRESHOLDS.temperature.veryGood[1] - value) /
                        (THRESHOLDS.temperature.veryGood[1] - THRESHOLDS.temperature.veryGood[0]);
                } else {
                    score =
                        1 + (50 - 1) * (value - THRESHOLDS.temperature.bad[1][1]) / (value - THRESHOLDS.temperature.bad[0][0]);
                }
                break;

            case "humidity":
                if (value >= THRESHOLDS.humidity.veryGood[0] && value <= THRESHOLDS.humidity.veryGood[1]) score = 100;
                else if (
                    (value >= THRESHOLDS.humidity.good[0][0] && value <= THRESHOLDS.humidity.good[0][1]) ||
                    (value >= THRESHOLDS.humidity.good[1][0] && value <= THRESHOLDS.humidity.good[1][1])
                )
                    score =
                        75 +
                        (100 - 75) *
                        (THRESHOLDS.humidity.veryGood[0] - value) /
                        (THRESHOLDS.humidity.veryGood[1] - THRESHOLDS.humidity.veryGood[0]);
                else if (
                    (value >= THRESHOLDS.humidity.bad[0][0] && value <= THRESHOLDS.humidity.bad[0][1]) ||
                    (value >= THRESHOLDS.humidity.bad[1][0] && value <= THRESHOLDS.humidity.bad[1][1])
                ) {
                    score =
                        50 +
                        (75 - 50) *
                        (THRESHOLDS.humidity.veryGood[1] - value) /
                        (THRESHOLDS.humidity.veryGood[1] - THRESHOLDS.humidity.veryGood[0]);
                } else {
                    score =
                        1 + (50 - 1) * (value - THRESHOLDS.humidity.bad[1][1]) / (value - THRESHOLDS.humidity.bad[0][0]);
                }
                break;

            default:
                break;
        }

        return { score, ...getStatusAndColor(score) };
    };

    const statusAndColor = averageScore !== null ? getStatusAndColor(averageScore) : null;

    useEffect(() => {
        const score = calculateAverageScore();
        setAverageScore(score);
    }, [ammonia, temperature, humidity]);


    // Function to calculate the average score
    const calculateAverageScore = (): number => {
        const ammoniaScore = ammonia ? calculateScore(ammonia, 'ammonia').score : 0;
        const temperatureScore = temperature ? calculateScore(temperature, 'temperature').score : 0;
        const humidityScore = humidity ? calculateScore(humidity, 'humidity').score : 0;

        const averageScore = (ammoniaScore + temperatureScore + humidityScore) / 3;
        return Math.round(averageScore); // Round the result
    };


    const updateAverageScore = async (averageScore: number) => {
        const data = {
            score: averageScore, // Only the field you want to update
        };

        try {
            // Fetch existing data
            const response = await fetch('http://localhost:8000/api/parameters/');
            if (!response.ok) {
                throw new Error('Failed to fetch chicken data');
            }

            const allData = await response.json();

            if (allData.length > 0) {
                // Assume first record for update
                const record = allData[0];

                // Patch existing record
                const updateResponse = await fetch(`http://localhost:8000/api/parameters/${record.id}/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (!updateResponse.ok) {
                    const errorResult = await updateResponse.json();
                    console.error('Error updating record:', errorResult);
                    throw new Error('Failed to update chicken data');
                }

                const updatedRecord = await updateResponse.json();
                console.log('Chicken data updated:', updatedRecord);
            } else {
                // Create new record
                const createResponse = await fetch('http://localhost:8000/api/parameters/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ammonia,
                        temperature,
                        humidity,
                        score: averageScore,
                    }),
                });

                if (!createResponse.ok) {
                    const errorResult = await createResponse.json();
                    console.error('Error creating record:', errorResult);
                    throw new Error('Failed to create chicken data');
                }

                const createdRecord = await createResponse.json();
                console.log('New chicken data created:', createdRecord);
            }

            setAverageScore(averageScore); // Update local state
        } catch (error) {
            console.error('Error in updateAverageScore:', error);
            alert('An error occurred while updating the chicken data.');
        }
    };

    useEffect(() => {
        if (ammonia !== null && temperature !== null && humidity !== null) {
            const score = calculateAverageScore();
            setAverageScore(score);

            // Call the update function with the new score
            updateAverageScore(score);
        }
    }, [ammonia, temperature, humidity]); // Dependencies

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
            if (prevStatus.ammonia !== updatedStatus.ammonia.text) {
                sendNotification({
                    data: "Amonia",
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
            if (prevStatus.ammonia !== updatedStatus.ammonia.text) {
                sendNotification({
                    data: "Amonia",
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
                    data: "Suhu",
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
                    data: "Kelembapan",
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

    // Fetch chicken data
    const fetchDataChicken = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/data-ayam/');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
                const latestData = data[0];
                setJumlahAwalAyam(latestData.jumlah_ayam_awal);
                setTanggalMulai(new Date(latestData.tanggal_mulai));
                setTargetTanggal(new Date(latestData.tanggal_panen));
                setJumlahAyam(latestData.jumlah_ayam);
                setMortalitas(latestData.mortalitas);
                setAgeInDays(latestData.usia_ayam);
                setFarmingStarted(true);
            } else {
                setFarmingStarted(false);
                setJumlahAwalAyam(0);
                setTanggalMulai(new Date());
                setTargetTanggal(new Date());
                setJumlahAyam(0);
                setMortalitas(0);
                setAgeInDays(0);
            }
        } catch (error) {
            console.error('Error fetching ayam data:', error);
            setFarmingStarted(false);
            setJumlahAwalAyam(0);
            setTanggalMulai(new Date());
            setTargetTanggal(new Date());
            setJumlahAyam(0);
            setMortalitas(0);
            setAgeInDays(0);
        }
    };

    useEffect(() => {
        fetchDataChicken();
    }, []);

    const ayamDecreasePercentage =
        jumlahAwalAyam > 0 ? ((jumlahAwalAyam - jumlahAyam) / jumlahAwalAyam) * 100 : 0;

    const daysToTarget = targetTanggal
        ? Math.floor((targetTanggal.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) - ageInDays
        : null;

    const [statusAyam, setStatusAyam] = useState({
        mortalitas: { text: "Sangat Baik", color: "text-green-500" },
        daysToTarget: { text: "Baik", color: "text-blue-500" },
        ayamDecreasePercentage: { text: "Baik", color: "text-blue-500" },
    });

    const [warningsAyam, setWarningsAyam] = useState({
        mortalitas: "",
        daysToTarget: "",
        ayamDecreasePercentage: "",
    });

    const [prevStatusAyam, setPrevStatusAyam] = useState({
        mortalitas: "Sangat Baik",
        daysToTarget: "Siap",
        ayamDecreasePercentage: "Baik",
    });

    useEffect(() => {
        const updatedStatusAyam = { ...statusAyam };
        const updatedWarningsAyam = { ...warningsAyam };
        if (mortalitas > 5) {
            updatedStatusAyam.mortalitas = { text: "Bahaya", color: "text-red-500" };
            updatedWarningsAyam.mortalitas = "Segera tinjau kandang";
            if (prevStatusAyam.mortalitas !== updatedStatusAyam.mortalitas.text) {
                sendNotification({
                    data: "Mortalitas",
                    status: "Bahaya",
                    timestamp: new Date(),
                    message: "Segera tinjau kandang!",
                    icon: <BsHeartPulse />,
                    color: updatedStatusAyam.mortalitas.color,
                });
            }
        }
        if (ayamDecreasePercentage > 5) {
            updatedStatusAyam.ayamDecreasePercentage = { text: "Bahaya", color: "text-red-500" };
            updatedWarningsAyam.ayamDecreasePercentage = "Segera tinjau kandang";
            if (prevStatusAyam.ayamDecreasePercentage !== updatedStatusAyam.ayamDecreasePercentage.text) {
                sendNotification({
                    data: "Jumlah Ayam",
                    status: "Bahaya",
                    timestamp: new Date(),
                    message: "Segera tinjau kandang!",
                    icon: <GiRooster />,
                    color: updatedStatusAyam.mortalitas.color,
                });
            }
        }
        if (daysToTarget !== null && daysToTarget <= 7) {
            updatedStatusAyam.daysToTarget = { text: "Siap", color: "text-green-500" };
            updatedWarningsAyam.daysToTarget = "Sudah dekat tanggal panen";
            if (prevStatusAyam.daysToTarget !== updatedStatusAyam.daysToTarget.text) {
                sendNotification({
                    data: "Usia Ayam",
                    status: "Siap",
                    timestamp: new Date(),
                    message: "Sudah dekat tanggal panen",
                    icon: <FaRegCalendarAlt />,
                    color: updatedStatusAyam.daysToTarget.color,
                });
            }
        }

        if (
            prevStatusAyam.mortalitas !== updatedStatusAyam.mortalitas.text ||
            prevStatusAyam.ayamDecreasePercentage !== updatedStatusAyam.ayamDecreasePercentage.text ||
            prevStatusAyam.daysToTarget !== updatedStatusAyam.daysToTarget.text
        ) {
            setPrevStatusAyam({
                mortalitas: updatedStatusAyam.mortalitas.text,
                ayamDecreasePercentage: updatedStatusAyam.ayamDecreasePercentage.text,
                daysToTarget: updatedStatusAyam.daysToTarget.text,
            });
            setStatusAyam(updatedStatusAyam);
            setWarningsAyam(updatedWarningsAyam);
        }
    }, [mortalitas, ayamDecreasePercentage, daysToTarget, sendNotification]);

    return (
        <DataContext.Provider
            value={{
                // Chicken data
                jumlahAyam,
                setJumlahAyam,
                mortalitas,
                setMortalitas,
                ageInDays,
                setAgeInDays,
                jumlahAwalAyam,
                setJumlahAwalAyam,
                tanggalMulai,
                setTanggalMulai,
                targetTanggal,
                setTargetTanggal,
                farmingStarted,
                setFarmingStarted,
                fetchDataChicken,
                ayamDecreasePercentage,
                daysToTarget,
                statusAyam,
                ayamId,

                // Chicken history
                historyData,
                setHistoryData,

                // Stats data
                timestamp,
                setTimestamp,
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
                averageScore,
                setAverageScore,
                statusAndColor,
                historyParameter,
                setHistoryParameter,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
