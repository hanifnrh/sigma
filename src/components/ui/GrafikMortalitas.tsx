"use client";
import { useDataContext } from "@/components/DataContext";
import dynamic from 'next/dynamic';
const AreaChart = dynamic(() => import('@/components/ui/AreaChart'), { ssr: false });

export default function GrafikMortalitas() {
    const {mortalitas, statusAyam} = useDataContext();
    return (
        <main className="p-6 bg-white dark:bg-zinc-900 border rounded-lg w-full">
            <div className="w-full bg-white rounded-lg dark:bg-zinc-900">
                <div className="flex justify-between">
                    <div>
                        <p className="text-base font-normal text-gray-500 dark:text-gray-400">Mortalitas</p>
                        <h5 className={`leading-none text-3xl font-bold ${statusAyam.mortalitas.color} pb-2`}>{mortalitas}</h5>
                    </div>
                    <div className={`flex items-center px-2.5 py-0.5 text-base font-semibold  ${statusAyam.mortalitas.color} dark:text-green-500 text-center`}>
                        {statusAyam.mortalitas.text}
                    </div>
                </div>
            </div>
            <AreaChart id="mortalitas" color="#28A745" apiUrl="http://127.0.0.1:8000/api/data-ayam/" dataType="mortalitas" />
        </main>
    );
}
