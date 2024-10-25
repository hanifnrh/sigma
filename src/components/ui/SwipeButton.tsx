"use client";

import { easeIn, easeOut, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface SwipeButtonProps {
    className?: string;
    children?: React.ReactNode;
    duration?: number;
}

const SwipeButton = ({
    className,
    children = "Cek Kandang",
    duration = 0.5,
}: SwipeButtonProps) => {
    const sliderVariants = {
        open: {
            width: "176px",
            transition: {
                duration,
                ease: [0.32, 0.72, 0, 1],
            },
        },
        closed: {
            width: "50px",
            transition: {
                duration,
                ease: [0.32, 0.72, 0, 1],
            },
        },
    };

    const textVariants = {
        open: {
            opacity: 0,
            translateX: 10,
            transition: {
                duration: 0.4,
                easeIn,
                bounce: 0,
            },
        },
        closed: {
            opacity: 1,
            translateX: 20,
            transition: {
                duration: 0.4,
                easeOut,
                bounce: 0,
            },
        },
    };

    const buttonVariants = {
        open: {
            opacity: 1,
        },
        closed: {
            opacity: 1,
        },
    };

    const childrenVariants = {
        open: {
            opacity: 1,
            transition: {
                duration: 0.4,
                easeIn,
            },
        },
        closed: {
            opacity: 0,
            transition: {
                duration: 0.4,
                easeOut,
            },
        },
    };

    return (
        <motion.button
            variants={buttonVariants}
            initial="closed"
            whileHover="open"
            whileTap="open"
            className={`relative h-[50px] min-w-[180px] rounded-[10px] bg-popover shadow-[0_0_0_1px_hsl(var(--border))] ${className}`}
        >
            <motion.div
                variants={sliderVariants}
                className="absolute left-[2px] top-[2px] z-10 flex h-[46px] items-center justify-center -space-x-2 rounded-lg bg-primary bg-[linear-gradient(180deg,rgba(94,120,224,1)_0%,rgba(62,56,169,1)_100%)]"
            >
                <motion.div variants={childrenVariants} className="h-7 w-7">
                    <ChevronRight className="h-full w-full animate-pulse text-popover" />
                </motion.div>
                <ChevronRight className="h-7 w-7 animate-pulse text-popover delay-150" />
                <motion.div variants={childrenVariants} className="h-7 w-7">
                    <ChevronRight className="h-full w-full animate-pulse text-popover delay-300" />
                </motion.div>
            </motion.div>
            <motion.div
                variants={textVariants}
                className="translate-x-5 text-medium font-medium text-popover-foreground"
            >
                {children}
            </motion.div>
        </motion.button>
    );
};


export default SwipeButton;