export type LanguageCode = "es" | "fr" | "ja" | "pt" | "ko" | "de" | "zh";

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  color: string;
  description: string;
  learnerCount?: string;
}

export type ActivityType =
  | "vocabulary"
  | "phrase"
  | "multiple_choice"
  | "match"
  | "listen"
  | "speak";

export interface VocabularyItem {
  word: string;
  translation: string;
  pronunciation?: string;
  example?: string;
}

export interface PhraseItem {
  phrase: string;
  translation: string;
  pronunciation?: string;
  context?: string;
}

export interface MultipleChoiceActivity {
  type: "multiple_choice";
  question: string;
  options: string[];
  correctIndex: number;
}

export interface MatchActivity {
  type: "match";
  pairs: Array<{ left: string; right: string }>;
}

export interface ListenActivity {
  type: "listen";
  text: string;
  translation: string;
}

export interface SpeakActivity {
  type: "speak";
  prompt: string;
  targetPhrase: string;
}

export interface VocabularyActivity {
  type: "vocabulary";
  items: VocabularyItem[];
}

export interface PhraseActivity {
  type: "phrase";
  items: PhraseItem[];
}

export type Activity =
  | VocabularyActivity
  | PhraseActivity
  | MultipleChoiceActivity
  | MatchActivity
  | ListenActivity
  | SpeakActivity;

export interface AITeacherPrompt {
  intro: string;
  encouragement: string;
  correction: string;
  completion: string;
}

export interface LessonGoal {
  description: string;
  xpReward: number;
}

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  description: string;
  orderIndex: number;
  xpReward: number;
  durationMinutes: number;
  goals: LessonGoal[];
  activities: Activity[];
  aiTeacherPrompt: AITeacherPrompt;
}

export interface Unit {
  id: string;
  languageCode: LanguageCode;
  title: string;
  description: string;
  orderIndex: number;
  color: string;
  iconEmoji: string;
  lessonIds: string[];
}
