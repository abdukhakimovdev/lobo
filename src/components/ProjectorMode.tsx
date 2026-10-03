import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Monitor, BookOpen } from 'lucide-react';
import { Language } from '../types';
import { STORY_SCENES } from '../data/lessonData';
import { sounds } from '../utils/audio';

interface ProjectorModeProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const ProjectorMode: React.FC<ProjectorModeProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [sceneIdx, setSceneIdx] = useState(0);

  if (!isOpen) return null;

  const scene = STORY_SCENES[sceneIdx];

  const handleNext = () => {
    sounds.playClick();
    setSceneIdx(prev => Math.min(STORY_SCENES.length - 1, prev + 1));
  };

  const handlePrev = () => {
    sounds.playClick();
    setSceneIdx(prev => Math.max(0, prev - 1));
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col p-6 sm:p-12 justify-between">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <Monitor className="w-8 h-8 text-amber-500" />
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-extrabold">
              {lang === 'uz' ? 'Proyektor / Sinf Rejimi' : 'Режим проектора'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black">
              {lang === 'uz' ? 'Ernest Seton-Tompson: Lobo — Karrumpo Qiroli' : 'Э. Сетон-Томпсон: Лобо'}
            </h2>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          title="Yopish"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Slide Content */}
      <div className="max-w-4xl mx-auto my-auto space-y-6 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-400 font-extrabold text-sm border border-amber-500/30">
          {sceneIdx + 1} / {STORY_SCENES.length} — {scene.title[lang]}
        </span>

        <p className="text-xl sm:text-3xl font-semibold leading-relaxed text-slate-100">
          «{scene.summary[lang]}»
        </p>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-amber-300 text-base sm:text-lg italic font-medium inline-block">
          💡 {scene.quotePrompt[lang]}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center justify-between border-t border-slate-800 pt-4">
        <button
          disabled={sceneIdx === 0}
          onClick={handlePrev}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-sm font-bold"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>{lang === 'uz' ? 'Oldingi sahna' : 'Назад'}</span>
        </button>

        <span className="text-sm font-bold text-slate-400">
          {sceneIdx + 1} / {STORY_SCENES.length}
        </span>

        <button
          disabled={sceneIdx === STORY_SCENES.length - 1}
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-500 disabled:opacity-30 text-sm font-bold"
        >
          <span>{lang === 'uz' ? 'Keyingi sahna' : 'Далее'}</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
