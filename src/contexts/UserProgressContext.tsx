'use client';

import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useCallback } from 'react';

interface UserProgressContextType {
  points: number;
  addPoints: (amount: number) => void;
  completedLessons: string[];
  markLessonCompleted: (lessonId: string) => void;
  getLessonProgress: (lessonId: string) => string; // e.g., "Not Started", "In Progress", "Completed"
  updateLessonProgress: (lessonId: string, progress: string) => void;
  userPrizes: string[];
  awardPrize: (prize: string) => void;
}

const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

export const UserProgressProvider = ({ children }: { children: ReactNode }) => {
  const [points, setPoints] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [lessonProgressMap, setLessonProgressMap] = useState<Record<string, string>>({});
  const [userPrizes, setUserPrizes] = useState<string[]>([]);

  const addPoints = useCallback((amount: number) => {
    setPoints((prevPoints) => prevPoints + amount);
  }, []);

  const markLessonCompleted = useCallback((lessonId: string) => {
    setCompletedLessons((prev) => (prev.includes(lessonId) ? prev : [...prev, lessonId]));
    setLessonProgressMap((prev) => ({ ...prev, [lessonId]: 'Completed' }));
  }, []);

  const getLessonProgress = useCallback((lessonId: string) => {
    return lessonProgressMap[lessonId] || 'Not Started';
  }, [lessonProgressMap]);

  const updateLessonProgress = useCallback((lessonId: string, progress: string) => {
    setLessonProgressMap((prev) => ({ ...prev, [lessonId]: progress }));
  }, []);

  const awardPrize = useCallback((prize: string) => {
    setUserPrizes((prevPrizes) => [...prevPrizes, prize]);
  }, []);

  return (
    <UserProgressContext.Provider value={{ 
        points, 
        addPoints, 
        completedLessons, 
        markLessonCompleted,
        getLessonProgress,
        updateLessonProgress,
        userPrizes,
        awardPrize
      }}>
      {children}
    </UserProgressContext.Provider>
  );
};

export const useUserProgress = () => {
  const context = useContext(UserProgressContext);
  if (context === undefined) {
    throw new Error('useUserProgress must be used within a UserProgressProvider');
  }
  return context;
};
