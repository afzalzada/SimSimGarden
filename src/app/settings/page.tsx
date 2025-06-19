'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useParentalGate } from '@/hooks/use-parental-gate';
import { Bell, Palette, UserCircle, ShieldCheck } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function SettingsPage() {
  const router = useRouter();
  const { isGatePassed, showParentalGate, setIsGatePassed } = useParentalGate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This check ensures that if the user navigates directly or refreshes,
    // they are prompted with the gate if it wasn't passed in the current session.
    // A more robust solution might use session storage or a similar mechanism
    // to remember the gate was passed for a short period.
    if (!isGatePassed) {
      showParentalGate();
      // Redirect to home if gate is not passed. The gate dialog will handle actual redirection to settings on success.
      // Or, keep them on a loading state until gate is resolved.
      // For now, if not passed, we rely on the dialog to manage flow.
      // If the dialog is closed without passing, they remain on this "locked" page.
      // A better UX would be to redirect away if they close the dialog without passing.
    }
    // Simulate loading settings
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [isGatePassed, showParentalGate, router]);
  
  // Cleanup isGatePassed when component unmounts or user navigates away
  useEffect(() => {
    return () => {
      setIsGatePassed(false);
    };
  }, [setIsGatePassed]);


  if (isLoading && !isGatePassed) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <LoadingSpinner size={48} />
          <p className="mt-4 text-muted-foreground">Verifying access...</p>
        </div>
      </AppLayout>
    );
  }
  
  if (!isGatePassed && !isLoading) {
     // This state can occur if the dialog was closed without passing.
     // Prompt again or provide a way to go back.
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <ShieldCheck className="w-16 h-16 text-destructive mb-4" />
          <h1 className="text-2xl font-bold text-destructive mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-4">Parental verification is required to access settings.</p>
          <Button onClick={showParentalGate}>Verify Parent</Button>
        </div>
      </AppLayout>
    );
  }


  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <h1 className="font-headline text-4xl font-bold text-primary">App Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your Noor Kids app preferences.</p>
        </header>

        <Card className="mb-6 shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-xl"><UserCircle className="text-primary"/> Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">Parental account settings (e.g., email, password) would go here. For this demo, this section is a placeholder.</p>
            <Button variant="outline">Manage Account (Dummy)</Button>
          </CardContent>
        </Card>

        <Card className="mb-6 shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-xl"><Bell className="text-primary"/> Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="progress-notifications" className="text-base">Progress Milestones</Label>
              <Switch id="progress-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="new-content-notifications" className="text-base">New Content Alerts</Label>
              <Switch id="new-content-notifications" />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-xl"><Palette className="text-primary"/> Appearance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode" className="text-base">Dark Mode</Label>
              <Switch id="dark-mode" disabled/>
            </div>
            <p className="text-sm text-muted-foreground">Theme customization options (e.g., dark mode, font size) could be added here. Dark mode switch is disabled for demo.</p>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center">
          <Button variant="link" onClick={() => router.push('/')}>Back to Home</Button>
        </div>
      </div>
    </AppLayout>
  );
}
