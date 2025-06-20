
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BookOpenText, Sparkles, BookMarked, Gamepad2, Bot, Trophy, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const features = [
  {
    title: 'Islamic Stories',
    description: 'Interactive tales of Prophets and Sahaba.',
    href: '/stories',
    icon: <BookOpenText className="w-12 h-12 text-primary mb-4" />,
    image: 'https://placehold.co/600x400.png',
    aiHint: 'storybook kids magic',
    bgColor: 'bg-gradient-to-br from-primary/10 via-background to-secondary/5',
  },
  {
    title: 'Interactive Duas',
    description: 'Learn daily supplications with audio and meaning.',
    href: '/duas',
    icon: <Sparkles className="w-12 h-12 text-primary mb-4" />,
    image: 'https://placehold.co/600x400.png',
    aiHint: 'hands praying light',
    bgColor: 'bg-gradient-to-tl from-secondary/10 via-background to-accent/5',
  },
  {
    title: 'Quran Verses',
    description: 'Explore curated verses with recitation and tafsir.',
    href: '/quran',
    icon: <BookMarked className="w-12 h-12 text-primary mb-4" />,
    image: 'https://placehold.co/600x400.png',
    aiHint: 'quran open serene',
    bgColor: 'bg-gradient-to-r from-accent/10 via-background to-primary/5',
  },
  {
    title: 'Fun Islamic Games',
    description: 'Reinforce teachings with quizzes and puzzles.',
    href: '/games',
    icon: <Gamepad2 className="w-12 h-12 text-primary mb-4" />,
    image: 'https://placehold.co/600x400.png',
    aiHint: 'kids playing fun',
    bgColor: 'bg-gradient-to-bl from-primary/5 via-background to-accent/10',
  },
  {
    title: 'Chat with Aalim AI',
    description: 'Your personal AI tutor for Islamic ethics.',
    href: '/aalim',
    icon: <Bot className="w-12 h-12 text-primary mb-4" />,
    image: 'https://placehold.co/600x400.png',
    aiHint: 'friendly robot teacher',
    bgColor: 'bg-gradient-to-tr from-secondary/5 via-background to-primary/10',
  },
  {
    title: 'Points & Rewards',
    description: 'Track your progress and earn badges.',
    href: '/rewards',
    icon: <Trophy className="w-12 h-12 text-primary mb-4" />,
    image: 'https://placehold.co/600x400.png',
    aiHint: 'trophy stars celebration',
    bgColor: 'bg-gradient-to-l from-accent/5 via-background to-secondary/10',
  },
];

export default function HomePage() {
  return (
    <AppLayout>
      <section className="text-center py-10 bg-gradient-to-br from-primary/5 via-background to-accent/5 rounded-xl shadow-sm">
        <h1 className="font-headline text-5xl font-bold text-primary mb-4 animate-shine bg-clip-text text-transparent bg-[linear-gradient(110deg,hsl(var(--primary)),45%,hsl(var(--accent)),55%,hsl(var(--primary)))] bg-[length:250%_100%]" >
          Welcome to Noor Kids!
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Embark on a fun and enriching journey to learn about Islamic morality and ethics.
        </p>
        <Link href="/stories">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg text-lg px-8 py-6 shadow-md transition-transform hover:scale-105">
                Start Learning Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
        </Link>
      </section>

      <section className="py-12">
        <h2 className="font-headline text-3xl font-semibold text-center text-primary mb-10">Explore Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card 
              key={feature.title} 
              className={cn(
                "backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden flex flex-col group hover:scale-105 hover:animate-subtle-scale-hover", 
                feature.bgColor || "bg-card/80"
              )}
            >
              <CardHeader className="items-center text-center p-6">
                <div className="p-3 rounded-full bg-primary/15 mb-4 transition-transform group-hover:scale-110">
                  {feature.icon}
                </div>
                <CardTitle className="font-headline text-2xl text-primary group-hover:text-accent transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col text-center p-6 pt-0">
                <div className="relative w-full h-40 rounded-lg overflow-hidden mb-4">
                  <Image src={feature.image} alt={feature.title} layout="fill" objectFit="cover" data-ai-hint={feature.aiHint} className="transition-transform group-hover:scale-105 duration-300"/>
                </div>
                <CardDescription className="text-muted-foreground mb-6 flex-grow">{feature.description}</CardDescription>
                <Link href={feature.href} className="mt-auto">
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                    Explore <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}
