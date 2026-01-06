import React from "react";
import { LogOut } from "lucide-react";
import { Button } from "../atoms/Button";
import { cn } from "@/lib/utils";

interface LogoutButtonProps {
    className?: string;
    onLogout: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ className, onLogout }) => {
    return (
        <Button
            variant="ghost"
            onClick={onLogout}
            className={cn("text-gray-400 hover:text-red-400 transition-colors gap-2", className)}
            title="Sair da conta"
        >
            <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Sair</span>
            <LogOut className="w-4 h-4" />
        </Button>
    );
};
