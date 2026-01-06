"use client";
import React, { useEffect, useState } from "react";
import { MainLayout } from "@/components/templates/MainLayout";
import { HistoryItem } from "@/components/molecules/HistoryItem";
import { GlassContainer } from "@/components/atoms/GlassContainer";
import { Typography } from "@/components/atoms/Typography";
import { useAuth } from "@/context/AuthContext";
import { getUserHistory } from "@/lib/firebase";
import { Loader2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { generateWorksheetPDF } from "@/lib/pdfService";
import { Button } from "@/components/atoms/Button";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

export default function HistoryPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [history, setHistory] = useState<any[]>([]);
    const [fetching, setFetching] = useState(true);
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
            return;
        }

        if (user && user.uid !== 'guest') {
            getUserHistory(user.uid).then(data => {
                setHistory(data);
                setFetching(false);
            });
        } else {
            setFetching(false);
        }
    }, [user, loading, router]);

    if (loading || fetching) {
        return (
            <MainLayout>
                <div className="flex h-[50vh] items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary-lilac" />
                </div>
            </MainLayout>
        );
    }

    if (selectedItem) {
        return (
            <MainLayout>
                <div className="space-y-6 animate-fade-in-up">
                    <Button variant="ghost" onClick={() => setSelectedItem(null)} className="pl-0 gap-2">
                        <ArrowLeft className="w-4 h-4" /> Voltar
                    </Button>

                    <GlassContainer className="p-6 md:p-8">
                        <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
                            <div>
                                <Typography variant="label" className="text-primary-lilac mb-1">{selectedItem.theme}</Typography>
                                <Typography variant="body" className="text-xs text-gray-500">
                                    {selectedItem.timestamp ? new Date(selectedItem.timestamp.seconds * 1000).toLocaleDateString() : ''}
                                </Typography>
                            </div>
                            <Button
                                variant="primary"
                                className="bg-primary-lilac text-black hover:bg-white text-xs h-auto py-2 px-3"
                                onClick={() => generateWorksheetPDF({ theme: selectedItem.theme, content: selectedItem.adaptedQuestion })}
                            >
                                PDF
                            </Button>
                        </div>

                        <div className="prose prose-invert prose-sm max-w-none text-gray-300">
                            <ReactMarkdown
                                remarkPlugins={[remarkMath]}
                                rehypePlugins={[rehypeKatex]}
                            >{selectedItem.adaptedQuestion}</ReactMarkdown>
                        </div>
                    </GlassContainer>
                </div>
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            <div className="space-y-6 animate-fade-in-up">
                <div className="flex items-center gap-2 mb-2">
                    <Button variant="ghost" onClick={() => router.push("/")} className="pl-0 gap-2 h-auto py-1">
                        <ArrowLeft className="w-4 h-4" /> Voltar para Home
                    </Button>
                </div>
                <Typography variant="h2">Histórico de Adaptações</Typography>

                <div className="space-y-3">
                    {history.length === 0 ? (
                        <div className="text-center py-20 opacity-50">
                            <Typography variant="body">Nenhuma adaptação salva ainda.</Typography>
                        </div>
                    ) : (
                        history.map((item) => (
                            <HistoryItem
                                key={item.id}
                                theme={item.theme}
                                preview={item.adaptedQuestion.substring(0, 100) + "..."}
                                date={item.timestamp ? new Date(item.timestamp.seconds * 1000).toLocaleDateString() : ''}
                                onClick={() => setSelectedItem(item)}
                            />
                        ))
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
