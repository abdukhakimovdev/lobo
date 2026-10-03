import React from 'react';
import { X, Award, CheckCircle, Lock } from 'lucide-react';
import { Language, UserProgress } from '../types';
import { BADGES_LIST } from '../data/translations';

interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  progress: UserProgress;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({
  isOpen,
  onClose,
  lang,
  progress,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-amber-200 dark:border-slate-800 p-6 sm:p-7 space-y-5 text-slate-800 dark:text-slate-100 max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {lang === 'uz' ? 'Mening nishonlarim va yutuqlarim' : 'Мои значки и достижения'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {progress.unlockedBadges.length} / {BADGES_LIST.length}{' '}
              {lang === 'uz' ? 'nishon qo‘lga kiritildi' : 'значков открыто'}
            </p>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {BADGES_LIST.map(badge => {
            const isUnlocked = progress.unlockedBadges.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-3.5 rounded-2xl border flex items-start gap-3 transition-all ${
                  isUnlocked
                    ? 'bg-amber-50/70 dark:bg-slate-800/80 border-amber-300 dark:border-slate-700 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                  isUnlocked ? 'bg-amber-500/20 text-amber-600' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                }`}>
                  {badge.icon}
                </div>

                <div className="grow">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {badge.title[lang]}
                    </h4>
                    {isUnlocked ? (
                      <span className="text-[10px] font-extrabold text-emerald-600 flex items-center gap-0.5">
                        <CheckCircle className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-0.5">
                        <Lock className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug mt-1">
                    {badge.description[lang]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
