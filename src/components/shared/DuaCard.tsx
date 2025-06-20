import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Dua } from '@/lib/types';
import { ArrowRight, Users, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface DuaCardProps {
  dua: Dua;
}

export default function DuaCard({ dua }: DuaCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-card/80 backdrop-blur-sm">
      <CardHeader className="p-6 items-center text-center">
         <div className="p-3 rounded-full bg-primary/10 mb-2">
            <Sparkles className="w-8 h-8 text-primary" />
         </div>
        <CardTitle className="font-headline text-xl text-primary">{dua.title}</CardTitle>
        <div className="relative w-full h-32 rounded-lg overflow-hidden my-2 shadow-inner">
            <Image 
                src={`https://placehold.co/300x150.png`} 
                alt={dua.title} 
                layout="fill" 
                objectFit="cover"
                data-ai-hint={dua.imageAiHint || 'islamic symbol child'}
            />
        </div>
        <p className="text-2xl font-['Noto_Naskh_Arabic'] text-foreground my-2" lang="ar" dir="rtl">{dua.arabic}</p>
      </CardHeader>
      <CardContent className="p-6 pt-0 flex-grow text-center">
        <CardDescription className="text-muted-foreground text-sm mb-3">{dua.explanation}</CardDescription>
         <div className="flex items-center justify-center text-xs text-muted-foreground mb-3">
          <Users className="w-4 h-4 mr-1 text-accent" />
          <span>Age Group: {dua.ageGroup}</span>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={`/duas/${dua.id}`} className="w-full">
          <Button variant="default" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg">
            Learn Dua <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
