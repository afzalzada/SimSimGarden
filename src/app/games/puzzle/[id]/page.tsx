'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';
import { dummyPuzzles } from '../data';
import type { Puzzle } from '@/lib/types';
import JigsawPuzzle from '@/components/games/JigsawPuzzle';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Puzzle as PuzzleIconLucide } from 'lucide-react';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { useUserProgress } from '@/contexts/UserProgressContext';

export default function SinglePuzzlePage() {
  const params = useParams();
  const router = useRouter();
  const { markLessonCompleted } = useUserProgress();

  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      const foundPuzzle = dummyPuzzles.find((p) => p.id === params.id);
      if (foundPuzzle) {
        setPuzzle(foundPuzzle);
      } else {
        router.push('/games'); // Puzzle not found
      }
      setIsLoading(false);
    }
  }, [params.id, router]);

  const handlePuzzleComplete = () => {
    if (puzzle) {
      markLessonCompleted(`puzzle-${puzzle.id}`);
    }
    // Logic after puzzle is completed (e.g., show message, award points)
    // This is partially handled within JigsawPuzzle component for points
  };

  if (isLoading || !puzzle) {
    return <AppLayout><div className="flex justify-center items-center h-screen"><LoadingSpinner size={48}/></div></AppLayout>;
  }

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <Button onClick={() => router.push('/games')} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Games
        </Button>
         <div className="flex items-center gap-2 text-primary">
            <PuzzleIconLucide className="w-6 h-6"/>
            <h2 className="font-headline text-2xl font-semibold">{puzzle.title}</h2>
        </div>
      </div>
      <JigsawPuzzle puzzle={puzzle} onPuzzleComplete={handlePuzzleComplete} />
    </AppLayout>
  );
}
