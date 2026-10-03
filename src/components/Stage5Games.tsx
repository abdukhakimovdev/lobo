import React, { useState, useEffect } from 'react';
import {
  ListOrdered,
  BookA,
  Layers,
  MessageSquareQuote,
  Grid,
  Zap,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  ArrowRight,
  Clock,
  HelpCircle,
  MoveUp,
  MoveDown,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, UserProgress } from '../types';
import {
  SEQUENCING_EVENTS,
  VOCAB_WORDS,
  MEMORY_PAIRS,
  WHO_SAID_PROMPTS,
  WORD_SEARCH_WORDS,
  BLITZ_QUESTIONS,
  CHARACTERS_DATA,
} from '../data/lessonData';
import { sounds } from '../utils/audio';
import { LoboMascot } from './LoboMascot';

interface Stage5GamesProps {
  lang: Language;
  progress: UserProgress;
  onAwardXP: (amount: number, label?: string) => void;
  onUnlockBadge: (badgeId: string) => void;
  onCompleteStage: (stageId: 5, stars: number) => void;
  onNextStage: () => void;
}

export const Stage5Games: React.FC<Stage5GamesProps> = ({
  lang,
  progress,
  onAwardXP,
  onUnlockBadge,
  onCompleteStage,
  onNextStage,
}) => {
  const [activeGame, setActiveGame] = useState<'sequencing' | 'vocab' | 'memory' | 'whosaid' | 'wordbuilder' | 'blitz'>('sequencing');

  // ===================== GAME 1: SEQUENCING =====================
  const [seqItems, setSeqItems] = useState(() => {
    // Initial shuffled order
    return [...SEQUENCING_EVENTS].sort(() => 0.5 - Math.random());
  });
  const [seqChecked, setSeqChecked] = useState(false);
  const [seqSuccess, setSeqSuccess] = useState(false);

  const moveSeqItem = (index: number, direction: 'up' | 'down') => {
    sounds.playClick();
    const newItems = [...seqItems];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newItems.length) return;
    const temp = newItems[index];
    newItems[index] = newItems[targetIdx];
    newItems[targetIdx] = temp;
    setSeqItems(newItems);
    setSeqChecked(false);
  };

  const checkSequencing = () => {
    let correct = true;
    for (let i = 0; i < seqItems.length; i++) {
      if (seqItems[i].order !== i + 1) {
        correct = false;
        break;
      }
    }
    setSeqChecked(true);
    setSeqSuccess(correct);

    if (correct) {
      sounds.playCorrect();
      confetti({ particleCount: 70, spread: 60 });
      onAwardXP(30, lang === 'uz' ? 'Voqealar tartibi' : lang === 'ru' ? 'Хронология' : 'Timeline');
      onUnlockBadge('detective');
    } else {
      sounds.playWrong();
    }
  };

  // ===================== GAME 2: VOCABULARY =====================
  const [vocabIndex, setVocabIndex] = useState(0);
  const [vocabFlipped, setVocabFlipped] = useState(false);
  const [vocabQuizAnswers, setVocabQuizAnswers] = useState<Record<string, string>>({});
  const [vocabQuizChecked, setVocabQuizChecked] = useState(false);

  const curWord = VOCAB_WORDS[vocabIndex];

  const handleNextVocab = () => {
    sounds.playClick();
    setVocabFlipped(false);
    setVocabIndex((vocabIndex + 1) % VOCAB_WORDS.length);
  };

  const handlePrevVocab = () => {
    sounds.playClick();
    setVocabFlipped(false);
    setVocabIndex((vocabIndex - 1 + VOCAB_WORDS.length) % VOCAB_WORDS.length);
  };

  const handleCheckVocabQuiz = () => {
    sounds.playCorrect();
    setVocabQuizChecked(true);
    onAwardXP(25, lang === 'uz' ? 'Lug‘at ustasi' : lang === 'ru' ? 'Мастер словаря' : 'Vocab Master');
    onUnlockBadge('vocab_master');
  };

  // ===================== GAME 3: MEMORY MATCH =====================
  interface MemoryCard {
    cardId: string;
    pairId: string;
    text: string;
    isFlipped: boolean;
    isMatched: boolean;
  }

  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [flippedMemory, setFlippedMemory] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [memoryComplete, setMemoryComplete] = useState(false);

  const initMemoryGame = () => {
    const deck: MemoryCard[] = [];
    MEMORY_PAIRS.forEach((pair, idx) => {
      deck.push({
        cardId: `${pair.id}-a`,
        pairId: pair.id,
        text: pair.label[lang],
        isFlipped: false,
        isMatched: false,
      });
      deck.push({
        cardId: `${pair.id}-b`,
        pairId: pair.id,
        text: pair.match[lang],
        isFlipped: false,
        isMatched: false,
      });
    });
    // Shuffle
    deck.sort(() => 0.5 - Math.random());
    setMemoryCards(deck);
    setFlippedMemory([]);
    setMemoryMoves(0);
    setMemoryComplete(false);
  };

  useEffect(() => {
    initMemoryGame();
  }, [lang]);

  const handleMemoryClick = (index: number) => {
    if (flippedMemory.length === 2 || memoryCards[index].isFlipped || memoryCards[index].isMatched) return;

    sounds.playClick();
    const updated = [...memoryCards];
    updated[index].isFlipped = true;
    setMemoryCards(updated);

    const newFlipped = [...flippedMemory, index];
    setFlippedMemory(newFlipped);

    if (newFlipped.length === 2) {
      setMemoryMoves(prev => prev + 1);
      const [idx1, idx2] = newFlipped;
      if (updated[idx1].pairId === updated[idx2].pairId) {
        // Matched!
        setTimeout(() => {
          sounds.playCorrect();
          updated[idx1].isMatched = true;
          updated[idx2].isMatched = true;
          setMemoryCards([...updated]);
          setFlippedMemory([]);

          // Check if all matched
          if (updated.every(c => c.isMatched)) {
            setMemoryComplete(true);
            confetti({ particleCount: 70, spread: 60 });
            onAwardXP(35, lang === 'uz' ? 'Xotira o‘yini' : lang === 'ru' ? 'Игра на память' : 'Memory Game');
          }
        }, 500);
      } else {
        // Not match
        setTimeout(() => {
          updated[idx1].isFlipped = false;
          updated[idx2].isFlipped = false;
          setMemoryCards([...updated]);
          setFlippedMemory([]);
        }, 1000);
      }
    }
  };

  // ===================== GAME 4: WHO SAID IT? =====================
  const [whoSaidAnswers, setWhoSaidAnswers] = useState<Record<string, string>>({});
  const [whoSaidChecked, setWhoSaidChecked] = useState(false);
  const [whoSaidScore, setWhoSaidScore] = useState(0);

  const handleSelectWhoSaid = (promptId: string, charId: string) => {
    sounds.playClick();
    setWhoSaidAnswers(prev => ({ ...prev, [promptId]: charId }));
    setWhoSaidChecked(false);
  };

  const handleCheckWhoSaid = () => {
    let score = 0;
    WHO_SAID_PROMPTS.forEach(p => {
      if (whoSaidAnswers[p.id] === p.characterId) {
        score += 1;
      }
    });
    setWhoSaidScore(score);
    setWhoSaidChecked(true);

    if (score === WHO_SAID_PROMPTS.length) {
      sounds.playCorrect();
      confetti({ particleCount: 70, spread: 60 });
      onAwardXP(25, lang === 'uz' ? 'Kim aytdi?' : lang === 'ru' ? 'Кто сказал?' : 'Who said it?');
    } else {
      sounds.playWrong();
    }
  };

  // ===================== GAME 5: WORD BUILDER =====================
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [builtLetters, setBuiltLetters] = useState<string[]>([]);
  const [wordSuccess, setWordSuccess] = useState(false);

  const activeWordObj = WORD_SEARCH_WORDS[currentWordIdx];
  const targetWord = activeWordObj.word;

  // Available letter tiles (scrambled target word letters + 3 random decoys)
  const [scrambledLetters, setScrambledLetters] = useState<string[]>([]);

  useEffect(() => {
    const letters = targetWord.split('');
    const decoys = ['Q', 'M', 'R', 'T', 'S', 'B', 'N', 'L'].filter(l => !letters.includes(l)).slice(0, 3);
    const pool = [...letters, ...decoys].sort(() => 0.5 - Math.random());
    setScrambledLetters(pool);
    setBuiltLetters([]);
    setWordSuccess(false);
  }, [currentWordIdx, targetWord]);

  const handleAddLetter = (letter: string, tileIdx: number) => {
    sounds.playClick();
    const next = [...builtLetters, letter];
    setBuiltLetters(next);

    if (next.join('') === targetWord) {
      sounds.playCorrect();
      setWordSuccess(true);
      onAwardXP(15, targetWord);
    } else if (next.length === targetWord.length) {
      sounds.playWrong();
    }
  };

  const handleClearLetters = () => {
    sounds.playClick();
    setBuiltLetters([]);
    setWordSuccess(false);
  };

  // ===================== GAME 6: SPEED BLITZ ROUND =====================
  const [blitzActive, setBlitzActive] = useState(false);
  const [blitzTimeLeft, setBlitzTimeLeft] = useState(30);
  const [blitzIndex, setBlitzIndex] = useState(0);
  const [blitzScore, setBlitzScore] = useState(0);
  const [blitzFinished, setBlitzFinished] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (blitzActive && blitzTimeLeft > 0) {
      timer = setTimeout(() => {
        setBlitzTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (blitzActive && blitzTimeLeft === 0) {
      setBlitzActive(false);
      setBlitzFinished(true);
      sounds.playFanfare();
      if (blitzScore >= 4) {
        onUnlockBadge('speed_mind');
      }
      onAwardXP(blitzScore * 10, lang === 'uz' ? 'Tezkor sinov' : lang === 'ru' ? 'Блиц-раунд' : 'Blitz Round');
    }
    return () => clearTimeout(timer);
  }, [blitzActive, blitzTimeLeft, blitzScore, lang]);

  const startBlitz = () => {
    sounds.playClick();
    setBlitzActive(true);
    setBlitzTimeLeft(30);
    setBlitzIndex(0);
    setBlitzScore(0);
    setBlitzFinished(false);
  };

  const handleBlitzAnswer = (isTrueChosen: boolean) => {
    const curQ = BLITZ_QUESTIONS[blitzIndex];
    if (curQ.isTrue === isTrueChosen) {
      sounds.playCorrect();
      setBlitzScore(prev => prev + 1);
    } else {
      sounds.playWrong();
    }

    if (blitzIndex + 1 < BLITZ_QUESTIONS.length) {
      setBlitzIndex(prev => prev + 1);
    } else {
      // Completed all questions early
      setBlitzActive(false);
      setBlitzFinished(true);
      sounds.playFanfare();
      if (blitzScore + (curQ.isTrue === isTrueChosen ? 1 : 0) >= 4) {
        onUnlockBadge('speed_mind');
      }
      onAwardXP((blitzScore + 1) * 10, 'Tezkor sinov');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <LoboMascot
        mood="happy"
        message={
          lang === 'uz'
            ? 'Xush kelibsiz! O‘yin maydonida 6 xil qiziqarli o‘yin bor. O‘ynab, ko‘proq XP va nishonlar yig‘ing!'
            : lang === 'ru'
            ? 'Добро пожаловать на игровую площадку! Здесь 6 увлекательных игр. Собирай опыт и открывай значки!'
            : 'Welcome to the Games Arena! 6 interactive challenges await you. Play to earn XP and badges!'
        }
        lang={lang}
      />

      {/* Game Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {[
          { id: 'sequencing', label: { uz: '1. Tartib', ru: '1. Хронология', en: '1. Sequencing' }, icon: <ListOrdered className="w-4 h-4" /> },
          { id: 'vocab', label: { uz: '2. Lug‘at', ru: '2. Словарь', en: '2. Vocab' }, icon: <BookA className="w-4 h-4" /> },
          { id: 'memory', label: { uz: '3. Xotira', ru: '3. Память', en: '3. Memory' }, icon: <Layers className="w-4 h-4" /> },
          { id: 'whosaid', label: { uz: '4. Kim aytdi?', ru: '4. Кто сказал?', en: '4. Who said?' }, icon: <MessageSquareQuote className="w-4 h-4" /> },
          { id: 'wordbuilder', label: { uz: '5. So‘z yasash', ru: '5. Словострой', en: '5. Word Builder' }, icon: <Grid className="w-4 h-4" /> },
          { id: 'blitz', label: { uz: '6. Tezkor blits', ru: '6. Блиц (30s)', en: '6. Blitz (30s)' }, icon: <Zap className="w-4 h-4" /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              sounds.playClick();
              setActiveGame(tab.id as typeof activeGame);
            }}
            className={`flex items-center gap-1.5 p-2.5 rounded-2xl text-xs font-bold transition-all border ${
              activeGame === tab.id
                ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-amber-50'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="truncate">{tab.label[lang]}</span>
          </button>
        ))}
      </div>

      {/* ===================== GAME 1: SEQUENCING ===================== */}
      {activeGame === 'sequencing' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/70 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {lang === 'uz' ? 'Voqealarni to‘g‘ri ketma-ketlikka joylashtir' : lang === 'ru' ? 'Расставь события в правильном порядке' : 'Arrange the Events in Chronological Order'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'uz' ? 'Tugmalar orqali voqealarni yuqoriga yoki pastga siljit:' : lang === 'ru' ? 'Используй стрелки для перемещения событий:' : 'Use buttons to move events up or down:'}
              </p>
            </div>
            <button
              onClick={() => {
                setSeqItems([...SEQUENCING_EVENTS].sort(() => 0.5 - Math.random()));
                setSeqChecked(false);
                setSeqSuccess(false);
              }}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Aralashtirish"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2.5">
            {seqItems.map((item, idx) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-50/60 dark:bg-slate-800/60 border border-amber-200/70 dark:border-slate-700 gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                    {item.text[lang]}
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    disabled={idx === 0}
                    onClick={() => moveSeqItem(idx, 'up')}
                    className="p-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-100 text-slate-700 dark:text-slate-200"
                  >
                    <MoveUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={idx === seqItems.length - 1}
                    onClick={() => moveSeqItem(idx, 'down')}
                    className="p-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-100 text-slate-700 dark:text-slate-200"
                  >
                    <MoveDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={checkSequencing}
              className="px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
            >
              {lang === 'uz' ? 'Tartibni tekshirish' : lang === 'ru' ? 'Проверить хронологию' : 'Check Sequence'}
            </button>

            {seqChecked && (
              <span className={`text-xs font-bold flex items-center gap-1 ${seqSuccess ? 'text-emerald-600' : 'text-rose-500'}`}>
                {seqSuccess ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                {seqSuccess
                  ? lang === 'uz' ? 'To‘liq to‘g‘ri ketma-ketlik! (+30 XP)' : lang === 'ru' ? 'Идеальная хронология! (+30 XP)' : 'Perfect chronology! (+30 XP)'
                  : lang === 'uz' ? 'Tartibda xatolik bor, yana urinib ko‘r!' : lang === 'ru' ? 'Есть ошибки, попробуй еще раз!' : 'Some events are out of place, retry!'}
              </span>
            )}
          </div>
        </div>
      )}

      {/* ===================== GAME 2: VOCABULARY ===================== */}
      {activeGame === 'vocab' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/70 dark:border-slate-800 shadow-sm flex flex-col items-center text-center space-y-4">
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400">
                {vocabIndex + 1} / {VOCAB_WORDS.length} {lang === 'uz' ? 'so‘z' : lang === 'ru' ? 'слово' : 'word'}
              </span>
              <span className="text-[11px] text-slate-400">
                {lang === 'uz' ? 'Orqa tomonini ko‘rish uchun bos' : lang === 'ru' ? 'Нажми для оборота' : 'Click to flip'}
              </span>
            </div>

            {/* Flashcard */}
            <div
              onClick={() => {
                sounds.playClick();
                setVocabFlipped(!vocabFlipped);
              }}
              className="w-full max-w-md h-56 p-6 rounded-3xl bg-linear-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-800/80 border-2 border-amber-300 dark:border-slate-700 shadow-sm flex flex-col justify-between cursor-pointer transition-transform hover:scale-102"
            >
              {!vocabFlipped ? (
                <div className="my-auto space-y-2">
                  <span className="text-3xl">📖</span>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    {curWord.word[lang]}
                  </h3>
                  <p className="text-xs text-amber-700 dark:text-amber-400 font-semibold">
                    {lang === 'uz' ? 'Ma’nosini bilish uchun kartani bosing' : lang === 'ru' ? 'Нажмите, чтобы узнать значение' : 'Tap to reveal definition'}
                  </p>
                </div>
              ) : (
                <div className="my-auto space-y-3 text-left animate-in fade-in">
                  <div>
                    <span className="text-[10px] font-bold text-amber-600 uppercase">
                      {lang === 'uz' ? 'Ta’rifi:' : lang === 'ru' ? 'Определение:' : 'Definition:'}
                    </span>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {curWord.definition[lang]}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-amber-600 uppercase">
                      {lang === 'uz' ? 'Sinonim:' : lang === 'ru' ? 'Синоним:' : 'Synonyms:'}
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {curWord.synonym[lang]}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-amber-600 uppercase">
                      {lang === 'uz' ? 'Gapda qo‘llanishi:' : lang === 'ru' ? 'В предложении:' : 'Example:'}
                    </span>
                    <p className="text-xs italic text-slate-600 dark:text-slate-400">
                      «{curWord.exampleSentence[lang]}»
                    </p>
                  </div>
                </div>
              )}

              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                {vocabFlipped ? (lang === 'uz' ? 'Oldiga qaytish' : 'Перевернуть обратно') : (lang === 'uz' ? 'Aylantirish' : 'Перевернуть')}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevVocab}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50"
              >
                {lang === 'uz' ? 'Oldingi' : lang === 'ru' ? 'Назад' : 'Prev'}
              </button>
              <button
                onClick={handleNextVocab}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold"
              >
                {lang === 'uz' ? 'Keyingi so‘z' : lang === 'ru' ? 'Следующее' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== GAME 3: MEMORY MATCH ===================== */}
      {activeGame === 'memory' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/70 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {lang === 'uz' ? 'Xotira o‘yini (Juftlarni top)' : lang === 'ru' ? 'Игра на память (Найди пару)' : 'Memory Match (Find Pairs)'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'uz' ? `Harakatlar soni: ${memoryMoves}` : lang === 'ru' ? `Ходов: ${memoryMoves}` : `Moves: ${memoryMoves}`}
              </p>
            </div>
            <button
              onClick={initMemoryGame}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Qayta boshlash"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {memoryCards.map((card, idx) => (
              <button
                key={card.cardId}
                disabled={card.isMatched}
                onClick={() => handleMemoryClick(idx)}
                className={`h-24 sm:h-28 p-2 rounded-2xl border text-xs font-bold flex items-center justify-center text-center transition-all ${
                  card.isMatched
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-300 text-emerald-800 dark:text-emerald-300 opacity-80'
                    : card.isFlipped
                    ? 'bg-amber-500 text-white border-amber-600 shadow-md scale-102'
                    : 'bg-amber-50/60 dark:bg-slate-800 border-amber-200 dark:border-slate-700 text-amber-800 dark:text-amber-300 hover:border-amber-400'
                }`}
              >
                {card.isFlipped || card.isMatched ? (
                  <span>{card.text}</span>
                ) : (
                  <span className="text-2xl opacity-60">🐾</span>
                )}
              </button>
            ))}
          </div>

          {memoryComplete && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl border border-emerald-300 text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
              <span>🎉 {lang === 'uz' ? `Qoyil! ${memoryMoves} ta harakatda bajarding!` : `Отлично! Пройдено за ${memoryMoves} ходов!`}</span>
              <button
                onClick={initMemoryGame}
                className="px-3 py-1 rounded-xl bg-emerald-600 text-white text-[11px]"
              >
                {lang === 'uz' ? 'Yana o‘ynash' : 'Снова'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ===================== GAME 4: WHO SAID IT? ===================== */}
      {activeGame === 'whosaid' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/70 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {lang === 'uz' ? 'Kim aytdi yoki kimga tegishli?' : lang === 'ru' ? 'Кому принадлежат эти мысли?' : 'Who Said / Reflected This?'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {lang === 'uz' ? 'Iboralarni to‘g‘ri qahramonga bog‘lang:' : lang === 'ru' ? 'Свяжи цитату с подходящим героем:' : 'Match the quote to the correct character:'}
            </p>
          </div>

          <div className="space-y-3.5">
            {WHO_SAID_PROMPTS.map(p => {
              const selectedChar = whoSaidAnswers[p.id];
              const isChecked = whoSaidChecked;
              const isCorrect = selectedChar === p.characterId;

              return (
                <div key={p.id} className="p-4 rounded-2xl bg-amber-50/50 dark:bg-slate-800/60 border border-amber-200 dark:border-slate-700 space-y-2.5">
                  <p className="text-xs sm:text-sm font-medium italic text-slate-800 dark:text-slate-200">
                    {p.quote[lang]}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {CHARACTERS_DATA.map(c => {
                      const isChosen = selectedChar === c.id;
                      let style = 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-amber-50';

                      if (isChosen) {
                        style = 'bg-amber-500 text-white border-amber-600 font-bold';
                      }

                      if (isChecked) {
                        if (c.id === p.characterId) {
                          style = 'bg-emerald-500 text-white border-emerald-600 font-bold';
                        } else if (isChosen && c.id !== p.characterId) {
                          style = 'bg-rose-500 text-white border-rose-600';
                        }
                      }

                      return (
                        <button
                          key={c.id}
                          disabled={isChecked}
                          onClick={() => handleSelectWhoSaid(p.id, c.id)}
                          className={`px-3 py-1.5 rounded-xl border text-xs transition-all ${style}`}
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

          <div className="flex items-center justify-between pt-2">
            <button
              disabled={Object.keys(whoSaidAnswers).length < WHO_SAID_PROMPTS.length}
              onClick={handleCheckWhoSaid}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-xs ${
                Object.keys(whoSaidAnswers).length === WHO_SAID_PROMPTS.length
                  ? 'bg-amber-600 hover:bg-amber-700 text-white cursor-pointer'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              {lang === 'uz' ? 'Tekshirish' : lang === 'ru' ? 'Проверить' : 'Check'}
            </button>

            {whoSaidChecked && (
              <span className="text-xs font-bold text-amber-600">
                {whoSaidScore} / {WHO_SAID_PROMPTS.length} {lang === 'uz' ? 'to‘g‘ri topildi' : 'верно'}
              </span>
            )}
          </div>
        </div>
      )}

      {/* ===================== GAME 5: WORD BUILDER ===================== */}
      {activeGame === 'wordbuilder' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/70 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold text-amber-600">
                {currentWordIdx + 1} / {WORD_SEARCH_WORDS.length}
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {lang === 'uz' ? 'Harflardan so‘zni yig‘ing' : lang === 'ru' ? 'Собери слово из букв' : 'Assemble the Word from Tiles'}
              </h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 dark:bg-slate-800 text-amber-800 dark:text-amber-300">
              💡 {activeWordObj.clue[lang]}
            </span>
          </div>

          {/* Letter slots */}
          <div className="flex items-center justify-center gap-2 py-4">
            {targetWord.split('').map((_, i) => (
              <div
                key={i}
                className="w-10 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-amber-300 dark:border-slate-700 flex items-center justify-center font-extrabold text-lg text-slate-900 dark:text-white shadow-inner"
              >
                {builtLetters[i] || ''}
              </div>
            ))}
          </div>

          {/* Scrambled letter buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {scrambledLetters.map((letter, idx) => (
              <button
                key={idx}
                disabled={wordSuccess}
                onClick={() => handleAddLetter(letter, idx)}
                className="w-10 h-10 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm shadow-md transition-all active:scale-95"
              >
                {letter}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handleClearLetters}
              className="text-xs font-bold text-slate-500 hover:text-amber-600"
            >
              {lang === 'uz' ? 'Tozalash' : 'Очистить'}
            </button>

            {wordSuccess && (
              <button
                onClick={() => setCurrentWordIdx((currentWordIdx + 1) % WORD_SEARCH_WORDS.length)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
              >
                {lang === 'uz' ? 'Keyingi so‘z' : 'Следующее слово'} →
              </button>
            )}
          </div>
        </div>
      )}

      {/* ===================== GAME 6: BLITZ ROUND (30s) ===================== */}
      {activeGame === 'blitz' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/70 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {lang === 'uz' ? '30 soniyalik tezkor «Haqiqat yoki Yolg‘on»' : lang === 'ru' ? '30-секундный блиц «Правда или Ложь»' : '30-Second True or False Blitz'}
              </h3>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-extrabold text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span>{blitzTimeLeft}s</span>
            </div>
          </div>

          {!blitzActive && !blitzFinished ? (
            <div className="p-8 text-center space-y-3">
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                {lang === 'uz'
                  ? '30 soniya ichida iloji boricha ko‘proq savolga to‘g‘ri javob bering va o‘z rekordizni o‘rnating!'
                  : lang === 'ru'
                  ? 'Ответьте на максимальное число утверждений за полминуты!'
                  : 'Answer as many statements as possible in 30 seconds to set a record!'}
              </p>
              <button
                onClick={startBlitz}
                className="px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm shadow-md transition-all"
              >
                {lang === 'uz' ? 'Boshlash (Start) ⏱️' : lang === 'ru' ? 'Старт! ⏱️' : 'Start Blitz ⏱️'}
              </button>
            </div>
          ) : blitzActive ? (
            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-slate-800/60 border border-amber-200 dark:border-slate-700 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{blitzIndex + 1} / {BLITZ_QUESTIONS.length}</span>
                <span className="font-bold text-amber-600">Ball: {blitzScore}</span>
              </div>

              <h4 className="text-base font-bold text-slate-900 dark:text-white leading-relaxed min-h-[50px]">
                {BLITZ_QUESTIONS[blitzIndex].statement[lang]}
              </h4>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => handleBlitzAnswer(true)}
                  className="py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-sm transition-all"
                >
                  ✓ {lang === 'uz' ? 'Haqiqat (To‘g‘ri)' : lang === 'ru' ? 'Правда' : 'True'}
                </button>
                <button
                  onClick={() => handleBlitzAnswer(false)}
                  className="py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-sm transition-all"
                >
                  ✗ {lang === 'uz' ? 'Yolg‘on (Noto‘g‘ri)' : lang === 'ru' ? 'Ложь' : 'False'}
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center space-y-3 bg-amber-50/60 dark:bg-slate-800 rounded-2xl border border-amber-200 dark:border-slate-700">
              <span className="text-4xl block">🏆</span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {lang === 'uz' ? `Ajoyib! To‘plangan ball: ${blitzScore}` : `Отличный результат: ${blitzScore} очков!`}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'uz' ? 'Xatolar ustida ishlab, yana urinib ko‘rishingiz mumkin.' : 'Можно попробовать улучшить результат!'}
              </p>
              <button
                onClick={startBlitz}
                className="px-4 py-2 rounded-xl bg-amber-600 text-white font-bold text-xs shadow-xs"
              >
                {lang === 'uz' ? 'Qayta urinish' : 'Еще раз'}
              </button>
            </div>
          )}
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
              ? '6-bosqich: KEYS (Karrumpo qarori)'
              : lang === 'ru'
              ? '6-й этап: КЕЙС (Решение в Каррумпо)'
              : 'Stage 6: CASE (Currumpaw Dilemma)'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
