
'use client';

import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BookOpenText, Sparkles, BookMarked, Gamepad2, Bot, Trophy, ArrowRight, Palette, Heart, LogIn } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useUserProgress } from '@/contexts/UserProgressContext'; 

const cardGradientBgs = [
  'bg-gradient-to-br from-[hsl(var(--primary)/0.5)] via-[hsl(var(--primary)/0.2)] to-[hsl(var(--card)/0.1)] backdrop-blur-md',
  'bg-gradient-to-tl from-[hsl(var(--secondary)/0.5)] via-[hsl(var(--secondary)/0.2)] to-[hsl(var(--card)/0.1)] backdrop-blur-md',
  'bg-gradient-to-r from-[hsl(var(--accent)/0.5)] via-[hsl(var(--accent)/0.2)] to-[hsl(var(--card)/0.1)] backdrop-blur-md',
  'bg-gradient-to-b from-[hsl(var(--chart-4)/0.5)] via-[hsl(var(--chart-4)/0.2)] to-[hsl(var(--card)/0.1)] backdrop-blur-md',
  'bg-gradient-to-tr from-[hsl(var(--chart-5)/0.5)] via-[hsl(var(--chart-5)/0.2)] to-[hsl(var(--card)/0.1)] backdrop-blur-md',
  'bg-gradient-to-bl from-[hsl(var(--destructive)/0.4)] via-[hsl(var(--destructive)/0.15)] to-[hsl(var(--card)/0.1)] backdrop-blur-md',
  'bg-gradient-to-br from-[hsl(var(--primary)/0.3)] via-[hsl(var(--secondary)/0.15)] to-[hsl(var(--card)/0.1)] backdrop-blur-md',
  'bg-gradient-to-tl from-[hsl(var(--accent)/0.3)] via-[hsl(var(--chart-4)/0.15)] to-[hsl(var(--card)/0.1)] backdrop-blur-md',
];


const features = [
  {
    title: 'Islamic Stories',
    description: 'Interactive tales of Prophets and Sahaba.',
    href: '/stories',
    icon: <BookOpenText className="w-12 h-12 text-primary mb-4" />,
    image: '/assets/images/features/home-feature-islamic-stories.png',
    aiHint: 'storybook kids magic',
    bgColor: cardGradientBgs[0],
  },
  {
    title: 'Interactive Duas',
    description: 'Learn daily supplications with audio and meaning.',
    href: '/duas',
    icon: <Sparkles className="w-12 h-12 text-primary mb-4" />,
    image: '/assets/images/features/home-feature-interactive-duas.png',
    aiHint: 'hands praying light',
    bgColor: cardGradientBgs[1],
  },
  {
    title: 'Quran Verses',
    description: 'Explore curated verses with recitation and tafsir.',
    href: '/quran',
    icon: <BookMarked className="w-12 h-12 text-primary mb-4" />,
    image: '/assets/images/features/home-feature-quran-verses.png',
    aiHint: 'quran open serene',
    bgColor: cardGradientBgs[2],
  },
  {
    title: 'Fun Islamic Games',
    description: 'Reinforce teachings with quizzes, coloring and puzzles.',
    href: '/games',
    icon: <Gamepad2 className="w-12 h-12 text-primary mb-4" />,
    image: '/assets/images/features/home-feature-fun-islamic-games.png',
    aiHint: 'kids playing fun',
    bgColor: cardGradientBgs[3],
  },
  {
    title: 'Chat with Aalim AI',
    description: 'Your personal AI tutor for Islamic ethics.',
    href: '/aalim',
    icon: <Bot className="w-12 h-12 text-primary mb-4" />,
    image: '/assets/images/features/home-feature-chat-with-aalim-ai.png',
    aiHint: 'friendly robot teacher',
    bgColor: cardGradientBgs[4],
  },
  {
    title: 'Points & Rewards',
    description: 'Track your progress and earn badges.',
    href: '/rewards',
    icon: <Trophy className="w-12 h-12 text-primary mb-4" />,
    image: '/assets/images/features/home-feature-points-rewards.png',
    aiHint: 'trophy stars celebration',
    bgColor: cardGradientBgs[5],
  },
  {
    title: 'Support Us',
    description: 'Help us continue our mission of providing quality Islamic content.',
    href: '/donate',
    icon: <Heart className="w-12 h-12 text-primary mb-4" />,
    image: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxnaXZpbmd8ZW58MHx8fHwxNzUwNjc3NjUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'heart hands community charity',
    bgColor: cardGradientBgs[7],
  },
];

export default function HomePage() {
  const { isLoggedIn, userName } = useUserProgress(); // Get user state

  return (
    <AppLayout>
      <section className="text-center py-12 px-6 bg-gradient-to-br from-primary/80 to-primary rounded-xl shadow-lg text-primary-foreground mb-8">
        {isLoggedIn && userName ? (
          <>
            <h1 className="font-headline text-5xl font-bold mb-4 drop-shadow-md">
              Salaam and welcome dear {userName}!
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto drop-shadow-sm">
              Embark on a fun journey to learn about Islamic morality and ethics.
            </p>
          </>
        ) : (
          <>
            <h1 className="font-headline text-5xl font-bold mb-4 drop-shadow-md">
              Welcome to SimSim Garden!
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-6 max-w-2xl mx-auto drop-shadow-sm">
              Embark on a fun journey to learn about Islamic morality and ethics.
            </p>
            <div className="bg-background/20 backdrop-blur-sm p-6 rounded-lg inline-block mt-4">
              <h2 className="font-headline text-2xl font-semibold mb-3">Want to save your progress?</h2>
              <p className="text-primary-foreground/80 mb-4">Log in to track your points and unlocked rewards!</p>
              <Link href="/login">
                <Button size="lg" variant="secondary" className="shadow-lg hover:scale-105 transition-transform">
                  <LogIn className="mr-2 h-5 w-5" /> Login Now
                </Button>
              </Link>
            </div>
          </>
        )}
      </section>

      <section className="py-12">
        <h2 className="font-headline text-3xl font-semibold text-center text-primary mb-10">Explore Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className={cn(
                "shadow-xl transition-all duration-300 rounded-xl overflow-hidden flex flex-col group hover:scale-105 hover:animate-subtle-scale-hover", 
                feature.bgColor || cardGradientBgs[index % cardGradientBgs.length]
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
                  <Image src={feature.image} alt={feature.title} fill className="object-cover transition-transform group-hover:scale-105 duration-300" data-ai-hint={feature.aiHint} />
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
