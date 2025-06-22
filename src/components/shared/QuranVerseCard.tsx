
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { QuranVerse } from '@/lib/types';
import { ArrowRight, BookMarked, Users } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface QuranVerseCardProps {
  verse: QuranVerse;
  bgColor?: string;
}

export default function QuranVerseCard({ verse, bgColor }: QuranVerseCardProps) {
  const imagePath = verse.imagePath || `/assets/images/quran/verse-${verse.id}-card.png`;
  return (
    <Card className={cn(
        "flex flex-col h-full overflow-hidden rounded-xl shadow-xl transition-all duration-300 backdrop-blur-md group hover:scale-105 hover:animate-subtle-scale-hover", 
        bgColor || "bg-card/80"
      )}>
      <CardHeader className="p-6 items-center text-center">
        <div className="p-3 rounded-full bg-primary/10 mb-2 transition-transform group-hover:scale-110">
            <BookMarked className="w-8 h-8 text-primary" />
         </div>
        <CardTitle className="font-headline text-xl text-primary group-hover:text-accent transition-colors">{verse.surahName} ({verse.verseNumber})</CardTitle>
        <div className="relative w-full h-32 rounded-lg overflow-hidden my-2 shadow-inner">
            <Image 
                src={imagePath}
                alt={`${verse.surahName} ${verse.verseNumber}`} 
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-300"
                data-ai-hint={verse.imageAiHint || 'quran calligraphy art'}
            />
        </div>
        <p className="font-['Noto_Naskh_Arabic'] text-lg text-foreground mt-1 truncate_arabic" lang="ar" dir="rtl" style={{maxHeight: '3em', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>
          {verse.arabic.substring(0, 100)}{verse.arabic.length > 100 ? '...' : ''}
        </p>
      </CardHeader>
      <CardContent className="p-6 pt-0 flex-grow text-center">
        <CardDescription className="text-muted-foreground text-sm mb-3 truncate_translation" style={{maxHeight: '4.5em', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical'}}>
            {verse.translation}
        </CardDescription>
        <div className="flex items-center justify-center text-xs text-muted-foreground mb-3">
          <Users className="w-4 h-4 mr-1 text-accent" />
          <span>Age Group: {verse.ageGroup}</span>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={`/quran/${verse.id}`} className="w-full">
          <Button variant="default" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
            Read Verse <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
