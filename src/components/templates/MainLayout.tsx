"use client";
import React from "react";
import { Header } from "../organisms/Header";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const { user, signOut } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut();
        router.push("/login");
    };

    return (
        <div className="min-h-screen flex flex-col max-w-2xl mx-auto px-4 pb-20">
            <Header
                user={user}
                onLogout={handleLogout}
                onProfileClick={() => router.push("/profile")}
                onHistoryClick={() => router.push("/history")}
            />

            <main className="flex-1 w-full animate-fade-in">
                {children}
            </main>

            <footer className="py-6 text-center text-white/20 text-xs font-medium">
                ToDAH © 2024
            </footer>
        </div>
    );
};
