import React from "react";
import { cn } from "@/lib/utils";
import { Typography } from "../atoms/Typography";

interface ThemeOptionProps {
    label: string;
    selected?: boolean;
    onClick: () => void;
    className?: string;
    icon?: React.ReactNode; // Optional icon
}

export const ThemeOption: React.FC<ThemeOptionProps> = ({
    label,
    selected,
    onClick,
    className,
    icon
}) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                "cursor-pointer group relative flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300",
                {
                    "bg-white/10 border-primary-lilac text-white shadow-[0_0_15px_rgba(224,176,255,0.3)] scale-[1.02]": selected,
                    "bg-black/20 border-white/5 text-gray-400 hover:bg-black/30 hover:text-gray-200 hover:border-white/10": !selected
                },
                className
            )}
        >
            {icon && <div className={cn("mb-2 transition-colors", selected ? "text-primary-lilac" : "text-gray-500 group-hover:text-gray-400")}>{icon}</div>}
            <Typography variant="label" className={cn("text-center", selected && "text-white")}>
                {label}
            </Typography>

            {/* Selection Glow */}
            {selected && (
                <div className="absolute inset-0 rounded-2xl ring-1 ring-primary-lilac/50 pointer-events-none" />
            )}
        </div>
    );
};
