import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, CheckCircle, ArrowRight, ArrowLeft, HelpCircle, Check, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, UserProgress, Scene } from '../types';
import { STORY_SCENES } from '../data/lessonData';
import { sounds } from '../utils/audio';
import { speechReader } from '../utils/speech';
import { LoboMascot } from './LoboMascot';

interface Stage3StoryProps {
  lang: Language;
  progress: UserProgress;
  onAwardXP: (amount: number, label?: string) => void;
  onUnlockBadge: (badgeId: string) => void;
  onCompleteStage: (stageId: 3, stars: number) => void;
  onNextStage: () => void;
}

export const Stage3Story: React.FC<Stage3StoryProps> = ({
  lang,
  progress,
  onAwardXP,
  onUnlockBadge,
  onCompleteStage,
  onNextStage,
}) => {
  const [currentSceneIdx, setCurrentSceneIdx] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [sceneAnswers, setSceneAnswers] = useState<Record<number, number>>({});
  const [checkedQuestions, setCheckedQuestions] = useState<Record<number, boolean>>({});
  const [completedScenes, setCompletedScenes] = useState<number[]>([]);

  useEffect(() => {
    const unsub = speechReader.subscribe(speaking => {
      setIsSpeaking(speaking);
    });
    return () => {
      unsub();
      speechReader.stop();
    };
  }, []);

  const scene = STORY_SCENES[currentSceneIdx];

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      speechReader.stop();
    } else {
      const textToRead = `${scene.title[lang]}. ${scene.summary[lang]}`;
      speechReader.speak(textToRead, lang);
    }
  };

  const handleSelectOption = (optIdx: number) => {
    if (checkedQuestions[scene.id]) return;
    sounds.playClick();
    setSceneAnswers(prev => ({ ...prev, [scene.id]: optIdx }));
  };

  const handleCheckQuestion = () => {
    const chosen = sceneAnswers[scene.id];
    if (chosen === undefined) return;

    setCheckedQuestions(prev => ({ ...prev, [scene.id]: true }));

    if (chosen === scene.checkQuestion.correctIndex) {
      sounds.playCorrect();
      if (!completedScenes.includes(scene.id)) {
        const nextCompleted = [...completedScenes, scene.id];
        setCompletedScenes(nextCompleted);
        onAwardXP(10, `${scene.id}-sahna`);

        if (nextCompleted.length === STORY_SCENES.length) {
          sounds.playFanfare();
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
          onUnlockBadge('attentive_reader');
          onCompleteStage(3, 3);
        }
      }
    } else {
      sounds.playWrong();
    }
  };

  const handlePrevScene = () => {
    speechReader.stop();
    sounds.playClick();
    setCurrentSceneIdx(prev => Math.max(0, prev - 1));
  };

  const handleNextScene = () => {
    speechReader.stop();
    sounds.playClick();
    setCurrentSceneIdx(prev => Math.min(STORY_SCENES.length - 1, prev + 1));
  };

  // Helper for rendering SVG illustrations
  const renderSceneIllustration = (type: Scene['svgType']) => {
    switch (type) {
      case 'pack':
        return (
          <svg viewBox="0 0 200 120" className="w-full h-full" fill="none">
            {/* Desert bluffs & moon */}
            <circle cx="160" cy="30" r="16" fill="#fef3c7" opacity="0.8" />
            <path d="M0,100 L40,60 L90,85 L140,45 L200,100 L200,120 L0,120 Z" fill="#92400e" opacity="0.3" />
            <path d="M0,90 L60,50 L120,80 L180,60 L200,80 L200,120 L0,120 Z" fill="#78350f" opacity="0.5" />
            {/* Lobo leader silhouette */}
            <path d="M70,85 Q80,65 95,65 Q105,65 110,75 L115,90" stroke="#1c1917" strokeWidth="4" strokeLinecap="round" />
            <polygon points="90,65 96,55 98,65" fill="#1c1917" />
            <polygon points="100,65 106,55 104,65" fill="#1c1917" />
            <circle cx="115" cy="85" r="3" fill="#1c1917" />
            {/* Pack companions */}
            <circle cx="50" cy="92" r="5" fill="#44403c" />
            <circle cx="135" cy="90" r="5" fill="#44403c" />
            <circle cx="150" cy="95" r="4" fill="#44403c" />
          </svg>
        );
      case 'traps':
        return (
          <svg viewBox="0 0 200 120" className="w-full h-full" fill="none">
            <rect x="0" y="80" width="200" height="40" fill="#78350f" opacity="0.3" />
            {/* Steel Trap with teeth sprung safely */}
            <ellipse cx="100" cy="92" rx="35" ry="12" stroke="#475569" strokeWidth="4" />
            <path d="M70,92 Q100,75 130,92" stroke="#64748b" strokeWidth="3" />
            <line x1="85" y1="88" x2="85" y2="82" stroke="#94a3b8" strokeWidth="2" />
            <line x1="100" y1="86" x2="100" y2="80" stroke="#94a3b8" strokeWidth="2" />
            <line x1="115" y1="88" x2="115" y2="82" stroke="#94a3b8" strokeWidth="2" />
            {/* Piled meat with warning sign / red cross */}
            <circle cx="50" cy="85" r="10" fill="#dc2626" opacity="0.8" />
            <circle cx="56" cy="88" r="8" fill="#b91c1c" />
            <path d="M44,80 L56,92 M56,80 L44,92" stroke="#ffffff" strokeWidth="2" />
            {/* Paw prints stepping around */}
            <circle cx="150" cy="85" r="3" fill="#78350f" />
            <circle cx="160" cy="80" r="3" fill="#78350f" />
          </svg>
        );
      case 'author':
        return (
          <svg viewBox="0 0 200 120" className="w-full h-full" fill="none">
            <path d="M0,100 Q100,80 200,105 L200,120 L0,120 Z" fill="#78350f" opacity="0.4" />
            {/* Magnifying glass / tracking spoor */}
            <ellipse cx="60" cy="95" rx="8" ry="6" stroke="#451a03" strokeWidth="2" fill="#d97706" opacity="0.6" />
            <circle cx="55" cy="86" r="2" fill="#451a03" />
            <circle cx="61" cy="85" r="2" fill="#451a03" />
            <circle cx="67" cy="87" r="2" fill="#451a03" />
            {/* Seton kneeling sketching */}
            <circle cx="120" cy="60" r="12" fill="#fde68a" stroke="#78350f" strokeWidth="2" />
            <path d="M110,50 L130,50" stroke="#78350f" strokeWidth="4" />
            <path d="M120,72 L120,95 L140,105" stroke="#78350f" strokeWidth="5" strokeLinecap="round" />
            {/* Journal / notebook */}
            <rect x="135" y="70" width="22" height="26" fill="#fef3c7" stroke="#92400e" strokeWidth="2" rx="2" />
          </svg>
        );
      case 'blanca':
        return (
          <svg viewBox="0 0 200 120" className="w-full h-full" fill="none">
            {/* Narrow canyon cliffs */}
            <path d="M0,0 L50,0 L35,120 L0,120 Z" fill="#78350f" opacity="0.7" />
            <path d="M150,0 L200,0 L200,120 L165,120 Z" fill="#78350f" opacity="0.7" />
            {/* Blanca white silhouette */}
            <ellipse cx="100" cy="85" rx="22" ry="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
            <circle cx="118" cy="72" r="9" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
            <polygon points="115,66 119,57 122,66" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <polygon points="122,67 126,58 128,68" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            {/* Bait nearby */}
            <circle cx="100" cy="100" r="6" fill="#dc2626" />
          </svg>
        );
      case 'capture':
        return (
          <svg viewBox="0 0 200 120" className="w-full h-full" fill="none">
            <rect x="0" y="85" width="200" height="35" fill="#451a03" opacity="0.4" />
            {/* Four traps encircling */}
            <ellipse cx="70" cy="95" rx="14" ry="6" stroke="#475569" strokeWidth="3" />
            <ellipse cx="130" cy="95" rx="14" ry="6" stroke="#475569" strokeWidth="3" />
            <ellipse cx="90" cy="85" rx="14" ry="6" stroke="#475569" strokeWidth="3" />
            <ellipse cx="110" cy="105" rx="14" ry="6" stroke="#475569" strokeWidth="3" />
            {/* Lobo entrapped, proud head raised */}
            <path d="M85,90 Q95,65 110,65 Q118,65 125,75" stroke="#1c1917" strokeWidth="4" />
            <circle cx="118" cy="60" r="10" fill="#1c1917" />
            <polygon points="114,54 117,45 121,54" fill="#1c1917" />
            <polygon points="121,54 125,45 128,54" fill="#1c1917" />
            {/* Gold eye shining */}
            <circle cx="122" cy="59" r="1.5" fill="#f59e0b" />
          </svg>
        );
      case 'farewell':
        return (
          <svg viewBox="0 0 200 120" className="w-full h-full" fill="none">
            {/* Night sky with stars & wide prairie */}
            <rect width="200" height="120" fill="#0f172a" />
            <circle cx="30" cy="25" r="1" fill="#ffffff" />
            <circle cx="70" cy="18" r="1.5" fill="#ffffff" />
            <circle cx="120" cy="22" r="1" fill="#ffffff" />
            <circle cx="170" cy="15" r="1.5" fill="#ffffff" />
            <circle cx="180" cy="35" r="1" fill="#ffffff" />
            <path d="M0,90 Q100,75 200,90 L200,120 L0,120 Z" fill="#1e293b" />
            {/* Lobo lying peacefully gazing at the horizon */}
            <path d="M60,95 Q100,85 140,95" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
            <circle cx="145" cy="88" r="9" fill="#94a3b8" />
            <polygon points="143,82 146,74 149,82" fill="#94a3b8" />
            <polygon points="149,82 153,74 155,82" fill="#94a3b8" />
            {/* Golden glowing star of liberty */}
            <polygon points="175,70 177,75 182,75 178,78 180,83 175,80 170,83 172,78 168,75 173,75" fill="#f59e0b" />
          </svg>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <LoboMascot
        mood={checkedQuestions[scene.id] ? 'happy' : 'thinking'}
        message={
          checkedQuestions[scene.id]
            ? lang === 'uz'
              ? 'Ofarin! Sahna mazmunini juda yaxshi tushunibsan!'
              : lang === 'ru'
              ? 'Отлично! Ты прекрасно уловил смысл этой сцены!'
              : 'Great job! You grasped the meaning of this scene very well!'
            : undefined
        }
        lang={lang}
      />

      {/* Scene Navigation Carousel Header */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 rounded-2xl p-3 border border-amber-200/70 dark:border-slate-800 shadow-xs">
        <button
          onClick={handlePrevScene}
          disabled={currentSceneIdx === 0}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            currentSceneIdx > 0
              ? 'text-slate-800 dark:text-slate-200 hover:bg-amber-100 dark:hover:bg-slate-800 cursor-pointer'
              : 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">{lang === 'uz' ? 'Oldingi sahna' : lang === 'ru' ? 'Предыдущая' : 'Previous'}</span>
        </button>

        {/* Scene Dots */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {STORY_SCENES.map((sc, idx) => {
            const isCur = idx === currentSceneIdx;
            const isDone = completedScenes.includes(sc.id);

            return (
              <button
                key={sc.id}
                onClick={() => {
                  speechReader.stop();
                  sounds.playClick();
                  setCurrentSceneIdx(idx);
                }}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${
                  isCur
                    ? 'bg-amber-500 text-white shadow-md scale-105'
                    : isDone
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-amber-50'
                }`}
                title={sc.title[lang]}
              >
                {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : idx + 1}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleNextScene}
          disabled={currentSceneIdx === STORY_SCENES.length - 1}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            currentSceneIdx < STORY_SCENES.length - 1
              ? 'text-slate-800 dark:text-slate-200 hover:bg-amber-100 dark:hover:bg-slate-800 cursor-pointer'
              : 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
          }`}
        >
          <span className="hidden sm:inline">{lang === 'uz' ? 'Keyingi sahna' : lang === 'ru' ? 'Следующая' : 'Next'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Scene Presentation Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-amber-200/70 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* Top: Scene Illustration */}
        <div className="w-full h-44 sm:h-52 bg-slate-950/10 dark:bg-slate-950 relative overflow-hidden flex items-center justify-center border-b border-amber-100 dark:border-slate-800">
          <div className="w-full max-w-lg h-full">
            {renderSceneIllustration(scene.svgType)}
          </div>

          {/* Audio narration button floating over illustration */}
          <button
            onClick={handleToggleSpeech}
            className={`absolute bottom-3 right-3 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md transition-all ${
              isSpeaking
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 hover:bg-amber-500 hover:text-white backdrop-blur-md'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-600" />}
            <span>
              {isSpeaking
                ? lang === 'uz' ? 'To‘xtatish' : lang === 'ru' ? 'Стоп' : 'Stop'
                : lang === 'uz' ? 'Ovozli o‘qish' : lang === 'ru' ? 'Слушать' : 'Read Aloud'}
            </span>
          </button>
        </div>

        {/* Scene Text & Paraphrase */}
        <div className="p-6 sm:p-7 space-y-4">
          <div className="space-y-1">
            <span className="text-xs uppercase font-extrabold tracking-wider text-amber-600 dark:text-amber-400">
              {lang === 'uz' ? `${currentSceneIdx + 1}-sahna (6 tadan)` : lang === 'ru' ? `Сцена ${currentSceneIdx + 1} из 6` : `Scene ${currentSceneIdx + 1} of 6`}
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
              {scene.title[lang]}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed bg-amber-50/40 dark:bg-slate-800/40 p-4 rounded-2xl border border-amber-100/70 dark:border-slate-700">
            {scene.summary[lang]}
          </p>

          <div className="flex items-center gap-2 p-3 bg-linear-to-r from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-800/50 rounded-2xl border-l-4 border-amber-500 text-xs italic text-slate-600 dark:text-slate-300">
            <span>💬</span>
            <span>«{scene.quotePrompt[lang]}»</span>
          </div>

          {/* Scene Check Question ("Tushundingmi?") */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 space-y-3.5">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                {lang === 'uz' ? 'Tushundingmi? (Tekshiruv savoli)' : lang === 'ru' ? 'Проверь себя!' : 'Comprehension Check'}
              </h3>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
              {scene.checkQuestion.question[lang]}
            </p>

            <div className="space-y-2">
              {scene.checkQuestion.options.map((opt, optIdx) => {
                const isSelected = sceneAnswers[scene.id] === optIdx;
                const isChecked = checkedQuestions[scene.id];

                let style = 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-amber-50';

                if (isSelected) {
                  style = 'bg-amber-500 text-white border-amber-600 font-bold';
                }

                if (isChecked) {
                  if (optIdx === scene.checkQuestion.correctIndex) {
                    style = 'bg-emerald-500 text-white border-emerald-600 font-bold';
                  } else if (isSelected && optIdx !== scene.checkQuestion.correctIndex) {
                    style = 'bg-rose-500 text-white border-rose-600';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    disabled={isChecked}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-2.5 sm:p-3 rounded-xl border text-xs text-left transition-all flex items-center justify-between ${style}`}
                  >
                    <span>{opt[lang]}</span>
                    {isChecked && optIdx === scene.checkQuestion.correctIndex && <CheckCircle className="w-4 h-4 ml-2 shrink-0" />}
                    {isChecked && isSelected && optIdx !== scene.checkQuestion.correctIndex && <XCircle className="w-4 h-4 ml-2 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Check Button */}
            {!checkedQuestions[scene.id] ? (
              <button
                disabled={sceneAnswers[scene.id] === undefined}
                onClick={handleCheckQuestion}
                className={`mt-2 px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                  sceneAnswers[scene.id] !== undefined
                    ? 'bg-amber-600 hover:bg-amber-700 text-white cursor-pointer'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                }`}
              >
                {lang === 'uz' ? 'Tekshirish' : lang === 'ru' ? 'Проверить' : 'Check'}
              </button>
            ) : (
              <p className="text-[11px] text-slate-600 dark:text-slate-300 bg-amber-50 dark:bg-slate-900 p-2.5 rounded-xl border border-amber-200 dark:border-slate-700 leading-relaxed">
                💡 <strong className="text-amber-700 dark:text-amber-400">{lang === 'uz' ? 'Izoh:' : lang === 'ru' ? 'Пояснение:' : 'Explanation:'}</strong> {scene.checkQuestion.explanation[lang]}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Completion & Transition */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          {completedScenes.length} / {STORY_SCENES.length}{' '}
          {lang === 'uz' ? 'sahna o‘rganildi' : lang === 'ru' ? 'сцен изучено' : 'scenes studied'}
        </span>

        <button
          onClick={onNextStage}
          className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
        >
          <span>
            {lang === 'uz'
              ? '4-bosqich: Qahramonlar va g‘oya'
              : lang === 'ru'
              ? '4-й этап: Герои и идея'
              : 'Stage 4: Characters & Themes'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
