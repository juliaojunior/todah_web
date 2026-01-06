"use client";
import React, { useEffect } from "react";
import { LoginCard } from "@/components/organisms/LoginCard";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
    const { user, loading, signInWithGoogle } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            router.push("/");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary-lilac" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            {/* Background Decor */}
            <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary-lilac/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>

            <div className="z-10 w-full max-w-md">
                <LoginCard
                    onGoogleLogin={signInWithGoogle}
                    isLoading={loading} // technically auth loading
                />
            </div>
        </div>
    );
}
