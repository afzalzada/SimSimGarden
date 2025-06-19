import AppLayout from '@/components/layout/AppLayout';
import QuranVerseCard from '@/components/shared/QuranVerseCard';
import { dummyQuranVerses } from './data';
import { BookMarked } from 'lucide-react';

export default function QuranPage() {
  return (
    <AppLayout>
      <header className="mb-10 text-center">
         <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
           <BookMarked className="w-12 h-12 text-primary" />
        </div>
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-3">Quranic Verses</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore the wisdom of the Quran. Each verse offers guidance, comfort, and a deeper understanding of Islam.
        </p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyQuranVerses.map((verse) => (
          <QuranVerseCard key={verse.id} verse={verse} />
        ))}
      </div>
    </AppLayout>
  );
}
