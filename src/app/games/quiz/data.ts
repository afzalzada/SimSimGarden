import type { Quiz } from '@/lib/types';

export const dummyQuizzes: Quiz[] = [
  {
    id: 'general-knowledge-1',
    title: 'Islamic General Knowledge - Easy',
    description: 'Test your basic knowledge about Islam.',
    imageAiHint: 'islamic symbols question',
    questions: [
      {
        id: 'q1',
        questionText: 'What is the holy book of Islam?',
        options: [
          { id: 'opt1', text: 'Bible' },
          { id: 'opt2', text: 'Quran' },
          { id: 'opt3', text: 'Torah' },
        ],
        correctOptionId: 'opt2',
        explanation: 'The Quran is the holy book of Islam, believed to be the word of Allah revealed to Prophet Muhammad (PBUH).'
      },
      {
        id: 'q2',
        questionText: 'How many pillars of Islam are there?',
        options: [
          { id: 'opt1', text: 'Three' },
          { id: 'opt2', text: 'Five' },
          { id: 'opt3', text: 'Seven' },
        ],
        correctOptionId: 'opt2',
        explanation: 'There are five pillars of Islam: Shahada (faith), Salat (prayer), Zakat (charity), Sawm (fasting), and Hajj (pilgrimage).'
      },
      {
        id: 'q3',
        questionText: 'Who is the last Prophet in Islam?',
        options: [
          { id: 'opt1', text: 'Prophet Isa (Jesus)' },
          { id: 'opt2', text: 'Prophet Musa (Moses)' },
          { id: 'opt3', text: 'Prophet Muhammad (PBUH)' },
        ],
        correctOptionId: 'opt3',
        explanation: 'Prophet Muhammad (peace be upon him) is considered the final prophet in Islam.'
      },
    ],
  },
  {
    id: 'fiqh-basics-1',
    title: 'Fiqh Basics - Salah',
    description: 'Learn about the basics of Islamic prayer (Salah).',
    imageAiHint: 'prayer rug salah',
    questions: [
      {
        id: 'q1_fb1',
        questionText: 'How many daily obligatory prayers are there in Islam?',
        options: [
          { id: 'opt1', text: '3' },
          { id: 'opt2', text: '5' },
          { id: 'opt3', text: '7' },
        ],
        correctOptionId: 'opt2',
        explanation: 'Muslims perform five obligatory prayers each day: Fajr, Dhuhr, Asr, Maghrib, and Isha.'
      },
      {
        id: 'q2_fb1',
        questionText: 'In which direction do Muslims pray?',
        options: [
          { id: 'opt1', text: 'Towards Jerusalem' },
          { id: 'opt2', text: 'Towards the Kaaba in Mecca' },
          { id: 'opt3', text: 'Towards the East' },
        ],
        correctOptionId: 'opt2',
        explanation: 'Muslims pray facing the Qibla, which is the direction of the Kaaba in Mecca.'
      },
    ],
  },
];
