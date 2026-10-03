import React, { useState } from 'react';
import { Compass, Star, Copy, Check, Printer, Users, MessageSquare, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, UserProgress, CaseEnding } from '../types';
import { CASE_STEPS, CASE_ENDINGS } from '../data/lessonData';
import { sounds } from '../utils/audio';
import { LoboMascot } from './LoboMascot';

interface Stage6CaseStudyProps {
  lang: Language;
  progress: UserProgress;
  onAwardXP: (amount: number, label?: string) => void;
  onUnlockBadge: (badgeId: string) => void;
  onCompleteStage: (stageId: 6, stars: number) => void;
  onUpdateProgress: (updated: Partial<UserProgress>) => void;
  onNextStage: () => void;
}

export const Stage6CaseStudy: React.FC<Stage6CaseStudyProps> = ({
  lang,
  progress,
  onAwardXP,
  onUnlockBadge,
  onCompleteStage,
  onUpdateProgress,
  onNextStage,
}) => {
  const [currentStepId, setCurrentStepId] = useState<number>(1);
  const [selectedChoices, setSelectedChoices] = useState<Record<number, string>>({});
  const [ending, setEnding] = useState<CaseEnding | null>(null);
  const [essayText, setEssayText] = useState<string>(progress.caseEssay || '');
  const [copied, setCopied] = useState<boolean>(false);
  const [rubric, setRubric] = useState({
    evidence: progress.caseRubric?.evidence || 0,
    empathy: progress.caseRubric?.empathy || 0,
    reasoning: progress.caseRubric?.reasoning || 0,
  });

  const step = CASE_STEPS.find(s => s.id === currentStepId) || CASE_STEPS[0];

  const handleSelectChoice = (choice: (typeof step.choices)[0]) => {
    sounds.playClick();
    setSelectedChoices(prev => ({ ...prev, [currentStepId]: choice.id }));

    if (choice.endingId && CASE_ENDINGS[choice.endingId]) {
      const finalEnding = CASE_ENDINGS[choice.endingId];
      setEnding(finalEnding);
      sounds.playCorrect();
      confetti({ particleCount: 70, spread: 60 });
      onAwardXP(35, lang === 'uz' ? 'Keys yakunlandi' : lang === 'ru' ? 'Кейс пройден' : 'Case completed');

      if (finalEnding.badgeId) {
        onUnlockBadge(finalEnding.badgeId);
      }
      onCompleteStage(6, 3);
    } else if (choice.nextStepId) {
      setCurrentStepId(choice.nextStepId);
    }
  };

  const handleResetCase = () => {
    sounds.playClick();
    setCurrentStepId(1);
    setSelectedChoices({});
    setEnding(null);
  };

  const handleSaveEssay = () => {
    sounds.playClick();
    onUpdateProgress({ caseEssay: essayText });
    onAwardXP(20, lang === 'uz' ? 'Fikr bayoni' : 'Эссе');
  };

  const handleCopyEssay = () => {
    sounds.playClick();
    navigator.clipboard.writeText(essayText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSetRubric = (field: 'evidence' | 'empathy' | 'reasoning', stars: number) => {
    sounds.playClick();
    const updated = { ...rubric, [field]: stars };
    setRubric(updated);
    onUpdateProgress({ caseRubric: updated });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <LoboMascot
        mood={ending ? 'happy' : 'thinking'}
        message={
          ending
            ? lang === 'uz'
              ? 'Sening qaroring chuqur axloqiy saboqqa ega. Har bir tanlov o‘z oqibatiga ega ekanini his qildingmi?'
              : lang === 'ru'
              ? 'Твой выбор несет глубокий нравственный урок. Почувствовал, как решение определяет судьбу?'
              : 'Your choice carries a profound moral lesson. Did you feel how decisions shape destinies?'
            : undefined
        }
        lang={lang}
      />

      {/* Hero Banner: Case Study Introduction */}
      <div className="bg-linear-to-r from-amber-600 via-amber-700 to-stone-800 rounded-3xl p-6 sm:p-7 text-white shadow-lg space-y-3">
        <div className="flex items-center gap-2 text-amber-200">
          <Compass className="w-5 h-5" />
          <span className="text-xs uppercase font-extrabold tracking-wider">
            {lang === 'uz' ? 'KEYS-STADI: Karrumpo vodiysidagi qaror' : lang === 'ru' ? 'КЕЙС-СТАДИ: Решение в долине Каррумпо' : 'CASE STUDY: Decision in Currumpaw'}
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold leading-snug">
          {lang === 'uz'
            ? 'Sen Ernest Seton o‘rnidasan. Lobo taqdiri sening qo‘lingda!'
            : lang === 'ru'
            ? 'Ты на месте Эрнеста Сетона. Судьба волка в твоих руках!'
            : 'You are Ernest Seton. Lobo’s fate rests in your hands!'}
        </h2>
        <p className="text-xs sm:text-sm text-amber-100 max-w-2xl leading-relaxed">
          {lang === 'uz'
            ? 'Har bir qadamda o‘z vijdoni va burching bilan tanlov qil. Qaysi yo‘l tabiatga va insoniylikka mos keladi?'
            : lang === 'ru'
            ? 'Делай выбор между долгом и совестью. Какой путь ведет к гармонии с миром?'
            : 'Choose between cold duty and compassionate conscience. Which path honors nature?'}
        </p>
      </div>

      {/* Branching Scenario Step */}
      {!ending ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/70 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              {lang === 'uz' ? `${currentStepId}-bosqich qarori` : `Шаг ${currentStepId}`}
            </span>
            <button
              onClick={handleResetCase}
              className="text-xs font-semibold text-slate-400 hover:text-amber-600 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'uz' ? 'Boshiga qaytish' : 'В начало'}</span>
            </button>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
            {step.prompt[lang]}
          </h3>

          <div className="space-y-3">
            {step.choices.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => handleSelectChoice(ch)}
                className="w-full p-4 rounded-2xl bg-amber-50/50 dark:bg-slate-800/60 hover:bg-amber-100/60 dark:hover:bg-slate-700/60 border border-amber-200 dark:border-slate-700 text-left transition-all group"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-1">
                      {ch.text[lang]}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      💡 {ch.consequence[lang]}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Ending Card */
        <div className="bg-linear-to-br from-amber-50 via-white to-orange-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 rounded-3xl p-6 sm:p-7 border-2 border-amber-300 dark:border-amber-600 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-extrabold px-3 py-1 rounded-full bg-amber-500 text-white shadow-xs">
              {lang === 'uz' ? 'Sen erishgan yakun' : lang === 'ru' ? 'Твой финал' : 'Your Story Ending'}
            </span>
            <button
              onClick={handleResetCase}
              className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'uz' ? 'Boshqa yo‘lni tanlash' : 'Выбрать другой путь'}</span>
            </button>
          </div>

          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
            {ending.title[lang]}
          </h3>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed bg-white/70 dark:bg-slate-800/70 p-4 rounded-2xl border border-amber-200 dark:border-slate-700">
            {ending.outcome[lang]}
          </p>

          <div className="p-3 bg-amber-100/70 dark:bg-amber-950/40 rounded-2xl border-l-4 border-amber-500 text-xs font-semibold text-amber-900 dark:text-amber-200">
            <strong className="block mb-0.5">{lang === 'uz' ? 'Axloqiy xulosa:' : lang === 'ru' ? 'Нравственный вывод:' : 'Moral Lesson:'}</strong>
            {ending.moralLesson[lang]}
          </div>
        </div>
      )}

      {/* Written Response Area */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/70 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-600" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {lang === 'uz' ? 'Yozma mulohaza: Sening fikring (3–5 gap)' : lang === 'ru' ? 'Письменное рассуждение (3–5 предложений)' : 'Written Reflection (3–5 Sentences)'}
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">
            {lang === 'uz' ? 'O‘qituvchi uchun saqlanadi' : 'Сохраняется для учителя'}
          </span>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          {lang === 'uz'
            ? 'Nega aynan shu qarorni qabul qildingiz? Bu qaror inson va tabiat o‘rtasidagi munosabatga qanday ta’sir ko‘rsatadi?'
            : lang === 'ru'
            ? 'Почему вы приняли такое решение? Как оно повлияет на связь человека с природой?'
            : 'Why did you choose this decision? How does it influence mankind’s harmony with wilderness?'}
        </p>

        <textarea
          rows={4}
          value={essayText}
          onChange={e => setEssayText(e.target.value)}
          placeholder={
            lang === 'uz'
              ? 'Mening fikrimcha, Seton bunday yo‘l tutishi kerak edi, chunki...'
              : lang === 'ru'
              ? 'По моему мнению, Сетону следовало поступить так, потому что...'
              : 'In my view, Seton should have acted this way because...'
          }
          className="w-full p-3.5 rounded-2xl bg-amber-50/40 dark:bg-slate-800/60 border border-amber-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
        />

        <div className="flex items-center justify-between pt-1">
          <button
            onClick={handleCopyEssay}
            disabled={!essayText.trim()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 disabled:opacity-40"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (lang === 'uz' ? 'Nusxalandi' : 'Скопировано') : (lang === 'uz' ? 'Nusxa olish' : 'Копировать')}</span>
          </button>

          <button
            onClick={handleSaveEssay}
            disabled={!essayText.trim()}
            className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs disabled:opacity-40"
          >
            {lang === 'uz' ? 'Fikrimni saqlash (+20 XP)' : lang === 'ru' ? 'Сохранить эссе (+20 XP)' : 'Save Essay (+20 XP)'}
          </button>
        </div>
      </div>

      {/* Classroom Group Discussion Prompts */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/70 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-amber-600" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            {lang === 'uz' ? 'Sinfda juft yoki guruh bo‘lib muhokama qilish uchun 3 ta savol' : lang === 'ru' ? '3 вопроса для обсуждения в парах или группах' : '3 Questions for Pair / Group Discussion'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              id: 'q1',
              title: { uz: '1. Adolat va burch', ru: '1. Справедливость и долг', en: '1. Justice & Duty' },
              text: {
                uz: 'Chorvadorlar o‘z mollarini himoya qilishga haqlimi? Qayerda ularning chegarasi tugaydi?',
                ru: 'Имеют ли фермеры право защищать свой скот? Где кончается их право?',
                en: 'Are ranchers justified in protecting herds? Where does their moral right end?',
              },
            },
            {
              id: 'q2',
              title: { uz: '2. Yirtqichning sevgisi', ru: '2. Любовь хищника', en: '2. A Beast’s Devotion' },
              text: {
                uz: 'Lobo Blankasiz yashay olmadi. Hayvonlarda ham chinakam muhabbat va sadoqat bo‘ladimi?',
                ru: 'Лобо не смог жить без Бланки. Способны ли звери на искреннюю любовь?',
                en: 'Lobo could not live without Blanca. Can animals truly feel heartfelt grief?',
              },
            },
            {
              id: 'q3',
              title: { uz: '3. Insonning kechirimi', ru: '3. Прощение человека', en: '3. Human Remorse' },
              text: {
                uz: 'Seton bo‘rini o‘ldirganidan afsuslandi. Xatoni kech anglash o‘rniga uni qanday oldini olish mumkin?',
                ru: 'Сетон горько раскаялся. Как предотвратить ошибку, пока не стало поздно?',
                en: 'Seton repented too late. How can humanity prevent such tragedies in advance?',
              },
            },
          ].map(d => (
            <div key={d.id} className="p-3.5 rounded-2xl bg-amber-50/50 dark:bg-slate-800/60 border border-amber-200 dark:border-slate-700">
              <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 block mb-1">
                {d.title[lang]}
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {d.text[lang]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3-Star Self-Assessment Rubric */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/70 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          {lang === 'uz' ? 'O‘z-o‘zini baholash mezonlari (Rubrika)' : lang === 'ru' ? 'Рубрика самооценки' : 'Self-Assessment Rubric'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {[
            { key: 'evidence', label: { uz: '1. Hikoyadan dalil keltirdim', ru: '1. Привел факты из текста', en: '1. Cited textual evidence' } },
            { key: 'empathy', label: { uz: '2. Qahramon his-tuyg‘usini tushundim', ru: '2. Понял чувства героев', en: '2. Understood character feelings' } },
            { key: 'reasoning', label: { uz: '3. O‘z fikrimni asosladim', ru: '3. Обосновал свое суждение', en: '3. Justified personal argument' } },
          ].map(crit => {
            const currentStars = rubric[crit.key as keyof typeof rubric];

            return (
              <div key={crit.key} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                  {crit.label[lang]}
                </span>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3].map(st => (
                    <button
                      key={st}
                      onClick={() => handleSetRubric(crit.key as keyof typeof rubric, st)}
                      className="p-1 text-slate-300 hover:text-amber-400 transition-colors"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          st <= currentStars
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300 dark:text-slate-700'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Step Action */}
      <div className="flex items-center justify-end pt-2">
        <button
          onClick={onNextStage}
          className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
        >
          <span>
            {lang === 'uz'
              ? '7-bosqich: Yakuniy test (Bilimni sinash)'
              : lang === 'ru'
              ? '7-й этап: Итоговый тест (Проверка знаний)'
              : 'Stage 7: Final Test & Certificate'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
