
import AppLayout from '@/components/layout/AppLayout';
import StoryCard from '@/components/shared/StoryCard';
import { dummyStories } from './data';
import { BookOpenText } from 'lucide-react';

const cardBgColors = [
  'bg-gradient-to-br from-primary/5 via-background to-accent/10',
  'bg-gradient-to-tl from-accent/5 via-background to-secondary/10',
  'bg-gradient-to-r from-secondary/5 via-background to-primary/10',
  'bg-gradient-to-b from-primary/10 via-background to-secondary/5'
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
            bgColor={cardBgColors[index % cardBgColors.length]}
          />
        ))}
      </div>
    </AppLayout>
  );
}
