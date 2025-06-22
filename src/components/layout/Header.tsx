
'use client';

import Link from 'next/link';
import { Menu, Settings, X, LogIn, LogOut, UserCircle, Palette, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useParentalGate } from '@/hooks/use-parental-gate';
import { useState } from 'react';
import NavItem from './NavItem';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter } from 'next/navigation';
import { useUserProgress } from '@/contexts/UserProgressContext'; // Import useUserProgress
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/stories', label: 'STORIES' },
  { href: '/duas', label: 'DUAS' },
  { href: '/quran', label: 'QURAN' },
  { href: '/games', label: 'GAMES' },
  { href: '/coloring', label: 'COLORING' },
  { href: '/aalim', label: 'AALIM AI' },
  { href: '/rewards', label: 'REWARDS' },
  { href: '/donate', label: 'SUPPORT US' },
];

export default function Header() {
  const { showParentalGate, ParentalGateDialog, dialogProps } = useParentalGate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, userName, logout } = useUserProgress(); // Get user state

  const handleTabChange = (value: string) => {
    router.push(value);
  };

  const getActiveTab = () => {
    const baseRoute = '/' + (pathname.split('/')[1] || '');
    const matchingNavLink = navLinks.find(link => link.href === baseRoute || (link.href === '/' && pathname === '/'));
    return matchingNavLink ? matchingNavLink.href : pathname;
  };

  const handleLogout = () => {
    logout();
    router.push('/'); // Navigate to home after logout
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2 mr-auto md:mr-6" aria-label="Little Muslim Stars Home">
             <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" rx="20" fill="hsl(var(--primary))"/>
                <path d="M50 15L61.2265 38.7735L85 42.3607L67.5 59.2265L72.4531 83.6393L50 71.2265L27.5469 83.6393L32.5 59.2265L15 42.3607L38.7735 38.7735L50 15Z" fill="hsl(var(--accent))"/>
              </svg>
            <span className="font-headline font-bold text-xl text-primary">Little Muslim Stars</span>
          </Link>
          
          <nav className="hidden md:flex flex-grow justify-center">
            <Tabs value={getActiveTab()} onValueChange={handleTabChange} className="w-auto">
              <TabsList className="bg-transparent p-0 h-16">
                {navLinks.map((link) => (
                  <TabsTrigger 
                    key={link.href} 
                    value={link.href} 
                    className="px-3 py-2 h-full text-sm font-medium text-muted-foreground data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none hover:text-primary transition-colors"
                  >
                    {link.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </nav>

          <div className="flex items-center gap-2 ml-auto">
            {isLoggedIn && userName ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                     <UserCircle className="h-6 w-6 text-primary" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-primary">Salaam, {userName}!</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        Welcome back
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={showParentalGate}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
            )}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" aria-label="Open Menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-3/4 p-6 bg-background">
                <SheetHeader className="mb-4">
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                       <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="100" height="100" rx="20" fill="hsl(var(--primary))"/>
                        <path d="M50 15L61.2265 38.7735L85 42.3607L67.5 59.2265L72.4531 83.6393L50 71.2265L27.5469 83.6393L32.5 59.2265L15 42.3607L38.7735 38.7735L50 15Z" fill="hsl(var(--accent))"/>
                      </svg>
                      <span className="font-headline font-bold text-lg text-primary">Little Muslim Stars</span>
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
                  <div className="border-t pt-4">
                     {isLoggedIn ? (
                        <Button variant="outline" onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="w-full">
                            <LogOut className="mr-2 h-4 w-4" /> Logout ({userName})
                        </Button>
                     ) : (
                        <Button variant="default" asChild className="w-full">
                            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                <LogIn className="mr-2 h-4 w-4" /> Login
                            </Link>
                        </Button>
                     )}
                     <Button variant="ghost" onClick={() => { showParentalGate(); setIsMobileMenuOpen(false); }} className="w-full mt-2">
                        <Settings className="mr-2 h-4 w-4" /> Settings
                     </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <ParentalGateDialog {...dialogProps} />
    </>
  );
}
