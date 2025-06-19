import type { MemoryMatchGame, MemoryMatchCard } from '@/lib/types';

const goodDeedsCards: MemoryMatchCard[] = [
  { id: 'gd1', content: 'Kindness', type: 'text' },
  { id: 'gd2', content: 'Honesty', type: 'text' },
  { id: 'gd3', content: 'Charity', type: 'text' },
  { id: 'gd4', content: 'Respect', type: 'text' },
  { id: 'gd5', content: 'Patience', type: 'text' },
  { id: 'gd6', content: 'Forgiveness', type: 'text' },
];

const prophetNamesCards: MemoryMatchCard[] = [
  { id: 'pn1', content: 'Adam (AS)', type: 'text' },
  { id: 'pn2', content: 'Nuh (AS)', type: 'text' },
  { id: 'pn3', content: 'Ibrahim (AS)', type: 'text' },
  { id: 'pn4', content: 'Musa (AS)', type: 'text' },
  { id: 'pn5', content: 'Isa (AS)', type: 'text' },
  { id: 'pn6', content: 'Muhammad (PBUH)', type: 'text' },
];

export const dummyMemoryMatchGames: MemoryMatchGame[] = [
  {
    id: 'good-deeds-1',
    title: 'Good Deeds Match',
    description: 'Match pairs of good deeds in Islam.',
    cards: goodDeedsCards,
    imageAiHint: 'helping hands kids',
  },
  {
    id: 'prophets-match',
    title: 'Prophets Name Match',
    description: 'Match the names of the Prophets.',
    cards: prophetNamesCards,
    imageAiHint: 'scroll ancient names',
  },
];
