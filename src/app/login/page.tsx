
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [name, setName] = useState('');
  const router = useRouter();
  const { login } = useUserProgress();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim()) {
      login(name.trim());
      toast({
        title: 'Logged In!',
        description: `Salaam ${name.trim()}, welcome!`,
      });
      router.push('/');
    } else {
      toast({
        variant: 'destructive',
        title: 'Name Required',
        description: 'Please enter your name to log in.',
      });
    }
  };

  return (
    <AppLayout>
      <div className="flex justify-center items-center py-12">
        <Card className="w-full max-w-md shadow-2xl rounded-xl">
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4 mx-auto w-16 h-16">
                <LogIn className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="font-headline text-3xl text-primary">Login</CardTitle>
            <CardDescription className="text-muted-foreground pt-1">
              Enter your name to track your progress and personalize your experience.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Your Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="E.g., Aisha, Omar"
                  className="h-12 text-base rounded-lg shadow-inner"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-lg rounded-lg shadow-md">
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center block">
             <p className="text-xs text-muted-foreground mt-4">
                This is a simulated login. Your name and progress are not saved permanently and will be lost if you close or refresh your browser.
            </p>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
}
