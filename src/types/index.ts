export interface QuizOption {
  id: string;
  text: string;
  correct?: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  type: 'single' | 'multiple' | 'text' | 'matching';
  options?: QuizOption[];
  correctAnswer?: string | string[];
  explanation: string;
  points: number;
}

export interface LearningTopic {
  id: string;
  title: string;
  content: TopicContent[];
}

export interface TopicContent {
  type: 'text' | 'info' | 'warning' | 'table' | 'list' | 'definition' | 'heading';
  text?: string;
  title?: string;
  headers?: string[];
  rows?: string[][];
  items?: string[];
  term?: string;
  definition?: string;
}

export interface LearningModule {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'advanced';
  icon: string;
  heroImage: string;
  topics: LearningTopic[];
  questions: QuizQuestion[];
}
