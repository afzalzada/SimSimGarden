import type { Quiz } from '@/lib/types';

export const dummyQuizzes: Quiz[] = [
  {
    id: 'general-knowledge-1',
    title: 'Islamic General Knowledge - Easy',
    description: 'Test your basic knowledge about Islam.',
    imageAiHint: 'islamic symbols kids',
    questions: [
      {
        id: 'q1',
        questionText: 'What is the holy book of Islam?',
        options: [ { id: 'opt1', text: 'Bible' }, { id: 'opt2', text: 'Quran' }, { id: 'opt3', text: 'Torah' } ],
        correctOptionId: 'opt2',
        explanation: 'The Quran is the holy book of Islam, believed to be the word of Allah revealed to Prophet Muhammad (PBUH).'
      },
      {
        id: 'q2',
        questionText: 'How many pillars of Islam are there?',
        options: [ { id: 'opt1', text: 'Three' }, { id: 'opt2', text: 'Five' }, { id: 'opt3', text: 'Seven' } ],
        correctOptionId: 'opt2',
        explanation: 'There are five pillars of Islam: Shahada (faith), Salat (prayer), Zakat (charity), Sawm (fasting), and Hajj (pilgrimage).'
      },
      {
        id: 'q3',
        questionText: 'Who is the last Prophet in Islam?',
        options: [ { id: 'opt1', text: 'Prophet Isa (Jesus)' }, { id: 'opt2', text: 'Prophet Musa (Moses)' }, { id: 'opt3', text: 'Prophet Muhammad (PBUH)' } ],
        correctOptionId: 'opt3',
        explanation: 'Prophet Muhammad (peace be upon him) is considered the final prophet in Islam.'
      },
      {
        id: 'q4_gk1',
        questionText: 'What is the direction Muslims face when they pray?',
        options: [ { id: 'opt1', text: 'East' }, { id: 'opt2', text: 'Qibla (Kaaba)' }, { id: 'opt3', text: 'West' } ],
        correctOptionId: 'opt2',
        explanation: 'Muslims face the Qibla, which is the direction of the Kaaba in Mecca, during their prayers.'
      },
      {
        id: 'q5_gk1',
        questionText: 'What is the month of fasting in Islam called?',
        options: [ { id: 'opt1', text: 'Shawwal' }, { id: 'opt2', text: 'Ramadan' }, { id: 'opt3', text: 'Dhul Hijjah' } ],
        correctOptionId: 'opt2',
        explanation: 'Ramadan is the holy month of fasting, prayer, reflection and community for Muslims.'
      }
    ],
  },
  {
    id: 'fiqh-basics-1',
    title: 'Fiqh Basics - Salah',
    description: 'Learn about the basics of Islamic prayer (Salah).',
    imageAiHint: 'prayer rug child',
    questions: [
      {
        id: 'q1_fb1',
        questionText: 'How many daily obligatory prayers are there in Islam?',
        options: [ { id: 'opt1', text: '3' }, { id: 'opt2', text: '5' }, { id: 'opt3', text: '7' } ],
        correctOptionId: 'opt2',
        explanation: 'Muslims perform five obligatory prayers each day: Fajr, Dhuhr, Asr, Maghrib, and Isha.'
      },
      {
        id: 'q2_fb1',
        questionText: 'What should one do before performing Salah if they are not in a state of purity?',
        options: [ { id: 'opt1', text: 'Eat something' }, { id: 'opt2', text: 'Perform Wudu (ablution)' }, { id: 'opt3', text: 'Sleep' } ],
        correctOptionId: 'opt2',
        explanation: 'Wudu (ablution) is required to attain ritual purity before performing Salah.'
      },
      {
        id: 'q3_fb1',
        questionText: 'Which prayer is performed just before sunrise?',
        options: [ { id: 'opt1', text: 'Dhuhr' }, { id: 'opt2', text: 'Fajr' }, { id: 'opt3', text: 'Isha' } ],
        correctOptionId: 'opt2',
        explanation: 'Fajr prayer is the dawn prayer, performed before sunrise.'
      },
    ],
  },
  {
    id: 'prophets-stories-quiz-1',
    title: 'Stories of Prophets - Easy',
    description: 'Test your knowledge about famous stories of Islamic Prophets.',
    imageAiHint: 'prophet storybook kids',
    questions: [
      {
        id: 'psq1',
        questionText: 'Which Prophet was swallowed by a giant fish/whale?',
        options: [ { id: 'opt1', text: 'Prophet Musa (AS)' }, { id: 'opt2', text: 'Prophet Yunus (AS)' }, { id: 'opt3', text: 'Prophet Ibrahim (AS)' } ],
        correctOptionId: 'opt2',
        explanation: 'Prophet Yunus (AS) was swallowed by a giant fish (or whale) as a test from Allah.'
      },
      {
        id: 'psq2',
        questionText: 'Who built the Kaaba with his son Prophet Ismail (AS)?',
        options: [ { id: 'opt1', text: 'Prophet Adam (AS)' }, { id: 'opt2', text: 'Prophet Nuh (AS)' }, { id: 'opt3', text: 'Prophet Ibrahim (AS)' } ],
        correctOptionId: 'opt3',
        explanation: 'Prophet Ibrahim (AS) and his son Prophet Ismail (AS) rebuilt the Kaaba in Mecca.'
      },
      {
        id: 'psq3',
        questionText: 'Which Prophet was given the miracle of a staff that could turn into a serpent?',
        options: [ { id: 'opt1', text: 'Prophet Isa (AS)' }, { id: 'opt2', text: 'Prophet Musa (AS)' }, { id: 'opt3', text: 'Prophet Dawud (AS)' } ],
        correctOptionId: 'opt2',
        explanation: 'Prophet Musa (AS) was given several miracles by Allah, including his staff turning into a serpent.'
      }
    ],
  },
  {
    id: 'ramadan-facts-1',
    title: 'Ramadan Facts For Kids',
    description: 'Fun facts about the month of Ramadan!',
    imageAiHint: 'ramadan lantern crescent',
    questions: [
        {
            id: 'rfq1',
            questionText: 'What is the special night prayer performed during Ramadan called?',
            options: [ { id: 'opt1', text: 'Eid Salah' }, { id: 'opt2', text: 'Taraweeh' }, { id: 'opt3', text: 'Jummah' } ],
            correctOptionId: 'opt2',
            explanation: 'Taraweeh prayers are special additional prayers performed by Muslims at night during Ramadan.'
        },
        {
            id: 'rfq2',
            questionText: 'What is the meal eaten before starting the fast in Ramadan called?',
            options: [ { id: 'opt1', text: 'Iftar' }, { id: 'opt2', text: 'Suhoor' }, { id: 'opt3', text: 'Dinner' } ],
            correctOptionId: 'opt2',
            explanation: 'Suhoor is the pre-dawn meal eaten by Muslims before fasting during Ramadan.'
        },
        {
            id: 'rfq3',
            questionText: 'What is the festival that marks the end of Ramadan called?',
            options: [ { id: 'opt1', text: 'Eid al-Adha' }, { id: 'opt2', text: 'Eid al-Fitr' }, { id: 'opt3', 'text': 'Laylat al-Qadr'} ],
            correctOptionId: 'opt2',
            explanation: 'Eid al-Fitr, the "Festival of Breaking the Fast", marks the end of Ramadan.'
        }
    ]
  },
  {
    id: 'halal-haram-1',
    title: 'Halal and Haram Food Quiz',
    description: 'Learn about some Halal (permissible) and Haram (forbidden) foods in Islam.',
    imageAiHint: 'food choices ethical',
    questions: [
        {
            id: 'hhq1',
            questionText: 'Is it Halal or Haram to eat pork (pig meat)?',
            options: [ { id: 'opt1', text: 'Halal' }, { id: 'opt2', text: 'Haram' } ],
            correctOptionId: 'opt2',
            explanation: 'Pork is considered Haram (forbidden) for Muslims to eat.'
        },
        {
            id: 'hhq2',
            questionText: 'Are fruits and vegetables generally Halal or Haram?',
            options: [ { id: 'opt1', text: 'Halal' }, { id: 'opt2', text: 'Haram' } ],
            correctOptionId: 'opt1',
            explanation: 'Most fruits and vegetables are Halal (permissible) to eat.'
        },
        {
            id: 'hhq3',
            questionText: 'What must be said when an animal (like a chicken or cow) is slaughtered for its meat to be Halal?',
            options: [ { id: 'opt1', text: 'A special song' }, { id: 'opt2', text: 'The name of Allah (Bismillah)' }, { id: 'opt3', text: 'Nothing special' } ],
            correctOptionId: 'opt2',
            explanation: 'For meat to be Halal, the animal must be slaughtered in a specific way, and the name of Allah must be mentioned.'
        }
    ]
  },
];
