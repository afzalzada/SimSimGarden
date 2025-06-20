// src/hooks/use-dark-mode.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';

export function useDarkMode(): [boolean, () => void, (isDark: boolean) => void] {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Effect to set initial theme based on localStorage or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      const newMode = storedTheme === 'dark';
      setIsDarkMode(newMode);
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // If no theme is stored, use system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(systemPrefersDark);
      if (systemPrefersDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark'); // Optionally save system preference as initial choice
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light'); // Optionally save system preference as initial choice
      }
    }
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  }, []);

  const setMode = useCallback((isDark: boolean) => {
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, []);


  return [isDarkMode, toggleDarkMode, setMode];
}
