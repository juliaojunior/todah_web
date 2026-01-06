import React from "react";
import { Copy, FileText, ChevronRight } from "lucide-react";
import { GlassContainer } from "../atoms/GlassContainer";
import { Typography } from "../atoms/Typography";
import { cn } from "@/lib/utils";

interface HistoryItemProps {
    theme: string;
    preview: string;
    date: string;
    onClick: () => void;
    onCopy?: (e: React.MouseEvent) => void;
    onPDF?: (e: React.MouseEvent) => void;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({
    theme,
    preview,
    date,
    onClick,
    onCopy,
    onPDF
}) => {
    return (
        <div onClick={onClick} className="group cursor-pointer">
            <GlassContainer intensity="light" className="p-4 flex items-center gap-4 hover:bg-white/10 transition-colors border-transparent hover:border-white/10">
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                        <Typography variant="label" className="text-primary-lilac truncate max-w-[70%]">
                            {theme}
                        </Typography>
                        <span className="text-[10px] text-gray-500">{date}</span>
                    </div>
                    <p className="text-sm text-gray-300 truncate font-medium group-hover:text-white transition-colors">
                        {preview}
                    </p>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {onCopy && (
                        <button onClick={onCopy} className="p-2 hover:bg-white/20 rounded-full text-gray-400 hover:text-white" title="Copiar">
                            <Copy className="w-3 h-3" />
                        </button>
                    )}
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white" />
                </div>
            </GlassContainer>
        </div>
    );
};
