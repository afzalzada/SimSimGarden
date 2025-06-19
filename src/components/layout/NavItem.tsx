'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface NavItemProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function NavItem({ href, children, className, onClick }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'transition-colors hover:text-primary',
        isActive ? 'text-primary font-semibold' : 'text-muted-foreground',
        className
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  );
}
