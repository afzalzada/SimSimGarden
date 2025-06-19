import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Story } from '@/lib/types';
import { ArrowRight, Users } from 'lucide-react';

interface StoryCardProps {
  story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-card/80 backdrop-blur-sm">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image 
            src={story.thumbnailUrl} 
            alt={story.title} 
            layout="fill" 
            objectFit="cover"
            data-ai-hint={story.imageAiHint || 'islamic story illustration'}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="font-headline text-xl mb-2 text-primary">{story.title}</CardTitle>
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
          <Button variant="default" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg">
            Read Story <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
