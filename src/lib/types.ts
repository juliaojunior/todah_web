export enum LoadingState {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    STREAMING = 'STREAMING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR'
}

export type AdaptationMode = 'narrative' | 'sinesthetic' | 'fragment';

export interface AdaptationRequest {
    questionText: string;
    questionImage?: File | null;
    theme: string;
    mode: AdaptationMode;
}

export interface UserProfile {
    uid: string;
    displayName: string;
    email: string;
    photoURL?: string;
    state?: string;
    subject?: string;
}

export const PREDEFINED_THEMES = [
    "Zumbis / Apocalipse",
    "Super-Heróis (Marvel/DC)",
    "Futebol / Copa do Mundo",
    "K-Pop / Show Musical",
    "Games (Minecraft/Roblox)",
    "Cyberpunk / Futurista",
    "Corrida de Fórmula 1",
    "Espaço / Astronautas",
    "Harry Potter / Magia",
    "Investigação Criminal"
];
