import { Input } from "@/components/ui/input";
import React, { ChangeEvent, CSSProperties, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
const AyamCounter: React.FC = () => {
    const [counter, setCounter] = useState<number>(0);
    const [initialCount, setInitialCount] = useState<number>(0);

    const handleInitialCountChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInitialCount(Number(event.target.value));
    };

    const handleReset = () => {
        setCounter(initialCount);
    };

    const handleClick1 = () => {
        setCounter(counter + 1);
    };

    const handleClick2 = () => {
        setCounter(counter - 1);
    };

    return (
        <div className="py-6 px-12 h-full flex justify-center items-center flex-col">
            <h2 className="text-xl">
                Jumlah Ayam
            </h2>
            <div style={styles.counterValue}>
                {counter}
            </div>
            <div className="flex justify-between w-full">
                <button
                    onClick={handleClick1}
                    className="border-2 cursor-pointer px-4 py-2 rounded-lg">
                    <FaPlus />
                </button>
                <button
                    onClick={handleClick2}
                    className="border-2 cursor-pointer px-4 py-2 rounded-lg">
                    <FaMinus />
                </button>
            </div>
            <div className="w-full flex items-center justify-between mt-10">
                <Input type="number" placeholder="Masukkan jumlah ayam" value={initialCount}
                    onChange={handleInitialCountChange} className="mr-2" />
                <button
                    onClick={handleReset}
                    className="bg-blue-700 text-white rounded-lg ml-2 w-48 p-2"
                >
                    Isi jumlah ayam
                </button>
            </div>
        </div>
    );
};

const styles: { [key: string]: CSSProperties } = {
    counterValue: {
        fontSize: "3rem",
        fontWeight: "bold",
        margin: "1rem 0",
        color: "#007bff",
    },
};

export default AyamCounter;
