import { FaTemperatureLow } from "react-icons/fa";
import { IoWater } from "react-icons/io5";
import { MdOutlineCo2 } from "react-icons/md";
import { SiOxygen } from "react-icons/si";
import { TbAtom2Filled } from "react-icons/tb";
const StatsWidget = () => {
    return (
        <div className="flex flex-col justify-center items-center pt-10">
            <div className="min-w-[375px] md:min-w-[700px] xl:min-w-[800px] mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
                <div className="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:bg-black dark:text-white dark:shadow-none">
                    <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                    <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                        <span className="flex items-center text-brand-500 dark:text-white">
                        <TbAtom2Filled size={30} />
                        </span>
                    </div>
                    </div>
                    <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                    <p className="font-dm text-sm font-medium text-gray-600 dark:text-white">Ammonia</p>
                    <h4 className="text-xl font-bold text-green-700 dark:text-green-700">20 ppm</h4>
                    </div>
                </div>
                <div className="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:bg-black dark:text-white dark:shadow-none">
                    <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                    <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                        <span className="flex items-center text-brand-500 dark:text-white">
                        <FaTemperatureLow size={30} />
                        </span>
                    </div>
                    </div>
                    <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                    <p className="font-dm text-sm font-medium text-gray-600 dark:text-white">Temperature</p>
                    <h4 className="text-xl font-bold text-blue-700 dark:text-blue-700">28 °C</h4>
                    </div>
                </div>
                <div className="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:bg-black dark:text-white dark:shadow-none">
                    <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                    <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                        <span className="flex items-center text-brand-500 dark:text-white">
                        <IoWater size={30}/>
                        </span>
                    </div>
                    </div>
                    <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                    <p className="font-dm text-sm font-medium text-gray-600 dark:text-white">Humidity</p>
                    <h4 className="text-xl font-bold text-blue-700 dark:text-blue-700">55%</h4>
                    </div>
                </div>
                <div className="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:bg-black dark:text-white dark:shadow-none">
                    <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                    <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                        <span className="flex items-center text-brand-500 dark:text-white">
                        <SiOxygen size={30} />
                        </span>
                    </div>
                    </div>
                    <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                    <p className="font-dm text-sm font-medium text-gray-600 dark:text-white">Oxygen Level</p>
                    <h4 className="text-xl font-bold text-blue-700 dark:text-blue-700">25%</h4>
                    </div>
                </div>
                <div className="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:bg-black dark:text-white dark:shadow-none">
                    <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                    <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                        <span className="flex items-center text-brand-500 dark:text-white">
                        <MdOutlineCo2 size={30} />
                        </span>
                    </div>
                    </div>
                    <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                    <p className="font-dm text-sm font-medium text-gray-600 dark:text-white">Carbon Dioxide</p>
                    <h4 className="text-xl font-bold text-green-700 dark:text-green-700">0,1%</h4>
                    </div>
                </div>
                <div className="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:bg-black dark:text-white dark:shadow-none">
                    <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                    <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                        <span className="flex items-center text-brand-500 dark:text-white">
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 24 24"
                            className="h-7 w-7"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M4 9h4v11H4zM16 13h4v7h-4zM10 4h4v16h-4z"></path>
                        </svg>
                        </span>
                    </div>
                    </div>
                    <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                    <p className="font-dm text-sm font-medium text-gray-600 dark:text-white">Overall Status</p>
                    <h4 className="text-xl font-bold text-blue-700 dark:text-blue-700">Good</h4>
                    </div>
                </div>
                </div>  
        </div>
    );
};

export default StatsWidget;
