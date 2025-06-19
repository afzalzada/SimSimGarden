
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Game, LucideIconName } from '@/lib/types';
import { ArrowRight, Users, HelpCircle, Puzzle as PuzzleIcon, Brain as BrainIcon } from 'lucide-react';
import type { ElementType } from 'react';

interface GameCardProps {
  game: Game;
}

const iconComponents: Record<LucideIconName, ElementType> = {
  HelpCircle: HelpCircle,
  Puzzle: PuzzleIcon,
  Brain: BrainIcon,
};

export default function GameCard({ game }: GameCardProps) {
  const IconComponent = game.icon ? iconComponents[game.icon] : null;

  return (
    <Card className="flex flex-col h-full overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-card/80 backdrop-blur-sm">
      <CardHeader className="p-6 items-center text-center">
        {IconComponent && (
          <div className="p-3 rounded-full bg-primary/10 mb-3">
            <IconComponent className="w-10 h-10 text-primary" />
          </div>
        )}
        <CardTitle className="font-headline text-xl text-primary">{game.title}</CardTitle>
         <div className="relative w-full h-40 rounded-lg overflow-hidden my-2">
            <Image 
                src={`https://placehold.co/300x200.png`} 
                alt={game.title} 
                layout="fill" 
                objectFit="cover"
                data-ai-hint={game.imageAiHint || 'islamic game fun'}
            />
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0 flex-grow text-center">
        <CardDescription className="text-muted-foreground text-sm mb-3">{game.description}</CardDescription>
        <div className="flex items-center justify-center text-xs text-muted-foreground mb-3">
          <Users className="w-4 h-4 mr-1 text-accent" />
          <span>Age Group: {game.ageGroup}</span>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={game.href} className="w-full">
          <Button variant="default" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg">
            Play Game <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
