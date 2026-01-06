import React from "react";
import { cn } from "@/lib/utils";
import { BookOpen, Waves, Layers } from "lucide-react";

export type Mode = 'narrative' | 'sinesthetic' | 'fragment';

interface ModeSwitchProps {
    currentMode: Mode;
    onModeChange: (mode: Mode) => void;
    className?: string;
}

export const ModeSwitch: React.FC<ModeSwitchProps> = ({ currentMode, onModeChange, className }) => {
    const modes: { id: Mode; label: string; icon: React.ReactNode }[] = [
        { id: 'narrative', label: 'Narrativa', icon: <BookOpen className="w-4 h-4" /> },
        { id: 'sinesthetic', label: 'Sinestésico', icon: <Waves className="w-4 h-4" /> },
        { id: 'fragment', label: 'Fragmentado', icon: <Layers className="w-4 h-4" /> },
    ];

    return (
        <div className={cn("flex p-1 bg-black/20 rounded-xl border border-white/5 gap-1", className)}>
            {modes.map((mode) => (
                <button
                    key={mode.id}
                    onClick={() => onModeChange(mode.id)}
                    className={cn(
                        "flex-1 flex flex-col sm:flex-row items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all duration-300",
                        currentMode === mode.id
                            ? "bg-white/10 text-white shadow-lg border border-white/10"
                            : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                    )}
                >
                    {mode.icon}
                    <span>{mode.label}</span>
                </button>
            ))}
        </div>
    );
};
