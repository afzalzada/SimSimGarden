import type { ReactNode } from 'react';
import Header from './Header';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>

        {/* Floating Aalim Chat Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/aalim" passHref>
              <Button
                variant="default"
                size="icon"
                className="fixed top-24 right-6 h-16 w-16 rounded-full shadow-2xl animate-float-subtle bg-primary hover:bg-primary/90 z-40 flex items-center justify-center"
                aria-label="Chat with Aalim"
              >
                <Bot className="h-8 w-8 text-primary-foreground" />
                <span className="sr-only">Chat with Aalim</span>
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Chat with Aalim</p>
          </TooltipContent>
        </Tooltip>

        <footer className="py-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SimSim Garden. All rights reserved.</p>
        </footer>
      </div>
    </TooltipProvider>
  );
}
