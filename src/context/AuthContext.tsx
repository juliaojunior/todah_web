"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, getUserProfile, googleProvider } from "@/lib/firebase";
import { onAuthStateChanged, User as FirebaseUser, signInWithRedirect, getRedirectResult, signOut as firebaseSignOut, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { UserProfile } from "@/lib/types";
import { Capacitor } from "@capacitor/core";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";

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
        // Handle Redirect Result (Important for Mobile)
        getRedirectResult(auth).catch((error) => {
            console.error("Redirect login failed", error);
            setLoading(false);
        });

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
            if (Capacitor.isNativePlatform()) {
                const result = await FirebaseAuthentication.signInWithGoogle();
                const credential = GoogleAuthProvider.credential(result.credential?.idToken);
                await signInWithCredential(auth, credential);
            } else {
                await signInWithRedirect(auth, googleProvider);
            }
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
                if (Capacitor.isNativePlatform()) {
                    await FirebaseAuthentication.signOut();
                }
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
