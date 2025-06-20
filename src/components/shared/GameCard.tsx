
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Game, LucideIconName } from '@/lib/types';
import { ArrowRight, Users, HelpCircle, Puzzle as PuzzleIcon, Brain as BrainIcon, BookOpen, Sparkles, Smile, SpellCheck } from 'lucide-react'; // Added BookOpen, Sparkles, Smile, SpellCheck
import type { ElementType } from 'react';

interface GameCardProps {
  game: Game;
}

const iconComponents: Record<LucideIconName, ElementType> = {
  HelpCircle: HelpCircle,
  Puzzle: PuzzleIcon,
  Brain: BrainIcon,
  BookOpen: BookOpen,
  Sparkles: Sparkles,
  Users: Users,
  Smile: Smile,
  SpellCheck: SpellCheck, // Added SpellCheck here too for consistency, assuming it's added to types
};

export default function GameCard({ game }: GameCardProps) {
  const IconComponent = game.icon && iconComponents[game.icon] ? iconComponents[game.icon] : Gamepad2; // Fallback to Gamepad2 if icon not found

  return (
    <Card className="flex flex-col h-full overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-card/80 backdrop-blur-sm">
      <CardHeader className="p-6 items-center text-center">
        <div className="p-3 rounded-full bg-primary/10 mb-3">
          <IconComponent className="w-10 h-10 text-primary" />
        </div>
        <CardTitle className="font-headline text-xl text-primary">{game.title}</CardTitle>
         <div className="relative w-full h-40 rounded-lg overflow-hidden my-2 shadow-inner">
            <Image 
                src={`https://placehold.co/300x200.png`} 
                alt={game.title} 
                layout="fill" 
                objectFit="cover"
                data-ai-hint={game.imageAiHint || 'game fun kids'}
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

// Dummy Gamepad2 for fallback to prevent breaking if an icon is missed in the map
const Gamepad2 = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="6" y1="11" x2="10" y2="11" />
    <line x1="8" y1="9" x2="8" y2="13" />
    <line x1="15" y1="12" x2="15.01" y2="12" />
    <line x1="18" y1="10" x2="18.01" y2="10" />
    <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.01.152v5.516A4 4 0 0 0 6.68 18h10.64a4 4 0 0 0 3.986-3.742c.013-.15.014-.297.014-.446V8.59c-.002-.05-.005-.099-.008-.148A4 4 0 0 0 17.32 5z" />
  </svg>
);
