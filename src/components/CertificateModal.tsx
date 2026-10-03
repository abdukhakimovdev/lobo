import React, { useState } from 'react';
import { X, Printer, Award, CheckCircle } from 'lucide-react';
import { Language, UserProgress } from '../types';
import { BADGES_LIST } from '../data/translations';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  progress: UserProgress;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  lang,
  progress,
}) => {
  const [studentName, setStudentName] = useState<string>('Azizbek');

  if (!isOpen) return null;

  const testInfo = progress.testHistory || {
    score: 19,
    total: 20,
    percentage: 95,
    grade: 5,
    date: new Date().toISOString().split('T')[0],
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto no-print-backdrop">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-4 border-amber-400 p-6 sm:p-8 space-y-6 text-slate-800 dark:text-slate-100 print:border-none print:shadow-none print:p-2">
        {/* Close Button (hidden in print) */}
        <button
          onClick={onClose}
          className="no-print absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Printable Body */}
        <div className="border-4 border-double border-amber-600/40 p-6 sm:p-8 rounded-2xl bg-linear-to-b from-amber-50/50 to-orange-50/30 dark:from-slate-800/40 dark:to-slate-900 text-center relative overflow-hidden">
          {/* Subtle Watermark Lobo */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <span className="text-9xl">🐺</span>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-center gap-2 text-amber-600 dark:text-amber-400">
              <Award className="w-8 h-8" />
              <span className="text-xs uppercase font-extrabold tracking-widest">
                {lang === 'uz' ? 'O‘zbekiston Respublikasi Xalq Ta’limi' : 'Министерство образования'}
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-black text-amber-800 dark:text-amber-400 uppercase tracking-wider">
              {lang === 'uz' ? 'Faxriy Sertifikat' : lang === 'ru' ? 'Почетный Сертификат' : 'Certificate of Honor'}
            </h2>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              {lang === 'uz'
                ? 'Ernest Seton-Tompsonning "Lobo" hikoyasi bo‘yicha 7-sinf interaktiv adabiyot darsini muvaffaqiyatli yakunlagani uchun'
                : 'За успешное освоение интерактивного урока литературы 7 класса по рассказу «Лобо»'}
            </p>

            {/* Student Name */}
            <div className="py-2">
              <input
                type="text"
                value={studentName}
                onChange={e => setStudentName(e.target.value)}
                placeholder={lang === 'uz' ? 'O‘quvchi ismi familiyasi' : 'Имя ученика'}
                className="no-print text-center text-xl sm:text-2xl font-black text-slate-900 dark:text-white border-b-2 border-amber-500 bg-transparent focus:outline-none pb-1 w-full max-w-sm mx-auto block"
              />
              <span className="print-only hidden text-2xl font-black text-slate-900 border-b-2 border-slate-900 pb-1">
                {studentName}
              </span>
            </div>

            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              {lang === 'uz'
                ? `bilan taqdirlanadi. Test natijasi: ${testInfo.percentage}% (${testInfo.score}/${testInfo.total}), Baho: ${testInfo.grade}`
                : `Награждается за отличные знания. Результат: ${testInfo.percentage}%, Оценка: ${testInfo.grade}`}
            </p>

            {/* Badges on Certificate */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {BADGES_LIST.slice(0, 4).map(b => (
                <div
                  key={b.id}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/80 dark:bg-slate-800 border border-amber-300 dark:border-slate-700 text-[10px] font-bold shadow-2xs"
                >
                  <span>{b.icon}</span>
                  <span>{b.title[lang]}</span>
                </div>
              ))}
            </div>

            {/* Bottom Footer Stamp & Date */}
            <div className="flex items-center justify-between pt-6 mt-4 border-t border-amber-200 dark:border-slate-700 text-left">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  {lang === 'uz' ? 'Sana:' : 'Дата:'}
                </span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {testInfo.date}
                </span>
              </div>

              {/* School Stamp */}
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-amber-600 text-amber-700 flex flex-col items-center justify-center text-[8px] font-extrabold uppercase rotate-[-12deg] p-1 shadow-xs">
                <span>★ LOBO ★</span>
                <span>7-SINF</span>
                <span>TASDIQLANDI</span>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  {lang === 'uz' ? 'O‘qituvchi:' : 'Учитель:'}
                </span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Adabiyot fani o‘qituvchisi
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons (no-print) */}
        <div className="no-print flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50"
          >
            {lang === 'uz' ? 'Yopish' : 'Закрыть'}
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{lang === 'uz' ? 'Chop etish / PDF saqlash' : 'Печать / Сохранить в PDF'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
