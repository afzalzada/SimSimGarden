import type { Reward } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Star, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface RewardItemProps {
  reward: Reward;
  isUnlocked: boolean;
}

export default function RewardItem({ reward, isUnlocked }: RewardItemProps) {
  const Icon = reward.type === 'badge' ? Award : ShoppingBag;
  return (
    <Card className={cn(
        "text-center shadow-lg rounded-xl overflow-hidden transition-all duration-300",
        isUnlocked ? "bg-accent/20 border-accent" : "bg-muted/50 border-muted opacity-70"
      )}>
      <CardHeader className="p-4 items-center">
        {reward.iconUrl ? (
          <div className="relative w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-2 border-primary/20">
            <Image 
                src={reward.iconUrl} 
                alt={reward.title} 
                layout="fill" 
                objectFit="cover" 
                data-ai-hint={reward.imageAiHint || (reward.type === 'badge' ? 'badge icon' : 'item icon')}
            />
          </div>
        ) : (
          <div className={cn("p-4 rounded-full mx-auto mb-3", isUnlocked ? "bg-accent text-accent-foreground" : "bg-muted-foreground/30 text-muted-foreground")}>
            <Icon className="w-10 h-10" />
          </div>
        )}
        <CardTitle className={cn("font-headline text-lg", isUnlocked ? "text-accent-foreground" : "text-foreground")}>{reward.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <CardDescription className={cn("text-xs", isUnlocked ? "text-accent-foreground/80" : "text-muted-foreground")}>{reward.description}</CardDescription>
        {reward.pointsRequired && !isUnlocked && (
          <p className="text-xs mt-2 font-semibold text-primary">
            Unlock at {reward.pointsRequired} points
          </p>
        )}
        {isUnlocked && (
           <div className="mt-2 flex items-center justify-center text-yellow-500">
                <Star className="w-4 h-4 mr-1 fill-current"/> <span className="text-xs font-semibold">Unlocked!</span>
           </div>
        )}
      </CardContent>
    </Card>
  );
}
