import React, { useState } from 'react';
import {
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Flame,
  Award,
  BookOpen,
  Monitor,
  Settings,
  Globe,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { Language, UserProgress } from '../types';
import { UserPrefs, LEVEL_THRESHOLDS } from '../utils/storage';
import { UI_TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  progress: UserProgress;
  prefs: UserPrefs;
  onUpdatePrefs: (updated: Partial<UserPrefs>) => void;
  onOpenBadges: () => void;
  onOpenTeacher: () => void;
  onOpenProjector: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  progress,
  prefs,
  onUpdatePrefs,
  onOpenBadges,
  onOpenTeacher,
  onOpenProjector,
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [accessMenuOpen, setAccessMenuOpen] = useState(false);

  const t = (key: string) => UI_TRANSLATIONS[key]?.[prefs.lang] || key;

  const currentLevelInfo = LEVEL_THRESHOLDS.find(l => l.level === progress.level) || LEVEL_THRESHOLDS[0];
  const nextLevelInfo = LEVEL_THRESHOLDS.find(l => l.level === progress.level + 1);

  // Compute progress percentage to next level
  let levelProgressPct = 100;
  if (nextLevelInfo) {
    const range = nextLevelInfo.minXp - currentLevelInfo.minXp;
    const progressInCurrent = progress.xp - currentLevelInfo.minXp;
    levelProgressPct = Math.min(100, Math.max(0, Math.round((progressInCurrent / range) * 100)));
  }

  const languages: Array<{ code: Language; label: string; flag: string }> = [
    { code: 'uz', label: "O‘zbekcha", flag: '🇺🇿' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-amber-200/60 dark:border-slate-800 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
        {/* Brand / Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-md text-xl">
            🐺
          </div>
          <div>
            <h1 className="font-display font-extrabold text-base sm:text-lg leading-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>{t('appTitle')}</span>
              <span className="hidden md:inline-block text-[11px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold border border-amber-300 dark:border-amber-700">
                7-sinf
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              {t('appSubtitle')}
            </p>
          </div>
        </div>

        {/* Center Gamification Tracker */}
        <div className="hidden lg:flex items-center gap-4 bg-amber-50/80 dark:bg-slate-800/80 px-3.5 py-1.5 rounded-2xl border border-amber-200/70 dark:border-slate-700 shadow-inner">
          {/* Streak */}
          <div className="flex items-center gap-1 text-xs font-bold text-amber-700 dark:text-amber-400" title={`${progress.streak} ${t('streakDays')}`}>
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span>{progress.streak}d</span>
          </div>

          <div className="h-4 w-px bg-amber-200 dark:bg-slate-700" />

          {/* Level & XP */}
          <div className="flex items-center gap-2">
            <span className="text-base">{currentLevelInfo.icon}</span>
            <div className="text-left">
              <div className="flex items-center justify-between text-[11px] gap-2">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {currentLevelInfo.title[prefs.lang]}
                </span>
                <span className="text-amber-600 dark:text-amber-400 font-extrabold">
                  {progress.xp} XP
                </span>
              </div>
              <div className="w-24 h-1.5 bg-amber-200/60 dark:bg-slate-700 rounded-full overflow-hidden mt-0.5">
                <div
                  className="h-full bg-linear-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                  style={{ width: `${levelProgressPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions & Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Streak & XP for small screens */}
          <div className="flex lg:hidden items-center gap-1.5 text-xs bg-amber-100/60 dark:bg-slate-800 px-2 py-1 rounded-xl">
            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
            <span className="font-bold text-slate-800 dark:text-slate-200">{progress.xp} XP</span>
          </div>

          {/* Badges Button */}
          <button
            onClick={onOpenBadges}
            className="relative p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-amber-100 dark:hover:bg-slate-800 transition-colors"
            title={t('badgesHeader')}
            aria-label={t('badgesHeader')}
          >
            <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            {progress.unlockedBadges.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-black flex items-center justify-center">
                {progress.unlockedBadges.length}
              </span>
            )}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => onUpdatePrefs({ soundOn: !prefs.soundOn })}
            className={`p-2 rounded-xl transition-colors ${
              prefs.soundOn
                ? 'text-amber-600 bg-amber-100/70 dark:bg-amber-950/40 dark:text-amber-300'
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title={prefs.soundOn ? t('soundOn') : t('soundOff')}
            aria-label={prefs.soundOn ? t('soundOn') : t('soundOff')}
          >
            {prefs.soundOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={() => onUpdatePrefs({ darkMode: !prefs.darkMode })}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-amber-100/60 dark:hover:bg-slate-800 transition-colors"
            title={prefs.darkMode ? 'Light mode' : 'Dark mode'}
            aria-label="Toggle theme"
          >
            {prefs.darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setLangMenuOpen(!langMenuOpen);
                setAccessMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-amber-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors"
            >
              <span>{languages.find(l => l.code === prefs.lang)?.flag}</span>
              <span className="hidden sm:inline uppercase">{prefs.lang}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-amber-200 dark:border-slate-700 py-1.5 z-50 animate-in fade-in zoom-in-95">
                {languages.map(item => (
                  <button
                    key={item.code}
                    onClick={() => {
                      onUpdatePrefs({ lang: item.code });
                      setLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold transition-colors ${
                      prefs.lang === item.code
                        ? 'bg-amber-100 dark:bg-slate-700 text-amber-900 dark:text-amber-200'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-700/50'
                    }`}
                  >
                    <span className="text-base">{item.flag}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Accessibility Settings Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setAccessMenuOpen(!accessMenuOpen);
                setLangMenuOpen(false);
              }}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-amber-100/60 dark:hover:bg-slate-800 transition-colors"
              title={t('accessibility')}
              aria-label={t('accessibility')}
            >
              <Settings className="w-5 h-5" />
            </button>

            {accessMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-amber-200 dark:border-slate-700 p-3 z-50 text-xs">
                <p className="font-bold text-slate-900 dark:text-white mb-2">{t('accessibility')}</p>
                <div className="mb-3">
                  <p className="text-slate-500 dark:text-slate-400 mb-1 font-medium">{t('fontSize')}</p>
                  <div className="grid grid-cols-3 gap-1">
                    {(['normal', 'large', 'xl'] as const).map(size => (
                      <button
                        key={size}
                        onClick={() => onUpdatePrefs({ fontSize: size })}
                        className={`py-1 rounded-lg font-bold border transition-colors ${
                          prefs.fontSize === size
                            ? 'bg-amber-500 text-white border-amber-600'
                            : 'bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600'
                        }`}
                      >
                        {size === 'normal' ? 'A' : size === 'large' ? 'A+' : 'A++'}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="flex items-center justify-between cursor-pointer pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{t('highContrast')}</span>
                  <input
                    type="checkbox"
                    checked={prefs.highContrast}
                    onChange={e => onUpdatePrefs({ highContrast: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                  />
                </label>
              </div>
            )}
          </div>

          {/* Projector Mode Button */}
          <button
            onClick={onOpenProjector}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
            title={t('projectorMode')}
          >
            <Monitor className="w-4 h-4 text-emerald-600" />
            <span className="hidden md:inline">{t('projectorMode')}</span>
          </button>

          {/* Teacher Mode Button */}
          <button
            onClick={onOpenTeacher}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-bold shadow-xs transition-all"
            title={t('teacherMode')}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('teacherMode')}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
