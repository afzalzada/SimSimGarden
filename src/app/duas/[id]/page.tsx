
'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';
import { dummyDuas } from '../data';
import type { Dua } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, PlayCircle, Mic, Volume2, CheckCircle, Gift } from 'lucide-react';
import { useUserProgress } from '@/contexts/UserProgressContext';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

export default function SingleDuaPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { addPoints, markLessonCompleted, getLessonProgress, updateLessonProgress } = useUserProgress();
  
  const [dua, setDua] = useState<Dua | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const duaRef = useRef<Dua | null>(null); // Ref to hold current dua for event handlers
  const isRecordingRef = useRef(isRecording); // Ref to hold current isRecording state

  useEffect(() => {
    duaRef.current = dua;
  }, [dua]);

  useEffect(() => {
    isRecordingRef.current = isRecording;
  }, [isRecording]);

  useEffect(() => {
    if (params.id) {
      const foundDua = dummyDuas.find((d) => d.id === params.id);
      if (foundDua) {
        setDua(foundDua);
        if (foundDua.audioUrl) {
            audioRef.current = new Audio(foundDua.audioUrl);
            audioRef.current.onloadedmetadata = () => {
                 // Audio loaded
            };
            audioRef.current.ontimeupdate = () => {
                if (audioRef.current) {
                    setPlaybackProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
                }
            };
            const currentAudio = audioRef.current; // Capture for cleanup
            const onEndedListener = () => {
                setIsPlaying(false);
                setPlaybackProgress(100);
                 // Use refs for dua and isRecording to get latest values in event handler
                 if (duaRef.current && getLessonProgress(duaRef.current.id) !== 'Completed' && !isRecordingRef.current) { 
                    updateLessonProgress(duaRef.current.id, 'Practiced');
                    toast({ title: "Practice Complete!", description: "You listened to the Dua." });
                 }
            };
            currentAudio.addEventListener('ended', onEndedListener);

            // Cleanup function
            return () => {
                if (currentAudio) {
                    currentAudio.removeEventListener('ended', onEndedListener);
                    currentAudio.pause();
                }
                audioRef.current = null; // Also nullify here on full unmount or ID change
            };
        }
        const progress = getLessonProgress(foundDua.id);
        if (progress === 'Completed') {
            setIsCompleted(true);
        }

      } else {
        router.push('/duas'); // Dua not found
      }
      setIsLoading(false);
    }
     return () => { // General cleanup for component unmount if audio was initialized
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, router, getLessonProgress, updateLessonProgress, toast]);

  const togglePlay = () => {
    if (!audioRef.current) {
        toast({variant: "destructive", title: "Audio Error", description: "Audio for this dua is not available. Ensure MP3 files are in public/audio."});
        return;
    }
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => toast({variant: "destructive", title: "Playback Error", description: err.message}));
    }
    setIsPlaying(!isPlaying);
  };

  const toggleRecord = () => {
    setIsRecording(!isRecording); // This will update isRecordingRef via its own useEffect
    if (!isRecordingRef.current) { // Check the ref's next state (which is the current !isRecording)
      // Simulate recording started
      toast({ title: 'Recording Started', description: 'Repeat the dua clearly. (This is a simulation)' });
      setTimeout(() => { // Simulate recording finished
        setIsRecording(false); // This will again update isRecordingRef
        toast({ title: 'Recording Finished', description: 'Good job practicing! (Simulation)' });
        if (duaRef.current && getLessonProgress(duaRef.current.id) !== 'Completed') {
            updateLessonProgress(duaRef.current.id, 'Practiced'); // Or more specific like 'Recorded'
        }
      }, 3000);
    }
  };
  
  const markAsLearned = () => {
    if (dua && !isCompleted) {
        addPoints(5); // Award 5 points for learning a dua
        markLessonCompleted(dua.id);
        setIsCompleted(true);
        toast({ title: "Dua Learned!", description: `You've successfully learned "${dua.title}" and earned 5 points!`, className: "bg-green-500 text-white" });
    }
  };

  if (isLoading || !dua) {
    return <AppLayout><div className="flex justify-center items-center h-screen"><LoadingSpinner size={48}/></div></AppLayout>;
  }
  
  if (isCompleted) {
    return (
      <AppLayout>
        <div className="text-center py-10 max-w-lg mx-auto">
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6 animate-pulse-subtle" />
            <h1 className="font-headline text-3xl font-bold text-primary mb-4">Dua Learned!</h1>
            <p className="text-lg text-muted-foreground mb-6">Masha'Allah! You've learned "{dua.title}". Keep practicing!</p>
            <div className="bg-accent/20 p-4 rounded-lg mb-6">
                <p className="text-accent-foreground font-semibold flex items-center justify-center">
                    <Gift className="w-5 h-5 mr-2 text-accent"/> You earned 5 points!
                </p>
            </div>
            <div className="flex gap-4 justify-center">
                 <Button onClick={() => router.push('/duas')} variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Duas
                </Button>
                <Button onClick={() => router.push('/rewards')}>View My Rewards</Button>
            </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <Button onClick={() => router.push('/duas')} variant="outline" className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Duas
      </Button>
      <Card className="shadow-xl rounded-xl overflow-hidden bg-card/90 backdrop-blur-md">
        <CardHeader className="bg-primary/10 p-6 text-center">
          <CardTitle className="font-headline text-4xl text-primary">{dua.title}</CardTitle>
           <div className="relative w-full h-40 rounded-lg overflow-hidden my-4 shadow-inner">
            <Image 
                src={`https://placehold.co/600x240.png`} 
                alt={dua.title} 
                fill
                style={{objectFit: 'cover'}}
                data-ai-hint={dua.imageAiHint || 'dua illustration child'}
            />
        </div>
          <p className="font-['Noto_Naskh_Arabic'] text-4xl md:text-5xl text-foreground mt-2" lang="ar" dir="rtl">
            {dua.arabic}
          </p>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-6">
          <div>
            <h3 className="font-semibold text-lg text-primary mb-1">Transliteration:</h3>
            <p className="text-muted-foreground italic">{dua.transliteration}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-primary mb-1">Translation:</h3>
            <p className="text-muted-foreground">{dua.translation}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-primary mb-1">Explanation:</h3>
            <p className="text-muted-foreground">{dua.explanation}</p>
          </div>

          {dua.audioUrl && (
            <div className="space-y-3 pt-4 border-t">
              <h3 className="font-semibold text-lg text-primary">Listen & Repeat:</h3>
              <div className="flex items-center gap-4">
                <Button onClick={togglePlay} variant="outline" size="lg" aria-label={isPlaying ? 'Pause' : 'Play'}>
                  {isPlaying ? <Volume2 className="h-6 w-6 mr-2" /> : <PlayCircle className="h-6 w-6 mr-2" />}
                  {isPlaying ? 'Pause' : 'Play Dua'}
                </Button>
                <Button onClick={toggleRecord} variant={isRecording ? "destructive" : "outline"} size="lg" aria-label={isRecording ? 'Stop Recording' : 'Repeat After Me'}>
                  <Mic className="h-6 w-6 mr-2" />
                  {isRecording ? 'Stop' : 'Repeat After Me'}
                </Button>
              </div>
              {isPlaying && audioRef.current && audioRef.current.duration > 0 && (
                <Progress value={playbackProgress} className="w-full h-2 mt-2" />
              )}
            </div>
          )}
          
          <div className="mt-8 pt-6 border-t text-center">
             <Button onClick={markAsLearned} size="lg" className="bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md px-8 py-3">
                <CheckCircle className="mr-2 h-5 w-5"/> Mark as Learned
             </Button>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}

    