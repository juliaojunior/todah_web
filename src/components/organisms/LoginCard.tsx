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
        <GlassContainer intensity="heavy" className="max-w-md w-full p-8 md:p-12 flex flex-col items-center text-center space-y-8 animate-fade-in-up">
            <div className="space-y-2">
                <div className="mb-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/logo.png"
                        alt="ToDAH Logo"
                        className="w-40 h-auto mx-auto drop-shadow-[0_0_20px_rgba(224,176,255,0.4)]"
                    />
                </div>
                <Typography variant="h2">Bem-vindo ao ToDAH</Typography>
                <Typography variant="body" className="text-gray-400 text-sm max-w-xs mx-auto">
                    Ferramenta de adaptação de atividades escolares para neurodivergentes.
                </Typography>
            </div>

            <div className="w-full space-y-3">
                <Button
                    variant="primary"
                    className="w-full py-4 text-base"
                    onClick={onGoogleLogin}
                    disabled={isLoading}
                    leftIcon={<LogIn className="w-5 h-5" />}
                >
                    Entrar com Google
                </Button>


            </div>

            <Typography variant="caption" className="text-xs text-white/20">
                v2.0 • Antigravity Edition
            </Typography>
        </GlassContainer>
    );
};
