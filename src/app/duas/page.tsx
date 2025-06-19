import AppLayout from '@/components/layout/AppLayout';
import DuaCard from '@/components/shared/DuaCard';
import { dummyDuas } from './data';
import { Sparkles } from 'lucide-react';

export default function DuasPage() {
  return (
    <AppLayout>
      <header className="mb-10 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
           <Sparkles className="w-12 h-12 text-primary" />
        </div>
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-3">Interactive Duas</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Learn and memorize important Islamic supplications with audio, translation, and meaning.
        </p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyDuas.map((dua) => (
          <DuaCard key={dua.id} dua={dua} />
        ))}
      </div>
    </AppLayout>
  );
}
