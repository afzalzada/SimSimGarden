import type { MemoryMatchGame, MemoryMatchCard } from '@/lib/types';

const goodDeedsCards: MemoryMatchCard[] = [
  { id: 'gd1', content: 'Kindness', type: 'text' },
  { id: 'gd2', content: 'Honesty', type: 'text' },
  { id: 'gd3', content: 'Charity', type: 'text' },
  { id: 'gd4', content: 'Respect', type: 'text' },
  { id: 'gd5', content: 'Patience', type: 'text' },
  { id: 'gd6', content: 'Forgiveness', type: 'text' },
  { id: 'gd7', content: 'Helping', type: 'text' },
  { id: 'gd8', content: 'Sharing', type: 'text' },
];

const prophetNamesCards: MemoryMatchCard[] = [
  { id: 'pn1', content: 'Adam (AS)', type: 'text' },
  { id: 'pn2', content: 'Nuh (AS)', type: 'text' },
  { id: 'pn3', content: 'Ibrahim (AS)', type: 'text' },
  { id: 'pn4', content: 'Musa (AS)', type: 'text' },
  { id: 'pn5', content: 'Isa (AS)', type: 'text' },
  { id: 'pn6', content: 'Muhammad (PBUH)', type: 'text' },
  { id: 'pn7', content: 'Yusuf (AS)', type: 'text' },
  { id: 'pn8', content: 'Dawud (AS)', type: 'text' },
];

const arabicLettersCards: MemoryMatchCard[] = [
    {id: 'alif', content: 'ا', type: 'text', imageAiHint: 'arabic letter alif'},
    {id: 'ba', content: 'ب', type: 'text', imageAiHint: 'arabic letter ba'},
    {id: 'ta', content: 'ت', type: 'text', imageAiHint: 'arabic letter ta'},
    {id: 'tha', content: 'ث', type: 'text', imageAiHint: 'arabic letter tha'},
    {id: 'jim', content: 'ج', type: 'text', imageAiHint: 'arabic letter jim'},
    {id: 'ha', content: 'ح', type: 'text', imageAiHint: 'arabic letter ha'},
];

const halalFoodsCards: MemoryMatchCard[] = [
    {id: 'apple', content: 'Apple', type: 'text', imageAiHint: 'apple fruit red'},
    {id: 'banana', content: 'Banana', type: 'text', imageAiHint: 'banana fruit yellow'},
    {id: 'dates', content: 'Dates', type: 'text', imageAiHint: 'dates fruit brown'},
    {id: 'fish', content: 'Fish', type: 'text', imageAiHint: 'fish food meal'},
    {id: 'chicken', content: 'Chicken (Halal)', type: 'text', imageAiHint: 'chicken meat halal'},
    {id: 'milk', content: 'Milk', type: 'text', imageAiHint: 'milk glass white'},
];

const mosqueObjectsCards: MemoryMatchCard[] = [
    {id: 'prayerrug', content: 'Prayer Rug', type: 'text', imageAiHint: 'prayer rug colorful'},
    {id: 'minaret', content: 'Minaret', type: 'text', imageAiHint: 'mosque minaret tower'},
    {id: 'dome', content: 'Dome', type: 'text', imageAiHint: 'mosque dome sky'},
    {id: 'quranstand', content: 'Quran Stand', type: 'text', imageAiHint: 'quran stand wood'},
    {id: 'tasbih', content: 'Tasbih Beads', type: 'text', imageAiHint: 'tasbih beads prayer'},
    {id: 'mihrab', content: 'Mihrab Niche', type: 'text', imageAiHint: 'mosque mihrab ornate'},
];


export const dummyMemoryMatchGames: MemoryMatchGame[] = [
  {
    id: 'good-deeds-1',
    title: 'Good Deeds Match',
    description: 'Match pairs of good deeds in Islam.',
    cards: goodDeedsCards,
    imageAiHint: 'helping hands children',
  },
  {
    id: 'prophets-match',
    title: 'Prophets Name Match',
    description: 'Match the names of the Prophets.',
    cards: prophetNamesCards,
    imageAiHint: 'scroll ancient names',
  },
  {
    id: 'arabic-letters-1',
    title: 'Arabic Letters Fun',
    description: 'Match the Arabic letters. A fun start to learning!',
    cards: arabicLettersCards,
    imageAiHint: 'arabic alphabet colorful',
  },
  {
    id: 'halal-foods-match',
    title: 'Halal Foods Match',
    description: 'Match pictures or names of Halal foods.',
    cards: halalFoodsCards,
    imageAiHint: 'healthy food variety',
  },
  {
    id: 'mosque-items-match',
    title: 'Inside the Mosque Match',
    description: 'Match items commonly found in a mosque.',
    cards: mosqueObjectsCards,
    imageAiHint: 'mosque items collection',
  }
];
