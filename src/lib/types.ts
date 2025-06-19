export interface Story {
  id: string;
  title: string;
  description: string;
  moral: string;
  thumbnailUrl: string;
  content: StoryContentNode[];
  ageGroup: '4-8' | '9-16';
  imageAiHint?: string;
}

export type StoryContentNode = 
  | { type: 'paragraph'; text: string }
  | { type: 'image'; url: string; alt: string; aiHint?: string; }
  | { type: 'decision'; prompt: string; choices: { text: string; nextNodeIndex: number }[] };

export interface Dua {
  id: string;
  title: string;
  arabic: string;
  translation: string;
  transliteration: string;
  audioUrl?: string; // Optional: for audio recitation
  explanation: string;
  ageGroup: '4-8' | '9-16';
  imageAiHint?: string;
}

export interface QuranVerse {
  id: string;
  surahName: string;
  verseNumber: string; // e.g., "2:255"
  arabic: string;
  translation: string;
  transliteration?: string; // Optional
  tafsir: string; // Simplified explanation
  audioUrl?: string; // Optional: for recitation
  ageGroup: '4-8' | '9-16';
  imageAiHint?: string;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'puzzle' | 'memory-match';
  href: string;
  icon?: React.ReactNode; // e.g. from lucide-react
  ageGroup: '4-8' | '9-16';
  imageAiHint?: string;
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation?: string; // Explanation for the correct answer
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  imageAiHint?: string;
}

export interface Puzzle {
  id: string;
  title: string;
  description: string;
  imageUrl: string; // Image for the puzzle
  pieces: number; // Number of pieces, for complexity
  imageAiHint?: string;
}

export interface MemoryMatchCard {
  id: string;
  content: string; // Could be text or an image URL path
  type: 'text' | 'image';
  imageAiHint?: string;
}

export interface MemoryMatchGame {
  id: string;
  title: string;
  description: string;
  cards: MemoryMatchCard[]; // Will be duplicated to create pairs
  imageAiHint?: string;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  type: 'badge' | 'virtual_item';
  iconUrl?: string; // URL for badge icon or item image
  pointsRequired?: number;
  imageAiHint?: string;
}

export interface AalimMessage {
  id: string;
  sender: 'user' | 'aalim';
  text: string;
  timestamp: number;
  evaluation?: string;
  prize?: string;
}
