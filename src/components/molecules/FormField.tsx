import React from "react";
import { Typography } from "../atoms/Typography";
import { Input } from "../atoms/Input";
import { cn } from "@/lib/utils";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ label, error, className, id, ...props }) => {
    return (
        <div className={cn("space-y-2", className)}>
            <Typography variant="label" as="label" htmlFor={id} className="ml-1">
                {label}
            </Typography>
            <Input id={id} error={!!error} {...props} />
            {error && (
                <p className="text-red-400 text-xs ml-1 font-medium animate-pulse">{error}</p>
            )}
        </div>
    );
};
