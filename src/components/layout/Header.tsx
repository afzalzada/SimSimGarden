'use client';

import Link from 'next/link';
import { Menu, Settings, ShieldAlert, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet';
import { useParentalGate } from '@/hooks/use-parental-gate';
import { useState } from 'react';
import NavItem from './NavItem';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/stories', label: 'Stories' },
  { href: '/duas', label: 'Duas' },
  { href: '/quran', label: 'Quran' },
  { href: '/games', label: 'Games' },
  { href: '/aalim', label: 'Aalim AI' },
  { href: '/rewards', label: 'Rewards' },
];

export default function Header() {
  const { ParentalGateDialog, showParentalGate } = useParentalGate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2 mr-6" aria-label="Noor Kids Home">
            {/* Using an inline SVG for the logo as per guidelines, if an actual logo is needed this should be an image component */}
             <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="48" fill="hsl(var(--primary))"/>
              <path d="M50 25C50 25 65 35 65 50C65 65 50 75 50 75C50 75 35 65 35 50C35 35 50 25 50 25Z" fill="hsl(var(--primary-foreground))"/>
              <circle cx="50" cy="50" r="10" fill="hsl(var(--accent))"/>
            </svg>
            <span className="font-headline font-bold text-xl text-primary">Noor Kids</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-4 text-sm">
            {navLinks.map((link) => (
              <NavItem key={link.href} href={link.href}>
                {link.label}
              </NavItem>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={showParentalGate} aria-label="Open Settings">
              <Settings className="h-5 w-5" />
            </Button>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" aria-label="Open Menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-3/4 p-6 bg-background">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                       <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="48" fill="hsl(var(--primary))"/>
                        <path d="M50 25C50 25 65 35 65 50C65 65 50 75 50 75C50 75 35 65 35 50C35 35 50 25 50 25Z" fill="hsl(var(--primary-foreground))"/>
                        <circle cx="50" cy="50" r="10" fill="hsl(var(--accent))"/>
                      </svg>
                      <span className="font-headline font-bold text-lg text-primary">Noor Kids</span>
                    </Link>
                    <SheetClose asChild>
                       <Button variant="ghost" size="icon" aria-label="Close Menu">
                         <X className="h-5 w-5" />
                       </Button>
                    </SheetClose>
                  </div>
                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <NavItem key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-lg">
                        {link.label}
                      </NavItem>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <ParentalGateDialog />
    </>
  );
}
