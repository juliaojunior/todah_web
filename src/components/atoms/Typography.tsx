import { cn } from "@/lib/utils";
import React from "react";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    variant?: "h1" | "h2" | "h3" | "body" | "caption" | "label";
    className?: string;
    as?: React.ElementType;
    htmlFor?: string;
}

export const Typography: React.FC<TypographyProps> = ({
    children,
    variant = "body",
    className,
    as,
    ...props
}) => {
    const Component = as || (
        variant === "h1" ? "h1" :
            variant === "h2" ? "h2" :
                variant === "h3" ? "h3" :
                    "p"
    );

    const styles = {
        h1: "text-4xl md:text-5xl font-black tracking-tight leading-none text-white",
        h2: "text-2xl md:text-3xl font-bold text-white tracking-tight",
        h3: "text-xl font-bold text-primary-lilac",
        body: "text-base text-gray-200 leading-relaxed",
        caption: "text-sm text-gray-400 font-medium",
        label: "text-xs font-bold uppercase tracking-wider text-gray-400"
    };

    return (
        <Component
            className={cn(styles[variant], className)}
            {...props}
        >
            {children}
        </Component>
    );
};
