import type { ReactNode } from 'react';
import Header from './Header';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Noor Kids. All rights reserved.</p>
      </footer>
    </div>
  );
}
