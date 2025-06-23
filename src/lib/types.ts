
export interface Story {
  id: string;
  title: string;
  description: string;
  moral: string;
  thumbnailUrl: string; // Will be updated to local path
  content: StoryContentNode[];
  ageGroup: '4-8' | '9-16';
  imageAiHint?: string;
}

export type StoryContentNode = 
  | { type: 'paragraph'; text: string }
  | { type: 'image'; url: string; alt: string; aiHint?: string; } // url will be updated
  | { type: 'decision'; prompt: string; choices: { text: string; nextNodeIndex: number }[] };

export interface Dua {
  id: string;
  title: string;
  arabic: string;
  translation: string;
  transliteration: string;
  audioUrl?: string; 
  explanation: string;
  ageGroup: '4-8' | '9-16';
  imageAiHint?: string;
  imagePath?: string; // For card image
  mainImagePath?: string; // For detail page image
}

export interface QuranVerse {
  id: string;
  surahName: string;
  verseNumber: string; 
  arabic: string;
  translation: string;
  transliteration?: string; 
  tafsir: string; 
  audioUrl?: string; 
  ageGroup: '4-8' | '9-16';
  imageAiHint?: string;
  imagePath?: string; // For card image
  mainImagePath?: string; // For detail page image
}

export type LucideIconName = 'HelpCircle' | 'Puzzle' | 'Brain' | 'BookOpen' | 'Sparkles' | 'Users' | 'Smile' | 'SpellCheck' | 'Palette';


export interface Game {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'puzzle' | 'memory-match' | 'adventure' | 'coloring';
  href: string;
  icon?: LucideIconName; 
  ageGroup: '4-8' | '9-16';
  imageAiHint?: string;
  imagePath?: string; // For GameCard image
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation?: string; 
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  imageAiHint?: string; 
  // No direct top-level image for Quiz list, specific quizzes might have concept hints
}

export interface Puzzle {
  id: string;
  title: string;
  description: string;
  imageUrl: string; // Will be updated to local path
  pieces: number; 
  imageAiHint?: string;
}

export interface MemoryMatchCard {
  id: string;
  content: string; 
  type: 'text' | 'image';
  imageAiHint?: string;
  imagePath?: string; // Will be local path if type is 'image'
}

export interface MemoryMatchGame {
  id:string;
  title: string;
  description: string;
  cards: MemoryMatchCard[]; 
  imageAiHint?: string; 
  // No direct top-level image for MemoryMatchGame list, specific games might have concept hints
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  type: 'badge' | 'virtual_item' | 'wallpaper' | 'avatar_accessory';
  iconUrl?: string; // Will be updated to local path
  pointsRequired?: number;
  imageAiHint?: string;
  awardedByAI?: boolean; // For Aalim's special rewards
}

export interface AalimMessage {
  id: string;
  sender: 'user' | 'aalim';
  text: string;
  timestamp: number;
  evaluation?: string;
  prize?: string;
}

export interface ColoringPage {
  id: string;
  title: string;
  description: string;
  imageUrl: string; // Outline version
  coloredImageUrl: string; // Fully colored version for hint
  imageAiHint: string;
  coloredImageAiHint: string;
  tags: string[];
}
