"use client";
import dynamic from 'next/dynamic';

const AreaChart = dynamic(() => import('@/components/ui/AreaChart'), { ssr: false });

export default function GrafikAmonia() {
    return (
        <main className="p-6 bg-white dark:bg-zinc-900 border rounded-lg w-full">
            <div className="w-full bg-white rounded-lg dark:bg-zinc-900">
                <div className="flex justify-between">
                    <div>
                        <p className="text-base font-normal text-gray-500 dark:text-gray-400">Amonia</p>
                        <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">20 ppm</h5>
                    </div>
                    <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
                        12%
                        <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
                        </svg>
                    </div>
                </div>
            </div>
            <AreaChart id="area-chart1" color="#28A745" />
        </main>
    );
}
