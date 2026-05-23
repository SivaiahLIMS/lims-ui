import { useRef, useCallback } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const usePdfExport = (filename = 'export.pdf') => {
  const ref = useRef<HTMLDivElement>(null);
  const exportPdf = useCallback(async () => {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current, { scale: 2 });
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const w = pdf.internal.pageSize.getWidth();
    const ratio = w / canvas.width;
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, w, canvas.height * ratio);
    pdf.save(filename);
  }, [filename]);
  return { ref, exportPdf };
};
