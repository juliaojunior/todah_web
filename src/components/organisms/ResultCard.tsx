import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { GlassContainer } from "../atoms/GlassContainer";
import { Typography } from "../atoms/Typography";
import { Button } from "../atoms/Button";
import { Sparkles, Copy, FileText, RotateCcw } from "lucide-react";
import { LoadingState } from "@/lib/types";

interface ResultCardProps {
    result: string;
    theme: string;
    loadingState: LoadingState;
    onCopy: () => void;
    onDownloadPDF: () => void;
    onReset: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({
    result,
    theme,
    loadingState,
    onCopy,
    onDownloadPDF,
    onReset
}) => {
    if (loadingState === LoadingState.IDLE && !result) return null;

    const isStreaming = loadingState === LoadingState.STREAMING;
    const isError = loadingState === LoadingState.ERROR;

    if (isError) {
        return (
            <GlassContainer className="p-6 text-center border-red-500/30 bg-red-900/10">
                <Typography variant="body" className="text-red-400">
                    Ocorreu um erro ao gerar a adaptação. Tente novamente.
                </Typography>
                <Button variant="ghost" onClick={onReset} className="mt-4">
                    Tentar novamente
                </Button>
            </GlassContainer>
        );
    }

    return (
        <GlassContainer className="p-6 md:p-8 animate-fade-in-up border-primary-lilac/30 shadow-primary-lilac/10">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                    <Sparkles className={isStreaming ? "w-5 h-5 text-primary-lilac animate-pulse" : "w-5 h-5 text-yellow-400"} />
                    <Typography variant="h3" className="text-white">
                        {isStreaming ? "Gerando Adaptação..." : "Questão Adaptada"}
                    </Typography>
                </div>

                {!isStreaming && (
                    <div className="flex gap-2">
                        <Button variant="primary" onClick={onDownloadPDF} className="px-3 py-2 h-auto text-xs">
                            <FileText className="w-3 h-3 mr-1" /> PDF
                        </Button>
                        <Button variant="glass" onClick={onCopy} className="p-2 h-auto" title="Copiar">
                            <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="glass" onClick={onReset} className="p-2 h-auto" title="Nova">
                            <RotateCcw className="w-4 h-4" />
                        </Button>
                    </div>
                )}
            </div>

            <div className="prose prose-invert prose-sm max-w-none text-gray-300">
                <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                        h1: ({ node, ...props }) => <h1 className="text-xl font-bold text-primary-lilac mb-4 mt-6" {...props} />,
                        h2: ({ node, ...props }) => <h2 className="text-lg font-bold text-white mb-3 mt-5" {...props} />,
                        strong: ({ node, ...props }) => <strong className="font-bold text-white" {...props} />,
                        p: ({ node, ...props }) => <p className="leading-relaxed mb-4 text-gray-300" {...props} />,
                        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                        // Custom component for the divider ||| used in Fragment mode
                        hr: ({ node, ...props }) => <hr className="border-white/10 my-6" {...props} />
                    }}
                >
                    {result}
                </ReactMarkdown>
                {isStreaming && (
                    <span className="inline-block w-2 h-4 bg-primary-lilac ml-1 animate-pulse align-middle"></span>
                )}
            </div>
        </GlassContainer>
    );
};
