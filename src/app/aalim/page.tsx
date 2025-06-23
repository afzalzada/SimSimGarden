
'use client';

import { useState, useEffect, useRef } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import ChatMessage from '@/components/shared/ChatMessage';
import type { AalimMessage } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot as BotIcon, RotateCcw } from 'lucide-react';
import { personalTeacherAalim, type PersonalTeacherAalimInput } from '@/ai/flows/personal-teacher-aalim';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { useToast } from '@/hooks/use-toast';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { ScrollArea } from '@/components/ui/scroll-area';

const LESSON_TOPIC_AALIM = "The Importance of Honesty in Islam";

export default function AalimPage() {
  const [messages, setMessages] = useState<AalimMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { points, completedLessons, awardPrize, getLessonProgress } = useUserProgress();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial greeting from Aalim
  useEffect(() => {
    setMessages([
      {
        id: 'aalim-intro',
        sender: 'aalim',
        text: `Assalamu Alaikum! I am Aalim, your personal AI teacher. Today, let's learn about: "${LESSON_TOPIC_AALIM}". What would you like to know, or shall I start with an explanation?`,
        timestamp: Date.now(),
      },
    ]);
  }, []);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  const handleSendMessage = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!userInput.trim() && messages.length <=1) return; // Allow sending empty if Aalim asked a question implicitly

    const userMessageText = userInput.trim() || (messages.length <= 1 ? "Please explain." : "...");

    const newUserMessage: AalimMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userMessageText,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      // Construct user progress string
      let userProgressSummary = `Current points: ${points}. `;
      if (completedLessons.length > 0) {
        userProgressSummary += `Completed lessons: ${completedLessons.join(', ')}. `;
      } else {
        userProgressSummary += "No lessons completed yet. ";
      }
      // Add progress on current topic if available
      const currentTopicProgress = getLessonProgress(`aalim-${LESSON_TOPIC_AALIM.toLowerCase().replace(/\s+/g, '-')}`);
      if (currentTopicProgress !== "Not Started") {
        userProgressSummary += `Progress on "${LESSON_TOPIC_AALIM}": ${currentTopicProgress}.`;
      }


      const inputForAI: PersonalTeacherAalimInput = {
        lessonTopic: LESSON_TOPIC_AALIM,
        userQuestion: userMessageText,
        userProgress: userProgressSummary,
      };
      
      const response = await personalTeacherAalim(inputForAI);

      const aalimResponse: AalimMessage = {
        id: `aalim-${Date.now()}`,
        sender: 'aalim',
        text: response.explanation,
        evaluation: response.evaluation,
        prize: response.prize,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aalimResponse]);

      if (response.prize) {
        awardPrize(response.prize);
        toast({ title: "Virtual Prize Awarded!", description: `Aalim awarded you: ${response.prize}`, className: "bg-accent text-accent-foreground" });
      }

    } catch (error) {
      console.error('Error with Aalim AI:', error);
      const errorResponse: AalimMessage = {
        id: `error-${Date.now()}`,
        sender: 'aalim',
        text: 'Oops! I had a little trouble connecting. Please try again in a moment.',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorResponse]);
      toast({ variant: "destructive", title: "AI Error", description: "Could not get response from Aalim." });
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetChat = () => {
     setIsLoading(true);
     setMessages([
      {
        id: 'aalim-intro-reset',
        sender: 'aalim',
        text: `Okay, let's restart our discussion about "${LESSON_TOPIC_AALIM}". What's on your mind?`,
        timestamp: Date.now(),
      },
    ]);
    setUserInput('');
    setIsLoading(false);
  }

  return (
    <AppLayout>
      <header className="mb-8 text-center">
         <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
           <BotIcon className="w-12 h-12 text-primary" />
        </div>
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-3">Chat with Aalim AI</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your friendly AI tutor for learning Islamic morality and ethics. Current Topic: <strong className="text-primary">{LESSON_TOPIC_AALIM}</strong>
        </p>
      </header>

      <div className="max-w-2xl mx-auto bg-card p-4 sm:p-6 rounded-xl shadow-2xl flex flex-col h-[70vh]">
        <ScrollArea className="flex-grow mb-4 pr-3">
          <div className="space-y-4">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                  <div className="flex items-center gap-2 max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-2xl shadow-md bg-card text-card-foreground rounded-bl-none border border-border">
                    <BotIcon className="w-5 h-5 text-accent flex-shrink-0" />
                    <LoadingSpinner size={16} className="text-accent" />
                    <span className="text-sm italic text-muted-foreground">Aalim is thinking...</span>
                  </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        <form onSubmit={handleSendMessage} className="flex items-center gap-3 border-t pt-4 border-border">
          <Input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask Aalim a question..."
            className="flex-grow h-12 text-base rounded-lg shadow-inner"
            disabled={isLoading}
            aria-label="Your message to Aalim"
          />
          <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg h-12 px-6" disabled={isLoading}>
            <Send className="w-5 h-5" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
         <Button onClick={resetChat} variant="outline" size="sm" className="mt-3 w-full max-w-xs mx-auto text-muted-foreground hover:text-foreground">
            <RotateCcw className="mr-2 h-4 w-4"/> Reset Chat with Aalim
        </Button>
      </div>
    </AppLayout>
  );
}
