import React from "react";
import { Typography } from "../atoms/Typography";
import { Avatar } from "../atoms/Avatar";
import { LogoutButton } from "../molecules/LogoutButton";
import { UserProfile } from "@/lib/types";
import { GlassContainer } from "../atoms/GlassContainer";
import { History } from "lucide-react";
import { Button } from "../atoms/Button";

interface HeaderProps {
    user?: UserProfile | null;
    onLogout: () => void;
    onProfileClick: () => void;
    onHistoryClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout, onProfileClick, onHistoryClick }) => {
    return (
        <div className="w-full flex justify-between items-center py-6 px-4 md:px-0">
            <div className="flex flex-col">
                <Typography variant="h1" className="text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                    ToDAH
                </Typography>
                <Typography variant="caption" className="text-primary-lilac font-bold tracking-widest text-[10px] uppercase">
                    Adaptação Neuradivergente
                </Typography>
            </div>

            {user && (
                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={onHistoryClick} className="p-2 h-auto text-primary-lilac hover:bg-white/5" title="Histórico">
                        <History className="w-5 h-5" />
                    </Button>

                    {/* Profile Trigger */}
                    <button onClick={onProfileClick} className="group relative">
                        <Avatar
                            src={user.photoURL}
                            className="w-10 h-10 border-2 border-white/10 group-hover:border-primary-lilac transition-all shadow-lg"
                        />
                        <div className="absolute inset-0 rounded-full ring-2 ring-primary-lilac opacity-0 group-hover:opacity-50 blur-md transition-opacity" />
                    </button>

                    <LogoutButton onLogout={onLogout} />
                </div>
            )}
        </div>
    );
};
