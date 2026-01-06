import { jsPDF } from "jspdf";

interface PDFData {
    theme: string;
    content: string;
}

export const generateWorksheetPDF = (data: PDFData) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxLineWidth = pageWidth - (margin * 2);
    let currentY = 20;

    // --- Header ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(60, 60, 60);
    doc.text("ToDAH", margin, currentY);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text("Atividade Adaptada", margin, currentY + 5);

    // Theme Badge styled text
    doc.setFontSize(10);
    doc.setTextColor(168, 85, 247); // Primary purple
    const themeText = `Tema: ${data.theme}`;
    const themeWidth = doc.getTextWidth(themeText);
    doc.text(themeText, pageWidth - margin - themeWidth, currentY);

    currentY += 20;

    // --- Student Info Fields ---
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text("Nome: _______________________________________________________", margin, currentY);
    doc.text("Data: ____/____/_______", pageWidth - margin - 50, currentY);

    currentY += 15;

    // Separator
    doc.setDrawColor(168, 85, 247); // Purple line
    doc.setLineWidth(1);
    doc.line(margin, currentY, pageWidth - margin, currentY);
    currentY += 15;

    // --- Content ---

    // Clean Markdown basics for plain text PDF
    const cleanContent = data.content
        .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
        .replace(/\*(.*?)\*/g, '$1')     // Italic
        .replace(/##/g, '')               // Headers
        .replace(/\|\|\|/g, '')           // Fragment separator
        .replace(/`/g, '')                // Code
        .replace(/\$\$/g, '');            // LaTeX

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    const splitText = doc.splitTextToSize(cleanContent, maxLineWidth);

    // Check if text fits on page, if not add page
    splitText.forEach((line: string) => {
        if (currentY > 280) {
            doc.addPage();
            currentY = 20;
        }
        doc.text(line, margin, currentY);
        currentY += 7;
    });

    currentY += 10;

    // --- Workspace ---
    if (currentY < 230) {
        doc.setFontSize(10);
        doc.setTextColor(150, 150, 150);
        doc.text("Área de Rascunho / Cálculos:", margin, currentY);
        currentY += 5;

        doc.setDrawColor(220, 220, 220);
        doc.rect(margin, currentY, maxLineWidth, 270 - currentY);
    }

    // --- Footer ---
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(`Gerado por ToDAH - Página ${i} de ${pageCount}`, pageWidth / 2, 290, { align: 'center' });
    }

    doc.save(`atividade-todah-${Date.now()}.pdf`);
};
