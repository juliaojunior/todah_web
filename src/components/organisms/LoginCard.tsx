import React from "react";
import { GlassContainer } from "../atoms/GlassContainer";
import { Typography } from "../atoms/Typography";
import { Button } from "../atoms/Button";
import { LogIn, User } from "lucide-react";

interface LoginCardProps {
    onGoogleLogin: () => void;
    isLoading?: boolean;
}

export const LoginCard: React.FC<LoginCardProps> = ({ onGoogleLogin, isLoading }) => {
    return (
        <GlassContainer intensity="heavy" className="max-w-xs w-full py-16 px-8 flex flex-col items-center text-center justify-between min-h-[600px] animate-fade-in-up">
            <div className="flex-1 flex flex-col items-center justify-center w-full space-y-10">
                <div className="space-y-6 flex flex-col items-center">
                    <div className="mb-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/logo.png"
                            alt="ToDAH Logo"
                            className="w-48 h-auto mx-auto drop-shadow-[0_0_20px_rgba(224,176,255,0.4)]"
                        />
                    </div>
                    <div className="space-y-4">
                        <Typography variant="h2" className="text-3xl font-bold">Bem-vindo ao ToDAH</Typography>
                        <Typography variant="body" className="text-gray-400 text-base leading-relaxed max-w-[260px] mx-auto">
                            Ferramenta de adaptação de atividades escolares para neurodivergentes.
                        </Typography>
                    </div>
                </div>

                <div className="w-full pt-8">
                    <Button
                        variant="primary"
                        className="w-full py-4 text-lg h-14"
                        onClick={onGoogleLogin}
                        disabled={isLoading}
                        leftIcon={<LogIn className="w-6 h-6" />}
                    >
                        Entrar com Google
                    </Button>
                </div>
            </div>

            <Typography variant="caption" className="text-xs text-white/20 mt-8">
                v2.0 • Antigravity Edition
            </Typography>
        </GlassContainer>
    );
};
