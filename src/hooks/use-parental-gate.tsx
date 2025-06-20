
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { ShieldAlert } from 'lucide-react';

interface ParentalGateDialogComponentProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  num1: number;
  num2: number;
  currentAnswer: string;
  setAnswer: (value: string) => void;
}

const ParentalGateDialogComponentInternal: React.FC<ParentalGateDialogComponentProps> = ({
  isOpen,
  onOpenChange,
  handleSubmit,
  num1,
  num2,
  currentAnswer,
  setAnswer,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Short delay to ensure dialog is fully rendered and focusable
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-headline text-2xl text-primary">
            <ShieldAlert className="h-6 w-6 text-accent" /> Parental Gate
          </DialogTitle>
          <DialogDescription className="text-muted-foreground pt-2">
            To access settings, please solve this simple math problem. This helps ensure a grown-up is present.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-center space-x-3 my-6">
            <span className="text-2xl font-semibold text-foreground">{num1}</span>
            <span className="text-2xl font-semibold text-foreground">+</span>
            <span className="text-2xl font-semibold text-foreground">{num2}</span>
            <span className="text-2xl font-semibold text-foreground">=</span>
            <Input
              ref={inputRef}
              type="number"
              value={currentAnswer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-20 text-xl text-center h-12"
              aria-label="Answer to the math problem"
            />
          </div>
          <DialogFooter className="sm:justify-center">
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-3 rounded-lg">
              Unlock
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export function useParentalGate() {
  const [isOpen, setIsOpen] = useState(false);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswerState] = useState(''); // Renamed to avoid conflict if `setAnswer` prop was also named `setAnswer`
  const router = useRouter();
  const { toast } = useToast();

  const generateProblem = useCallback(() => {
    setNum1(Math.floor(Math.random() * 9) + 1);
    setNum2(Math.floor(Math.random() * 9) + 1);
    setAnswerState('');
  }, []);

  useEffect(() => {
    if (isOpen) {
      generateProblem();
    }
  }, [isOpen, generateProblem]);

  const showParentalGate = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleDialogOpenChange = useCallback((openStatus: boolean) => {
    setIsOpen(openStatus);
  }, [setIsOpen]);

  const handleSubmit = useCallback((e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (parseInt(answer) === num1 + num2) {
      toast({ title: 'Success!', description: 'Gate passed. Accessing settings...' });
      setIsOpen(false);
      // Ensure navigation parameter is correctly handled by SettingsPage
      router.push('/settings?gate_passed_once=true');
    } else {
      toast({ variant: 'destructive', title: 'Incorrect', description: 'Please try again.' });
      generateProblem();
       // Re-focus after new problem is generated and input is cleared
      setTimeout(() => {
        // This relies on the inputRef being accessible here or ParentaGateDialogComponentInternal handling its own focus.
        // For simplicity here, we assume the user will re-focus or the component does.
        // A more complex solution would involve passing the ref back or a focus function.
      }, 100);
    }
  }, [answer, num1, num2, toast, router, generateProblem, setIsOpen]);
  
  return { 
    showParentalGate,
    ParentalGateDialog: ParentalGateDialogComponentInternal, // Pass the component constructor
    dialogProps: { // Props for the component
      isOpen,
      onOpenChange: handleDialogOpenChange,
      handleSubmit,
      num1,
      num2,
      currentAnswer: answer,
      setAnswer: setAnswerState // Pass the state setter for the answer
    }
  };
}
