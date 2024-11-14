import Ripple from "@/components/ui/ripple";
import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";

const Circle = forwardRef<
    HTMLDivElement,
    { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "z-10 flex size-12 items-center justify-center rounded-full border-2 border-green-300 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
                className,
            )}
        >
            {children}
        </div>
    );
});

Circle.displayName = "Circle";

export function Notifikasi() {
    return (
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-green-300 bg-background md:shadow-xl">
            <div className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-white">
                <Circle className="size-16 text-green-700">
                    <IoMdNotificationsOutline />
                </Circle>
            </div>
            <Ripple />
        </div>
    );
}
