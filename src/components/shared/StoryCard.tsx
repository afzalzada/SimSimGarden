
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Story } from '@/lib/types';
import { ArrowRight, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StoryCardProps {
  story: Story;
  bgColor?: string;
}

export default function StoryCard({ story, bgColor }: StoryCardProps) {
  return (
    <Card className={cn(
        "flex flex-col h-full overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-md group hover:scale-105 hover:animate-subtle-scale-hover", 
        bgColor || "bg-card/80"
      )}>
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image 
            src={story.thumbnailUrl} 
            alt={story.title} 
            layout="fill" 
            objectFit="cover"
            data-ai-hint={story.imageAiHint || 'storybook illustration character'}
            className="transition-transform group-hover:scale-110 duration-300"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="font-headline text-xl mb-2 text-primary group-hover:text-accent transition-colors">{story.title}</CardTitle>
        <CardDescription className="text-muted-foreground text-sm mb-3">{story.description}</CardDescription>
        <div className="flex items-center text-xs text-muted-foreground mb-3">
          <Users className="w-4 h-4 mr-1 text-accent" />
          <span>Age Group: {story.ageGroup}</span>
        </div>
        <p className="text-sm font-medium text-foreground">
          <span className="font-semibold text-primary">Moral:</span> {story.moral}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={`/stories/${story.id}`} className="w-full">
          <Button variant="default" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
            Read Story <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
