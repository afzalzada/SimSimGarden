import type { Puzzle } from '@/lib/types';

export const dummyPuzzles: Puzzle[] = [
  {
    id: 'prophet-noah-ark',
    title: 'Prophet Nuh\'s (AS) Ark',
    description: 'Piece together the image of Prophet Nuh\'s (Noah) ark and the animals.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'noah ark animals',
    pieces: 12, // For younger kids
  },
  {
    id: 'kaaba-puzzle',
    title: 'The Holy Kaaba',
    description: 'Assemble the puzzle of the Kaaba, the most sacred site in Islam.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'kaaba mecca',
    pieces: 24, // Slightly more complex
  },
  {
    id: 'mosque-interior',
    title: 'Beautiful Mosque Interior',
    description: 'Complete the puzzle of a stunning mosque interior design.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'mosque interior architecture',
    pieces: 36, // For older kids
  },
];
