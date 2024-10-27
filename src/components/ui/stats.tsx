import { BiStats } from "react-icons/bi";
import { FaTemperatureLow } from "react-icons/fa";
import { IoWater } from "react-icons/io5";
import { TbAtom2Filled } from "react-icons/tb";
const StatsWidget = () => {
    return (
        <div className="flex justify-between items-center w-full p-4">
            <div className="w-full grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-4">
                <div className="relative flex flex-grow !flex-row flex-col items-center justify-center rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:bg-black dark:text-white dark:shadow-none p-7">
                    <div className="flex h-[90px] w-auto flex-row items-center">
                        <div className="rounded-full bg-lightPrimary  dark:bg-navy-700">
                            <span className="flex items-center text-brand-500 dark:text-white">
                                <TbAtom2Filled size={30} />
                            </span>
                        </div>
                    </div>
                    <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                        <p className="font-dm text-xl font-medium text-gray-600 dark:text-white">Amonia</p>
                        <h4 className="text-3xl body-bold text-green-500 dark:text-green-700">20 ppm</h4>
                    </div>
                </div>
                <div className="relative flex flex-grow !flex-row flex-col items-center justify-center rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:bg-black dark:text-white dark:shadow-none p-7">
                    <div className="flex h-[90px] w-auto flex-row items-center">
                        <div className="rounded-full bg-lightPrimary  dark:bg-navy-700">
                            <span className="flex items-center text-brand-500 dark:text-white">
                                <FaTemperatureLow size={30} />
                            </span>
                        </div>
                    </div>
                    <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                        <p className="font-dm text-xl font-medium text-gray-600 dark:text-white">Suhu</p>
                        <h4 className="text-3xl body-bold text-blue-500 dark:text-blue-500">28 °C</h4>
                    </div>
                </div>
                <div className="relative flex flex-grow !flex-row flex-col items-center justify-center rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:bg-black dark:text-white dark:shadow-none p-7">
                    <div className="flex h-[90px] w-auto flex-row items-center">
                        <div className="rounded-full bg-lightPrimary  dark:bg-navy-700">
                            <span className="flex items-center text-brand-500 dark:text-white">
                                <IoWater size={30} />
                            </span>
                        </div>
                    </div>
                    <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                        <p className="font-dm text-xl font-medium text-gray-600 dark:text-white">Kelembapan</p>
                        <h4 className="text-3xl body-bold text-blue-500 dark:text-blue-500">55%</h4>
                    </div>
                </div>
                <div className="relative flex flex-grow !flex-row flex-col items-center justify-center rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:bg-black dark:text-white dark:shadow-none p-7">
                    <div className="flex h-[90px] w-auto flex-row items-center">
                        <div className="rounded-full bg-lightPrimary dark:bg-navy-700">
                            <span className="flex items-center text-brand-500 dark:text-white">
                                <BiStats size={30} />
                            </span>
                        </div>
                    </div>
                    <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                        <p className="font-dm text-xl font-medium text-gray-600 dark:text-white">Status total</p>
                        <h4 className="text-3xl body-bold text-blue-500 dark:text-blue-500">Baik</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsWidget;
