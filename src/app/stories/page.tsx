
import AppLayout from '@/components/layout/AppLayout';
import StoryCard from '@/components/shared/StoryCard';
import { dummyStories } from './data';
import { BookOpenText } from 'lucide-react';

const cardGradientBgs = [
  'bg-gradient-to-br from-[hsl(var(--primary)/0.5)] via-[hsl(var(--primary)/0.2)] to-[hsl(var(--card)/0.1)]',
  'bg-gradient-to-tl from-[hsl(var(--secondary)/0.5)] via-[hsl(var(--secondary)/0.2)] to-[hsl(var(--card)/0.1)]',
  'bg-gradient-to-r from-[hsl(var(--accent)/0.5)] via-[hsl(var(--accent)/0.2)] to-[hsl(var(--card)/0.1)]',
  'bg-gradient-to-b from-[hsl(var(--chart-4)/0.5)] via-[hsl(var(--chart-4)/0.2)] to-[hsl(var(--card)/0.1)]',
  'bg-gradient-to-tr from-[hsl(var(--chart-5)/0.5)] via-[hsl(var(--chart-5)/0.2)] to-[hsl(var(--card)/0.1)]',
  'bg-gradient-to-bl from-[hsl(var(--destructive)/0.4)] via-[hsl(var(--destructive)/0.15)] to-[hsl(var(--card)/0.1)]',
  'bg-gradient-to-br from-[hsl(var(--primary)/0.3)] via-[hsl(var(--secondary)/0.15)] to-[hsl(var(--card)/0.1)]',
  'bg-gradient-to-tl from-[hsl(var(--accent)/0.3)] via-[hsl(var(--chart-4)/0.15)] to-[hsl(var(--card)/0.1)]',
];

export default function StoriesPage() {
  return (
    <AppLayout>
      <header className="mb-10 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
           <BookOpenText className="w-12 h-12 text-primary" />
        </div>
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-3">Islamic Stories</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover inspiring tales from Islamic tradition that teach valuable lessons about morality and ethics.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyStories.map((story, index) => (
          <StoryCard 
            key={story.id} 
            story={story} 
            bgColor={cardGradientBgs[index % cardGradientBgs.length]}
          />
        ))}
      </div>
    </AppLayout>
  );
}
