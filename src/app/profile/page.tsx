"use client";
import React from "react";
import { MainLayout } from "@/components/templates/MainLayout";
import { GlassContainer } from "@/components/atoms/GlassContainer";
import { Typography } from "@/components/atoms/Typography";
import { Avatar } from "@/components/atoms/Avatar";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/atoms/Button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const { user, signOut } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut();
        router.push("/login");
    };

    React.useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    if (!user) return null;

    return (
        <MainLayout>
            <div className="space-y-6 animate-fade-in-up">
                <Typography variant="h2">Meu Perfil</Typography>

                <GlassContainer className="p-8 flex flex-col items-center text-center space-y-4">
                    <div className="relative">
                        <Avatar src={user.photoURL} size="lg" className="w-24 h-24 border-4 border-white/5" />
                        <div className="absolute inset-0 rounded-full ring-2 ring-primary-lilac/30 animate-pulse-slow pointer-events-none"></div>
                    </div>

                    <div>
                        <Typography variant="h2" className="text-2xl">{user.displayName}</Typography>
                        <Typography variant="body" className="text-gray-500">{user.email}</Typography>
                    </div>

                    <div className="w-full pt-6 border-t border-white/10 mt-4">
                        <Button variant="ghost" className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10" onClick={handleLogout}>
                            <LogOut className="w-4 h-4 mr-2" />
                            Sair da Conta
                        </Button>
                    </div>
                </GlassContainer>
            </div>
        </MainLayout>
    );
}
