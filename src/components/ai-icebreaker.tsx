"use client";

import { useState } from "react";
import { WandSparkles, CornerDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { suggestIceBreaker, SuggestIceBreakerOutput } from "@/ai/flows/suggest-ice-breaker";
import { currentUser, type profiles } from "@/lib/data";
import { Badge } from "./ui/badge";

type Profile = (typeof profiles)[0];

export function AiIceBreaker({ matchedProfile }: { matchedProfile: Profile }) {
  const [suggestion, setSuggestion] = useState<SuggestIceBreakerOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    const result = await suggestIceBreaker({
      userProfile: currentUser.profile,
      matchProfile: matchedProfile.fullProfile,
    });
    setSuggestion(result);
    setIsLoading(false);
  };

  return (
    <Card className="bg-secondary/50 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-headline">
          <WandSparkles className="h-5 w-5 text-primary" />
          AI Ice Breaker
        </CardTitle>
        <CardDescription>
          Let AI help you start the conversation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : suggestion ? (
          <div className="space-y-4 text-sm">
            <p className="font-semibold text-primary-foreground bg-primary rounded-lg p-3 italic">
              "{suggestion.iceBreakerSuggestion}"
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p className="flex items-start gap-2">
                <CornerDownRight className="h-4 w-4 mt-1 shrink-0" />
                <span><span className="font-semibold text-foreground">Reasoning:</span> {suggestion.reasoning}</span>
              </p>
              <div className="flex items-start gap-2">
                <CornerDownRight className="h-4 w-4 mt-1 shrink-0" />
                 <span>
                    <span className="font-semibold text-foreground">Alignment:</span>{" "}
                    {suggestion.isAligned ? (
                        <Badge variant="default" className="bg-green-600">Aligned</Badge>
                    ) : (
                        <Badge variant="destructive">Not Aligned</Badge>
                    )}
                </span>
              </div>
            </div>
            <Button onClick={handleGenerate} className="w-full mt-2" variant="secondary">
                <WandSparkles className="mr-2 h-4 w-4" />
                Regenerate
            </Button>
          </div>
        ) : (
            <Button onClick={handleGenerate} className="w-full">
                <WandSparkles className="mr-2 h-4 w-4" />
                Generate Suggestion
            </Button>
        )}
      </CardContent>
    </Card>
  );
}
