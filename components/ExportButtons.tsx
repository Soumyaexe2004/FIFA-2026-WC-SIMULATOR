'use client';

import { useCallback, useState } from 'react';
import { Camera, FileDown, Loader2 } from 'lucide-react';

export default function ExportButtons() {
  const [exporting, setExporting] = useState<'png' | 'pdf' | null>(null);

  const exportPNG = useCallback(async () => {
    setExporting('png');
    try {
      const { toPng } = await import('html-to-image');
      const el = document.getElementById('bracket-container');
      if (!el) throw new Error('Bracket container not found');

      const dataUrl = await toPng(el, {
        backgroundColor: '#060a14',
        cacheBust: true,
        pixelRatio: 2,
        skipFonts: true,
      });

      const link = document.createElement('a');
      link.download = 'fifa-2026-bracket.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('PNG export failed:', err);
      alert('Export failed. Please try again.');
    } finally {
      setExporting(null);
    }
  }, []);

  const exportPDF = useCallback(async () => {
    setExporting('pdf');
    try {
      const { toPng } = await import('html-to-image');
      const { jsPDF } = await import('jspdf');

      const el = document.getElementById('bracket-container');
      if (!el) throw new Error('Bracket container not found');

      const dataUrl = await toPng(el, {
        backgroundColor: '#060a14',
        cacheBust: true,
        pixelRatio: 2,
        skipFonts: true,
      });

      // Load the image to get natural dimensions
      const img = new Image();
      img.src = dataUrl;
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const imgW = img.width;
      const imgH = img.height;

      // Use A3 landscape as the base (420mm x 297mm) — plenty wide for bracket
      const pdfW = 420;
      const pdfH = 297;

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a3',
      });

      // Scale image to fit within A3 landscape while maintaining aspect ratio
      const ratio = Math.min(pdfW / imgW, pdfH / imgH);
      const drawW = imgW * ratio;
      const drawH = imgH * ratio;

      // Center the image on the page
      const offsetX = (pdfW - drawW) / 2;
      const offsetY = (pdfH - drawH) / 2;

      pdf.setFillColor(6, 10, 20);
      pdf.rect(0, 0, pdfW, pdfH, 'F');
      pdf.addImage(dataUrl, 'PNG', offsetX, offsetY, drawW, drawH);
      pdf.save('fifa-2026-bracket.pdf');
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('Export failed. Please try again.');
    } finally {
      setExporting(null);
    }
  }, []);

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={exportPNG}
        disabled={!!exporting}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold
          bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30
          text-cyan-300 hover:from-cyan-500/30 hover:to-blue-500/30 hover:text-cyan-200
          disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {exporting === 'png' ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Camera className="w-4 h-4" />
        )}
        Export PNG
      </button>

      <button
        onClick={exportPDF}
        disabled={!!exporting}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold
          bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30
          text-purple-300 hover:from-purple-500/30 hover:to-pink-500/30 hover:text-purple-200
          disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {exporting === 'pdf' ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <FileDown className="w-4 h-4" />
        )}
        Export PDF
      </button>
    </div>
  );
}
