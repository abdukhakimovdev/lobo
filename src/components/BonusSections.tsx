import React, { useState } from 'react';
import { Heart, MessageSquare, Send, Sparkles, Globe2, Compass, ShieldCheck, TreePine } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, UserProgress } from '../types';
import { sounds } from '../utils/audio';

interface BonusSectionsProps {
  lang: Language;
  progress: UserProgress;
  onAwardXP: (amount: number, label?: string) => void;
  onUpdateProgress: (updated: Partial<UserProgress>) => void;
}

export const BonusSections: React.FC<BonusSectionsProps> = ({
  lang,
  progress,
  onAwardXP,
  onUpdateProgress,
}) => {
  const [activeTab, setActiveTab] = useState<'wall' | 'creative' | 'nature' | 'interdisciplinary'>('wall');

  // Thought Wall State
  const [newPostText, setNewPostText] = useState('');
  const [newPostEmoji, setNewPostEmoji] = useState('🐺');
  const [authorName, setAuthorName] = useState('O‘quvchi');

  // Creative "Agar men Lobo bo‘lsam" prompt state
  const [creativeText, setCreativeText] = useState(progress.creativeAnswer || '');
  const [creativeSaved, setCreativeSaved] = useState(false);

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    sounds.playCorrect();
    confetti({ particleCount: 50, spread: 50 });

    const newPost = {
      id: Date.now().toString(),
      name: authorName.trim() || 'O‘quvchi',
      text: newPostText.trim(),
      emoji: newPostEmoji,
      date: new Date().toISOString().split('T')[0],
    };

    const updatedWall = [newPost, ...progress.thoughtWall];
    onUpdateProgress({ thoughtWall: updatedWall });
    setNewPostText('');
    onAwardXP(15, lang === 'uz' ? 'Fikr devori' : 'Стена мыслей');
  };

  const handleSaveCreative = () => {
    if (!creativeText.trim()) return;
    sounds.playCorrect();
    onUpdateProgress({ creativeAnswer: creativeText });
    setCreativeSaved(true);
    setTimeout(() => setCreativeSaved(false), 2000);
    onAwardXP(20, 'Ijodiy fikr');
  };

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 rounded-3xl p-6 sm:p-7 border border-amber-200/70 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-200/70 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {lang === 'uz' ? 'Qo‘shimcha Ijodiy va Ma’rifiy Bo‘limlar' : 'Творческие и познавательные разделы'}
          </h3>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'wall', label: { uz: 'Fikrlash devori', ru: 'Стена мыслей', en: 'Thought Wall' }, icon: '💬' },
            { id: 'creative', label: { uz: 'Lobo bo‘lsam...', ru: 'Будь я Лобо...', en: 'If I were Lobo...' }, icon: '✍️' },
            { id: 'nature', label: { uz: 'Hayvonlar va biz', ru: 'Животные и мы', en: 'Animals & Us' }, icon: '🌿' },
            { id: 'interdisciplinary', label: { uz: 'Fanlararo bog‘lanish', ru: 'Межпредметные связи', en: 'Interdisciplinary' }, icon: '🌐' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                sounds.playClick();
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-amber-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-100'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label[lang]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ===================== TAB 1: THOUGHT WALL ===================== */}
      {activeTab === 'wall' && (
        <div className="space-y-5">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {lang === 'uz'
              ? 'Hikoyadan olgan taassurotingizni 1 ta gap bilan yozing, mos emoji tanlang va doskaga ilib qo‘ying:'
              : 'Поделитесь впечатлением о рассказе в одном предложении и прикрепите его на доску:'}
          </p>

          {/* New Post Form */}
          <form onSubmit={handleAddPost} className="p-4 rounded-2xl bg-amber-50/60 dark:bg-slate-800/60 border border-amber-200 dark:border-slate-700 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                value={authorName}
                onChange={e => setAuthorName(e.target.value)}
                placeholder={lang === 'uz' ? 'Ismingiz' : 'Ваше имя'}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none w-36"
              />

              <div className="flex items-center gap-1">
                {['🐺', '🌿', '❤️', '🦅', '💔', '👑'].map(em => (
                  <button
                    type="button"
                    key={em}
                    onClick={() => setNewPostEmoji(em)}
                    className={`w-7 h-7 rounded-lg text-base flex items-center justify-center transition-all ${
                      newPostEmoji === em ? 'bg-amber-300 dark:bg-amber-700 scale-110' : 'hover:bg-amber-100'
                    }`}
                  >
                    {em}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newPostText}
                onChange={e => setNewPostText(e.target.value)}
                placeholder={
                  lang === 'uz'
                    ? 'Hikoyadan taassurotingiz... (masalan: Lobo menga sadoqat timsoli bo‘lib qoladi)'
                    : 'Ваша мысль о рассказе...'
                }
                className="grow px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                className="flex items-center gap-1 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{lang === 'uz' ? 'Qo‘shish' : 'Добавить'}</span>
              </button>
            </div>
          </form>

          {/* Wall Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {progress.thoughtWall.map(item => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-amber-200/80 dark:border-slate-700 shadow-2xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl">{item.emoji}</span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{item.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{item.date}</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  «{item.text}»
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================== TAB 2: CREATIVE "LOBO BO'LSAM" ===================== */}
      {activeTab === 'creative' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-slate-800/60 border border-amber-200 dark:border-slate-700 space-y-2">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              {lang === 'uz' ? 'Ijodiy vazifa: Agar men Lobo bo‘lsam...' : 'Творческое задание: Если бы я был Лобо...'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {lang === 'uz'
                ? 'Tasavvur qiling, siz Karrumpo qiroli Lobosiz. Insonlarga nima degan bo‘lardingiz? 3–4 gapda bo‘rining nomidan gapiring:'
                : 'Представьте себя на месте Лобо. Что бы вы сказали людям от имени дикой природы?'}
            </p>
          </div>

          <textarea
            rows={4}
            value={creativeText}
            onChange={e => setCreativeText(e.target.value)}
            placeholder={
              lang === 'uz'
                ? 'Ey inson, biz ham bu dashtda yashashni istaymiz. Biz sizga dushman emasmiz...'
                : 'Человек, мы тоже хотим жить на этих просторах...'
            }
            className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500"
          />

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              {lang === 'uz' ? 'Qisqa insho yoki she’riy satr yozish mumkin' : 'Можно написать мини-эссе или стих'}
            </span>
            <button
              onClick={handleSaveCreative}
              className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs"
            >
              {creativeSaved ? (lang === 'uz' ? '✓ Saqlandi' : '✓ Сохранено') : (lang === 'uz' ? 'Saqlash (+20 XP)' : 'Сохранить (+20 XP)')}
            </button>
          </div>
        </div>
      )}

      {/* ===================== TAB 3: NATURE CONSERVATION ===================== */}
      {activeTab === 'nature' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 3 Facts */}
            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-slate-800/60 border border-amber-200 dark:border-slate-700 space-y-2.5">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                <TreePine className="w-4 h-4" />
                <h4 className="text-xs sm:text-sm font-bold">
                  {lang === 'uz' ? '3 ta muhim ekologik haqiqat' : '3 экологических факта'}
                </h4>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-1.5">
                  <span>🌲</span>
                  <span><strong>{lang === 'uz' ? 'Sanitar:' : 'Санитары:'}</strong> Bo‘rilar faqat kasal va nimjon hayvonlarni ovlab, epidemiyalarning oldini oladi.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span>🌊</span>
                  <span><strong>{lang === 'uz' ? 'Daryolar o‘zani:' : 'Русла рек:'}</strong> Yelloustoun bog‘ida bo‘rilar qaytarilgach, kiyiklar kamayib, butalar va daryo bo‘ylari qayta tiklandi!</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span>🕊️</span>
                  <span><strong>{lang === 'uz' ? 'Qizil kitob:' : 'Красная книга:'}</strong> Bugungi kunda dunyoda ko‘plab bo‘ri kenja turlari qat’iy muhofazaga olingan.</span>
                </li>
              </ul>
            </div>

            {/* 3 Action Tips */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-slate-800/60 border border-emerald-200 dark:border-slate-700 space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <h4 className="text-xs sm:text-sm font-bold">
                  {lang === 'uz' ? 'Biz tabiatga qanday yordam bera olamiz?' : 'Как мы можем помочь природе?'}
                </h4>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-1.5">
                  <span>1.</span>
                  <span>Yovvoyi hayvonlar haqida to‘g‘ri bilimlarni o‘rganish va noo‘rin qo‘rquvlardan xalos bo‘lish.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span>2.</span>
                  <span>O‘rmon va tog‘ sayrlarida axlat qoldirmaslik, olov yoqish xavfsizligiga rioya qilish.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span>3.</span>
                  <span>Qushlar va mayda jonivorlar uchun qish faslida in va donxona yasash.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ===================== TAB 4: INTERDISCIPLINARY ===================== */}
      {activeTab === 'interdisciplinary' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-slate-800/60 border border-amber-200 dark:border-slate-700 space-y-1.5">
            <span className="text-2xl">🧬</span>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {lang === 'uz' ? 'Biologiya' : 'Биология'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {lang === 'uz'
                ? 'Bo‘rilar (Canis lupus) to‘da intizomiga ega bo‘lib, hid bilish qobiliyati insondan 100 baravar kuchlidir. Ular trofik zanjirning eng yuqori bo‘g‘ini (apex predator) hisoblanadi.'
                : 'Волки обладают тонким обонянием и строгой социальной иерархией.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-slate-800/60 border border-amber-200 dark:border-slate-700 space-y-1.5">
            <span className="text-2xl">🗺️</span>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {lang === 'uz' ? 'Geografiya' : 'География'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {lang === 'uz'
                ? 'Karrumpo vodiysi Nyu-Meksiko shtatida (AQSh) joylashgan bo‘lib, kanyonlar, toshloq qirlar va quruq dasht iqlimi bilan ajralib turadi.'
                : 'Долина Каррумпо в Нью-Мексико отличается засушливыми прериями и глубокими каньонами.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-slate-800/60 border border-amber-200 dark:border-slate-700 space-y-1.5">
            <span className="text-2xl">⏳</span>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {lang === 'uz' ? 'Tarix' : 'История'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {lang === 'uz'
                ? '1890-yillarda Amerikada chorvachilik bumu boshlanib, millionlab qoramollar dashtlarga keltirilgan. Bu esa yovvoyi tabiat va inson o‘rtasidagi eng shiddatli to‘qnashuv davri edi.'
                : 'Конец XIX века в США — эпоха скотоводческого бума и масштабного вытеснения диких зверей.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
