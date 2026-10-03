import { UserProgress, StageId, Language } from '../types';

const STORAGE_KEY = 'lobo_lesson_progress_v1';
const PREFS_KEY = 'lobo_lesson_prefs_v1';

export const LEVEL_THRESHOLDS = [
  { level: 1, minXp: 0, title: { uz: 'Dasht izquvari', ru: 'Следопыт степей', en: 'Prairie Tracker' }, icon: '🐾' },
  { level: 2, minXp: 70, title: { uz: 'Yosh kuzatuvchi', ru: 'Юный наблюдатель', en: 'Young Observer' }, icon: '🔍' },
  { level: 3, minXp: 160, title: { uz: 'Tabiat do‘sti', ru: 'Друг природы', en: 'Friend of Nature' }, icon: '🌿' },
  { level: 4, minXp: 280, title: { uz: 'Lobo yo‘ldoshi', ru: 'Спутник Лобо', en: 'Lobo’s Companion' }, icon: '🐺' },
  { level: 5, minXp: 420, title: { uz: 'Adabiyot qahramoni', ru: 'Герой литературы', en: 'Literature Hero' }, icon: '👑' },
];

export function calculateLevel(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i].minXp) {
      return LEVEL_THRESHOLDS[i].level;
    }
  }
  return 1;
}

const defaultProgress: UserProgress = {
  xp: 0,
  level: 1,
  currentStage: 1,
  completedStages: [],
  stageStars: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 },
  unlockedBadges: [],
  streak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  notes: '',
  caseDecisions: [],
  caseEssay: '',
  caseRubric: { evidence: 0, empathy: 0, reasoning: 0 },
  thoughtWall: [
    {
      id: 'default-1',
      name: 'Azizbek',
      text: 'Lobo o‘z jufti Blankaga bo‘lgan sevgisi tufayli tuzoqqa tushgani qalbimni larzaga soldi.',
      emoji: '🐺',
      date: '2026-10-01',
    },
    {
      id: 'default-2',
      name: 'Madina',
      text: 'Hayvonlar ham xuddi bizdek sadoqat va erkinlik qadrini biladi.',
      emoji: '🌿',
      date: '2026-10-02',
    },
  ],
  creativeAnswer: '',
};

export interface UserPrefs {
  lang: Language;
  darkMode: boolean;
  soundOn: boolean;
  fontSize: 'normal' | 'large' | 'xl';
  highContrast: boolean;
}

export function loadUserProgress(): UserProgress {
  if (typeof window === 'undefined') return defaultProgress;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw);

    // Update streak logic
    const today = new Date().toISOString().split('T')[0];
    const lastDate = parsed.lastActiveDate || today;
    let streak = parsed.streak || 1;

    const diffDays = Math.floor((new Date(today).getTime() - new Date(lastDate).getTime()) / (1000 * 3600 * 24));
    if (diffDays === 1) {
      streak += 1;
    } else if (diffDays > 1) {
      streak = 1;
    }

    return {
      ...defaultProgress,
      ...parsed,
      streak,
      lastActiveDate: today,
      level: calculateLevel(parsed.xp || 0),
    };
  } catch {
    return defaultProgress;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    progress.level = calculateLevel(progress.xp);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // ignore
  }
}

export function loadUserPrefs(): UserPrefs {
  const defaultPrefs: UserPrefs = {
    lang: 'uz',
    darkMode: typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false,
    soundOn: false,
    fontSize: 'normal',
    highContrast: false,
  };

  if (typeof window === 'undefined') return defaultPrefs;
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (!raw) return defaultPrefs;
    return { ...defaultPrefs, ...JSON.parse(raw) };
  } catch {
    return defaultPrefs;
  }
}

export function saveUserPrefs(prefs: UserPrefs): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch {
    // ignore
  }
}
