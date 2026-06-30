export type Level = 'A1' | 'A2' | 'B1' | 'B2';

export type Skill = 'Listening' | 'Speaking' | 'Reading' | 'Writing' | 'Vocabulary';

export type ModuleStatus = 'locked' | 'unlocked' | 'completed' | 'in_progress';

export interface Module {
  id: string;
  category?: 'marketing' | 'family-life';
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
  tags?: string[];
  ipa?: string;
  vowels?: string[];
  consonants?: string[];
  track?: 'marketing' | 'family-life';
  level?: Level;
  wordStress?: string;
  collocations?: string[];
  topicTags?: string[];
  sourceLessonIds?: string[];
  
  // Canonical fields for normalization
  keyword?: string;
  vietnameseMeaning?: string;
  topic?: string;
  marketingExample?: string;
  familyLifeExample?: string;
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
  tags?: string[];
  track?: 'marketing' | 'family-life';
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
    breakdown?: {
      structure: string;
      detail: string;
      detailVi: string;
    };
    examples?: {
      english: string;
      vietnamese: string;
      context: string;
    }[];
    mistakes?: {
      incorrect: string;
      correct: string;
      errorType: string;
      why: string;
      whyVi: string;
    }[];
    sentenceBuilder?: {
      subjects: string[];
      auxVerbs: string[];
      verbs: string[];
      objects: string[];
    };
  };
  input: {
    type: 'Reading' | 'Listening';
    title: string;
    instruction: string;
    instructionVi: string;
    material: string; // The Slack bubble or board mockup content
    materialVi: string;
    conversations?: { sender: string; message: string; messageVi?: string; time?: string }[];
    boardColumns?: { name: string; tasks: { title: string; status: string; statusVi?: string }[] }[];
    comprehensions?: {
      id: string;
      prompt: string;
      promptVi: string;
      options: string[];
      correctAnswer: string;
      explanation: string;
      explanationVi: string;
    }[];
  };
  practice: {
    instruction: string;
    instructionVi: string;
    questions: {
      id: string;
      type?: 'multiple_choice' | 'reorder' | 'fill_blank' | 'matching';
      prompt: string;
      promptVi: string;
      options?: string[];
      correctAnswer: string;
      explanation: string;
      explanationVi: string;
      reorderWords?: string[];
      matchingPairs?: { english: string; vietnamese: string }[];
    }[];
  };
  output: {
    format?: 'text' | 'speaking';
    instruction: string;
    instructionVi: string;
    prompt: string;
    promptVi: string;
    placeholder: string;
    sampleAnswer: string;
    pointsToInclude: string[];
  };
}

export interface MigrationMeta {
  schemaVersion: string;
  migratedAt: string;
  migratedFromKeys: string[];
  validationPassed: boolean;
  migrationError?: string;
}

export interface AudioMetadata {
  audioId: string;
  audioTranscript?: string;
  recordedAt: string;
  duration: number;
  mimeType: string;
  storageStatus: 'available' | 'missing' | 'session-only';
}

export interface LessonResponse {
  id: string;
  trackId?: 'marketing' | 'family-life';
  moduleId?: string;
  lessonId: string;
  challengeId?: string;
  topicTags?: string[];
  practiceAnswers: Record<string, string>;
  outputText: string;
  coachFeedback?: {
    score: number;
    strengths: string[];
    improvements: string[];
    vietnameseCoaching: string;
    revisedVersion: string;
    grammarScore?: number;
    vocabularyScore?: number;
    clarityScore?: number;
    toneScore?: number;
    recommendations?: string[];
    fluencyEstimate?: number;
    intelligibilityEstimate?: number;
  };
  audioMetadata?: AudioMetadata; // Unified audio fields
  completedAt?: string;
  currentStep?: number;
  inputText?: string;
  practiceSubmitted?: Record<string, boolean>;
  comprehensionAnswers?: Record<string, string>;
  comprehensionSubmitted?: Record<string, boolean>;
  matchingCompletedPairs?: Record<string, Array<{ english: string; vietnamese: string }>>;
  reorderWordIndices?: Record<string, number[]>;
  audioId?: string;
  audioTranscript?: string;
  updatedAt?: string;
  createdAt?: string;
}

export interface SpeechSettings {
  selectedEnglishVoiceName: string;
  selectedVietnameseVoiceName: string;
  speechRatePreset: number;
}

export interface UserProgress {
  learningContext?: 'marketing' | 'family-life';
  completedLessons: string[]; // lessonId list
  vocabBookmarks: string[]; // vocabId list
  formulaBookmarks: string[]; // formulaId list
  streakDays: number;
  lastActiveDate: string | null;
  skillXP: Record<Skill, number>;
  lessonResponses: Record<string, LessonResponse>; // lessonId -> response
  speechSettings: SpeechSettings;
}
