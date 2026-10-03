import React, { useState } from 'react';
import { X, Lock, Key, Download, Printer, CheckCircle, FileText, Clock, Users, BookOpen } from 'lucide-react';
import { Language, UserProgress } from '../types';
import { FINAL_QUIZ_QUESTIONS } from '../data/quizData';
import { sounds } from '../utils/audio';

interface TeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  progress: UserProgress;
}

export const TeacherModal: React.FC<TeacherModalProps> = ({
  isOpen,
  onClose,
  lang,
  progress,
}) => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<'plan' | 'questions' | 'test' | 'export'>('plan');

  if (!isOpen) return null;

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234') {
      sounds.playCorrect();
      setIsAuthenticated(true);
      setError(false);
    } else {
      sounds.playWrong();
      setError(true);
    }
  };

  const handleExportJSON = () => {
    sounds.playClick();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(progress, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `lobo_student_progress_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrintTest = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-amber-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 text-slate-800 dark:text-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isAuthenticated ? (
          /* PIN Verification Form */
          <div className="max-w-xs mx-auto text-center space-y-4 py-8">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {lang === 'uz' ? 'O‘qituvchi xonasi' : 'Учительская'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {lang === 'uz' ? 'Standart PIN-kod: 1234' : 'Стандартный PIN-код: 1234'}
              </p>
            </div>

            <form onSubmit={handleVerifyPin} className="space-y-3">
              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={e => setPin(e.target.value)}
                placeholder="PIN"
                className="w-full text-center text-xl font-bold tracking-widest p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-amber-500 outline-none"
              />

              {error && (
                <p className="text-xs text-rose-500 font-bold">
                  {lang === 'uz' ? 'Noto‘g‘ri PIN-kod (1234 ni tering)' : 'Неверный PIN-код (введите 1234)'}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-all"
              >
                {lang === 'uz' ? 'Kirish' : 'Войти'}
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Teacher Panel */
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-amber-200/70 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-amber-600" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {lang === 'uz' ? 'O‘qituvchi Metodik Paneli' : 'Методическая панель учителя'}
                </h3>
              </div>
            </div>

            {/* Teacher Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'plan', label: { uz: 'Dars rejasi (45 daq)', ru: 'План урока (45 мин)', en: 'Lesson Plan (45m)' }, icon: <Clock className="w-3.5 h-3.5" /> },
                { id: 'questions', label: { uz: 'Muhokama va vazifa', ru: 'Обсуждение и ДЗ', en: 'Discussion & HW' }, icon: <Users className="w-3.5 h-3.5" /> },
                { id: 'test', label: { uz: 'Test va javoblar', ru: 'Тест и ключи', en: 'Test & Keys' }, icon: <FileText className="w-3.5 h-3.5" /> },
                { id: 'export', label: { uz: 'O‘quvchi natijalari', ru: 'Результаты ученика', en: 'Student Results' }, icon: <Download className="w-3.5 h-3.5" /> },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => {
                    sounds.playClick();
                    setActiveTab(t.id as typeof activeTab);
                  }}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    activeTab === t.id
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>{t.icon}</span>
                  <span>{t.label[lang]}</span>
                </button>
              ))}
            </div>

            {/* TAB 1: 45-Minute Lesson Plan */}
            {activeTab === 'plan' && (
              <div className="space-y-3 text-xs leading-relaxed">
                <p className="font-bold text-slate-900 dark:text-white text-sm">
                  {lang === 'uz' ? '45 daqiqalik namunaviy dars ishlanmasi:' : 'Поурочный план на 45 минут:'}
                </p>

                <div className="space-y-2">
                  {[
                    { time: '00–05 daq', title: { uz: 'Tashkiliy qism va qiziqish uyg‘otish', ru: 'Оргмомент и мотивация', en: 'Warmup & Hook' }, desc: { uz: 'Savol-hook muhokamasi va 4 ta ishorali detektiv o‘yini.', ru: 'Обсуждение вопроса-крючка и детективная игра.', en: 'Discussion of thought hook and 4-clue riddle.' } },
                    { time: '05–12 daq', title: { uz: 'Muallif va uning dunyoqarashi', ru: 'Знакомство с автором', en: 'Meet Seton' }, desc: { uz: 'Ernest Seton-Tompson xronologiyasi va mini-quiz.', ru: 'Хронология жизни автора и мини-квиз.', en: 'Seton-Thompson timeline & mini-quiz.' } },
                    { time: '12–27 daq', title: { uz: 'Hikoya mazmuni bilan interaktiv ishlash', ru: 'Работа с текстом рассказа', en: 'Story Narrative' }, desc: { uz: '6 ta sahnani audio bilan o‘qish, tushunish savollarini yechish.', ru: 'Изучение 6 сцен, аудиочтение и проверочные вопросы.', en: '6 scenes exploration, audio read, scene checks.' } },
                    { time: '27–35 daq', title: { uz: 'Qahramonlar va g‘oyaviy tahlil', ru: 'Анализ персонажей и тропов', en: 'Characters & Devices' }, desc: { uz: 'Qahramon kartalari, badiiy vositalar (tashxis, o‘xshatish).', ru: 'Карточки героев, художественные средства.', en: 'Character cards, personification, similes.' } },
                    { time: '35–41 daq', title: { uz: 'Keys-stadi va axloqiy qaror', ru: 'Кейс-стади и выбор', en: 'Case Study Dilemma' }, desc: { uz: 'Tarmoqlanuvchi vaziyat va o‘quvchi yozma mulohazasi.', ru: 'Ветвящийся сюжет и эссе рассуждение.', en: 'Branching choice and written reflection.' } },
                    { time: '41–45 daq', title: { uz: 'Xulosa, baholash va uy vazifasi', ru: 'Итоги, оценка и ДЗ', en: 'Wrap-up & Grading' }, desc: { uz: 'Bilimni baholash testi va sertifikat taqdimoti.', ru: 'Итоговый срез и вручение сертификатов.', en: 'Final test assessment and certification.' } },
                  ].map((p, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-amber-50/50 dark:bg-slate-800/60 border border-amber-200 dark:border-slate-700 flex items-start gap-3">
                      <span className="font-extrabold text-amber-700 dark:text-amber-400 shrink-0 w-16">
                        {p.time}
                      </span>
                      <div>
                        <strong className="text-slate-900 dark:text-white block">{p.title[lang]}</strong>
                        <span className="text-slate-600 dark:text-slate-300">{p.desc[lang]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: Classroom Discussion & Homework */}
            {activeTab === 'questions' && (
              <div className="space-y-4 text-xs">
                <div className="p-3 rounded-2xl bg-amber-50/50 dark:bg-slate-800/60 border border-amber-200 dark:border-slate-700 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    {lang === 'uz' ? 'Sinf uchun bahs-munozara savollari:' : 'Вопросы для дискуссии в классе:'}
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                    <li>{lang === 'uz' ? 'Nima uchun Lobo odamlar ko‘z o‘ngida dushmandan olijanob qahramonga aylandi?' : 'Почему Лобо превратился из врага в благородного героя?'}</li>
                    <li>{lang === 'uz' ? 'Biz hayvonlarni faqat o‘zimizga beradigan foydasiga qarab qadrlashimiz to‘g‘rimi?' : 'Правильно ли ценить животных только за пользу?'}</li>
                    <li>{lang === 'uz' ? 'Odamlarning qaysi xatti-harakati tabiat muvozanatini buzadi?' : 'Каковы главные экологические ошибки человечества?'}</li>
                  </ul>
                </div>

                <div className="p-3 rounded-2xl bg-amber-50/50 dark:bg-slate-800/60 border border-amber-200 dark:border-slate-700 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    {lang === 'uz' ? 'Uy vazifasi tavsiyalari:' : 'Рекомендации к домашнему заданию:'}
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    1. Hikoyani oila davrasida 3 ta gap bilan so‘zlab berish.<br />
                    2. "Menga yoqqan sahna" mavzusida rasm chizish yoki kichik insho (50 so‘z) yozish.<br />
                    3. O‘z hududingizdagi noyob yoki himoyaga muhtoj hayvonlar haqida 3 ta qiziqarli ma’lumot to‘plash.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: Test Worksheet & Keys */}
            {activeTab === 'test' && (
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-slate-900 dark:text-white">
                    {lang === 'uz' ? '20 ta test savollari va to‘g‘ri javoblar kaliti:' : 'Ключи к тесту:'}
                  </p>
                  <button
                    onClick={handlePrintTest}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-600 text-white font-bold text-xs"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>{lang === 'uz' ? 'Chop etish' : 'Печать'}</span>
                  </button>
                </div>

                <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
                  {FINAL_QUIZ_QUESTIONS.map((q, idx) => (
                    <div key={q.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {idx + 1}. {q.question[lang]}
                      </span>
                      <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                        ✓ {lang === 'uz' ? 'To‘g‘ri javob:' : 'Правильный ответ:'} {JSON.stringify(q.correctAnswer || 'Namuna')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: Export Student Progress JSON */}
            {activeTab === 'export' && (
              <div className="space-y-3 text-xs">
                <p className="text-slate-700 dark:text-slate-300">
                  {lang === 'uz'
                    ? 'O‘quvchining joriy sessiyadagi ballari, bosqichlari, keys inshosi va test javoblarini JSON fayl qilib yuklab oling:'
                    : 'Скачайте текущие результаты ученика в формате JSON:'}
                </p>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[11px]">
                  XP: {progress.xp} | Bosqich: {progress.currentStage} | Streak: {progress.streak} | Baho: {progress.testHistory?.grade || 'topshirilmagan'}
                </div>

                <button
                  onClick={handleExportJSON}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>{lang === 'uz' ? 'Natijalarni yuklab olish (JSON)' : 'Скачать результаты (JSON)'}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
