
'use client';

import type { Quiz, QuizQuestion } from '@/lib/types';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Gift, ArrowRight, RotateCcw, HelpCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

interface QuizComponentProps {
  quiz: Quiz;
  onQuizComplete: (score: number, totalQuestions: number) => void;
}

export default function QuizComponent({ quiz, onQuizComplete }: QuizComponentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [animateCorrect, setAnimateCorrect] = useState(false);
  const { addPoints } = useUserProgress();

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswerSelection = (questionId: string, answerId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answerId }));
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswers[currentQuestion.id]) return; 

    setIsAnswerSubmitted(true);
    const isCorrect = selectedAnswers[currentQuestion.id] === currentQuestion.correctOptionId;
    if (isCorrect) {
      setScore(prev => prev + 1);
      setAnimateCorrect(true);
      setTimeout(() => setAnimateCorrect(false), 1000); // Duration of 'tada' animation
    }
  };

  const handleNextQuestion = () => {
    setIsAnswerSubmitted(false);
    setAnimateCorrect(false);
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
      // Ensure score is the final score before calling onQuizComplete
      // The score state might not update immediately before this call.
      // So, we calculate the final score directly.
      let finalScore = 0;
      quiz.questions.forEach((q, idx) => {
        // Recalculate based on selectedAnswers, assuming current question was just processed
        const answerForQ = selectedAnswers[q.id];
        if (answerForQ === q.correctOptionId) {
          finalScore++;
        }
      });
      // If the last answer submitted was correct and score hasn't updated yet.
      if (selectedAnswers[currentQuestion.id] === currentQuestion.correctOptionId && score < finalScore) {
         onQuizComplete(finalScore, quiz.questions.length);
         const pointsEarned = Math.round((finalScore / quiz.questions.length) * 10);
         addPoints(pointsEarned);
      } else {
         onQuizComplete(score, quiz.questions.length);
         const pointsEarned = Math.round((score / quiz.questions.length) * 10);
         addPoints(pointsEarned);
      }
    }
  };
  
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setScore(0);
    setShowResults(false);
    setIsAnswerSubmitted(false);
    setAnimateCorrect(false);
  };

  const progressPercentage = ((currentQuestionIndex + (isAnswerSubmitted ? 1: 0)) / quiz.questions.length) * 100;

  if (showResults) {
    const pointsEarned = Math.round((score / quiz.questions.length) * 10);
    return (
      <Card className="w-full max-w-lg mx-auto shadow-xl rounded-xl">
        <CardHeader className="text-center bg-primary/10 p-6 rounded-t-xl">
          <CardTitle className="font-headline text-3xl text-primary flex items-center justify-center gap-2"><HelpCircle/>Quiz Results!</CardTitle>
          <CardDescription className="text-muted-foreground">You completed: {quiz.title}</CardDescription>
        </CardHeader>
        <CardContent className="p-6 text-center space-y-4">
          <p className="text-2xl font-semibold text-foreground">
            Your Score: <span className="text-accent font-bold">{score}</span> / {quiz.questions.length}
          </p>
          { (score / quiz.questions.length) >= 0.7 && 
            <Alert variant="default" className={cn("bg-green-500/10 border-green-500", animateCorrect && "animate-tada")}>
               <Gift className="h-5 w-5 text-green-600"/>
              <AlertTitle className="font-bold text-green-700">Well Done!</AlertTitle>
              <AlertDescription className="text-green-600">
                Congratulations! You earned {pointsEarned} points!
              </AlertDescription>
            </Alert>
          }
           { (score / quiz.questions.length) < 0.7 && 
             <Alert variant="destructive" className="bg-destructive/10">
                <HelpCircle className="h-5 w-5 text-destructive"/>
                <AlertTitle className="font-bold">Keep Trying!</AlertTitle>
                <AlertDescription>
                    Practice makes perfect! You earned {pointsEarned} points.
                </AlertDescription>
            </Alert>
           }
          <Button onClick={restartQuiz} className="w-full sm:w-auto" variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" /> Restart Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl rounded-xl">
      <CardHeader className="bg-card p-6 rounded-t-xl">
        <div className="flex justify-between items-center mb-2">
            <CardTitle className="font-headline text-2xl text-primary flex items-center gap-2"><HelpCircle/>{quiz.title}</CardTitle>
            <span className="text-sm font-semibold text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                {currentQuestionIndex + 1} / {quiz.questions.length}
            </span>
        </div>
        <Progress value={progressPercentage} className="w-full mt-2 h-3 [&>div]:bg-accent" />
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <p className="text-xl font-semibold text-foreground min-h-[3em] flex items-center">{currentQuestion.questionText}</p>
        <RadioGroup
          value={selectedAnswers[currentQuestion.id] || ''}
          onValueChange={(value) => handleAnswerSelection(currentQuestion.id, value)}
          className="space-y-3"
          aria-label="Choose an answer"
          disabled={isAnswerSubmitted}
        >
          {currentQuestion.options.map(option => {
            const isSelected = selectedAnswers[currentQuestion.id] === option.id;
            const isCorrectOption = option.id === currentQuestion.correctOptionId;
            
            let itemClass = "border-muted-foreground hover:border-primary transition-all duration-200 ease-in-out";
             if (isAnswerSubmitted && isSelected) {
                itemClass = isCorrectOption ? 
                "border-green-500 bg-green-500/10 ring-2 ring-green-500 shadow-lg scale-105" : 
                "border-red-500 bg-red-500/10 ring-2 ring-red-500";
            } else if (isAnswerSubmitted && isCorrectOption) {
                 itemClass = "border-green-500 bg-green-500/10";
            } else if (isSelected) {
                itemClass = "border-primary ring-2 ring-primary shadow-md";
            }


            return (
              <Label
                key={option.id}
                htmlFor={option.id}
                className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer ${itemClass} ${isAnswerSubmitted ? 'cursor-not-allowed' : ''}`}
              >
                <RadioGroupItem value={option.id} id={option.id} disabled={isAnswerSubmitted} className="border-primary data-[state=checked]:border-primary"/>
                <span className="text-base text-foreground flex-1">{option.text}</span>
                {isAnswerSubmitted && isSelected && (isCorrectOption ? 
                    <CheckCircle className="ml-auto h-6 w-6 text-green-500" /> : 
                    <XCircle className="ml-auto h-6 w-6 text-red-500" />
                )}
                {isAnswerSubmitted && !isSelected && isCorrectOption && <CheckCircle className="ml-auto h-6 w-6 text-green-500 opacity-50" />}
              </Label>
            );
          })}
        </RadioGroup>
        {isAnswerSubmitted && currentQuestion.explanation && (
            <Alert 
              variant={selectedAnswers[currentQuestion.id] === currentQuestion.correctOptionId ? "default" : "destructive"} 
              className={cn(
                selectedAnswers[currentQuestion.id] === currentQuestion.correctOptionId ? "bg-green-500/10 border-green-500" : "bg-red-500/10 border-red-500",
                selectedAnswers[currentQuestion.id] === currentQuestion.correctOptionId && animateCorrect && "animate-tada"
              )}
            >
                {selectedAnswers[currentQuestion.id] === currentQuestion.correctOptionId ? <CheckCircle className="h-5 w-5 text-green-600"/> : <XCircle className="h-5 w-5 text-red-600"/>}
                <AlertTitle className="font-bold">{selectedAnswers[currentQuestion.id] === currentQuestion.correctOptionId ? "Correct!" : "Not Quite..."}</AlertTitle>
                <AlertDescription>{currentQuestion.explanation}</AlertDescription>
            </Alert>
        )}
      </CardContent>
      <CardFooter className="p-6 bg-card rounded-b-xl border-t">
        {!isAnswerSubmitted ? (
            <Button onClick={handleSubmitAnswer} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg py-3 text-base" disabled={!selectedAnswers[currentQuestion.id]}>
             Check Answer
            </Button>
        ) : (
             <Button onClick={handleNextQuestion} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg py-3 text-base">
                {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Show Results'} <ArrowRight className="ml-2 h-5 w-5"/>
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}
