'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';
import { dummyQuizzes } from '../data';
import type { Quiz } from '@/lib/types';
import QuizComponent from '@/components/games/QuizComponent';
import { Button } from '@/components/ui/button';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { useUserProgress } from '@/contexts/UserProgressContext'; // Import useUserProgress

export default function SingleQuizPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const { markLessonCompleted } = useUserProgress(); // Get markLessonCompleted

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundQuiz = dummyQuizzes.find((q) => q.id === id);
      if (foundQuiz) {
        setQuiz(foundQuiz);
      } else {
        router.push('/games'); // Quiz not found
      }
      setIsLoading(false);
    }
  }, [id, router]);

  const handleQuizComplete = (score: number, totalQuestions: number) => {
    // Mark quiz as completed using its ID when quiz is finished
    if (quiz) {
      // For simplicity, we consider any attempt as "completed" for progress tracking.
      // You might want more sophisticated logic, e.g., only if score > threshold.
      markLessonCompleted(`quiz-${quiz.id}`);
    }
    // You can also show a summary or navigate away, etc.
    // The QuizComponent itself shows the results.
  };

  if (isLoading || !quiz) {
    return <AppLayout><div className="flex justify-center items-center h-screen"><LoadingSpinner size={48} /></div></AppLayout>;
  }

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <Button onClick={() => router.push('/games')} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Games
        </Button>
         <div className="flex items-center gap-2 text-primary">
            <HelpCircle className="w-6 h-6"/>
            <h2 className="font-headline text-2xl font-semibold">{quiz.title}</h2>
        </div>
      </div>
      <QuizComponent quiz={quiz} onQuizComplete={handleQuizComplete} />
    </AppLayout>
  );
}
