import React, { useState } from 'react';
import { RotateCw, CheckCircle2, XCircle, ArrowRight, Lightbulb, BookMarked, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, UserProgress, CharacterInfo } from '../types';
import { CHARACTERS_DATA, LITERARY_DEVICES } from '../data/lessonData';
import { sounds } from '../utils/audio';
import { LoboMascot } from './LoboMascot';

interface Stage4CharactersProps {
  lang: Language;
  progress: UserProgress;
  onAwardXP: (amount: number, label?: string) => void;
  onUnlockBadge: (badgeId: string) => void;
  onCompleteStage: (stageId: 4, stars: number) => void;
  onNextStage: () => void;
}

export const Stage4Characters: React.FC<Stage4CharactersProps> = ({
  lang,
  progress,
  onAwardXP,
  onUnlockBadge,
  onCompleteStage,
  onNextStage,
}) => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'characters' | 'matching' | 'inquiry' | 'devices'>('characters');

  // "Kim kim?" Matching Game state
  const matchingPairs = [
    { traitId: 't1', text: { uz: 'Qullikdan ko‘ra mag‘rur o‘limni tanlagan yetakchi', ru: 'Вожак, выбравший смерть вместо неволи', en: 'Leader who preferred proud death to bondage' }, targetChar: 'lobo' },
    { traitId: 't2', text: { uz: 'Oq rangli, sho‘x va qiziquvchan sevikli juft', ru: 'Белоснежная игривая подруга вожака', en: 'Snow-white playful and curious mate' }, targetChar: 'blanca' },
    { traitId: 't3', text: { uz: 'Bo‘rining mardligidan so‘ng vijdoni uyg‘ongan tabiatshunos', ru: 'Натуралист, в ком пробудилась совесть', en: 'Naturalist in whom conscience awakened' }, targetChar: 'seton' },
    { traitId: 't4', text: { uz: 'Tabiatni faqat moliyaviy zarar va foyda bilan o‘lchaydiganlar', ru: 'Те, кто меряет природу только выгодой', en: 'Those who measure nature solely by profit' }, targetChar: 'ranchers' },
  ];

  const [userMatches, setUserMatches] = useState<Record<string, string>>({});
  const [matchingChecked, setMatchingChecked] = useState(false);
  const [matchingSuccess, setMatchingSuccess] = useState(false);

  // Guided Theme Inquiry Responses
  const [inquiryAnswers, setInquiryAnswers] = useState<Record<string, number>>({});
  const [revealedThemes, setRevealedThemes] = useState<string[]>([]);

  const toggleFlip = (charId: string) => {
    sounds.playClick();
    setFlippedCards(prev => ({ ...prev, [charId]: !prev[charId] }));
  };

  const handleMatchSelect = (traitId: string, charId: string) => {
    sounds.playClick();
    setUserMatches(prev => ({ ...prev, [traitId]: charId }));
    setMatchingChecked(false);
  };

  const handleCheckMatches = () => {
    let allCorrect = true;
    matchingPairs.forEach(p => {
      if (userMatches[p.traitId] !== p.targetChar) {
        allCorrect = false;
      }
    });

    setMatchingChecked(true);
    setMatchingSuccess(allCorrect);

    if (allCorrect) {
      sounds.playCorrect();
      confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });
      onAwardXP(30, lang === 'uz' ? 'Qahramonlar moslashtirildi' : lang === 'ru' ? 'Герои сопоставлены' : 'Characters matched');
      onUnlockBadge('literary_critic');
      onCompleteStage(4, 3);
    } else {
      sounds.playWrong();
    }
  };

  const handleRevealTheme = (themeId: string) => {
    sounds.playClick();
    if (!revealedThemes.includes(themeId)) {
      setRevealedThemes([...revealedThemes, themeId]);
      onAwardXP(10, 'G‘oya');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <LoboMascot
        mood={matchingSuccess ? 'cheering' : 'neutral'}
        message={
          matchingSuccess
            ? lang === 'uz'
              ? 'Ofarin! Barcha qahramonlarning ichki dunyosini to‘g‘ri kashf qilding!'
              : lang === 'ru'
              ? 'Прекрасно! Ты проник в самые глубины характеров наших персонажей!'
              : 'Splendid! You grasped the innermost depth of all characters!'
            : undefined
        }
        lang={lang}
      />

      {/* Sub-Tabs: Characters, Matching, Guided Inquiry, Literary Devices */}
      <div className="flex flex-wrap gap-2 border-b border-amber-200/70 dark:border-slate-800 pb-2">
        {[
          { id: 'characters', label: { uz: 'Qahramon kartalari (Flip)', ru: 'Карточки героев', en: 'Character Flip Cards' }, icon: '🐺' },
          { id: 'matching', label: { uz: '«Kim kim?» O‘yini', ru: 'Игра «Кто есть кто?»', en: '"Who is Who?" Game' }, icon: '🎯' },
          { id: 'inquiry', label: { uz: 'Hikoyaning bosh g‘oyasi', ru: 'Главная идея рассказа', en: 'Core Story Themes' }, icon: '💡' },
          { id: 'devices', label: { uz: 'Adabiy tushunchalar', ru: 'Теория литературы', en: 'Literary Devices' }, icon: '📖' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              sounds.playClick();
              setActiveTab(tab.id as typeof activeTab);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label[lang]}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: Character Flip Cards */}
      {activeTab === 'characters' && (
        <div className="space-y-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {lang === 'uz'
              ? 'Kartochkani bosing va uning orqa tomonidagi chuqur xarakter va ramzlarni o‘rganing:'
              : lang === 'ru'
              ? 'Нажмите на карточку, чтобы перевернуть ее и изучить глубинный символизм героя:'
              : 'Click any card to flip and discover the hidden traits and symbolism:'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CHARACTERS_DATA.map(char => {
              const isFlipped = !!flippedCards[char.id];

              return (
                <div
                  key={char.id}
                  onClick={() => toggleFlip(char.id)}
                  className="h-84 cursor-pointer perspective-1000 group"
                >
                  <div
                    className={`relative w-full h-full rounded-3xl transition-transform duration-500 transform-style-3d shadow-sm hover:shadow-md border border-amber-200/80 dark:border-slate-800 ${
                      isFlipped ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* Front Face */}
                    <div className="absolute inset-0 w-full h-full bg-white dark:bg-slate-900 rounded-3xl p-5 flex flex-col justify-between backface-hidden">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-2xl">
                            {char.id === 'lobo' ? '🐺' : char.id === 'blanca' ? '❄️' : char.id === 'seton' ? '🧭' : '🐂'}
                          </span>
                          <span className="text-slate-400 hover:text-amber-600 transition-colors">
                            <RotateCw className="w-4 h-4" />
                          </span>
                        </div>

                        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                          {char.name[lang]}
                        </h3>
                        <p className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 mb-3">
                          {char.role[lang]}
                        </p>

                        <div className="space-y-1.5">
                          {char.traits.map((tr, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                              <span>{tr[lang]}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-center text-slate-400 font-bold uppercase tracking-wider">
                        {lang === 'uz' ? 'Aylantirish uchun bos' : lang === 'ru' ? 'Нажми, чтобы перевернуть' : 'Click to flip'}
                      </div>
                    </div>

                    {/* Back Face */}
                    <div className="absolute inset-0 w-full h-full bg-linear-to-b from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-5 flex flex-col justify-between rotate-y-180 backface-hidden border-2 border-amber-300 dark:border-amber-600">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase">
                            {char.name[lang]}
                          </span>
                          <RotateCw className="w-4 h-4 text-amber-600" />
                        </div>

                        <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed mb-3">
                          {char.description[lang]}
                        </p>

                        <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-amber-200 dark:border-slate-700 text-[11px] italic text-slate-600 dark:text-slate-300 mb-2">
                          {char.quote[lang]}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-amber-200 dark:border-slate-700">
                        <span className="text-[10px] font-extrabold uppercase text-amber-600 dark:text-amber-400 block mb-0.5">
                          {lang === 'uz' ? 'Badiiy ramz:' : lang === 'ru' ? 'Символизм:' : 'Symbolism:'}
                        </span>
                        <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-100">
                          {char.symbolism[lang]}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: "Kim kim?" Matching Game */}
      {activeTab === 'matching' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/70 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {lang === 'uz' ? 'Xususiyatni qahramonga bog‘la' : lang === 'ru' ? 'Сопоставь описание с героем' : 'Match Trait to Character'}
            </h3>
          </div>

          <div className="space-y-3.5">
            {matchingPairs.map(pair => {
              const selectedChar = userMatches[pair.traitId];
              const isChecked = matchingChecked;
              const isCorrect = selectedChar === pair.targetChar;

              return (
                <div key={pair.traitId} className="p-4 rounded-2xl bg-amber-50/50 dark:bg-slate-800/60 border border-amber-200/70 dark:border-slate-700 space-y-2">
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                    «{pair.text[lang]}»
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {CHARACTERS_DATA.map(c => {
                      const isChosen = selectedChar === c.id;
                      let btnClass = 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-amber-50';

                      if (isChosen) {
                        btnClass = 'bg-amber-500 text-white border-amber-600 font-bold';
                      }

                      if (isChecked) {
                        if (c.id === pair.targetChar) {
                          btnClass = 'bg-emerald-500 text-white border-emerald-600 font-bold';
                        } else if (isChosen && c.id !== pair.targetChar) {
                          btnClass = 'bg-rose-500 text-white border-rose-600';
                        }
                      }

                      return (
                        <button
                          key={c.id}
                          disabled={isChecked}
                          onClick={() => handleMatchSelect(pair.traitId, c.id)}
                          className={`px-3 py-1.5 rounded-xl border text-xs transition-all ${btnClass}`}
                        >
                          {c.name[lang]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-3">
            {!matchingChecked ? (
              <button
                disabled={Object.keys(userMatches).length < matchingPairs.length}
                onClick={handleCheckMatches}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-xs ${
                  Object.keys(userMatches).length === matchingPairs.length
                    ? 'bg-amber-600 hover:bg-amber-700 text-white cursor-pointer'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                }`}
              >
                {lang === 'uz' ? 'Tekshirish' : lang === 'ru' ? 'Проверить' : 'Check'}
              </button>
            ) : (
              <button
                onClick={() => {
                  setUserMatches({});
                  setMatchingChecked(false);
                  setMatchingSuccess(false);
                }}
                className="text-xs font-bold text-amber-600 hover:underline"
              >
                {lang === 'uz' ? 'Qaytadan urinish' : lang === 'ru' ? 'Попробовать снова' : 'Try Again'}
              </button>
            )}

            {matchingChecked && matchingSuccess && (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                {lang === 'uz' ? 'Barcha qahramonlar to‘g‘ri topildi! (+30 XP)' : lang === 'ru' ? 'Все герои верны! (+30 XP)' : 'All characters correct! (+30 XP)'}
              </span>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: Guided Theme Inquiry */}
      {activeTab === 'inquiry' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/70 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {lang === 'uz' ? 'Hikoyaning tub g‘oyasini o‘zing kashf qil!' : lang === 'ru' ? 'Открой главную идею рассказа сам!' : 'Discover the Core Themes Yourself!'}
            </h3>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {lang === 'uz'
              ? 'Yozuvchi tayyor xulosani aytmaydi. Quyidagi savollarni o‘rganib, hikoyaning 3 ta asosiy falsafasini och:'
              : lang === 'ru'
              ? 'Автор не навязывает готовый вывод. Ответь на вопросы и открой 3 фундаментальные идеи рассказа:'
              : 'Seton never forces a conclusion. Explore these questions to unveil the 3 core philosophies of the story:'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                id: 'theme-nature',
                icon: '🌿',
                question: {
                  uz: 'Nega inson tabiat va hayvonlarni o‘z mulkidek xo‘rlashga haqli emas?',
                  ru: 'Почему человек не вправе бездушно распоряжаться дикой природой?',
                  en: 'Why does humanity have no moral right to exploit wildlife as mere property?',
                },
                revealedTheme: {
                  uz: '1. Tabiatga hurmat va inson mas’uliyati: Har bir tirik jonzot Yer sayyorasida erkin nafas olish va hurmat ko‘rish huquqiga ega.',
                  ru: '1. Уважение к природе и ответственность человека: Каждое живое существо наделено священным правом на жизнь.',
                  en: '1. Reverence for Nature & Human Stewardship: Every wild creature possesses an intrinsic right to exist unmolested.',
                },
              },
              {
                id: 'theme-loyalty',
                icon: '❤️',
                question: {
                  uz: 'Loboning yengilishiga nima sabab bo‘ldi: uning kuchsizligi yoki yuksak sevgisimi?',
                  ru: 'Что привело Лобо к поражению: слабость или сила его любви?',
                  en: 'What caused Lobo’s downfall: bodily weakness or the depth of his devotion?',
                },
                revealedTheme: {
                  uz: '2. Sadoqat va fidoyilik: Yirtqich hisoblangan bo‘rining qalbida ko‘plab insonlarda uchramaydigan buyuk vafodorlik yashiringan edi.',
                  ru: '2. Верность и самопожертвование: В сердце хищника жила любовь и преданность, превосходящая человеческую.',
                  en: '2. Loyalty & Self-Sacrifice: In a wild beast’s breast beat a fidelity and devotion unmatched even by men.',
                },
              },
              {
                id: 'theme-freedom',
                icon: '🦅',
                question: {
                  uz: 'Nima uchun Lobo asirlikdagi ovqatdan ko‘ra o‘limni afzal bildi?',
                  ru: 'Почему волк предпочел смерть сытой неволе в оковах?',
                  en: 'Why did Lobo choose death over well-fed captivity in chains?',
                },
                revealedTheme: {
                  uz: '3. Erkinlik va qadr-qimmat: Mag‘rur ruh uchun erkinliksiz yashash — tirik o‘lik bo‘lish bilan tengdir.',
                  ru: '3. Свобода и достоинство: Для непокоренного духа жизнь в оковах невыносима и равна гибели.',
                  en: '3. Liberty & Inherent Dignity: To an indomitable soul, life in chains is worse than physical death.',
                },
              },
            ].map(item => {
              const isRevealed = revealedThemes.includes(item.id);

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                    isRevealed
                      ? 'bg-amber-50/90 dark:bg-slate-800/90 border-amber-300 dark:border-slate-700 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div>
                    <span className="text-2xl mb-2 block">{item.icon}</span>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-3">
                      {item.question[lang]}
                    </h4>

                    {isRevealed && (
                      <p className="text-xs text-amber-900 dark:text-amber-200 font-semibold bg-white/70 dark:bg-slate-900/70 p-3 rounded-xl border border-amber-200 dark:border-slate-700 animate-in fade-in">
                        {item.revealedTheme[lang]}
                      </p>
                    )}
                  </div>

                  {!isRevealed && (
                    <button
                      onClick={() => handleRevealTheme(item.id)}
                      className="mt-3 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-all"
                    >
                      {lang === 'uz' ? 'G‘oyani ochish' : lang === 'ru' ? 'Раскрыть вывод' : 'Reveal Theme'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: Literary Devices Mini-Guide */}
      {activeTab === 'devices' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/70 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-amber-600" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {lang === 'uz' ? '7-sinf adabiyot tushunchalari (Lobo misolida)' : lang === 'ru' ? 'Теория литературы на примере «Лобо»' : 'Literary Concepts in Lobo'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LITERARY_DEVICES.map(device => (
              <div
                key={device.id}
                className="p-4 rounded-2xl bg-amber-50/50 dark:bg-slate-800/50 border border-amber-200/70 dark:border-slate-700 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-bold text-amber-800 dark:text-amber-400">
                    {device.term[lang]}
                  </h4>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300">
                  <strong className="text-slate-800 dark:text-slate-100">{lang === 'uz' ? 'Ta’rif:' : lang === 'ru' ? 'Определение:' : 'Definition:'}</strong> {device.definition[lang]}
                </p>

                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-100 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-amber-600 block mb-0.5">
                    {lang === 'uz' ? 'Hikoyadan misol:' : lang === 'ru' ? 'Пример из рассказа:' : 'Example from Story:'}
                  </span>
                  {device.exampleFromStory[lang]}
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                  💡 {device.analysis[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next Step Action */}
      <div className="flex items-center justify-end pt-2">
        <button
          onClick={onNextStage}
          className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
        >
          <span>
            {lang === 'uz'
              ? '5-bosqich: O‘yin maydoni'
              : lang === 'ru'
              ? '5-й этап: Игровая площадка'
              : 'Stage 5: Games Arena'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
