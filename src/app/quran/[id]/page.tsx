
'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';
import { dummyQuranVerses } from '../data';
import type { QuranVerse } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, PlayCircle, Volume2, BookOpen, CheckCircle, Gift } from 'lucide-react';
import { useUserProgress } from '@/contexts/UserProgressContext';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

export default function SingleQuranVersePage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { addPoints, markLessonCompleted, getLessonProgress, updateLessonProgress } = useUserProgress();

  const [verse, setVerse] = useState<QuranVerse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (params.id) {
      const foundVerse = dummyQuranVerses.find((v) => v.id === params.id);
      if (foundVerse) {
        setVerse(foundVerse);
         if (foundVerse.audioUrl) {
            audioRef.current = new Audio(foundVerse.audioUrl);
            audioRef.current.onloadedmetadata = () => { /* Audio loaded */ };
            audioRef.current.ontimeupdate = () => {
                if (audioRef.current) {
                    setPlaybackProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
                }
            };
            const currentAudio = audioRef.current;
            const currentVerseForListener = foundVerse;
            currentAudio.onended = () => { // Changed from audioRef.current.onended to currentAudio.onended
                setIsPlaying(false);
                setPlaybackProgress(100);
                 if (currentVerseForListener && getLessonProgress(currentVerseForListener.id) !== 'Completed') {
                    updateLessonProgress(currentVerseForListener.id, 'Listened');
                    toast({ title: "Recitation Complete!", description: "You listened to the verse." });
                 }
            };
        }
        const progress = getLessonProgress(foundVerse.id);
        if (progress === 'Completed') {
            setIsCompleted(true);
        }

      } else {
        router.push('/quran'); 
      }
      setIsLoading(false);
    }
     return () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, router, getLessonProgress, updateLessonProgress, toast]);

  const togglePlay = () => {
     if (!audioRef.current) {
        toast({variant: "destructive", title: "Audio Error", description: "Audio for this verse is not available."});
        return;
    }
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => toast({variant: "destructive", title: "Playback Error", description: err.message}));
    }
    setIsPlaying(!isPlaying);
  };
  
  const markAsReflected = () => {
    if (verse && !isCompleted) {
        addPoints(7); 
        markLessonCompleted(verse.id);
        setIsCompleted(true);
        toast({ title: "Verse Reflected Upon!", description: `You've learned about "${verse.surahName} ${verse.verseNumber}" and earned 7 points!`, className: "bg-green-500 text-white" });
    }
  };

  if (isLoading || !verse) {
    return <AppLayout><div className="flex justify-center items-center h-screen"><LoadingSpinner size={48}/></div></AppLayout>;
  }

  if (isCompleted) {
    return (
      <AppLayout>
        <div className="text-center py-10 max-w-lg mx-auto">
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6 animate-pulse-subtle" />
            <h1 className="font-headline text-3xl font-bold text-primary mb-4">Reflection Complete!</h1>
            <p className="text-lg text-muted-foreground mb-6">Masha'Allah! You've reflected upon {verse.surahName} ({verse.verseNumber}).</p>
            <div className="bg-accent/20 p-4 rounded-lg mb-6">
                <p className="text-accent-foreground font-semibold flex items-center justify-center">
                    <Gift className="w-5 h-5 mr-2 text-accent"/> You earned 7 points!
                </p>
            </div>
             <div className="flex gap-4 justify-center">
                 <Button onClick={() => router.push('/quran')} variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Quran Verses
                </Button>
                <Button onClick={() => router.push('/rewards')}>View My Rewards</Button>
            </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <Button onClick={() => router.push('/quran')} variant="outline" className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Quran Verses
      </Button>
      <Card className="shadow-xl rounded-xl overflow-hidden bg-card/90 backdrop-blur-md">
        <CardHeader className="bg-primary/10 p-6 text-center">
          <CardTitle className="font-headline text-4xl text-primary">{verse.surahName} ({verse.verseNumber})</CardTitle>
          <div className="relative w-full h-40 rounded-lg overflow-hidden my-4 shadow-inner">
            <Image 
                src={`https://placehold.co/600x240.png`} 
                alt={`${verse.surahName} ${verse.verseNumber}`} 
                layout="fill" 
                objectFit="cover"
                data-ai-hint={verse.imageAiHint || 'quran page beautiful'}
            />
          </div>
          <p className="font-['Noto_Naskh_Arabic'] text-3xl md:text-4xl text-foreground mt-2 leading-relaxed" lang="ar" dir="rtl">
            {verse.arabic}
          </p>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-6">
          {verse.audioUrl && (
            <div className="space-y-3 pb-4 border-b">
              <h3 className="font-semibold text-lg text-primary mb-2">Listen to Recitation:</h3>
              <div className="flex items-center gap-4">
                <Button onClick={togglePlay} variant="outline" size="lg" aria-label={isPlaying ? 'Pause Recitation' : 'Play Recitation'}>
                  {isPlaying ? <Volume2 className="h-6 w-6 mr-2" /> : <PlayCircle className="h-6 w-6 mr-2" />}
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
              </div>
              {isPlaying && audioRef.current && audioRef.current.duration > 0 && (
                <Progress value={playbackProgress} className="w-full h-2 mt-2" />
              )}
            </div>
          )}
          {verse.transliteration && (
            <div>
              <h3 className="font-semibold text-lg text-primary mb-1">Transliteration:</h3>
              <p className="text-muted-foreground italic">{verse.transliteration}</p>
            </div>
          )}
          <div>
            <h3 className="font-semibold text-lg text-primary mb-1">Translation:</h3>
            <p className="text-muted-foreground leading-relaxed">{verse.translation}</p>
          </div>
          <div className="pt-4 border-t">
            <h3 className="font-semibold text-lg text-primary mb-2 flex items-center">
                <BookOpen className="h-5 w-5 mr-2"/> Tafsir (Explanation):
            </h3>
            <p className="text-muted-foreground bg-primary/5 p-4 rounded-md leading-relaxed">{verse.tafsir}</p>
          </div>
           <div className="mt-8 pt-6 border-t text-center">
             <Button onClick={markAsReflected} size="lg" className="bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md px-8 py-3">
                <CheckCircle className="mr-2 h-5 w-5"/> Mark as Reflected
             </Button>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
