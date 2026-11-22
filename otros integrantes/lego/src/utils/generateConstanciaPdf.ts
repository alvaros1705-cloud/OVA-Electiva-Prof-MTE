import { jsPDF } from 'jspdf';
import { ModuleData } from '../types';
import { UNISIMON_LOGO, TECH_BADGE_LOGO } from '../data/courseData';

interface GenerateConstanciaParams {
  studentName: string;
  studentId: string;
  completedCount: number;
  totalModules: number;
  modules: ModuleData[];
  completedModules: string[];
  quizScores: Record<string, number>;
  issueDate: string;
}

interface LoadedImage {
  dataUrl: string;
  width: number;
  height: number;
}

const loadImageAsDataUrl = (src: string): Promise<LoadedImage | null> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(null);
          return;
        }
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        resolve({
          dataUrl: canvas.toDataURL('image/png'),
          width: canvas.width,
          height: canvas.height
        });
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
};

export const generateConstanciaPdf = async ({
  studentName,
  studentId,
  completedCount,
  totalModules,
  modules,
  completedModules,
  quizScores,
  issueDate
}: GenerateConstanciaParams): Promise<void> => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'letter'
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 279.4 mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 215.9 mm
  const centerX = pageWidth / 2;

  const [unisimonLogo, badgeLogo] = await Promise.all([
    loadImageAsDataUrl(UNISIMON_LOGO),
    loadImageAsDataUrl(TECH_BADGE_LOGO)
  ]);

  // Background
  doc.setFillColor(250, 253, 251);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Outer institutional green frame
  doc.setDrawColor(0, 104, 55); // #006837
  doc.setLineWidth(1.4);
  doc.roundedRect(9, 9, pageWidth - 18, pageHeight - 18, 4, 4, 'S');

  // Inner subtle border
  doc.setDrawColor(110, 231, 183);
  doc.setLineWidth(0.4);
  doc.roundedRect(13, 13, pageWidth - 26, pageHeight - 26, 3, 3, 'S');

  // Header row: Logo (left) & Progress badge (right)
  if (unisimonLogo) {
    const targetH = 16;
    const targetW = (unisimonLogo.width / unisimonLogo.height) * targetH;
    doc.addImage(unisimonLogo.dataUrl, 'PNG', 19, 17, Math.min(targetW, 72), targetH);
  } else {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(0, 104, 55);
    doc.text('UNIVERSIDAD SIMÓN BOLÍVAR', 19, 25);
  }

  const isAllCompleted = completedCount >= totalModules && totalModules > 0;
  doc.setFont('courier', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('REGISTRO LOCAL DE PROGRESO', pageWidth - 19, 21, { align: 'right' });

  const statusText = isAllCompleted
    ? `Ruta Completa (${completedCount}/${totalModules} aprobados)`
    : `Avance Parcial (${completedCount} de ${totalModules} aprobados)`;
  const badgeW = 66;
  const badgeX = pageWidth - 19 - badgeW;
  if (isAllCompleted) {
    doc.setFillColor(209, 250, 229);
    doc.setDrawColor(110, 231, 183);
  } else {
    doc.setFillColor(255, 251, 235);
    doc.setDrawColor(253, 230, 138);
  }
  doc.roundedRect(badgeX, 23.5, badgeW, 7.5, 3.5, 3.5, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(isAllCompleted ? 0 : 120, isAllCompleted ? 77 : 53, isAllCompleted ? 40 : 15);
  doc.text(statusText, badgeX + badgeW / 2, 28.5, { align: 'center' });

  // Header divider
  doc.setDrawColor(167, 243, 208);
  doc.setLineWidth(0.35);
  doc.line(19, 36.5, pageWidth - 19, 36.5);

  // Institutional Title & Disclaimer
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(0, 77, 40);
  doc.text('UNIVERSIDAD SIMÓN BOLÍVAR · SEDE CÚCUTA', centerX, 45, { align: 'center' });

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text(
    'Constancia formativa generada localmente en el navegador · Uso académico demostrativo',
    centerX,
    50.5,
    { align: 'center' }
  );

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  doc.text('REGISTRA EL AVANCE AUTÓNOMO DE:', centerX, 58, { align: 'center' });

  // Student Name & ID
  doc.setFont('times', 'bold');
  doc.setFontSize(23);
  doc.setTextColor(0, 104, 55);
  doc.text(studentName, centerX, 70, { align: 'center', maxWidth: 220 });

  doc.setDrawColor(167, 243, 208);
  doc.setLineWidth(0.6);
  doc.line(centerX - 68, 73, centerX + 68, 73);

  doc.setFont('courier', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(71, 85, 105);
  doc.text(`Identificación / Referencia: ${studentId}`, centerX, 79, { align: 'center' });

  // Accomplishment Description
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  const progressDesc =
    completedCount === 0
      ? 'Inicia su recorrido de práctica autónoma en los cinco núcleos del'
      : `Ha aprobado ${completedCount} de los ${totalModules} módulos de práctica autónoma (umbral >= 75%) en el`;
  doc.text(progressDesc, centerX, 88, { align: 'center' });

  doc.setFont('times', 'bold');
  doc.setFontSize(13.5);
  doc.setTextColor(15, 36, 23);
  doc.text('Objeto Virtual de Aprendizaje (OVA):', centerX, 96, { align: 'center' });

  doc.setTextColor(0, 104, 55);
  doc.setFontSize(12.5);
  doc.text(
    'Innovación, Ciberseguridad, Gestión de Riesgos, Cultura Organizacional y Gestión del Cambio',
    centerX,
    102.5,
    { align: 'center', maxWidth: 230 }
  );

  // 5-module progress cards row
  const gridLeft = 19;
  const gridWidth = pageWidth - 38;
  const gap = 3.5;
  const cardWidth = (gridWidth - gap * 4) / 5;
  const cardY = 112;
  const cardHeight = 25;

  modules.slice(0, 5).forEach((m, idx) => {
    const x = gridLeft + idx * (cardWidth + gap);
    const done = completedModules.includes(m.id);
    const score = quizScores[m.id];

    if (done) {
      doc.setFillColor(236, 253, 245);
      doc.setDrawColor(110, 231, 183);
    } else {
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
    }
    doc.setLineWidth(0.35);
    doc.roundedRect(x, cardY, cardWidth, cardHeight, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(done ? 0 : 71, done ? 77 : 85, done ? 40 : 105);
    const titleLines = doc.splitTextToSize(`${idx + 1}. ${m.shortTitle}`, cardWidth - 5);
    doc.text(titleLines, x + 2.5, cardY + 6);

    doc.setFont('courier', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(done ? 0 : 148, done ? 104 : 163, done ? 55 : 184);
    doc.text(
      done ? `Aprobado (${score ? `${score}%` : 'OK'})` : 'Pendiente',
      x + 2.5,
      cardY + cardHeight - 4
    );
  });

  // Footer section divider
  doc.setDrawColor(167, 243, 208);
  doc.setLineWidth(0.35);
  doc.line(19, 146, pageWidth - 19, 146);

  // Bottom 3-column metadata boxes
  const boxY = 152;
  const boxH = 26;
  const sideBoxW = 84;

  // Left box: Sede Cúcuta
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(167, 243, 208);
  doc.roundedRect(19, boxY, sideBoxW, boxH, 2.5, 2.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(0, 77, 40);
  doc.text('SEDE CÚCUTA · BARRIO LA PLAYA', 19 + sideBoxW / 2, boxY + 8, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('Av. 3 No. 13-34, San José de Cúcuta', 19 + sideBoxW / 2, boxY + 14, { align: 'center' });
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Vigilada Mineducación', 19 + sideBoxW / 2, boxY + 20, { align: 'center' });

  // Center: Circular Tech Badge
  if (badgeLogo) {
    doc.addImage(badgeLogo.dataUrl, 'PNG', centerX - 9, boxY + 1, 18, 18);
  }
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(0, 104, 55);
  doc.text('PRÁCTICA ACADÉMICA OVA', centerX, boxY + 23.5, { align: 'center' });

  // Right box: Disclaimer
  const rightBoxX = pageWidth - 19 - sideBoxW;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(rightBoxX, boxY, sideBoxW, boxH, 2.5, 2.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.text('DOCUMENTO DEMOSTRATIVO', rightBoxX + sideBoxW / 2, boxY + 8, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('No equivale a título ni certificado oficial', rightBoxX + sideBoxW / 2, boxY + 14, {
    align: 'center'
  });
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Uso formativo local en el navegador', rightBoxX + sideBoxW / 2, boxY + 20, {
    align: 'center'
  });

  // Bottom issue line
  doc.setFont('courier', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`San José de Cúcuta, Norte de Santander · ${issueDate}`, 19, pageHeight - 17);

  doc.setFont('courier', 'bold');
  doc.setTextColor(0, 104, 55);
  doc.text('Constancia local de práctica', pageWidth - 19, pageHeight - 17, { align: 'right' });

  const cleanSlug =
    studentName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9_-]+/g, '_')
      .replace(/^_+|_+$/g, '') || 'Estudiante';

  const fileName = `Constancia_OVA_Unisimon_${cleanSlug}.pdf`;
  const pdfBlob = doc.output('blob');
  const blobUrl = URL.createObjectURL(pdfBlob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(blobUrl), 1500);
};
