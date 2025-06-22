
'use client';

import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Gift } from 'lucide-react';

export default function DonatePage() {
  return (
    <AppLayout>
      <div className="flex justify-center items-center py-12">
        <Card className="w-full max-w-2xl text-center shadow-2xl rounded-xl">
          <CardHeader>
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4 mx-auto w-16 h-16">
                <Heart className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="font-headline text-3xl md:text-4xl text-primary">Support Little Muslim Stars</CardTitle>
            <CardDescription className="text-muted-foreground pt-2 max-w-lg mx-auto">
              Your generous contribution helps us create more engaging and educational Islamic content for children everywhere.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-foreground">
              We are passionate about our mission to provide a fun, safe, and nurturing digital space for young Muslims to learn about their faith. Every donation, big or small, makes a huge difference and allows us to continue developing new stories, games, and features.
            </p>
            <div className="bg-accent/10 p-4 rounded-lg">
                <p className="text-accent-foreground font-semibold flex items-center justify-center gap-2">
                    <Gift className="w-5 h-5 text-accent"/> Help us grow and inspire the next generation!
                </p>
            </div>
            <div>
                 <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 text-lg rounded-lg shadow-md" disabled>
                    Donation Link Coming Soon
                 </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
