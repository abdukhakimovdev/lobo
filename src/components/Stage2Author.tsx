import React, { useState } from 'react';
import { BookOpen, Calendar, CheckCircle, HelpCircle, ArrowRight, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, UserProgress } from '../types';
import { STAGE_2_DATA } from '../data/lessonData';
import { sounds } from '../utils/audio';
import { LoboMascot } from './LoboMascot';

interface Stage2AuthorProps {
  lang: Language;
  progress: UserProgress;
  onAwardXP: (amount: number, label?: string) => void;
  onUnlockBadge: (badgeId: string) => void;
  onCompleteStage: (stageId: 2, stars: number) => void;
  onNextStage: () => void;
}

export const Stage2Author: React.FC<Stage2AuthorProps> = ({
  lang,
  progress,
  onAwardXP,
  onUnlockBadge,
  onCompleteStage,
  onNextStage,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (submittedQuiz) return;
    sounds.playClick();
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleCheckQuiz = () => {
    let correctCount = 0;
    STAGE_2_DATA.authorQuiz.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });

    setScore(correctCount);
    setSubmittedQuiz(true);

    if (correctCount === STAGE_2_DATA.authorQuiz.length) {
      sounds.playCorrect();
      confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });
      onAwardXP(35, lang === 'uz' ? 'Muallif testini a’lo topshirding!' : lang === 'ru' ? 'Тест об авторе сдан!' : 'Author quiz aced!');
      onUnlockBadge('author_scholar');
      onCompleteStage(2, 3);
    } else {
      sounds.playWrong();
      onAwardXP(correctCount * 10, lang === 'uz' ? 'Muallif testi' : lang === 'ru' ? 'Тест об авторе' : 'Author quiz');
      onCompleteStage(2, Math.max(1, correctCount));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <LoboMascot
        mood={submittedQuiz ? (score === 3 ? 'cheering' : 'thinking') : 'neutral'}
        message={
          submittedQuiz
            ? score === 3
              ? lang === 'uz'
                ? 'Ofarin! Ernest Seton-Tompson haqida barcha ma’lumotlarni puxta o‘zlashtiribsan!'
                : lang === 'ru'
                ? 'Браво! Ты великолепно усвоил биографию Эрнеста Сетон-Томпсона!'
                : 'Bravo! You mastered the biography of Ernest Thompson Seton flawlessly!'
              : lang === 'uz'
              ? 'Yaxshi urinish! Xatolarni ko‘rib chiq va darsni davom ettiramiz!'
              : lang === 'ru'
              ? 'Хорошая попытка! Обрати внимание на правильные ответы и идем дальше!'
              : 'Good effort! Review the explanations and let us march forward!'
            : undefined
        }
        lang={lang}
      />

      {/* Author Profile Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-amber-200/70 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center gap-6">
        {/* Author Portrait Illustration */}
        <div className="relative shrink-0 w-32 h-32 sm:w-36 sm:h-36 rounded-2xl bg-amber-100 dark:bg-slate-800 border-2 border-amber-300 dark:border-amber-600/50 p-2 flex items-center justify-center shadow-md">
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
            {/* Vintage Hat */}
            <path d="M15,40 Q50,26 85,40" stroke="#78350f" strokeWidth="4" fill="none" />
            <path d="M30,38 C30,18 70,18 70,38 Z" fill="#92400e" stroke="#78350f" strokeWidth="2" />
            {/* Face */}
            <circle cx="50" cy="54" r="22" fill="#fde68a" stroke="#78350f" strokeWidth="2" />
            {/* Eyes */}
            <circle cx="43" cy="50" r="2.5" fill="#451a03" />
            <circle cx="57" cy="50" r="2.5" fill="#451a03" />
            {/* Mustache */}
            <path d="M38,62 Q50,66 62,62 Q50,58 38,62 Z" fill="#78350f" />
            {/* Jacket collar */}
            <path d="M28,82 L42,72 L50,84 L58,72 L72,82" stroke="#451a03" strokeWidth="3" fill="#b45309" />
            {/* Sketchbook / palette pencil in hand */}
            <rect x="70" y="70" width="22" height="26" rx="2" fill="#fef3c7" stroke="#78350f" strokeWidth="2" />
            <line x1="75" y1="76" x2="87" y2="76" stroke="#d97706" strokeWidth="1.5" />
            <line x1="75" y1="82" x2="85" y2="82" stroke="#d97706" strokeWidth="1.5" />
          </svg>
          <span className="absolute -bottom-2 bg-amber-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
            1860–1946
          </span>
        </div>

        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            {lang === 'uz' ? 'Adib va tabiatshunos' : lang === 'ru' ? 'Писатель и натуралист' : 'Author & Naturalist'}
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            {STAGE_2_DATA.authorInfo.name[lang]}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            {STAGE_2_DATA.authorInfo.bio[lang]}
          </p>
        </div>
      </div>

      {/* Visual Timeline */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/70 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-amber-600" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            {lang === 'uz' ? 'Hayot va ijod yo‘li (Xronologiya)' : lang === 'ru' ? 'Хронология жизни и творчества' : 'Life & Career Timeline'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 relative">
          {STAGE_2_DATA.timeline.map((item, idx) => (
            <div
              key={item.year}
              className="p-4 rounded-2xl bg-amber-50/60 dark:bg-slate-800/60 border border-amber-200 dark:border-slate-700 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-2.5 py-1 rounded-xl bg-amber-500 text-white font-extrabold text-xs mb-2 shadow-xs">
                  {item.year}
                </span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                  {item.title[lang]}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.desc[lang]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mini-Quiz Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/70 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {lang === 'uz' ? 'Mini-quiz: 3 ta savol' : lang === 'ru' ? 'Мини-квиз: 3 вопроса' : 'Mini-Quiz: 3 Questions'}
            </h3>
          </div>
          {submittedQuiz && (
            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
              {score} / 3 {lang === 'uz' ? 'to‘g‘ri' : lang === 'ru' ? 'верно' : 'correct'}
            </span>
          )}
        </div>

        <div className="space-y-4">
          {STAGE_2_DATA.authorQuiz.map((q, qIdx) => {
            const chosen = selectedAnswers[q.id];

            return (
              <div key={q.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {qIdx + 1}. {q.question[lang]}
                </p>

                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = chosen === optIdx;
                    let btnStyle = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-amber-50';

                    if (isSelected) {
                      btnStyle = 'bg-amber-500 text-white border-amber-600 font-bold';
                    }

                    if (submittedQuiz) {
                      if (optIdx === q.correctIndex) {
                        btnStyle = 'bg-emerald-500 text-white border-emerald-600 font-bold';
                      } else if (isSelected && optIdx !== q.correctIndex) {
                        btnStyle = 'bg-rose-500 text-white border-rose-600';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={submittedQuiz}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`w-full p-2.5 rounded-xl border text-xs text-left transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt[lang]}</span>
                        {submittedQuiz && optIdx === q.correctIndex && <CheckCircle className="w-4 h-4 ml-2 shrink-0" />}
                        {submittedQuiz && isSelected && optIdx !== q.correctIndex && <XCircle className="w-4 h-4 ml-2 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {submittedQuiz && (
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 bg-amber-50/80 dark:bg-slate-900/80 p-2.5 rounded-xl border border-amber-200 dark:border-slate-700 leading-relaxed">
                    💡 <strong className="text-amber-700 dark:text-amber-400">{lang === 'uz' ? 'Izoh:' : lang === 'ru' ? 'Пояснение:' : 'Explanation:'}</strong> {q.explanation[lang]}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-2">
          {!submittedQuiz ? (
            <button
              disabled={Object.keys(selectedAnswers).length < STAGE_2_DATA.authorQuiz.length}
              onClick={handleCheckQuiz}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-xs ${
                Object.keys(selectedAnswers).length === STAGE_2_DATA.authorQuiz.length
                  ? 'bg-amber-600 hover:bg-amber-700 text-white cursor-pointer'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              {lang === 'uz' ? 'Javoblarni tekshirish' : lang === 'ru' ? 'Проверить ответы' : 'Check Answers'}
            </button>
          ) : (
            <button
              onClick={() => {
                setSelectedAnswers({});
                setSubmittedQuiz(false);
              }}
              className="text-xs font-bold text-amber-600 hover:underline"
            >
              {lang === 'uz' ? 'Qayta topshirish' : lang === 'ru' ? 'Пройти снова' : 'Retake Quiz'}
            </button>
          )}

          {submittedQuiz && (
            <button
              onClick={onNextStage}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <span>
                {lang === 'uz'
                  ? '3-bosqich: Hikoya mazmuni'
                  : lang === 'ru'
                  ? '3-й этап: Сюжет рассказа'
                  : 'Stage 3: Story Narrative'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
