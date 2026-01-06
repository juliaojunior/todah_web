"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, getUserProfile, googleProvider } from "@/lib/firebase";
import { onAuthStateChanged, User as FirebaseUser, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";
import { UserProfile } from "@/lib/types";

interface AuthContextType {
    user: UserProfile | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signInAsGuest: () => void;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signInWithGoogle: async () => { },
    signInAsGuest: () => { },
    signOut: async () => { }
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Fetch extended profile
                const profile = await getUserProfile(firebaseUser.uid);
                setUser({
                    uid: firebaseUser.uid,
                    displayName: firebaseUser.displayName || 'Usuário',
                    email: firebaseUser.email || '',
                    photoURL: profile?.photoURL || firebaseUser.photoURL || undefined
                });
            } else {
                // If we were guest, we might want to stay logged in? No, Firebase handles persistence.
                // But guest mode is local state only usually.
                // For simplicity, we'll reset user if firebase says no user.
                // If guest mode was active, it's not a firebase user.
                // We need to handle guest persistence if needed, but for now simple session.
                if (user?.uid !== 'guest') {
                    setUser(null);
                }
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [user?.uid]);

    const signInWithGoogle = async () => {
        try {
            setLoading(true);
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Login failed", error);
            setLoading(false);
        }
    };

    const signInAsGuest = () => {
        setUser({
            uid: 'guest',
            displayName: 'Visitante',
            email: 'guest@todah.app'
        });
    };

    const signOut = async () => {
        try {
            if (user?.uid !== 'guest') {
                await firebaseSignOut(auth);
            }
            setUser(null);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signInWithGoogle, signInAsGuest, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
