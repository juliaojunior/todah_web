import React, { useState, useRef } from "react";
import { GlassContainer } from "../atoms/GlassContainer";
import { Typography } from "../atoms/Typography";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { ThemeOption } from "../molecules/ThemeOption";
import { ModeSwitch, Mode } from "../molecules/ModeSwitch";
import { PREDEFINED_THEMES, LoadingState } from "@/lib/types";
import { Upload, X, Image as ImageIcon, Sparkles } from "lucide-react";

interface AdaptationFormProps {
    onAdapt: (
        question: string,
        theme: string,
        mode: Mode,
        image: File | null
    ) => void;
    loadingState: LoadingState;
}

export const AdaptationForm: React.FC<AdaptationFormProps> = ({ onAdapt, loadingState }) => {
    const [question, setQuestion] = useState("");
    const [theme, setTheme] = useState("");
    const [mode, setMode] = useState<Mode>('narrative');
    const [image, setImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = () => {
        if ((!question && !image) || !theme) return;
        onAdapt(question, theme, mode, image);
    };

    const isLoading = loadingState === LoadingState.LOADING || loadingState === LoadingState.STREAMING;

    return (
        <GlassContainer className="p-6 md:p-8 space-y-8">
            {/* Mode Selection */}
            <div>
                <Typography variant="label" className="mb-3 block">Modo de Adaptação</Typography>
                <ModeSwitch currentMode={mode} onModeChange={setMode} />
            </div>

            {/* Question Input */}
            <div className="relative group">
                <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Cole o enunciado da questão aqui..."
                    className="w-full h-40 p-5 bg-black/20 text-gray-200 border border-white/10 rounded-2xl focus:outline-none focus:bg-black/40 focus:border-primary-lilac/50 resize-none transition-all placeholder-white/30 text-base leading-relaxed"
                    disabled={isLoading}
                />

                <div className="absolute bottom-3 right-3 flex gap-2">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                    />
                    <Button
                        variant="glass"
                        className="p-2 h-auto rounded-lg"
                        onClick={() => fileInputRef.current?.click()}
                        title="Upload Imagem"
                        disabled={isLoading}
                    >
                        <Upload className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Image Preview */}
            {image && (
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-xl animate-fade-in">
                    <div className="w-10 h-10 bg-primary-lilac/20 rounded-lg flex items-center justify-center text-primary-lilac">
                        <ImageIcon className="w-5 h-5" />
                    </div>
                    <Typography variant="caption" className="flex-1 truncate text-white">{image.name}</Typography>
                    <button onClick={() => setImage(null)} className="text-gray-500 hover:text-white transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Theme Selection */}
            <div className="space-y-3">
                <Typography variant="label">Escolha um Tema de Hiperfoco</Typography>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                    {PREDEFINED_THEMES.map((t) => (
                        <ThemeOption
                            key={t}
                            label={t}
                            selected={theme === t}
                            onClick={() => setTheme(t)}
                            className="py-3 px-2 text-xs"
                        />
                    ))}
                </div>
            </div>

            {/* Action */}
            <Button
                variant="primary"
                className="w-full py-4 bg-gradient-to-r from-primary-lilac to-purple-600 border-none text-white shadow-lg hover:shadow-primary-lilac/20"
                onClick={handleSubmit}
                isLoading={isLoading}
                disabled={(!question && !image) || !theme}
                leftIcon={!isLoading && <Sparkles className="w-5 h-5 fill-white" />}
            >
                {isLoading ? "Adaptando..." : "Gerar Adaptação"}
            </Button>
        </GlassContainer>
    );
};
