'use client';

import type { Puzzle } from '@/lib/types';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CheckCircle, Gift, PuzzleIcon, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserProgress } from '@/contexts/UserProgressContext';

interface JigsawPuzzleProps {
  puzzle: Puzzle;
  onPuzzleComplete: () => void;
}

// This is a simplified placeholder for a Jigsaw Puzzle.
// A real implementation would involve complex logic for piece generation, dragging, snapping, etc.
export default function JigsawPuzzle({ puzzle, onPuzzleComplete }: JigsawPuzzleProps) {
  const [isSolved, setIsSolved] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const { addPoints } = useUserProgress();

  // Simulate solving the puzzle
  const solvePuzzle = () => {
    setIsSolved(true);
    addPoints(puzzle.pieces / 2); // Example: 0.5 points per piece
    onPuzzleComplete();
  };
  
  const restartPuzzle = () => {
    setIsSolved(false);
    setShowHint(false);
  }

  return (
    <Card className="w-full max-w-xl mx-auto shadow-xl rounded-xl">
      <CardHeader className="text-center bg-primary/10 p-6 rounded-t-xl">
        <CardTitle className="font-headline text-2xl text-primary flex items-center justify-center gap-2">
            <PuzzleIcon /> {puzzle.title}
        </CardTitle>
        <CardDescription className="text-muted-foreground">{puzzle.description} ({puzzle.pieces} pieces)</CardDescription>
      </CardHeader>
      <CardContent className="p-6 text-center space-y-6">
        <div className={`relative w-full aspect-[3/2] border-4 ${isSolved ? 'border-green-500' : 'border-primary/20'} rounded-lg overflow-hidden shadow-inner bg-muted/30`}>
          <Image 
            src={puzzle.imageUrl} 
            alt={puzzle.title} 
            layout="fill" 
            objectFit="contain" 
            className={`${isSolved ? 'opacity-100' : 'opacity-30 blur-sm'}`}
            data-ai-hint={puzzle.imageAiHint || 'puzzle image kids'}
          />
          {!isSolved && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <p className="text-lg font-semibold text-foreground mb-4 bg-background/80 px-3 py-1 rounded">
                    Imagine this is an interactive Jigsaw Puzzle!
                </p>
                <Button onClick={() => setShowHint(s => !s)} variant="outline" className="mb-2">
                    {showHint ? "Hide Hint" : "Show Hint Image"}
                </Button>
                {showHint && 
                    <div className="w-1/2 aspect-[3/2] relative border border-dashed border-primary rounded overflow-hidden">
                        <Image src={puzzle.imageUrl} alt="Hint" layout="fill" objectFit="contain" data-ai-hint={puzzle.imageAiHint || 'puzzle hint kids'}/>
                    </div>
                }
            </div>
          )}
           {isSolved && (
             <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <CheckCircle className="w-24 h-24 text-green-400 animate-pulse-subtle" />
             </div>
           )}
        </div>

        {!isSolved ? (
          <Button onClick={solvePuzzle} size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/80 text-accent-foreground rounded-lg">
            Simulate Solve Puzzle
          </Button>
        ) : (
          <div className="space-y-3">
            <p className="text-xl font-semibold text-green-600 flex items-center justify-center gap-2">
                <Gift className="w-6 h-6"/> Puzzle Solved! You earned {puzzle.pieces / 2} points!
            </p>
            <Button onClick={restartPuzzle} variant="outline" className="w-full sm:w-auto">
                <RotateCcw className="mr-2 h-4 w-4"/> Play Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
