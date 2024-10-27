import { cn } from "@/lib/utils";

const StatusSafe = ({
    children = "Sangat baik",
    status = "success",
    className,
}: {
    children?: React.ReactNode;
    status?: "success" | "warning" | "error" | "info";
    className?: string;
}) => {
    const statusColor = {
        success: "bg-green-500",
        warning: "bg-yellow-500",
        error: "bg-red-500",
        info: "bg-blue-500",
    };

    return (
        <div
            className={cn(
                "relative flex items-center gap-x-2.5 bg-popover px-6 py-3 cursor-pointer",
                className,
            )}
        >
            <div
                className={cn(
                    "h-3 w-3 animate-ping rounded-full",
                    statusColor[status],
                )}
            />
            <div
                className={cn(
                    "absolute left-6 h-3 w-3 rounded-full",
                    statusColor[status],
                )}
            />
            {children}
        </div>
    );
};

export default StatusSafe;

