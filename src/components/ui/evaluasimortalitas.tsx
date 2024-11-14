import OrbitingCircles from "@/components/ui/orbiting-circles";
import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";
import { BsHeartPulse } from "react-icons/bs";
import { FaTemperatureHigh } from "react-icons/fa";
import { GiRooster } from "react-icons/gi";
import { IoWater } from "react-icons/io5";
import { TbAtom2Filled } from "react-icons/tb";

const Circle = forwardRef<
    HTMLDivElement,
    { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "z-10 flex size-12 items-center justify-center rounded-full border-2 border-purple-300 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
                className,
            )}
        >
            {children}
        </div>
    );
});

Circle.displayName = "Circle";

export function EvaluasiMortalitas() {
    return (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border-2 text-purple-700 border-purple-300 bg-purple-100 p-10 md:shadow-xl">
            <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-black">
                <Circle className="size-16 text-purple-700">
                    <BsHeartPulse/>
                </Circle>
            </span>

            {/* Inner Circles */}
            <OrbitingCircles
                className="size-[30px] border-none bg-transparent"
                duration={20}
                delay={20}
                radius={80}
            >
                <FaTemperatureHigh size={100} />
            </OrbitingCircles>
            <OrbitingCircles
                className="size-[30px] border-none bg-transparent"
                duration={20}
                delay={10}
                radius={80}
            >
                <IoWater size={100} />
            </OrbitingCircles>

            {/* Outer Circles (reverse) */}
            <OrbitingCircles
                className="size-[50px] border-none bg-transparent"
                radius={190}
                duration={20}
                reverse
            >
                <TbAtom2Filled size={100} />
            </OrbitingCircles>
            <OrbitingCircles
                className="size-[50px] border-none bg-transparent"
                radius={190}
                duration={20}
                delay={20}
                reverse
            >
                <GiRooster size={100} />
            </OrbitingCircles>
        </div>
    );
}