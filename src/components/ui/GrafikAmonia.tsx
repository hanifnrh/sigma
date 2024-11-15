"use client";
import { useDataContext } from "@/components/DataContext";
import dynamic from 'next/dynamic';
const AreaChart = dynamic(() => import('@/components/ui/AreaChart'), { ssr: false });

export default function GrafikAmonia() {
    const { ammonia, status } = useDataContext();
    return (
        <main className="p-6 bg-white dark:bg-zinc-900 border rounded-lg w-full">
            <div className="w-full bg-white rounded-lg dark:bg-zinc-900">
                <div className="flex justify-between">
                    <div>
                        <p className="text-base font-normal text-gray-500 dark:text-gray-400">Amonia</p>
                        <h5 className={`leading-none text-3xl font-bold ${status.ammonia.color} pb-2`}>{ammonia} ppm</h5>
                    </div>
                    <div className={`flex items-center px-2.5 py-0.5 text-base font-semibold ${status.ammonia.color} text-center`}>
                        {status.ammonia.text}
                    </div>
                </div>
            </div>
            <AreaChart id="ammonia" color="#28A745" apiUrl="http://127.0.0.1:8000/api/parameters/" dataType="ammonia" />
        </main>
    );
}
