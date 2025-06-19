'use client';

import type { Quiz, QuizQuestion } from '@/lib/types';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Gift, ArrowRight, RotateCcw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
  const { addPoints } = useUserProgress();

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswerSelection = (questionId: string, answerId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answerId }));
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswers[currentQuestion.id]) return; // No answer selected

    setIsAnswerSubmitted(true);
    if (selectedAnswers[currentQuestion.id] === currentQuestion.correctOptionId) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setIsAnswerSubmitted(false);
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
      onQuizComplete(score, quiz.questions.length);
      const pointsEarned = Math.round((score / quiz.questions.length) * 10); // Max 10 points
      addPoints(pointsEarned);
    }
  };
  
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setScore(0);
    setShowResults(false);
    setIsAnswerSubmitted(false);
  };

  const progressPercentage = ((currentQuestionIndex + (isAnswerSubmitted ? 1: 0)) / quiz.questions.length) * 100;

  if (showResults) {
    return (
      <Card className="w-full max-w-lg mx-auto shadow-xl rounded-xl">
        <CardHeader className="text-center bg-primary/10 p-6 rounded-t-xl">
          <CardTitle className="font-headline text-3xl text-primary">Quiz Results!</CardTitle>
          <CardDescription className="text-muted-foreground">You completed: {quiz.title}</CardDescription>
        </CardHeader>
        <CardContent className="p-6 text-center space-y-4">
          <p className="text-2xl font-semibold text-foreground">
            Your Score: <span className="text-accent font-bold">{score}</span> / {quiz.questions.length}
          </p>
          { (score / quiz.questions.length) >= 0.7 && 
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md" role="alert">
              <p className="font-bold flex items-center justify-center"><Gift className="mr-2"/>Congratulations! You earned {Math.round((score / quiz.questions.length) * 10)} points!</p>
            </div>
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
      <CardHeader className="bg-primary/10 p-6 rounded-t-xl">
        <CardTitle className="font-headline text-2xl text-primary">{quiz.title}</CardTitle>
        <CardDescription className="text-muted-foreground">Question {currentQuestionIndex + 1} of {quiz.questions.length}</CardDescription>
        <Progress value={progressPercentage} className="w-full mt-2 h-2 [&>div]:bg-accent" />
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <p className="text-xl font-semibold text-foreground">{currentQuestion.questionText}</p>
        <RadioGroup
          value={selectedAnswers[currentQuestion.id] || ''}
          onValueChange={(value) => handleAnswerSelection(currentQuestion.id, value)}
          className="space-y-3"
          aria-label="Choose an answer"
          disabled={isAnswerSubmitted}
        >
          {currentQuestion.options.map(option => {
            const isSelected = selectedAnswers[currentQuestion.id] === option.id;
            const isCorrect = option.id === currentQuestion.correctOptionId;
            
            let itemClass = "border-muted-foreground hover:border-primary";
            if (isAnswerSubmitted && isSelected) {
                itemClass = isCorrect ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10";
            } else if (isAnswerSubmitted && isCorrect) {
                 itemClass = "border-green-500 bg-green-500/10";
            }

            return (
              <Label
                key={option.id}
                htmlFor={option.id}
                className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all ${itemClass} ${isAnswerSubmitted ? 'cursor-not-allowed' : ''}`}
              >
                <RadioGroupItem value={option.id} id={option.id} disabled={isAnswerSubmitted} />
                <span className="text-base text-foreground">{option.text}</span>
                {isAnswerSubmitted && isSelected && (isCorrect ? <CheckCircle className="ml-auto h-5 w-5 text-green-500" /> : <XCircle className="ml-auto h-5 w-5 text-red-500" />)}
                {isAnswerSubmitted && !isSelected && isCorrect && <CheckCircle className="ml-auto h-5 w-5 text-green-500" />}
              </Label>
            );
          })}
        </RadioGroup>
        {isAnswerSubmitted && currentQuestion.explanation && (
            <Alert variant={selectedAnswers[currentQuestion.id] === currentQuestion.correctOptionId ? "default" : "destructive"} className={selectedAnswers[currentQuestion.id] === currentQuestion.correctOptionId ? "bg-green-500/10 border-green-500" : "bg-red-500/10 border-red-500"}>
                <AlertTitle className="font-bold">{selectedAnswers[currentQuestion.id] === currentQuestion.correctOptionId ? "Correct!" : "Incorrect."}</AlertTitle>
                <AlertDescription>{currentQuestion.explanation}</AlertDescription>
            </Alert>
        )}
      </CardContent>
      <CardFooter className="p-6">
        {!isAnswerSubmitted ? (
            <Button onClick={handleSubmitAnswer} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg" disabled={!selectedAnswers[currentQuestion.id]}>
             Submit Answer
            </Button>
        ) : (
             <Button onClick={handleNextQuestion} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg">
                {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Show Results'} <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}
