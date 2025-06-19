
'use client';

import { useState, useEffect, useCallback }  from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { ShieldAlert } from 'lucide-react';

export function useParentalGate() {
  const [isOpen, setIsOpen] = useState(false);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isGatePassed, setIsGatePassed] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const generateProblem = useCallback(() => {
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
    setAnswer('');
  }, []);

  useEffect(() => {
    if (isOpen) {
      generateProblem();
    }
  }, [isOpen, generateProblem]);


  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (parseInt(answer) === num1 + num2) {
      toast({ title: 'Success!', description: 'Gate passed. Accessing settings...' });
      setIsOpen(false);
      setIsGatePassed(true); // Gate passed
      router.push('/settings');
    } else {
      toast({ variant: 'destructive', title: 'Incorrect', description: 'Please try again.' });
      generateProblem();
      setIsGatePassed(false); // Gate not passed
    }
  };

  const showParentalGate = () => {
    setIsGatePassed(false); // Reset gate status for a fresh check
    setIsOpen(true);
  };

  const handleDialogOpenChange = useCallback((openStatus: boolean) => {
    setIsOpen(openStatus);
    // This callback primarily manages the dialog's open state.
    // The isGatePassed state is managed by handleSubmit on success/failure,
    // by showParentalGate on initiation, and by the SettingsPage component on unmount.
    // If the dialog is closed without passing the gate (e.g., clicking outside),
    // isGatePassed should already be false from the last attempt or from showParentalGate.
  }, [setIsOpen]);


  const ParentalGateDialog = () => (
    <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
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
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-20 text-xl text-center h-12"
              aria-label="Answer to the math problem"
              autoFocus
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

  return { ParentalGateDialog, showParentalGate, isGatePassed, setIsGatePassed };
}
