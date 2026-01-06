"use client";
import React, { useState } from "react";
import { MainLayout } from "@/components/templates/MainLayout";
import { AdaptationForm } from "@/components/organisms/AdaptationForm";
import { ResultCard } from "@/components/organisms/ResultCard";
import { generateAdaptationAction } from "@/actions/generate";
import { LoadingState, AdaptationMode } from "@/lib/types";
import { saveHistory } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { generateWorksheetPDF } from "@/lib/pdfService";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [result, setResult] = useState("");
  const [currentTheme, setCurrentTheme] = useState("");

  // Auth protection
  React.useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (!loading && !user) return null;

  const handleAdapt = async (
    question: string,
    theme: string,
    mode: AdaptationMode,
    image: File | null
  ) => {
    setLoadingState(LoadingState.LOADING);
    setResult("");
    setCurrentTheme(theme);

    // Create FormData for Server Action
    const formData = new FormData();
    formData.append("question", question);
    formData.append("theme", theme);
    formData.append("mode", mode);
    if (image) formData.append("image", image);

    try {
      const response = await generateAdaptationAction(null, formData);

      if (response.success && response.text) {
        setResult(response.text);
        setLoadingState(LoadingState.SUCCESS);

        // Save to History (if not guest)
        if (user && user.uid !== 'guest') {
          await saveHistory(user.uid, {
            originalQuestion: question,
            theme: `${theme} (${mode})`,
            adaptedQuestion: response.text,
            hasImage: !!image,
            mode: mode
          });
        }
      } else {
        console.error(response.error);
        setLoadingState(LoadingState.ERROR);
      }
    } catch (e) {
      console.error(e);
      setLoadingState(LoadingState.ERROR);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in-up">
        {/* Only show Form if not Success (or allow scrolling? Layout preference: Hide form to focus on result? Or stack?) 
            Original app stacked/replaced view. Let's stack but scroll or keep it clean.
            Actually, let's keep the form visible so they can edit, OR show result below.
            ResultCard handles its own visibility.
        */}

        <AdaptationForm
          onAdapt={handleAdapt}
          loadingState={loadingState}
        />

        <div id="result-section">
          <ResultCard
            result={result}
            theme={currentTheme}
            loadingState={loadingState}
            onCopy={() => navigator.clipboard.writeText(result)}
            onDownloadPDF={() => generateWorksheetPDF({ theme: currentTheme, content: result })}
            onReset={() => {
              setResult("");
              setLoadingState(LoadingState.IDLE);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      </div>
    </MainLayout>
  );
}
