
'use client';

import type { Reward } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Star, ShoppingBag, ImageIcon, Gift } from 'lucide-react'; 
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useState, useEffect, useRef } from 'react';

interface RewardItemProps {
  reward: Reward;
  isUnlocked: boolean;
}

export default function RewardItem({ reward, isUnlocked }: RewardItemProps) {
  const [justUnlocked, setJustUnlocked] = useState(false);
  const prevIsUnlocked = useRef(isUnlocked);

  useEffect(() => {
    if (isUnlocked && !prevIsUnlocked.current) {
      setJustUnlocked(true);
      const timer = setTimeout(() => {
        setJustUnlocked(false);
      }, 1000); 
      return () => clearTimeout(timer);
    }
    prevIsUnlocked.current = isUnlocked;
  }, [isUnlocked]);

  let IconComponent = Gift; 
  if (reward.type === 'badge') IconComponent = Award;
  if (reward.type === 'virtual_item') IconComponent = ShoppingBag;
  if (reward.type === 'wallpaper') IconComponent = ImageIcon;
  if (reward.type === 'avatar_accessory') IconComponent = Star;

  const iconPath = reward.iconUrl || `/assets/images/rewards/reward-${reward.id}.png`;


  return (
    <Card className={cn(
        "text-center shadow-xl rounded-xl overflow-hidden transition-all duration-300 transform-gpu", 
        isUnlocked ? "bg-accent/20 border-accent" : "bg-card border-border opacity-70 hover:opacity-90",
        justUnlocked && "animate-reward-unlock"
      )}>
      <CardHeader className="p-4 items-center">
        {iconPath ? (
          <div className="relative w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-2 border-primary/20 shadow-inner">
            <Image 
                src={iconPath} 
                alt={reward.title} 
                fill
                className="object-cover"
                data-ai-hint={reward.imageAiHint || (reward.type === 'badge' ? 'badge icon shiny' : 'item icon cool')}
            />
          </div>
        ) : (
          <div className={cn(
            "p-4 rounded-full mx-auto mb-3 transition-colors duration-300", 
            isUnlocked ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
          )}>
            <IconComponent className="w-10 h-10" />
          </div>
        )}
        <CardTitle className={cn(
          "font-headline text-lg transition-colors duration-300", 
          isUnlocked ? "text-accent-foreground" : "text-primary"
        )}>{reward.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <CardDescription className={cn("text-xs transition-colors duration-300", isUnlocked ? "text-accent-foreground/80" : "text-muted-foreground")}>{reward.description}</CardDescription>
        {reward.pointsRequired && !isUnlocked && (
          <p className="text-xs mt-2 font-semibold text-primary">
            Unlock at {reward.pointsRequired} points
          </p>
        )}
        {isUnlocked && (
           <div className="mt-2 flex items-center justify-center text-yellow-500">
                <Star className="w-4 h-4 mr-1 fill-current text-yellow-400"/> 
                <span className="text-xs font-semibold text-yellow-600">Unlocked!</span>
           </div>
        )}
      </CardContent>
    </Card>
  );
}
