import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp, query, where, getDocs, doc, deleteDoc, setDoc, getDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { UserProfile } from "./types";

const firebaseConfig = {
    apiKey: "AIzaSyD614Hnh7kACoghzkbdDIixNTrhLz2kv_A",
    authDomain: "todahs-638e8.firebaseapp.com",
    projectId: "todahs-638e8",
    storageBucket: "todahs-638e8.firebasestorage.app",
    messagingSenderId: "649113231124",
    appId: "1:649113231124:web:a09022fe09caaa7ec3ec01"
};

// Initialize Firebase (Singleton pattern)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Database Operations
export const saveHistory = async (userId: string, data: any) => {
    try {
        await addDoc(collection(db, "history"), {
            userId,
            ...data,
            timestamp: serverTimestamp()
        });
    } catch (e) {
        console.error("Error saving history:", e);
    }
};

export const getUserHistory = async (userId: string) => {
    try {
        const q = query(collection(db, "history"), where("userId", "==", userId));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            .sort((a: any, b: any) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
    } catch (e) {
        console.error("Error fetching history:", e);
        return [];
    }
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
        const snapshot = await getDoc(doc(db, "users", userId));
        if (snapshot.exists()) return snapshot.data() as UserProfile;
        return null;
    } catch (e) {
        return null;
    }
};

export const saveUserProfile = async (userId: string, data: Partial<UserProfile>) => {
    try {
        await setDoc(doc(db, "users", userId), data, { merge: true });
    } catch (e) {
        console.error("Error saving profile:", e);
    }
};
