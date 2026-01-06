import { cn } from "@/lib/utils";
import React from "react";
import { User } from "lucide-react";

interface AvatarProps {
    src?: string | null;
    alt?: string;
    size?: "sm" | "md" | "lg";
    className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
    src,
    alt = "User",
    size = "md",
    className
}) => {
    const sizeClasses = {
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-16 h-16"
    };

    return (
        <div className={cn(
            "relative rounded-full overflow-hidden bg-white/10 flex items-center justify-center border border-white/10 shrink-0",
            sizeClasses[size],
            className
        )}>
            {src ? (
                <img src={src} alt={alt} className="w-full h-full object-cover" />
            ) : (
                <User className="w-[50%] h-[50%] text-white/50" />
            )}
        </div>
    );
};
