import React from 'react';
import { Check, Lock, Star, ChevronRight } from 'lucide-react';
import { StageId, Language, UserProgress } from '../types';
import { STAGE_TITLES } from '../data/translations';

interface StageNavigatorProps {
  currentStage: StageId;
  progress: UserProgress;
  lang: Language;
  onSelectStage: (stage: StageId) => void;
}

export const StageNavigator: React.FC<StageNavigatorProps> = ({
  currentStage,
  progress,
  lang,
  onSelectStage,
}) => {
  const stages: StageId[] = [1, 2, 3, 4, 5, 6, 7];

  const completedCount = progress.completedStages.length;
  const progressPercent = Math.round((completedCount / 7) * 100);

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-4 sm:p-5 border border-amber-200/70 dark:border-slate-800 shadow-sm mb-6">
      {/* Top Header: Progress percentage */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            {lang === 'uz' ? 'Dars yo‘lagi' : lang === 'ru' ? 'Дорога урока' : 'Lesson Trail'}
          </h2>
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {completedCount} / 7{' '}
            {lang === 'uz' ? 'bosqich yakunlandi' : lang === 'ru' ? 'этапов пройдено' : 'stages completed'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-28 sm:w-44 h-2.5 bg-amber-100 dark:bg-slate-800 rounded-full overflow-hidden border border-amber-200 dark:border-slate-700">
            <div
              className="h-full bg-linear-to-r from-amber-500 via-orange-500 to-amber-600 rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 min-w-8">
            {progressPercent}%
          </span>
        </div>
      </div>

      {/* 7 Stage Buttons on a trail */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {stages.map(stageNum => {
          const info = STAGE_TITLES[stageNum];
          const isCurrent = currentStage === stageNum;
          const isCompleted = progress.completedStages.includes(stageNum);
          // Stage 1 is always unlocked. Others unlocked if previous is completed or it has already been reached.
          const isUnlocked = stageNum === 1 || progress.completedStages.includes((stageNum - 1) as StageId) || progress.completedStages.includes(stageNum);
          const stars = progress.stageStars[stageNum] || 0;

          return (
            <button
              key={stageNum}
              disabled={!isUnlocked}
              onClick={() => onSelectStage(stageNum)}
              className={`relative group flex flex-col p-3 rounded-2xl border text-left transition-all duration-200 ${
                isCurrent
                  ? 'bg-amber-500 text-white border-amber-600 shadow-md ring-2 ring-amber-400/50 scale-[1.02]'
                  : isCompleted
                  ? 'bg-amber-50/70 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border-amber-300 dark:border-slate-700 hover:border-amber-400'
                  : isUnlocked
                  ? 'bg-white dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-amber-50/40'
                  : 'bg-slate-100/60 dark:bg-slate-800/30 text-slate-400 dark:text-slate-600 border-slate-200/60 dark:border-slate-800 opacity-60 cursor-not-allowed'
              }`}
            >
              {/* Top row: Stage icon & badge status */}
              <div className="flex items-center justify-between w-full mb-1.5">
                <span className="text-xl">{info.icon}</span>

                <div className="flex items-center gap-0.5">
                  {isCompleted ? (
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isCurrent ? 'bg-white text-amber-600' : 'bg-emerald-500 text-white'}`}>
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  ) : !isUnlocked ? (
                    <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-400 flex items-center justify-center">
                      <Lock className="w-3 h-3" />
                    </div>
                  ) : (
                    <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-md ${isCurrent ? 'bg-white/20 text-white' : 'bg-amber-100 dark:bg-slate-700 text-amber-800 dark:text-amber-300'}`}>
                      #{stageNum}
                    </span>
                  )}
                </div>
              </div>

              {/* Title & subtitle */}
              <div className="grow">
                <p className={`text-xs font-bold leading-snug line-clamp-1 ${isCurrent ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                  {info.title[lang]}
                </p>
                <p className={`text-[10px] leading-tight line-clamp-1 mt-0.5 ${isCurrent ? 'text-amber-100' : 'text-slate-500 dark:text-slate-400'}`}>
                  {info.subtitle[lang]}
                </p>
              </div>

              {/* Star ratings */}
              {isCompleted && (
                <div className="flex items-center gap-0.5 mt-2">
                  {[1, 2, 3].map(st => (
                    <Star
                      key={st}
                      className={`w-3 h-3 ${
                        st <= stars
                          ? isCurrent
                            ? 'text-yellow-200 fill-yellow-200'
                            : 'text-amber-400 fill-amber-400'
                          : isCurrent
                          ? 'text-amber-300/40'
                          : 'text-slate-300 dark:text-slate-700'
                      }`}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
