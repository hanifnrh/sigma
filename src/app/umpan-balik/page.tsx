"use client";
import ContactForm from '@/components/ui/ContactForm';
import dynamic from 'next/dynamic';
import Navbar from "../navbar";

const AreaChart = dynamic(() => import('@/components/ui/AreaChart'), { ssr: false });

export default function UmpanBalik() {
    return (
        <main className="pt-0 sm:ml-64 bg-white dark:bg-zinc-900">
            <Navbar />
            <div className="flex flex-col md:flex-row w-full h-full">
                <div className="wrapper flex justify-center md:w-1/ h-full">
                    <div className="heading-hero p-10 lg:p-20">
                        <ContactForm></ContactForm>
                    </div>
                </div>
                <div className="wrapper hidden md:flex justify-center w-full md:w-1/2">
                    <div className="heading-hero text-center p-10 lg:p-20 flex flex-col justify-center">
                        <h1 className={`bg-[linear-gradient(107deg,#16CC53_8.32%,#108496_60.18%,#35B6CA_105.75%)] bg-clip-text text-transparent text-3xl title-head lg:text-6xl text-center md:text-start relative font-normal tracking-[-0.04em] col-span-12 lg:col-span-6 lg:leading-[60px] xl:col-span-4`}>
                            Umpan Balik
                        </h1>
                        <p className='body-light text-center md:text-start text-sm lg:text-xl pt-5 sm:pt-10'>
                            Berikan umpan balik terkait sistem SIGMA. Segala kritik dan masukan akan diterima dan dipertimbangkan.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
