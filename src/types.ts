export type Level = 'A1' | 'A2' | 'B1' | 'B2';

export type Skill = 'Listening' | 'Speaking' | 'Reading' | 'Writing' | 'Vocabulary';

export type ModuleStatus = 'locked' | 'unlocked' | 'completed' | 'in_progress';

export interface Module {
  id: string;
  level: Level;
  code: string;
  title: string;
  description: string;
  status: ModuleStatus;
  duration: number; // in minutes
  vocabCount: number;
  skills: Skill[];
  outcome: string;
  outcomeVi: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  mainSkill: Skill;
  secondarySkill: Skill;
  duration: number; // in minutes
  unlocked: boolean;
  completed: boolean;
  description: string;
}

export interface VocabularyItem {
  id: string;
  word: string;
  partOfSpeech: string;
  definition: string;
  vietnameseTranslation: string;
  exampleSentence: string;
  exampleTranslation: string;
  marketingContext: string;
  category: string;
}

export interface FormulaItem {
  id: string;
  structure: string;
  purpose: string;
  purposeVi: string;
  example: string;
  exampleVi: string;
  usageTip: string;
  category: string;
}

export interface LessonStepContent {
  context: {
    scenario: string;
    scenarioVi: string;
    role: string;
    roleVi: string;
    goal: string;
    goalVi: string;
    marketingFocus: string;
  };
  vocabulary: {
    words: VocabularyItem[];
    instruction: string;
    instructionVi: string;
  };
  formulas: {
    items: FormulaItem[];
    instruction: string;
    instructionVi: string;
  };
  practice: {
    instruction: string;
    instructionVi: string;
    questions: {
      id: string;
      prompt: string;
      promptVi: string;
      options?: string[];
      correctAnswer: string;
      explanation: string;
      explanationVi: string;
    }[];
  };
  output: {
    instruction: string;
    instructionVi: string;
    prompt: string;
    promptVi: string;
    placeholder: string;
    sampleAnswer: string;
    pointsToInclude: string[];
  };
}

export interface LessonResponse {
  id: string;
  lessonId: string;
  practiceAnswers: Record<string, string>; // questionId -> selectedOption/text
  outputText: string;
  coachFeedback?: {
    score: number; // 0 - 100
    strengths: string[];
    improvements: string[];
    vietnameseCoaching: string;
    revisedVersion: string;
  };
  completedAt?: string;
}

export interface UserProgress {
  completedLessons: string[]; // lessonId list
  vocabBookmarks: string[]; // vocabId list
  formulaBookmarks: string[]; // formulaId list
  streakDays: number;
  lastActiveDate: string | null;
  skillXP: Record<Skill, number>; // total points per skill
  lessonResponses: Record<string, LessonResponse>; // lessonId -> response
}
