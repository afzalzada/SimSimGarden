'use client';

import type { MemoryMatchGame, MemoryMatchCard } from '@/lib/types';
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card as ShadCard, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Gift, Brain, RotateCcw, HelpCircle } from 'lucide-react';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface MemoryMatchGameProps {
  game: MemoryMatchGame;
  onGameComplete: () => void;
}

interface BoardCard extends MemoryMatchCard {
  uniqueId: number; // To differentiate between two identical cards on the board
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryMatchGameComponent({ game, onGameComplete }: MemoryMatchGameProps) {
  const [board, setBoard] = useState<BoardCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<BoardCard[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // To prevent rapid clicks
  const { addPoints } = useUserProgress();

  const initializeBoard = useCallback(() => {
    const duplicatedCards = [...game.cards, ...game.cards];
    const shuffled = duplicatedCards
      .map((card, index) => ({ ...card, uniqueId: index, isFlipped: false, isMatched: false }))
      .sort(() => Math.random() - 0.5);
    setBoard(shuffled);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setIsGameWon(false);
  }, [game.cards]);

  useEffect(() => {
    initializeBoard();
  }, [initializeBoard]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsProcessing(true);
      const [firstCard, secondCard] = flippedCards;
      if (firstCard.id === secondCard.id) { // Matched
        setBoard(prevBoard =>
          prevBoard.map(card =>
            card.id === firstCard.id ? { ...card, isMatched: true, isFlipped: true } : card
          )
        );
        setMatchedPairs(prev => prev + 1);
        setFlippedCards([]);
        setIsProcessing(false);
      } else { // Not a match
        setTimeout(() => {
          setBoard(prevBoard =>
            prevBoard.map(card =>
              (card.uniqueId === firstCard.uniqueId || card.uniqueId === secondCard.uniqueId)
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
          setIsProcessing(false);
        }, 1000);
      }
      setMoves(prev => prev + 1);
    }
  }, [flippedCards]);

  useEffect(() => {
    if (game.cards.length > 0 && matchedPairs === game.cards.length) {
      setIsGameWon(true);
      const pointsEarned = Math.max(1, 10 - Math.floor(moves / game.cards.length)); // Max 10 points, min 1
      addPoints(pointsEarned);
      onGameComplete();
    }
  }, [matchedPairs, game.cards.length, onGameComplete, addPoints, moves]);

  const handleCardClick = (clickedCard: BoardCard) => {
    if (isProcessing || clickedCard.isFlipped || flippedCards.length === 2) return;

    setBoard(prevBoard =>
      prevBoard.map(card =>
        card.uniqueId === clickedCard.uniqueId ? { ...card, isFlipped: true } : card
      )
    );
    setFlippedCards(prev => [...prev, { ...clickedCard, isFlipped: true }]);
  };
  
  const CardComponent = ({ card }: { card: BoardCard }) => (
    <button
      onClick={() => handleCardClick(card)}
      disabled={card.isFlipped || isProcessing}
      aria-pressed={card.isFlipped}
      className={cn(
        "aspect-square rounded-lg shadow-md flex items-center justify-center p-2 transition-all duration-300 transform",
        card.isFlipped ? "bg-accent/20 rotate-y-180" : "bg-primary hover:bg-primary/90",
        card.isMatched ? "border-2 border-green-500 opacity-70" : "border-2 border-transparent"
      )}
      style={{ perspective: '1000px' }}
    >
      <div className={cn("transition-opacity duration-150", card.isFlipped ? "opacity-100" : "opacity-0")} style={{ transform: card.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
        {card.type === 'text' && <span className="text-sm sm:text-base font-semibold text-accent-foreground text-center">{card.content}</span>}
        {card.type === 'image' && (
          <Image src={card.content} alt="Memory card" width={80} height={80} objectFit="contain" data-ai-hint={card.imageAiHint || 'icon symbol'}/>
        )}
      </div>
       {!card.isFlipped && <HelpCircle className="w-8 h-8 sm:w-12 sm:h-12 text-primary-foreground"/>}
    </button>
  );


  if (isGameWon) {
    return (
      <ShadCard className="w-full max-w-lg mx-auto shadow-xl rounded-xl">
        <CardHeader className="text-center bg-primary/10 p-6 rounded-t-xl">
          <CardTitle className="font-headline text-3xl text-primary">Game Won!</CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center space-y-4">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto animate-pulse-subtle" />
          <p className="text-xl font-semibold text-foreground">
            You matched all pairs in {moves} moves!
          </p>
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md" role="alert">
            <p className="font-bold flex items-center justify-center">
              <Gift className="mr-2"/>Congratulations! You earned {Math.max(1, 10 - Math.floor(moves / game.cards.length))} points!
            </p>
          </div>
          <Button onClick={initializeBoard} className="w-full sm:w-auto" variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" /> Play Again
          </Button>
        </CardContent>
      </ShadCard>
    );
  }
  
  const gridSize = game.cards.length <= 6 ? 'grid-cols-3 sm:grid-cols-4' : 'grid-cols-4 sm:grid-cols-5';


  return (
    <ShadCard className="w-full max-w-xl mx-auto shadow-xl rounded-xl">
      <CardHeader className="text-center bg-primary/10 p-6 rounded-t-xl">
        <CardTitle className="font-headline text-2xl text-primary flex items-center justify-center gap-2">
            <Brain /> {game.title}
        </CardTitle>
        <CardDescription className="text-muted-foreground">{game.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 space-y-4">
        <div className="flex justify-between items-center mb-4 px-2">
            <p className="text-lg font-semibold text-foreground">Moves: <span className="text-accent">{moves}</span></p>
            <p className="text-lg font-semibold text-foreground">Matched: <span className="text-accent">{matchedPairs}</span> / {game.cards.length}</p>
        </div>
        <div className={`grid ${gridSize} gap-2 sm:gap-3`}>
          {board.map((card) => (
            <CardComponent key={card.uniqueId} card={card} />
          ))}
        </div>
         <Button onClick={initializeBoard} variant="outline" className="w-full mt-6">
            <RotateCcw className="mr-2 h-4 w-4" /> Restart Game
          </Button>
      </CardContent>
    </ShadCard>
  );
}

