export type Language = 'uz' | 'ru' | 'en';

export type StageId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type BloomLevel = 'bilish' | 'tushunish' | 'qollash' | 'tahlil';

export type QuestionCategory = 'syujet' | 'qahramonlar' | 'lugat' | 'goya';

export interface LocalizedString {
  uz: string;
  ru: string;
  en: string;
}

export interface Badge {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  icon: string; // emoji or lucide icon name
  unlockedAt?: string;
}

export interface UserProgress {
  xp: number;
  level: number;
  currentStage: StageId;
  completedStages: StageId[];
  stageStars: Record<number, number>; // stageId -> 1..3 stars
  unlockedBadges: string[];
  streak: number;
  lastActiveDate: string;
  notes: string;
  caseDecisions: string[];
  caseEssay: string;
  caseRubric: {
    evidence: number; // 1-3
    empathy: number;
    reasoning: number;
  };
  thoughtWall: Array<{
    id: string;
    name: string;
    text: string;
    emoji: string;
    date: string;
  }>;
  creativeAnswer: string;
  testHistory?: {
    date: string;
    score: number;
    total: number;
    percentage: number;
    grade: number; // 2, 3, 4, 5
    wrongQuestionIds: number[];
  };
}

export interface Scene {
  id: number;
  title: LocalizedString;
  summary: LocalizedString;
  quotePrompt: LocalizedString;
  svgType: 'pack' | 'traps' | 'author' | 'blanca' | 'capture' | 'farewell';
  checkQuestion: {
    question: LocalizedString;
    options: LocalizedString[];
    correctIndex: number;
    explanation: LocalizedString;
  };
}

export interface CharacterInfo {
  id: string;
  name: LocalizedString;
  role: LocalizedString;
  traits: LocalizedString[];
  description: LocalizedString;
  quote: LocalizedString;
  symbolism: LocalizedString;
}

export interface LiteraryDevice {
  id: string;
  term: LocalizedString;
  definition: LocalizedString;
  exampleFromStory: LocalizedString;
  analysis: LocalizedString;
}

export interface VocabWord {
  id: string;
  word: LocalizedString;
  definition: LocalizedString;
  synonym: LocalizedString;
  exampleSentence: LocalizedString;
}

export interface QuizQuestion {
  id: number;
  type: 'single' | 'multiple' | 'boolean' | 'fill' | 'matching' | 'open';
  bloom: BloomLevel;
  category: QuestionCategory;
  question: LocalizedString;
  options?: LocalizedString[];
  correctAnswer?: number | number[] | boolean | string | Record<string, string>;
  explanation: LocalizedString;
  sampleAnswer?: LocalizedString; // for open question
  matchingPairs?: Array<{
    left: LocalizedString;
    right: LocalizedString;
  }>;
}

export interface CaseStep {
  id: number;
  prompt: LocalizedString;
  choices: Array<{
    id: string;
    text: LocalizedString;
    consequence: LocalizedString;
    nextStepId?: number;
    endingId?: string;
  }>;
}

export interface CaseEnding {
  id: string;
  title: LocalizedString;
  outcome: LocalizedString;
  moralLesson: LocalizedString;
  badgeId?: string;
}
