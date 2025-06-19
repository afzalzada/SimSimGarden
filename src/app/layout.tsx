import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { UserProgressProvider } from '@/contexts/UserProgressContext';

export const metadata: Metadata = {
  title: 'Noor Kids',
  description: 'Learn Islamic morality and ethics with Noor Kids!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <UserProgressProvider>
          {children}
          <Toaster />
        </UserProgressProvider>
      </body>
    </html>
  );
}
