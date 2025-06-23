
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';
import { coloringPagesData } from '../data';
import type { ColoringPage } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Palette, Sparkles, Trophy, Gift } from 'lucide-react';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { scoreColoring, type ScoreColoringOutput } from '@/ai/flows/score-coloring-flow';
import { Progress } from '@/components/ui/progress';

const themeColors = [
    'hsl(var(--primary))',
    'hsl(var(--secondary))',
    'hsl(var(--accent))',
    'hsl(var(--destructive))',
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
    'hsl(var(--foreground))',
    'hsl(var(--muted-foreground))',
    'hsl(var(--card-foreground))',
    'hsl(var(--primary)/0.5)',
    'hsl(var(--secondary)/0.5)',
    'hsl(var(--accent)/0.5)',
];

export default function SingleColoringPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { addPoints, markLessonCompleted } = useUserProgress();
  const { toast } = useToast();

  const [pageData, setPageData] = useState<ColoringPage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isScoring, setIsScoring] = useState(false);
  const [result, setResult] = useState<ScoreColoringOutput | null>(null);

  useEffect(() => {
    if (params.id) {
      const foundPage = coloringPagesData.find((p) => p.id === params.id);
      if (foundPage) {
        setPageData(foundPage);
      } else {
        router.push('/coloring');
      }
      setIsLoading(false);
    }
  }, [params.id, router]);
  
  const handleScore = async () => {
    if (!pageData) return;
    
    setIsScoring(true);
    setResult(null);
    toast({ title: "Submitting to AI Teacher...", description: "Please wait while your artwork is being evaluated." });

    try {
      // In a real app, you'd get the user's colored image data URI from a canvas.
      // Here, we simulate by sending the OUTLINE image as the user's attempt to demonstrate the AI flow.
      // The AI has been prompted to handle this case and give a low score.
      const response = await scoreColoring({
        userImageUri: pageData.imageUrl,       // This is the blank outline
        originalImageUri: pageData.coloredImageUrl, // This is the colored reference
      });
      setResult(response);
      const pointsEarned = Math.max(1, Math.round(response.score / 10));
      addPoints(pointsEarned);
      markLessonCompleted(`coloring-${pageData.id}`);
      toast({
        title: "Evaluation Complete!",
        description: `You earned ${pointsEarned} points.`,
        className: "bg-green-500 text-white",
      });
    } catch (error) {
      console.error("AI scoring error:", error);
      toast({
        variant: "destructive",
        title: "AI Error",
        description: "Could not get a score. Please try again later.",
      });
    } finally {
      setIsScoring(false);
    }
  };


  if (isLoading || !pageData) {
    return <AppLayout><div className="flex justify-center items-center h-screen"><LoadingSpinner size={48}/></div></AppLayout>;
  }

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <Button onClick={() => router.push('/coloring')} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Coloring Pages
        </Button>
      </div>

      <Card className="shadow-2xl rounded-xl overflow-hidden">
        <CardHeader className="text-center bg-primary/10 p-6">
          <CardTitle className="font-headline text-3xl text-primary flex items-center justify-center gap-2">
            <Palette /> {pageData.title}
          </CardTitle>
          <CardDescription className="text-muted-foreground">{pageData.description}</CardDescription>
        </CardHeader>

        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Coloring Area */}
          <div className="md:col-span-2 space-y-4">
             <div className="relative w-full aspect-square border-4 border-dashed border-primary/30 rounded-lg overflow-hidden shadow-inner bg-muted/30 flex items-center justify-center">
              <Image 
                src={pageData.imageUrl} 
                alt={pageData.title} 
                fill
                className="object-contain p-4"
                data-ai-hint={pageData.imageAiHint}
              />
               <p className="absolute bottom-4 text-center font-semibold text-foreground bg-background/80 px-3 py-1 rounded-full">
                    This is where your digital canvas would be!
                </p>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-card">
              <CardHeader>
                 <CardTitle className="text-xl font-headline text-primary flex items-center gap-2">
                    <Sparkles className="h-5 w-5"/> Hint
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full aspect-square rounded-md overflow-hidden shadow-md">
                    <Image 
                        src={pageData.coloredImageUrl}
                        alt={`${pageData.title} (Colored Hint)`}
                        fill
                        className="object-cover"
                        data-ai-hint={pageData.coloredImageAiHint}
                    />
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">Use this as inspiration!</p>
              </CardContent>
            </Card>

            <Card className="bg-card">
                <CardHeader>
                     <CardTitle className="text-xl font-headline text-primary flex items-center gap-2">
                        <Palette className="h-5 w-5"/> Color Palette
                    </CardTitle>
                </CardHeader>
                 <CardContent>
                    <div className="grid grid-cols-5 gap-2">
                        {themeColors.map(color => (
                            <div key={color} className="w-full aspect-square rounded-full shadow-inner border" style={{backgroundColor: color}}></div>
                        ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 text-center">(This is a simulated color palette)</p>
                 </CardContent>
            </Card>

            <Button onClick={handleScore} className="w-full text-lg h-12" disabled={isScoring}>
              {isScoring ? <LoadingSpinner/> : <Trophy className="mr-2 h-5 w-5"/>}
              {isScoring ? "Evaluating..." : "Score My Artwork!"}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {result && (
        <Card className="mt-6 shadow-xl rounded-xl bg-gradient-to-br from-accent/20 to-card">
            <CardHeader>
                <CardTitle className="text-2xl font-headline text-primary text-center">AI Art Teacher's Feedback</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
                <div>
                    <p className="text-muted-foreground font-semibold">Your Score:</p>
                    <p className="text-6xl font-bold text-accent animate-pulse-subtle">{result.score}<span className="text-3xl text-muted-foreground">/100</span></p>
                    <Progress value={result.score} className="h-3 w-3/4 mx-auto mt-2 [&>div]:bg-accent"/>
                </div>
                 <div>
                    <p className="text-muted-foreground font-semibold">Feedback:</p>
                    <p className="text-lg text-foreground italic">"{result.feedback}"</p>
                </div>
                 <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-3 rounded-md text-left text-sm" role="alert">
                    <p className="font-bold flex items-center"><Gift className="mr-2 h-4 w-4"/> You earned {Math.max(1, Math.round(result.score / 10))} points for trying!</p>
                </div>
            </CardContent>
        </Card>
      )}

    </AppLayout>
  );
}
