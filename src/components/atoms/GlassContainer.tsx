import { cn } from "@/lib/utils";
import React from "react";

interface GlassContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    intensity?: "light" | "medium" | "heavy";
}

export const GlassContainer: React.FC<GlassContainerProps> = ({
    children,
    className,
    intensity = "medium",
    ...props
}) => {
    return (
        <div
            className={cn(
                "bg-black/20 border border-white/5 rounded-3xl shadow-2xl backdrop-blur-xl relative overflow-hidden",
                {
                    "bg-black/10 backdrop-blur-md": intensity === "light",
                    "bg-black/30 backdrop-blur-xl": intensity === "medium",
                    "bg-black/50 backdrop-blur-2xl": intensity === "heavy",
                },
                className
            )}
            {...props}
        >
            {/* Optional: Add a subtle inner shine or gradient if needed */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-gradient-to-br from-white/5 to-transparent opacity-50" />
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};
