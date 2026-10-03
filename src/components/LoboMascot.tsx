import React from 'react';
import { Language } from '../types';

interface LoboMascotProps {
  mood?: 'happy' | 'thinking' | 'cheering' | 'neutral' | 'sad';
  message?: string;
  lang: Language;
}

export const LoboMascot: React.FC<LoboMascotProps> = ({
  mood = 'neutral',
  message,
  lang,
}) => {
  const defaultMessages: Record<string, Record<Language, string>> = {
    neutral: {
      uz: 'Salom, yosh tadqiqotchi! Men Lobo. Karrumpo sirlarini birga ochamizmi?',
      ru: 'Привет, юный исследователь! Я Лобо. Раскроем тайны Каррумпо вместе?',
      en: 'Hello, young explorer! I am Lobo. Shall we uncover Currumpaw’s secrets together?',
    },
    thinking: {
      uz: 'Yaxshilab o‘ylab ko‘r, javob hikoya ichida yashiringan!',
      ru: 'Подумай хорошенько, ответ скрыт в самом рассказе!',
      en: 'Think carefully, the answer is tucked inside the story!',
    },
    cheering: {
      uz: 'Ofarin! Qoyilmaqom javob! Sen haqiqiy dasht bilimdonisan!',
      ru: 'Браво! Великолепный ответ! Ты настоящий степной знаток!',
      en: 'Bravo! Outstanding answer! You are a true prairie scholar!',
    },
    happy: {
      uz: 'Zo‘r ketyapsan! Har bir qadam seni marraga yaqinlashtirmoqda.',
      ru: 'Отличный темп! Каждый шаг приближает тебя к вершине.',
      en: 'Great pace! Every step brings you closer to the peak.',
    },
    sad: {
      uz: 'Xafa bo‘lma, xatolar ham bizga o‘rgatadi. Qayta urinib ko‘r!',
      ru: 'Не грусти, на ошибках учатся. Попробуй еще разок!',
      en: 'Don’t fret, mistakes teach us well. Give it another try!',
    },
  };

  const displayMsg = message || defaultMessages[mood]?.[lang] || defaultMessages.neutral[lang];

  return (
    <div className="flex items-end gap-3 my-4">
      {/* Friendly Wolf Avatar SVG */}
      <div className="relative shrink-0 w-16 h-16 md:w-20 md:h-20 bg-linear-to-b from-amber-100 to-amber-200 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-1.5 shadow-md border-2 border-amber-300 dark:border-amber-500/40 flex items-center justify-center transition-transform hover:scale-105">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-sm select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ears */}
          <polygon
            points="24,42 12,12 38,24"
            className="fill-amber-700 dark:fill-amber-600 transition-all"
            stroke="#5c3613"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <polygon
            points="22,38 16,18 32,26"
            className="fill-rose-300 dark:fill-rose-400"
          />
          <polygon
            points="76,42 88,12 62,24"
            className="fill-amber-700 dark:fill-amber-600 transition-all"
            stroke="#5c3613"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <polygon
            points="78,38 84,18 68,26"
            className="fill-rose-300 dark:fill-rose-400"
          />

          {/* Head */}
          <ellipse
            cx="50"
            cy="56"
            rx="36"
            ry="32"
            className="fill-amber-600 dark:fill-amber-700"
            stroke="#5c3613"
            strokeWidth="3"
          />

          {/* Cheeks / fur tufts */}
          <path
            d="M20,60 Q12,68 22,76 Q30,76 36,70"
            className="fill-amber-100 dark:fill-amber-200"
          />
          <path
            d="M80,60 Q88,68 78,76 Q70,76 64,70"
            className="fill-amber-100 dark:fill-amber-200"
          />

          {/* Snout / Muzzle */}
          <ellipse
            cx="50"
            cy="68"
            rx="18"
            ry="14"
            className="fill-amber-50 dark:fill-amber-100"
            stroke="#5c3613"
            strokeWidth="2"
          />

          {/* Nose */}
          <polygon
            points="50,65 44,60 56,60"
            className="fill-slate-900"
          />

          {/* Eyes depending on mood */}
          {mood === 'cheering' || mood === 'happy' ? (
            <>
              {/* Happy curved eyes */}
              <path
                d="M34,48 Q40,40 44,48"
                stroke="#2a180b"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M56,48 Q60,40 66,48"
                stroke="#2a180b"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
            </>
          ) : mood === 'thinking' ? (
            <>
              <circle cx="38" cy="46" r="4.5" className="fill-slate-900" />
              <path
                d="M56,44 Q62,40 68,44"
                stroke="#2a180b"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </>
          ) : mood === 'sad' ? (
            <>
              <ellipse cx="38" cy="48" rx="4" ry="5" className="fill-slate-900" />
              <ellipse cx="62" cy="48" rx="4" ry="5" className="fill-slate-900" />
              <path
                d="M32,40 Q38,44 44,42"
                stroke="#2a180b"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M56,42 Q62,44 68,40"
                stroke="#2a180b"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </>
          ) : (
            <>
              {/* Neutral alert eyes with gold iris */}
              <ellipse cx="38" cy="46" rx="5" ry="6" className="fill-amber-400" />
              <circle cx="39" cy="46" r="3" className="fill-slate-950" />
              <circle cx="40" cy="44" r="1.2" className="fill-white" />

              <ellipse cx="62" cy="46" rx="5" ry="6" className="fill-amber-400" />
              <circle cx="61" cy="46" r="3" className="fill-slate-950" />
              <circle cx="62" cy="44" r="1.2" className="fill-white" />
            </>
          )}

          {/* Mouth */}
          {mood === 'cheering' || mood === 'happy' ? (
            <path
              d="M44,72 Q50,79 56,72"
              stroke="#2a180b"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          ) : mood === 'sad' ? (
            <path
              d="M44,75 Q50,71 56,75"
              stroke="#2a180b"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          ) : (
            <path
              d="M45,72 Q50,75 55,72"
              stroke="#2a180b"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          )}

          {/* White neck fur chest */}
          <polygon
            points="50,86 42,98 58,98"
            className="fill-amber-100 dark:fill-amber-200"
          />
        </svg>
        <span className="absolute -bottom-2 px-1.5 py-0.5 bg-amber-600 text-[10px] font-bold text-white rounded-md uppercase tracking-wider shadow-xs">
          Lobo
        </span>
      </div>

      {/* Speech bubble */}
      <div className="relative max-w-xl bg-white dark:bg-slate-800 rounded-2xl rounded-bl-xs p-3.5 shadow-md border border-amber-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
        <p className="font-medium">{displayMsg}</p>
      </div>
    </div>
  );
};
