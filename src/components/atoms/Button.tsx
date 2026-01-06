import { cn } from "@/lib/utils";
import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "glass" | "ghost";
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    className,
    variant = "primary",
    isLoading = false,
    leftIcon,
    disabled,
    ...props
}) => {
    return (
        <button
            disabled={disabled || isLoading}
            className={cn(
                "relative flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
                {
                    "bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.3)]": variant === "primary", // White premium button
                    "bg-white/10 hover:bg-white/20 border border-white/10 text-white backdrop-blur-md": variant === "glass",
                    "bg-transparent hover:bg-white/5 text-gray-400 hover:text-white": variant === "ghost"
                },
                className
            )}
            {...props}
        >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {!isLoading && leftIcon}
            <span>{children}</span>
        </button>
    );
};
