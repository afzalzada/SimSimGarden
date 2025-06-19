import type { AalimMessage } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Bot, User, Award, CheckSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '../ui/card';

interface ChatMessageProps {
  message: AalimMessage;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user';
  return (
    <div className={cn('flex mb-4', isUser ? 'justify-end' : 'justify-start')}>
      <Card className={cn(
          "max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-2xl shadow-md",
          isUser ? "bg-primary text-primary-foreground rounded-br-none" : "bg-card text-card-foreground rounded-bl-none border border-border"
        )}
      >
        <CardHeader className="p-0 mb-2 flex flex-row items-center gap-2">
          {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5 text-accent" />}
          <span className="font-semibold text-sm">{isUser ? 'You' : 'Aalim AI'}</span>
        </CardHeader>
        <CardContent className="p-0">
          <p className="text-base whitespace-pre-wrap">{message.text}</p>
        </CardContent>
        {(!isUser && (message.evaluation || message.prize)) && (
            <CardFooter className="p-0 mt-3 pt-2 border-t border-border/50 space-y-1 flex flex-col items-start">
                {message.evaluation && (
                    <div className="flex items-start text-xs text-muted-foreground">
                        <CheckSquare className="w-3.5 h-3.5 mr-1.5 mt-0.5 text-green-500 flex-shrink-0"/> 
                        <p><span className="font-semibold">Evaluation:</span> {message.evaluation}</p>
                    </div>
                )}
                {message.prize && (
                     <div className="flex items-start text-xs text-accent-foreground">
                        <Award className="w-3.5 h-3.5 mr-1.5 mt-0.5 text-accent flex-shrink-0"/>
                        <p><span className="font-semibold">Prize:</span> {message.prize}</p>
                    </div>
                )}
            </CardFooter>
        )}
      </Card>
    </div>
  );
}
