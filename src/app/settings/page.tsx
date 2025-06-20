
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useParentalGate } from '@/hooks/use-parental-gate';
import { Bell, Palette, UserCircle, ShieldCheck } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

function SettingsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showParentalGate } = useParentalGate(); 
  
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the gate was passed in this session via URL parameter
    if (searchParams.get('gate_passed_once') === 'true') {
      setIsVerified(true);
    } else {
      // If not passed via URL, show the gate immediately
      // The dialog itself will navigate with the param on success
      showParentalGate();
    }
    const timer = setTimeout(() => setIsLoading(false), 300); // Shorter delay, main check is param
    return () => clearTimeout(timer);
  }, [searchParams, showParentalGate]);


  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <LoadingSpinner size={48} />
          <p className="mt-4 text-muted-foreground">Loading settings...</p>
        </div>
      </AppLayout>
    );
  }
  
  if (!isVerified) {
    // This state is reached if the URL param isn't there, and the dialog should be active.
    // Or if the dialog was closed without passing.
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <ShieldCheck className="w-16 h-16 text-destructive mb-4" />
          <h1 className="text-2xl font-bold text-destructive mb-2">Parental Verification Required</h1>
          <p className="text-muted-foreground mb-4">Please complete the verification to access settings.</p>
          <Button onClick={showParentalGate}>Verify Parent</Button>
           <Button variant="link" onClick={() => router.push('/')} className="mt-4">Back to Home</Button>
        </div>
      </AppLayout>
    );
  }

  // Gate is passed, show actual settings
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

// Wrap with Suspense because useSearchParams() needs it
export default function SettingsPage() {
  return (
    <Suspense fallback={<AppLayout><div className="flex justify-center items-center h-screen"><LoadingSpinner size={48} /><p className="ml-2">Loading...</p></div></AppLayout>}>
      <SettingsContent />
    </Suspense>
  );
}
