export interface VocabularyItem {
  id: string;
  dutch: string | string[];
  english: string | string[];
  chapter: number;
  section: string;
  article?: 'de' | 'het';
  plural?: string;
  hint?: string;
  category?:
    | 'time'
    | 'family'
    | 'description'
    | 'question'
    | 'pronoun'
    | 'month'
    | 'season'
    | 'greeting'
    | 'number'
    | 'article'
    | 'ordinal'
    | 'plural';
}

export interface Chapter {
  id: number;
  title: string;
  sections: string[];
}

export interface UserProgress {
  completedWords: Set<string>;
  scores: Record<string, number>;
  currentChapter: number;
}

export interface Exercise {
  id: string;
  type: 'recognition' | 'production' | 'article' | 'plural';
  question: string;
  answer: string;
  options?: string[];
  vocabularyId: string;
}
