
import AppLayout from '@/components/layout/AppLayout';
import ColoringCard from '@/components/shared/ColoringCard';
import { coloringPagesData } from './data';
import { Palette } from 'lucide-react';

const cardGradientBgs = [
  'bg-gradient-to-br from-[hsl(var(--primary)/0.5)] via-[hsl(var(--primary)/0.2)] to-[hsl(var(--card)/0.1)]',
  'bg-gradient-to-tl from-[hsl(var(--secondary)/0.5)] via-[hsl(var(--secondary)/0.2)] to-[hsl(var(--card)/0.1)]',
  'bg-gradient-to-r from-[hsl(var(--accent)/0.5)] via-[hsl(var(--accent)/0.2)] to-[hsl(var(--card)/0.1)]',
  'bg-gradient-to-b from-[hsl(var(--chart-4)/0.5)] via-[hsl(var(--chart-4)/0.2)] to-[hsl(var(--card)/0.1)]',
  'bg-gradient-to-tr from-[hsl(var(--chart-5)/0.5)] via-[hsl(var(--chart-5)/0.2)] to-[hsl(var(--card)/0.1)]',
  'bg-gradient-to-bl from-[hsl(var(--destructive)/0.4)] via-[hsl(var(--destructive)/0.15)] to-[hsl(var(--card)/0.1)]',
];

export default function ColoringPage() {
  return (
    <AppLayout>
      <header className="mb-10 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
           <Palette className="w-12 h-12 text-primary" />
        </div>
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-3">Digital Coloring Fun</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Unleash your creativity! Choose a picture and color it digitally, then get it scored by our AI art teacher.
        </p>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto mt-4">
          Parents: You can also purchase physical coloring books from our affiliates to support us. (Affiliate links will be added here later).
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {coloringPagesData.map((page, index) => (
          <ColoringCard
            key={page.id}
            page={page}
            bgColor={cardGradientBgs[index % cardGradientBgs.length]}
          />
        ))}
      </div>
    </AppLayout>
  );
}
