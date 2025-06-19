import type { Dua } from '@/lib/types';

export const dummyDuas: Dua[] = [
  {
    id: 'dua-before-eating',
    title: 'Dua Before Eating',
    arabic: 'بِسْمِ اللهِ',
    translation: 'In the name of Allah.',
    transliteration: 'Bismillah.',
    audioUrl: '/audio/bismillah.mp3', // Placeholder path
    explanation: 'Recite this dua before starting your meal to seek blessings from Allah.',
    ageGroup: '4-8',
    imageAiHint: 'food plate hands',
  },
  {
    id: 'dua-after-eating',
    title: 'Dua After Eating',
    arabic: 'الْحَمْدُ للهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
    translation: 'All praise is for Allah who fed us and gave us drink, and made us Muslims.',
    transliteration: 'Alhamdu lillahil-ladhi at\'amana wasaqana waja\'alana Muslimin.',
    audioUrl: '/audio/alhamdulillah_eating.mp3', // Placeholder path
    explanation: 'Thank Allah for the food and drink He has provided after finishing your meal.',
    ageGroup: '4-8',
    imageAiHint: 'empty plate happy',
  },
  {
    id: 'dua-before-sleeping',
    title: 'Dua Before Sleeping',
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    translation: 'In Your name O Allah, I live and die.',
    transliteration: 'Bismika Allahumma amutu wa ahya.',
    audioUrl: '/audio/bismika_allahumma.mp3', // Placeholder path
    explanation: 'Recite this dua before going to sleep, entrusting yourself to Allah.',
    ageGroup: '9-16',
    imageAiHint: 'moon stars night',
  },
  {
    id: 'dua-waking-up',
    title: 'Dua After Waking Up',
    arabic: 'الْحَمْدُ للهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    translation: 'All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.',
    transliteration: 'Alhamdu lillahil-ladhi ahyana ba\'da ma amatana wa ilaihin-nushur.',
    audioUrl: '/audio/alhamdulillah_waking.mp3', // Placeholder path
    explanation: 'Thank Allah for giving you another day when you wake up.',
    ageGroup: '9-16',
    imageAiHint: 'sunshine morning window',
  },
];
