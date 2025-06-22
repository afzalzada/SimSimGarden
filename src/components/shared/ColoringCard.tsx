
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { ColoringPage } from '@/lib/types';
import { Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ColoringCardProps {
  page: ColoringPage;
  bgColor?: string;
}

export default function ColoringCard({ page, bgColor }: ColoringCardProps) {
  return (
    <Card className={cn(
        "flex flex-col h-full overflow-hidden rounded-xl shadow-xl transition-all duration-300 backdrop-blur-md group hover:scale-105 hover:animate-subtle-scale-hover",
        bgColor || "bg-card/80"
      )}>
      <CardHeader className="p-0">
        <div className="relative w-full h-64 bg-white border-b">
          {/* Big outline image */}
          <Image
            src={page.imageUrl}
            alt={page.title}
            fill
            className="object-contain p-4 transition-transform group-hover:scale-110 duration-300"
            data-ai-hint={page.imageAiHint}
          />
           {/* Small colored hint image */}
          <div className="absolute top-2 right-2 w-16 h-16 border-2 border-white rounded-md shadow-lg overflow-hidden transition-transform group-hover:scale-110">
            <Image 
                src={page.coloredImageUrl} 
                alt={`${page.title} (colored)`} 
                fill 
                className="object-cover"
                data-ai-hint={page.coloredImageAiHint}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="font-headline text-xl mb-2 text-primary group-hover:text-accent transition-colors">{page.title}</CardTitle>
        <CardDescription className="text-muted-foreground text-sm mb-3">{page.description}</CardDescription>
        <div className="flex flex-wrap gap-2 mt-4">
            {page.tags.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={`/coloring/${page.id}`} className="w-full">
          <Button variant="default" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
            <Palette className="mr-2 h-4 w-4" /> Start Coloring
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
