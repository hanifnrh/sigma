"use client"
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface DataAyamContextType {
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
    fetchData: () => Promise<void>;
}

// Create the context
const DataAyamContext = createContext<DataAyamContextType | undefined>(undefined);

// Custom hook to access the context
export const useDataAyam = () => {
    const context = useContext(DataAyamContext);
    if (!context) {
        throw new Error('useDataAyam must be used within a DataAyamProvider');
    }
    return context;
};

// Define the props for the DataAyamProvider, including `children`
interface DataAyamProviderProps {
    children: ReactNode;
}

export const DataAyamProvider: React.FC<DataAyamProviderProps> = ({ children }) => {
    const [jumlahAyam, setJumlahAyam] = useState<number>(0);
    const [mortalitas, setMortalitas] = useState<number>(0);
    const [ageInDays, setAgeInDays] = useState<number>(0);
    const [jumlahAwalAyam, setJumlahAwalAyam] = useState<number>(0);
    const [tanggalMulai, setTanggalMulai] = useState<Date | null>(null);
    const [targetTanggal, setTargetTanggal] = useState<Date | null>(null);
    const [farmingStarted, setFarmingStarted] = useState<boolean>(false);

    // Function to fetch the data
    const fetchData = async () => {
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
        fetchData();
    }, []);

    return (
        <DataAyamContext.Provider
            value={{
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
                fetchData
            }}
        >
            {children}
        </DataAyamContext.Provider>
    );
};
