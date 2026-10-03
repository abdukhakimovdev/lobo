import React, { useState } from 'react';
import { Sparkles, Eye, CheckCircle2, XCircle, ArrowRight, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, UserProgress } from '../types';
import { STAGE_1_DATA } from '../data/lessonData';
import { sounds } from '../utils/audio';
import { LoboMascot } from './LoboMascot';

interface Stage1IntroProps {
  lang: Language;
  progress: UserProgress;
  onAwardXP: (amount: number, label?: string) => void;
  onUnlockBadge: (badgeId: string) => void;
  onCompleteStage: (stageId: 1, stars: number) => void;
  onNextStage: () => void;
}

export const Stage1Intro: React.FC<Stage1IntroProps> = ({
  lang,
  progress,
  onAwardXP,
  onUnlockBadge,
  onCompleteStage,
  onNextStage,
}) => {
  const [revealedClues, setRevealedClues] = useState<number[]>([1]);
  const [selectedGuess, setSelectedGuess] = useState<string | null>(null);
  const [guessChecked, setGuessChecked] = useState<boolean>(false);
  const [expandedFact, setExpandedFact] = useState<string | null>('fact-1');

  const isCompleted = progress.completedStages.includes(1);

  const toggleClue = (id: number) => {
    sounds.playClick();
    if (!revealedClues.includes(id)) {
      setRevealedClues([...revealedClues, id]);
    }
  };

  const handleSelectGuess = (id: string) => {
    sounds.playClick();
    setSelectedGuess(id);
    setGuessChecked(false);
  };

  const handleCheckGuess = () => {
    if (!selectedGuess) return;
    setGuessChecked(true);

    if (selectedGuess === 'lobo') {
      sounds.playCorrect();
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      onAwardXP(30, lang === 'uz' ? 'Jumboqni topding!' : lang === 'ru' ? 'Загадка разгадана!' : 'Riddle Solved!');
      onUnlockBadge('first_step');
      onCompleteStage(1, 3);
    } else {
      sounds.playWrong();
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Lobo Mascot Top Banner */}
      <LoboMascot
        mood={guessChecked && selectedGuess === 'lobo' ? 'cheering' : 'neutral'}
        message={
          guessChecked && selectedGuess === 'lobo'
            ? lang === 'uz'
              ? 'Barakalla! Sen topding! Men o‘sha afsonaviy Lobo bo‘laman. Karrumpo cho‘llari bo‘ylab sayohatimiz boshlandi!'
              : lang === 'ru'
              ? 'Браво! Ты угадал! Я тот самый легендарный Лобо. Наше путешествие по прериям Каррумпо начинается!'
              : 'Bravo! You guessed it! I am that very legendary Lobo. Our trek through Currumpaw begins!'
            : undefined
        }
        lang={lang}
      />

      {/* Hook Question Card */}
      <div className="bg-linear-to-br from-amber-500 via-amber-600 to-orange-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shrink-0 border border-white/30">
            ❓
          </div>
          <div className="space-y-1">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-200">
              {lang === 'uz' ? 'O‘ylab ko‘r (Hook-savol)' : lang === 'ru' ? 'Вопрос-крючок' : 'Thought Hook'}
            </span>
            <h2 className="text-lg sm:text-xl font-bold leading-relaxed text-amber-50">
              «{STAGE_1_DATA.hookQuestion[lang]}»
            </h2>
          </div>
        </div>
      </div>

      {/* Clues Guessing Game Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/70 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {lang === 'uz' ? 'Rasm-taxmin jumbog‘i' : lang === 'ru' ? 'Игра-детектив по уликам' : 'Detective Clues Game'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {STAGE_1_DATA.cluesGame.prompt[lang]}
            </p>
          </div>
        </div>

        {/* 4 Mystery Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {STAGE_1_DATA.cluesGame.clues.map(clue => {
            const isRevealed = revealedClues.includes(clue.id);

            return (
              <div
                key={clue.id}
                onClick={() => !isRevealed && toggleClue(clue.id)}
                className={`relative p-4 rounded-2xl border transition-all duration-300 min-h-[140px] flex flex-col justify-between ${
                  isRevealed
                    ? 'bg-amber-50/80 dark:bg-slate-800/80 border-amber-300 dark:border-slate-700'
                    : 'bg-linear-to-b from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 border-dashed border-slate-300 dark:border-slate-700 hover:border-amber-400 cursor-pointer group'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{clue.icon}</span>
                  <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400">
                    {clue.label[lang]}
                  </span>
                </div>

                {isRevealed ? (
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed grow animate-in fade-in duration-300">
                    {clue.hint[lang]}
                  </p>
                ) : (
                  <div className="flex flex-col items-center justify-center my-auto py-2">
                    <Eye className="w-5 h-5 text-slate-400 group-hover:text-amber-500 transition-colors mb-1" />
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 group-hover:text-amber-600">
                      {lang === 'uz' ? 'Ochish uchun bos' : lang === 'ru' ? 'Нажми, чтобы открыть' : 'Tap to reveal'}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Guess Options */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2.5">
            {lang === 'uz' ? 'Qaysi asar haqida gap ketmoqda?' : lang === 'ru' ? 'О каком произведении речь?' : 'Which story is this?'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {STAGE_1_DATA.cluesGame.guessOptions.map(opt => {
              const isSelected = selectedGuess === opt.id;
              let btnClass = 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-amber-50/60';
              if (isSelected) {
                btnClass = 'bg-amber-500 text-white border-amber-600 shadow-sm font-bold';
              }
              if (guessChecked) {
                if (opt.isCorrect) {
                  btnClass = 'bg-emerald-500 text-white border-emerald-600 font-bold';
                } else if (isSelected && !opt.isCorrect) {
                  btnClass = 'bg-rose-500 text-white border-rose-600';
                }
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectGuess(opt.id)}
                  className={`p-3 rounded-2xl border text-xs text-left transition-all ${btnClass}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{opt.text[lang]}</span>
                    {guessChecked && opt.isCorrect && <CheckCircle2 className="w-4 h-4 ml-1" />}
                    {guessChecked && isSelected && !opt.isCorrect && <XCircle className="w-4 h-4 ml-1" />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button
              disabled={!selectedGuess}
              onClick={handleCheckGuess}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-xs ${
                selectedGuess
                  ? 'bg-amber-600 hover:bg-amber-700 text-white cursor-pointer'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              {lang === 'uz' ? 'Taxminimni tekshirish' : lang === 'ru' ? 'Проверить догадку' : 'Check My Guess'}
            </button>

            {guessChecked && selectedGuess === 'lobo' && (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" />
                {lang === 'uz' ? 'To‘g‘ri topding! (+30 XP)' : lang === 'ru' ? 'Точно в цель! (+30 XP)' : 'Spot on! (+30 XP)'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* "Bilasanmi?" Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <span>🐺</span>
          <span>{lang === 'uz' ? 'Bilasanmi? (Bo‘rilar va tabiat haqida)' : lang === 'ru' ? 'Знаете ли вы? (О волках и природе)' : 'Did You Know? (Wolves & Nature)'}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {STAGE_1_DATA.didYouKnow.map(item => {
            const isExpanded = expandedFact === item.id;

            return (
              <div
                key={item.id}
                onClick={() => {
                  sounds.playClick();
                  setExpandedFact(isExpanded ? null : item.id);
                }}
                className={`p-4 rounded-3xl border transition-all cursor-pointer ${
                  isExpanded
                    ? 'bg-amber-50/90 dark:bg-slate-800/90 border-amber-300 dark:border-slate-700 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-2xl">{item.icon}</span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    {item.title[lang]}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.text[lang]}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Step Action Button */}
      <div className="flex items-center justify-end pt-4">
        <button
          onClick={onNextStage}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <span>
            {lang === 'uz'
              ? '2-bosqich: Muallif bilan tanishuv'
              : lang === 'ru'
              ? '2-й этап: Знакомство с автором'
              : 'Stage 2: Meet the Author'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
