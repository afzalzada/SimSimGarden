import type { Game } from '@/lib/types';
import { Puzzle, HelpCircle, Brain } from 'lucide-react';

export const gameTypes: Game[] = [
  {
    id: 'islamic-quiz',
    title: 'Islamic Quiz Challenge',
    description: 'Test your knowledge about Islamic principles, history, and prophets.',
    type: 'quiz',
    href: '/games/quiz/general-knowledge-1',
    icon: <HelpCircle className="w-10 h-10 text-primary" />,
    ageGroup: '9-16',
    imageAiHint: 'quiz question mark',
  },
  {
    id: 'prophets-puzzle',
    title: 'Prophets Jigsaw Puzzle',
    description: 'Piece together beautiful images related to stories of the Prophets.',
    type: 'puzzle',
    href: '/games/puzzle/prophet-noah-ark',
    icon: <Puzzle className="w-10 h-10 text-primary" />,
    ageGroup: '4-8',
    imageAiHint: 'jigsaw puzzle kids',
  },
  {
    id: 'ethics-memory-match',
    title: 'Islamic Ethics Memory Match',
    description: 'Match pairs of cards related to good manners and Islamic ethics.',
    type: 'memory-match',
    href: '/games/memory-match/good-deeds-1',
    icon: <Brain className="w-10 h-10 text-primary" />,
    ageGroup: '4-8',
    imageAiHint: 'memory game cards',
  },
   {
    id: 'advanced-fiqh-quiz',
    title: 'Advanced Fiqh Quiz',
    description: 'A more challenging quiz on Islamic jurisprudence for older youngsters.',
    type: 'quiz',
    href: '/games/quiz/fiqh-basics-1',
    icon: <HelpCircle className="w-10 h-10 text-primary" />,
    ageGroup: '9-16',
    imageAiHint: 'islamic law book',
  },
];
