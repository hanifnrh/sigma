// page.tsx

"use client";
import dynamic from 'next/dynamic';

const AreaChart = dynamic(() => import('@/components/ui/AreaChart'), { ssr: false });

export default function GrafikMortalitas() {
    return (
        <main className="p-6 bg-white dark:bg-zinc-900 border rounded-lg h-full w-full">
            <div className="w-full bg-white rounded-lg dark:bg-zinc-900">
                <div className="flex justify-between">
                    <div>
                        <p className="text-base font-normal text-gray-500 dark:text-gray-400">Mortalitas</p>
                        <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">0.5%</h5>
                    </div>
                    <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
                        Normal
                    </div>
                </div>
            </div>
            <AreaChart id="area-chart5" color="#28A745" />
        </main>
    );
}
