
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
    {id: 'alif', content: 'ا', type: 'text', imageAiHint: 'arabic letter alif', imagePath: '/assets/images/games/memory/memory-alif.png'},
    {id: 'ba', content: 'ب', type: 'text', imageAiHint: 'arabic letter ba', imagePath: '/assets/images/games/memory/memory-ba.png'},
    {id: 'ta', content: 'ت', type: 'text', imageAiHint: 'arabic letter ta', imagePath: '/assets/images/games/memory/memory-ta.png'},
    {id: 'tha', content: 'ث', type: 'text', imageAiHint: 'arabic letter tha', imagePath: '/assets/images/games/memory/memory-tha.png'},
    {id: 'jim', content: 'ج', type: 'text', imageAiHint: 'arabic letter jim', imagePath: '/assets/images/games/memory/memory-jim.png'},
    {id: 'ha', content: 'ح', type: 'text', imageAiHint: 'arabic letter ha', imagePath: '/assets/images/games/memory/memory-ha.png'},
];

const halalFoodsCards: MemoryMatchCard[] = [
    {id: 'apple', content: 'Apple', type: 'image', imageAiHint: 'apple fruit red', imagePath: '/assets/images/games/memory/memory-apple.png'},
    {id: 'banana', content: 'Banana', type: 'image', imageAiHint: 'banana fruit yellow', imagePath: '/assets/images/games/memory/memory-banana.png'},
    {id: 'dates', content: 'Dates', type: 'image', imageAiHint: 'dates fruit brown', imagePath: '/assets/images/games/memory/memory-dates.png'},
    {id: 'fish', content: 'Fish', type: 'image', imageAiHint: 'fish food meal', imagePath: '/assets/images/games/memory/memory-fish.png'},
    {id: 'chicken', content: 'Chicken (Halal)', type: 'image', imageAiHint: 'chicken meat halal', imagePath: '/assets/images/games/memory/memory-chicken.png'},
    {id: 'milk', content: 'Milk', type: 'image', imageAiHint: 'milk glass white', imagePath: '/assets/images/games/memory/memory-milk.png'},
];

const mosqueObjectsCards: MemoryMatchCard[] = [
    {id: 'prayerrug', content: 'Prayer Rug', type: 'image', imageAiHint: 'prayer rug colorful', imagePath: '/assets/images/games/memory/memory-prayerrug.png'},
    {id: 'minaret', content: 'Minaret', type: 'image', imageAiHint: 'mosque minaret tower', imagePath: '/assets/images/games/memory/memory-minaret.png'},
    {id: 'dome', content: 'Dome', type: 'image', imageAiHint: 'mosque dome sky', imagePath: '/assets/images/games/memory/memory-dome.png'},
    {id: 'quranstand', content: 'Quran Stand', type: 'image', imageAiHint: 'quran stand wood', imagePath: '/assets/images/games/memory/memory-quranstand.png'},
    {id: 'tasbih', content: 'Tasbih Beads', type: 'image', imageAiHint: 'tasbih beads prayer', imagePath: '/assets/images/games/memory/memory-tasbih.png'},
    {id: 'mihrab', content: 'Mihrab Niche', type: 'image', imageAiHint: 'mosque mihrab ornate', imagePath: '/assets/images/games/memory/memory-mihrab.png'},
];


export const dummyMemoryMatchGames: MemoryMatchGame[] = [
  {
    id: 'good-deeds-1',
    title: 'Good Deeds Match',
    description: 'Match pairs of good deeds in Islam.',
    cards: goodDeedsCards, // Text based, no main game image needed here
    imageAiHint: 'helping hands children', // Hint for overall game concept, not a direct image in data
  },
  {
    id: 'prophets-match',
    title: 'Prophets Name Match',
    description: 'Match the names of the Prophets.',
    cards: prophetNamesCards, // Text based
    imageAiHint: 'scroll ancient names',
  },
  {
    id: 'arabic-letters-1',
    title: 'Arabic Letters Fun',
    description: 'Match the Arabic letters. A fun start to learning!',
    cards: arabicLettersCards, // Uses images per card
    imageAiHint: 'arabic alphabet colorful',
  },
  {
    id: 'halal-foods-match',
    title: 'Halal Foods Match',
    description: 'Match pictures or names of Halal foods.',
    cards: halalFoodsCards, // Uses images per card
    imageAiHint: 'healthy food variety',
  },
  {
    id: 'mosque-items-match',
    title: 'Inside the Mosque Match',
    description: 'Match items commonly found in a mosque.',
    cards: mosqueObjectsCards, // Uses images per card
    imageAiHint: 'mosque items collection',
  }
];
