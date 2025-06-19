import type { Story } from '@/lib/types';

export const dummyStories: Story[] = [
  {
    id: 'prophet-yunus-and-the-whale',
    title: 'Prophet Yunus (AS) and the Whale',
    description: 'Learn about patience and repentance from the story of Prophet Yunus (AS).',
    moral: 'Always be patient and seek forgiveness from Allah.',
    thumbnailUrl: 'https://placehold.co/300x200.png',
    imageAiHint: 'whale ocean',
    ageGroup: '4-8',
    content: [
      { type: 'paragraph', text: 'Prophet Yunus (Jonah) was a messenger of Allah sent to the people of Nineveh. He called them to worship Allah alone, but they initially rejected his message.' },
      { type: 'image', url: 'https://placehold.co/600x400.png', alt: 'Prophet Yunus preaching', aiHint: 'man preaching crowd' },
      { type: 'paragraph', text: 'Feeling frustrated, Prophet Yunus left his people without Allah\'s permission. He boarded a ship, but a great storm arose.' },
      { type: 'paragraph', text: 'To save the ship, the crew decided to cast one person overboard, and the lot fell on Yunus (AS). He was swallowed by a giant whale.' },
      { type: 'image', url: 'https://placehold.co/600x400.png', alt: 'Whale swallowing Prophet Yunus', aiHint: 'giant whale man' },
      { type: 'paragraph', text: 'Inside the whale\'s belly, in darkness, Prophet Yunus realized his mistake and prayed to Allah: "La ilaha illa Anta, Subhanaka, inni kuntu minaz-zalimin" (There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers).' },
      { type: 'paragraph', text: 'Allah, in His mercy, commanded the whale to cast Prophet Yunus onto the shore. He was weak but safe.' },
      { type: 'decision', prompt: 'What should Prophet Yunus do next?', choices: [
        { text: 'Rest and recover', nextNodeIndex: 8 }, // Points to the next paragraph
        { text: 'Return to his people', nextNodeIndex: 8 },
      ]},
      { type: 'paragraph', text: 'Allah then caused a plant to grow, providing him with food and shelter. Prophet Yunus (AS) returned to his people, who had repented and believed in Allah. They were forgiven and blessed.' },
      { type: 'paragraph', text: 'This story teaches us the importance of patience, seeking Allah\'s forgiveness, and never losing hope in His mercy.' },
    ],
  },
  {
    id: 'the-honest-shepherd',
    title: 'The Honest Shepherd Boy',
    description: 'A tale about the importance of honesty, even when no one is watching.',
    moral: 'Honesty is a virtue that pleases Allah and earns trust.',
    thumbnailUrl: 'https://placehold.co/300x200.png',
    imageAiHint: 'shepherd sheep hills',
    ageGroup: '4-8',
    content: [
      { type: 'paragraph', text: 'Once, there was a young shepherd boy who looked after a flock of sheep for a wealthy man.' },
      { type: 'image', url: 'https://placehold.co/600x400.png', alt: 'Shepherd boy with sheep', aiHint: 'boy sheep field' },
      { type: 'paragraph', text: 'One day, a traveler passed by and offered to buy a sheep. The boy refused, saying, "These sheep are not mine. I am only entrusted to care for them."' },
      { type: 'paragraph', text: 'The traveler, testing him, said, "You can tell your master a wolf ate one." But the boy replied, "My master may not see me, but Allah sees me."' },
      { type: 'paragraph', text: 'The traveler was impressed by the boy\'s honesty. This story teaches us that true honesty is being truthful even when no one is looking, because Allah is always watching.' },
    ],
  },
  {
    id: 'kindness-to-animals',
    title: 'Kindness to Animals in Islam',
    description: 'Discover how Islam teaches us to be kind to all creatures.',
    moral: 'Being kind to animals is an important part of Islamic teachings.',
    thumbnailUrl: 'https://placehold.co/300x200.png',
    imageAiHint: 'child cat animals',
    ageGroup: '9-16',
    content: [
      { type: 'paragraph', text: 'Islam emphasizes compassion and mercy towards all living beings, including animals. The Prophet Muhammad (peace be upon him) taught his followers to treat animals with kindness and respect.' },
      { type: 'image', url: 'https://placehold.co/600x400.png', alt: 'Person feeding a cat', aiHint: 'hand feeding cat' },
      { type: 'paragraph', text: 'There is a famous Hadith about a woman who was forgiven her sins because she gave water to a thirsty dog. This shows the great reward for being kind to animals.' },
      { type: 'paragraph', text: 'Conversely, another Hadith tells of a woman who was punished for mistreating a cat by imprisoning it without food or water.' },
      { type: 'paragraph', text: 'We should provide food and water for animals under our care, not overburden them, and avoid causing them any harm or distress.' },
    ],
  },
];
