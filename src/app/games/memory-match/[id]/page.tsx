
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';
import { dummyMemoryMatchGames } from '../data';
import type { MemoryMatchGame } from '@/lib/types';
import MemoryMatchGameComponent from '@/components/games/MemoryMatchGame';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Brain } from 'lucide-react';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { useUserProgress } from '@/contexts/UserProgressContext';

export default function SingleMemoryMatchPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { markLessonCompleted } = useUserProgress();

  const [game, setGame] = useState<MemoryMatchGame | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      const foundGame = dummyMemoryMatchGames.find((g) => g.id === params.id);
      if (foundGame) {
        setGame(foundGame);
      } else {
        router.push('/games'); // Game not found
      }
      setIsLoading(false);
    }
  }, [params.id, router]);

  const handleGameComplete = () => {
    if (game) {
      markLessonCompleted(`memory-${game.id}`);
    }
    // Logic after game is completed
  };

  if (isLoading || !game) {
    return <AppLayout><div className="flex justify-center items-center h-screen"><LoadingSpinner size={48} /></div></AppLayout>;
  }

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <Button onClick={() => router.push('/games')} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Games
        </Button>
         <div className="flex items-center gap-2 text-primary">
            <Brain className="w-6 h-6"/>
            <h2 className="font-headline text-2xl font-semibold">{game.title}</h2>
        </div>
      </div>
      <MemoryMatchGameComponent game={game} onGameComplete={handleGameComplete} />
    </AppLayout>
  );
}
