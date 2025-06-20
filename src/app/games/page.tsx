
import AppLayout from '@/components/layout/AppLayout';
import GameCard from '@/components/shared/GameCard';
import { gameTypes } from './data';
import { Gamepad2 } from 'lucide-react';

const cardBgColors = ['bg-card/70', 'bg-primary/5', 'bg-secondary/5', 'bg-accent/5'];

export default function GamesPage() {
  return (
    <AppLayout>
      <header className="mb-10 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
           <Gamepad2 className="w-12 h-12 text-primary" />
        </div>
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-3">Islamic Games</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have fun while learning! Our games are designed to reinforce Islamic teachings in an engaging way.
        </p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {gameTypes.map((game, index) => (
          <GameCard 
            key={game.id} 
            game={game} 
            bgColor={cardBgColors[index % cardBgColors.length]}
          />
        ))}
      </div>
    </AppLayout>
  );
}
