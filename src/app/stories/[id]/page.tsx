'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';
import { dummyStories } from '../data';
import type { Story, StoryContentNode } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { CheckCircle, Gift } from 'lucide-react';
import Link from 'next/link';
import { useUserProgress } from '@/contexts/UserProgressContext';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}>
    <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd" />
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}>
    <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>
);

export default function SingleStoryPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const { addPoints, markLessonCompleted, getLessonProgress, updateLessonProgress } = useUserProgress();
  
  const [story, setStory] = useState<Story | null>(null);
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (id) {
      const foundStory = dummyStories.find((s) => s.id === id);
      if (foundStory) {
        setStory(foundStory);
        const progress = getLessonProgress(foundStory.id);
        if (progress === 'Completed') {
          setIsCompleted(true);
          setCurrentNodeIndex(foundStory.content.length); 
        } else if (progress === 'In Progress') {
          // Future: Potentially load last saved node index if implemented
        }
      } else {
        router.push('/stories'); 
      }
      setIsLoading(false);
    }
  }, [id, router, getLessonProgress]);

  useEffect(() => {
    if (story && !isCompleted && currentNodeIndex < story.content.length) { // Ensure not to update if story is finished
      const currentProgress = getLessonProgress(story.id);
      if (currentProgress !== 'Completed' && currentProgress !== 'In Progress') {
        updateLessonProgress(story.id, 'In Progress');
      }
    }
  }, [story, currentNodeIndex, updateLessonProgress, isCompleted, getLessonProgress]);


  const handleChoice = (nextNodeIndex: number) => {
    if (story && nextNodeIndex < story.content.length) {
      setCurrentNodeIndex(nextNodeIndex);
    } else {
      completeStory();
    }
  };

  const handleNext = () => {
    if (story && currentNodeIndex < story.content.length - 1) {
      setCurrentNodeIndex(prev => prev + 1);
    } else {
      completeStory();
    }
  };
  
  const completeStory = () => {
    if (story && !isCompleted) {
        addPoints(10); 
        markLessonCompleted(story.id);
        setIsCompleted(true);
        setCurrentNodeIndex(story.content.length); // Explicitly move to "completed" state for rendering
    }
  }

  if (isLoading || !story) {
    return <AppLayout><div className="flex justify-center items-center h-screen"><LoadingSpinner size={48} /></div></AppLayout>;
  }

  const currentNode = story.content[currentNodeIndex];

  if (isCompleted || currentNodeIndex >= story.content.length) {
    return (
      <AppLayout>
        <div className="text-center py-10 max-w-lg mx-auto">
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6 animate-pulse-subtle" />
            <h1 className="font-headline text-3xl font-bold text-primary mb-4">Story Completed!</h1>
            <p className="text-lg text-muted-foreground mb-2">Well done! You've learned about "{story.title}".</p>
            <p className="text-lg text-muted-foreground mb-6">Moral: {story.moral}</p>
            <div className="bg-accent/20 p-4 rounded-lg mb-6">
                <p className="text-accent-foreground font-semibold flex items-center justify-center">
                    <Gift className="w-5 h-5 mr-2 text-accent"/> You earned 10 points!
                </p>
            </div>
            <div className="flex gap-4 justify-center">
                <Button onClick={() => router.push('/stories')} variant="outline">
                    <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to Stories
                </Button>
                <Link href="/rewards">
                    <Button>View My Rewards</Button>
                </Link>
            </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <Button onClick={() => router.push('/stories')} variant="outline" className="mb-6">
        <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to Stories
      </Button>
      <Card className="shadow-xl rounded-xl overflow-hidden bg-card/90 backdrop-blur-md">
        <CardHeader className="bg-primary/10 p-6">
          <CardTitle className="font-headline text-3xl text-primary">{story.title}</CardTitle>
          <CardDescription className="text-muted-foreground">{story.description}</CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-6">
          {currentNode.type === 'paragraph' && (
            <p className="text-lg leading-relaxed text-foreground whitespace-pre-line">{currentNode.text}</p>
          )}
          {currentNode.type === 'image' && (
            <div className="my-6 rounded-lg overflow-hidden shadow-md">
              <Image 
                src={currentNode.url} 
                alt={currentNode.alt} 
                width={600} 
                height={400} 
                className="w-full h-auto object-cover"
                data-ai-hint={currentNode.aiHint || 'story illustration child'} 
              />
            </div>
          )}
          {currentNode.type === 'decision' && (
            <div className="my-6 p-6 bg-accent/10 rounded-lg">
              <p className="text-xl font-semibold text-accent-foreground mb-4">{currentNode.prompt}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentNode.choices.map((choice, index) => (
                  <Button
                    key={index}
                    onClick={() => handleChoice(choice.nextNodeIndex)}
                    variant="default"
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg shadow-sm"
                  >
                    {choice.text}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {currentNode.type !== 'decision' && (
            <div className="mt-8 text-right">
                <Button onClick={handleNext} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-md">
                    {currentNodeIndex === story.content.length - 1 ? 'Finish Story' : 'Next'} 
                    <ArrowRightIcon className="ml-2 h-5 w-5"/>
                </Button>
            </div>
           )}
        </CardContent>
      </Card>
    </AppLayout>
  );
}
