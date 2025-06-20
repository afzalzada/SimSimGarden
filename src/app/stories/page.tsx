
import AppLayout from '@/components/layout/AppLayout';
import StoryCard from '@/components/shared/StoryCard';
import { dummyStories } from './data';
import { BookOpenText } from 'lucide-react';

const cardBgColors = ['bg-primary/5', 'bg-secondary/5', 'bg-accent/5', 'bg-card/70'];

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
