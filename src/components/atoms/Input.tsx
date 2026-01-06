import { cn } from "@/lib/utils";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
}

export const Input: React.FC<InputProps> = ({ className, error, ...props }) => {
    return (
        <input
            className={cn(
                "w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/30 transition-all duration-300",
                "focus:outline-none focus:bg-black/40 focus:border-white/30 focus:shadow-[0_0_15px_rgba(255,255,255,0.05)]",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                error && "border-red-500/50 focus:border-red-500",
                className
            )}
            {...props}
        />
    );
};
