import { cn } from "@/lib/utils";
import React from "react";
import { LucideIcon } from "lucide-react";

interface IconWrapperProps {
    icon: LucideIcon;
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
}

export const IconWrapper: React.FC<IconWrapperProps> = ({
    icon: Icon,
    size = "md",
    className
}) => {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
        xl: "w-8 h-8"
    };

    return (
        <div className={cn("flex items-center justify-center text-current", className)}>
            <Icon className={sizeClasses[size]} />
        </div>
    );
};
