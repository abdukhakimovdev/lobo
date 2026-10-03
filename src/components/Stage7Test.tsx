import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  Clock,
  Shuffle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ChevronRight,
  ChevronLeft,
  Printer,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, UserProgress, QuizQuestion, QuestionCategory } from '../types';
import { FINAL_QUIZ_QUESTIONS } from '../data/quizData';
import { sounds } from '../utils/audio';
import { LoboMascot } from './LoboMascot';

interface Stage7TestProps {
  lang: Language;
  progress: UserProgress;
  onAwardXP: (amount: number, label?: string) => void;
  onUnlockBadge: (badgeId: string) => void;
  onCompleteStage: (stageId: 7, stars: number) => void;
  onUpdateProgress: (updated: Partial<UserProgress>) => void;
  onOpenCertificate: () => void;
}

export const Stage7Test: React.FC<Stage7TestProps> = ({
  lang,
  progress,
  onAwardXP,
  onUnlockBadge,
  onCompleteStage,
  onUpdateProgress,
  onOpenCertificate,
}) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => {
    return [...FINAL_QUIZ_QUESTIONS].sort(() => 0.5 - Math.random());
  });
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, any>>({});
  const [matchingSelections, setMatchingSelections] = useState<Record<number, Record<number, number>>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [wrongQuestionIds, setWrongQuestionIds] = useState<number[]>([]);
  const [timerEnabled, setTimerEnabled] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(20 * 60); // 20 minutes
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [onlyMistakesMode, setOnlyMistakesMode] = useState<boolean>(false);

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerEnabled && timerActive && timeLeft > 0 && !submitted) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timerActive && timeLeft === 0 && !submitted) {
      handleSubmitTest();
    }
    return () => clearInterval(interval);
  }, [timerEnabled, timerActive, timeLeft, submitted]);

  const currentQ = questions[currentIndex];

  const handleShuffle = () => {
    sounds.playClick();
    setQuestions([...FINAL_QUIZ_QUESTIONS].sort(() => 0.5 - Math.random()));
    setCurrentIndex(0);
    setUserAnswers({});
    setMatchingSelections({});
    setSubmitted(false);
    setOnlyMistakesMode(false);
  };

  const handleSingleAnswer = (qId: number, optIdx: number) => {
    if (submitted) return;
    sounds.playClick();
    setUserAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleMultipleAnswer = (qId: number, optIdx: number) => {
    if (submitted) return;
    sounds.playClick();
    const currentList: number[] = userAnswers[qId] || [];
    const updated = currentList.includes(optIdx)
      ? currentList.filter(i => i !== optIdx)
      : [...currentList, optIdx];
    setUserAnswers(prev => ({ ...prev, [qId]: updated }));
  };

  const handleBooleanAnswer = (qId: number, val: boolean) => {
    if (submitted) return;
    sounds.playClick();
    setUserAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const handleFillAnswer = (qId: number, word: string) => {
    if (submitted) return;
    sounds.playClick();
    setUserAnswers(prev => ({ ...prev, [qId]: word }));
  };

  const handleMatchingAnswer = (qId: number, leftIdx: number, rightIdx: number) => {
    if (submitted) return;
    sounds.playClick();
    setMatchingSelections(prev => ({
      ...prev,
      [qId]: { ...(prev[qId] || {}), [leftIdx]: rightIdx },
    }));
  };

  const handleOpenSelfCheck = (qId: number) => {
    sounds.playClick();
    setUserAnswers(prev => ({ ...prev, [qId]: true }));
  };

  const calculateGrade = (pct: number): number => {
    if (pct >= 90) return 5;
    if (pct >= 70) return 4;
    if (pct >= 50) return 3;
    return 2;
  };

  const handleSubmitTest = () => {
    let earned = 0;
    const wrongs: number[] = [];

    questions.forEach(q => {
      const ans = userAnswers[q.id];

      if (q.type === 'single') {
        if (ans === q.correctAnswer) earned += 1;
        else wrongs.push(q.id);
      } else if (q.type === 'multiple') {
        const correctList = (q.correctAnswer as number[]) || [];
        const userList = (ans as number[]) || [];
        const isMatch =
          correctList.length === userList.length &&
          correctList.every(v => userList.includes(v));
        if (isMatch) earned += 1;
        else wrongs.push(q.id);
      } else if (q.type === 'boolean') {
        if (ans === q.correctAnswer) earned += 1;
        else wrongs.push(q.id);
      } else if (q.type === 'fill') {
        if (ans && ans.toString().trim().toUpperCase() === (q.correctAnswer as string).toUpperCase()) {
          earned += 1;
        } else {
          wrongs.push(q.id);
        }
      } else if (q.type === 'matching') {
        // Check if all lefts match correct right indices (0->0, 1->1, etc.)
        const userMap = matchingSelections[q.id] || {};
        let allMatch = true;
        if (q.matchingPairs) {
          for (let i = 0; i < q.matchingPairs.length; i++) {
            if (userMap[i] !== i) {
              allMatch = false;
              break;
            }
          }
        }
        if (allMatch && Object.keys(userMap).length === (q.matchingPairs?.length || 0)) {
          earned += 1;
        } else {
          wrongs.push(q.id);
        }
      } else if (q.type === 'open') {
        // Open question self-check
        if (ans) earned += 1;
        else wrongs.push(q.id);
      }
    });

    const total = questions.length;
    const percentage = Math.round((earned / total) * 100);
    const grade = calculateGrade(percentage);

    setScore(earned);
    setWrongQuestionIds(wrongs);
    setSubmitted(true);
    setTimerActive(false);

    // Save test history
    onUpdateProgress({
      testHistory: {
        date: new Date().toISOString().split('T')[0],
        score: earned,
        total,
        percentage,
        grade,
        wrongQuestionIds: wrongs,
      },
    });

    if (grade >= 4) {
      sounds.playFanfare();
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      onAwardXP(earned * 5 + 30, 'Yakuniy test');
      onCompleteStage(7, grade === 5 ? 3 : 2);

      if (grade === 5) {
        onUnlockBadge('perfect_score');
      }
    } else {
      sounds.playWrong();
      onAwardXP(earned * 5, 'Yakuniy test');
      onCompleteStage(7, 1);
    }
  };

  const handleRetryMistakes = () => {
    sounds.playClick();
    const mistakes = FINAL_QUIZ_QUESTIONS.filter(q => wrongQuestionIds.includes(q.id));
    if (mistakes.length === 0) return;
    setQuestions(mistakes);
    setCurrentIndex(0);
    setUserAnswers({});
    setMatchingSelections({});
    setSubmitted(false);
    setOnlyMistakesMode(true);
  };

  // Category performance breakdown
  const categoryStats: Record<QuestionCategory, { correct: number; total: number }> = {
    syujet: { correct: 0, total: 0 },
    qahramonlar: { correct: 0, total: 0 },
    lugat: { correct: 0, total: 0 },
    goya: { correct: 0, total: 0 },
  };

  if (submitted) {
    questions.forEach(q => {
      categoryStats[q.category].total += 1;
      if (!wrongQuestionIds.includes(q.id)) {
        categoryStats[q.category].correct += 1;
      }
    });
  }

  const percentage = Math.round((score / questions.length) * 100);
  const grade = calculateGrade(percentage);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <LoboMascot
        mood={submitted ? (grade >= 4 ? 'cheering' : 'thinking') : 'neutral'}
        message={
          submitted
            ? grade === 5
              ? lang === 'uz'
                ? 'Tabriklayman! Sen 5 baho olding va eng yuqori sertifikatga loyiq bo‘lding!'
                : lang === 'ru'
                ? 'Поздравляю! Ты получил высшую оценку «5» и заслужил почетный сертификат!'
                : 'Congratulations! You achieved Grade 5 and earned the top Certificate!'
              : grade >= 3
              ? lang === 'uz'
                ? 'Yaxshi natija! «Xatolar ustida ishlash» orqali bahongni 5 ga yetkazishing mumkin!'
                : lang === 'ru'
                ? 'Хороший результат! Попробуй исправить ошибки и дотянуть до «5»!'
                : 'Good score! Use the mistake retry mode to elevate your grade to 5!'
              : lang === 'uz'
              ? 'Tushkunlikka tushma. Hikoya sahnalarini yana bir bor ko‘rib chiq va qayta topshir!'
              : lang === 'ru'
              ? 'Не унывай! Перечитай сцены рассказа и пройди тест заново!'
              : 'Don’t be disheartened! Review the story scenes and take the test again!'
            : undefined
        }
        lang={lang}
      />

      {/* Top Test Controls Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-amber-200/70 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-extrabold text-lg shadow-sm">
            🏆
          </span>
          <div>
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
              {lang === 'uz' ? 'Yakuniy Bilimni Sinash Testi' : lang === 'ru' ? 'Итоговое тестирование' : 'Final Assessment Exam'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {onlyMistakesMode
                ? lang === 'uz' ? 'Xatolar ustida ishlash rejimi' : 'Режим работы над ошибками'
                : lang === 'uz' ? '20 ta savol, Blum taksonomiyasi va 5 baholik tizim' : '20 вопросов, таксономия Блума'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Timer Toggle */}
          <button
            onClick={() => {
              setTimerEnabled(!timerEnabled);
              setTimerActive(!timerEnabled);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
              timerEnabled
                ? 'bg-amber-100 border-amber-300 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{timerEnabled ? formatTimer(timeLeft) : (lang === 'uz' ? 'Vaqt (20m)' : 'Таймер')}</span>
          </button>

          {/* Shuffle Questions */}
          <button
            onClick={handleShuffle}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 text-xs font-bold"
            title="Savollarni aralashtirish"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{lang === 'uz' ? 'Aralashtirish' : 'Перемешать'}</span>
          </button>
        </div>
      </div>

      {/* ===================== IF NOT SUBMITTED: QUESTION VIEW ===================== */}
      {!submitted ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-amber-200/70 dark:border-slate-800 shadow-sm space-y-5">
          {/* Question Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-xl bg-amber-500 text-white font-black text-xs">
                #{currentIndex + 1} / {questions.length}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-50 dark:bg-slate-800 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-slate-700">
                {currentQ.category}
              </span>
              <span className="text-[11px] font-medium text-slate-400">
                Blum: {currentQ.bloom}
              </span>
            </div>

            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {Object.keys(userAnswers).length} {lang === 'uz' ? 'belgilandi' : 'отмечено'}
            </span>
          </div>

          {/* Question Text */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
            {currentQ.question[lang]}
          </h3>

          {/* Question Input based on Type */}
          <div className="space-y-2.5 pt-2">
            {/* 1. Single Choice */}
            {currentQ.type === 'single' && currentQ.options && (
              <div className="space-y-2">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = userAnswers[currentQ.id] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSingleAnswer(currentQ.id, optIdx)}
                      className={`w-full p-3 rounded-2xl border text-xs sm:text-sm text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-500 text-white border-amber-600 font-bold shadow-sm'
                          : 'bg-amber-50/40 dark:bg-slate-800/60 border-amber-200/70 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-amber-100/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt[lang]}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 2. Multiple Choice */}
            {currentQ.type === 'multiple' && currentQ.options && (
              <div className="space-y-2">
                <p className="text-[11px] text-amber-600 font-semibold mb-1">
                  💡 {lang === 'uz' ? 'Bir nechta to‘g‘ri javobni tanlang' : 'Выберите несколько правильных ответов'}
                </p>
                {currentQ.options.map((opt, optIdx) => {
                  const currentSelected: number[] = userAnswers[currentQ.id] || [];
                  const isSelected = currentSelected.includes(optIdx);

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleMultipleAnswer(currentQ.id, optIdx)}
                      className={`w-full p-3 rounded-2xl border text-xs sm:text-sm text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-500 text-white border-amber-600 font-bold shadow-sm'
                          : 'bg-amber-50/40 dark:bg-slate-800/60 border-amber-200/70 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-amber-100/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-4 h-4 rounded-md border flex items-center justify-center text-[10px] ${isSelected ? 'bg-white text-amber-600' : 'border-slate-400'}`}>
                          {isSelected && '✓'}
                        </span>
                        <span>{opt[lang]}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 3. True / False */}
            {currentQ.type === 'boolean' && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => handleBooleanAnswer(currentQ.id, true)}
                  className={`p-4 rounded-2xl border text-sm font-bold text-center transition-all ${
                    userAnswers[currentQ.id] === true
                      ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-emerald-50'
                  }`}
                >
                  ✓ {lang === 'uz' ? 'Haqiqat (To‘g‘ri)' : lang === 'ru' ? 'Правда' : 'True'}
                </button>
                <button
                  onClick={() => handleBooleanAnswer(currentQ.id, false)}
                  className={`p-4 rounded-2xl border text-sm font-bold text-center transition-all ${
                    userAnswers[currentQ.id] === false
                      ? 'bg-rose-500 text-white border-rose-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-rose-50'
                  }`}
                >
                  ✗ {lang === 'uz' ? 'Yolg‘on (Noto‘g‘ri)' : lang === 'ru' ? 'Ложь' : 'False'}
                </button>
              </div>
            )}

            {/* 4. Fill in the Blank */}
            {currentQ.type === 'fill' && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {lang === 'uz' ? 'Variantlardan birini tanlang:' : 'Выберите верное слово:'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {currentQ.options?.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => handleFillAnswer(currentQ.id, opt[lang])}
                      className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                        userAnswers[currentQ.id] === opt[lang]
                          ? 'bg-amber-500 text-white border-amber-600'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-amber-50'
                      }`}
                    >
                      {opt[lang]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Matching Pairs */}
            {currentQ.type === 'matching' && currentQ.matchingPairs && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {lang === 'uz' ? 'Har bir kompozitsiya qismiga mos voqeani tanlang:' : 'Сопоставьте элементы:'}
                </p>
                <div className="space-y-2.5">
                  {currentQ.matchingPairs.map((pair, pIdx) => {
                    const chosenRightIdx = matchingSelections[currentQ.id]?.[pIdx];

                    return (
                      <div key={pIdx} className="p-3 rounded-2xl bg-amber-50/50 dark:bg-slate-800/60 border border-amber-200 dark:border-slate-700 space-y-1.5">
                        <span className="text-xs font-bold text-amber-800 dark:text-amber-400">
                          {pair.left[lang]}
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                          {currentQ.matchingPairs!.map((subPair, sIdx) => {
                            const isChosen = chosenRightIdx === sIdx;
                            return (
                              <button
                                key={sIdx}
                                onClick={() => handleMatchingAnswer(currentQ.id, pIdx, sIdx)}
                                className={`p-2 rounded-xl border text-[11px] text-left transition-all ${
                                  isChosen
                                    ? 'bg-amber-500 text-white border-amber-600 font-bold'
                                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-amber-50'
                                }`}
                              >
                                {subPair.right[lang]}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 6. Open Question with Self-Check */}
            {currentQ.type === 'open' && (
              <div className="space-y-3 pt-2">
                <textarea
                  rows={3}
                  placeholder={lang === 'uz' ? 'O‘z mulohazangizni yozing...' : 'Ваш ответ...'}
                  className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white"
                />

                <div className="p-3 bg-amber-50 dark:bg-slate-800/80 rounded-2xl border border-amber-200 dark:border-slate-700 text-xs space-y-1.5">
                  <span className="font-bold text-amber-700 dark:text-amber-400 block">
                    {lang === 'uz' ? 'Namunaviy javob bilan tekshirish:' : 'Эталонный ответ:'}
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 italic">
                    {currentQ.sampleAnswer?.[lang]}
                  </p>
                  <button
                    onClick={() => handleOpenSelfCheck(currentQ.id)}
                    className={`mt-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      userAnswers[currentQ.id]
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-600 text-white hover:bg-amber-700'
                    }`}
                  >
                    {userAnswers[currentQ.id]
                      ? (lang === 'uz' ? '✓ Javobim mos keladi' : '✓ Ответ верный')
                      : (lang === 'uz' ? 'Fikrimni namunaviy javobga mos deb tasdiqlash' : 'Подтвердить ответ')}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Navigation & Submit Buttons */}
          <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-slate-800">
            <button
              disabled={currentIndex === 0}
              onClick={() => {
                sounds.playClick();
                setCurrentIndex(prev => Math.max(0, prev - 1));
              }}
              className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{lang === 'uz' ? 'Oldingi' : 'Назад'}</span>
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => {
                  sounds.playClick();
                  setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1));
                }}
                className="flex items-center gap-1 px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                <span>{lang === 'uz' ? 'Keyingi savol' : 'Следующий'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitTest}
                className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-extrabold shadow-md cursor-pointer"
              >
                {lang === 'uz' ? 'Testni yakunlash va bahoni ko‘rish 🎯' : 'Завершить тест 🎯'}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* ===================== IF SUBMITTED: RESULT SCREEN ===================== */
        <div className="space-y-6">
          {/* Main Grade Card */}
          <div className="bg-linear-to-br from-amber-500 via-amber-600 to-orange-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs uppercase font-extrabold tracking-widest text-amber-200">
                {lang === 'uz' ? 'Test Natijasi va Baho' : 'Результаты теста'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black">
                {lang === 'uz' ? `Sening bahoying: ${grade}` : `Ваша оценка: ${grade}`}
              </h3>
              <p className="text-xs sm:text-sm text-amber-100 max-w-md">
                {grade === 5
                  ? (lang === 'uz' ? 'A’lo natija! Barcha mavzularni puxta egallagansiz.' : 'Отличный результат!')
                  : grade === 4
                  ? (lang === 'uz' ? 'Yaxshi natija! Bir nechta xatoni to‘g‘rilasangiz, 5 ga chiqasiz.' : 'Хороший результат!')
                  : (lang === 'uz' ? 'Mavzularni yana bir bor mustahkamlash tavsiya etiladi.' : 'Рекомендуется повторить материал.')}
              </p>
            </div>

            {/* Score Donut / Circular Badge */}
            <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-md border-4 border-white flex flex-col items-center justify-center shrink-0 shadow-inner">
              <span className="text-3xl font-black">{percentage}%</span>
              <span className="text-[11px] font-bold text-amber-100">{score} / {questions.length}</span>
            </div>
          </div>

          {/* Action buttons: Certificate, Retry mistakes, Full restart */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenCertificate}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <Award className="w-5 h-5 text-yellow-300" />
              <span>{lang === 'uz' ? 'Faxriy Sertifikatni olish va chop etish' : 'Получить Сертификат'}</span>
            </button>

            {wrongQuestionIds.length > 0 && (
              <button
                onClick={handleRetryMistakes}
                className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{lang === 'uz' ? `Xatolar ustida ishlash (${wrongQuestionIds.length} ta)` : `Работа над ошибками (${wrongQuestionIds.length})`}</span>
              </button>
            )}

            <button
              onClick={handleShuffle}
              className="px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 text-xs font-bold"
            >
              {lang === 'uz' ? 'Testni boshidan qayta topshirish' : 'Пройти тест заново'}
            </button>
          </div>

          {/* Topic Performance Analysis */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/70 dark:border-slate-800 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {lang === 'uz' ? 'Mavzular bo‘yicha tahlil (Kuchli va zaif tomonlar)' : 'Анализ по темам'}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {(['syujet', 'qahramonlar', 'lugat', 'goya'] as QuestionCategory[]).map(cat => {
                const info = categoryStats[cat];
                const catPct = info.total > 0 ? Math.round((info.correct / info.total) * 100) : 100;

                return (
                  <div key={cat} className="p-3.5 rounded-2xl bg-amber-50/50 dark:bg-slate-800/60 border border-amber-200 dark:border-slate-700 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900 dark:text-white uppercase">{cat}</span>
                      <span className="font-extrabold text-amber-600">{catPct}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-amber-500 to-orange-500 rounded-full"
                        style={{ width: `${catPct}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 block">
                      {info.correct} / {info.total} {lang === 'uz' ? 'to‘g‘ri' : 'верно'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Question Review with Explanations */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/70 dark:border-slate-800 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {lang === 'uz' ? 'Savollarning to‘liq tahlili va izohlari:' : 'Разбор вопросов и пояснения:'}
            </h4>

            <div className="space-y-3">
              {questions.map((q, idx) => {
                const isWrong = wrongQuestionIds.includes(q.id);

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-2xl border space-y-2 ${
                      isWrong
                        ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50'
                        : 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {idx + 1}. {q.question[lang]}
                      </span>
                      {isWrong ? (
                        <span className="text-xs font-bold text-rose-600 flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> {lang === 'uz' ? 'Xato' : 'Ошибка'}
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> {lang === 'uz' ? 'To‘g‘ri' : 'Верно'}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 bg-white/70 dark:bg-slate-900/70 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 leading-relaxed">
                      💡 <strong>{lang === 'uz' ? 'Izoh:' : 'Пояснение:'}</strong> {q.explanation[lang]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
