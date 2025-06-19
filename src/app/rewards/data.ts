import type { Reward } from '@/lib/types';

export const dummyRewards: Reward[] = [
  {
    id: 'badge-story-explorer',
    title: 'Story Explorer Badge',
    description: 'Awarded for completing your first story.',
    type: 'badge',
    iconUrl: 'https://placehold.co/100x100.png',
    imageAiHint: 'badge scroll compass',
    pointsRequired: 10,
  },
  {
    id: 'badge-dua-learner',
    title: 'Dua Learner Badge',
    description: 'Awarded for learning 3 Duas.',
    type: 'badge',
    iconUrl: 'https://placehold.co/100x100.png',
    imageAiHint: 'badge praying hands',
    pointsRequired: 15, // 3 duas * 5 points
  },
  {
    id: 'badge-quran-reflecter',
    title: 'Quran Reflecter Badge',
    description: 'Awarded for reflecting on 3 Quranic verses.',
    type: 'badge',
    iconUrl: 'https://placehold.co/100x100.png',
    imageAiHint: 'badge quran open',
    pointsRequired: 21, // 3 verses * 7 points
  },
  {
    id: 'badge-quiz-whiz',
    title: 'Quiz Whiz Badge',
    description: 'Awarded for scoring perfectly on a quiz.',
    type: 'badge',
    iconUrl: 'https://placehold.co/100x100.png',
    imageAiHint: 'badge brain lightbulb',
    pointsRequired: 10, // A quiz gives max 10 points
  },
  {
    id: 'virtual-prayer-mat',
    title: 'Virtual Prayer Mat',
    description: 'A beautiful virtual prayer mat for your collection.',
    type: 'virtual_item',
    iconUrl: 'https://placehold.co/100x100.png',
    imageAiHint: 'prayer rug ornate',
    pointsRequired: 50,
  },
  {
    id: 'aalim-star-student',
    title: 'Aalim\'s Star Student',
    description: 'Awarded by Aalim for excellent interaction!',
    type: 'badge',
    iconUrl: 'https://placehold.co/100x100.png',
    imageAiHint: 'star gold award',
    // No points required, awarded by AI
  }
];
