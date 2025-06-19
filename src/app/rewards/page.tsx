'use client';

import AppLayout from '@/components/layout/AppLayout';
import RewardItem from '@/components/shared/RewardItem';
import { dummyRewards } from './data';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { Trophy, Gift } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";

export default function RewardsPage() {
  const { points, userPrizes } = useUserProgress();

  // Determine which rewards are unlocked
  const unlockedRewards = dummyRewards.filter(reward => {
    if (reward.pointsRequired && points >= reward.pointsRequired) {
      return true;
    }
    // Check for AI awarded prizes
    if (userPrizes.includes(reward.title) || userPrizes.includes(reward.id)){ // Check by title or ID for AI prizes
        return true;
    }
    return false;
  });

  const nextUnlockableReward = dummyRewards
    .filter(r => r.pointsRequired && points < r.pointsRequired && !unlockedRewards.find(ur => ur.id === r.id))
    .sort((a,b) => (a.pointsRequired || Infinity) - (b.pointsRequired || Infinity))[0];
  
  const progressToNextReward = nextUnlockableReward && nextUnlockableReward.pointsRequired 
    ? (points / nextUnlockableReward.pointsRequired) * 100 
    : 0;


  return (
    <AppLayout>
      <header className="mb-10 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
           <Trophy className="w-12 h-12 text-primary" />
        </div>
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-3">Your Progress & Rewards</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          See the points you've earned and the amazing rewards you've unlocked!
        </p>
      </header>

      <Card className="mb-8 shadow-xl rounded-xl bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-center text-primary">Current Points</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-6xl font-bold text-accent mb-4 animate-pulse-subtle">{points}</p>
          {nextUnlockableReward && (
            <div className="max-w-md mx-auto">
                <p className="text-sm text-muted-foreground mb-1">
                    Next reward: <span className="font-semibold text-primary">{nextUnlockableReward.title}</span> ({nextUnlockableReward.pointsRequired} points)
                </p>
                <Progress value={progressToNextReward} className="h-3 [&>div]:bg-accent" />
                 <p className="text-xs text-muted-foreground mt-1">{points} / {nextUnlockableReward.pointsRequired} points</p>
            </div>
          )}
           {!nextUnlockableReward && points > 0 && (
             <p className="text-md text-green-600 font-semibold">You've unlocked all point-based rewards for now! Keep learning!</p>
           )}
        </CardContent>
      </Card>
      
      <div>
        <h2 className="font-headline text-3xl font-semibold text-primary mb-6 text-center">
          <Gift className="inline-block w-8 h-8 mr-2 text-accent" /> Your Rewards Collection
        </h2>
        {dummyRewards.length === 0 ? (
            <p className="text-center text-muted-foreground">No rewards available yet. Keep learning to unlock them!</p>
        ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {dummyRewards.map((reward) => (
                <RewardItem key={reward.id} reward={reward} isUnlocked={unlockedRewards.some(ur => ur.id === reward.id)} />
            ))}
            </div>
        )}
      </div>
    </AppLayout>
  );
}
