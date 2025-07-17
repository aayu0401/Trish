"use client";

import { useState } from "react";
import { WandSparkles, CornerDownRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { suggestIceBreaker, SuggestIceBreakerOutput } from "@/ai/flows/suggest-ice-breaker";
import { currentUser, type profiles } from "@/lib/data";
import { Badge } from "./ui/badge";
import { useToast } from "@/hooks/use-toast";

type Profile = (typeof profiles)[0];

export function AiIceBreaker({ matchedProfile, onSend }: { matchedProfile: Profile, onSend: () => void }) {
  const [suggestion, setSuggestion] = useState<SuggestIceBreakerOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsLoading(true);
    setSuggestion(null);
    try {
      const result = await suggestIceBreaker({
        userProfile: currentUser.profile,
        matchProfile: matchedProfile.fullProfile,
      });
      setSuggestion(result);
    } catch (error) {
        toast({
            title: "Error",
            description: "Could not generate icebreaker. Please try again.",
            variant: "destructive"
        })
    } finally {
        setIsLoading(false);
    }
  };

  const handleSend = () => {
    if (suggestion) {
        toast({
            title: "Icebreaker Sent!",
            description: `Your message to ${matchedProfile.name.split(',')[0]} has been sent.`,
        });
        onSend();
    }
  }

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
             <Skeleton className="h-10 w-full mt-2" />
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
            <div className="flex gap-2 mt-4">
                 <Button onClick={handleSend} className="w-full bg-primary hover:bg-primary/90">
                    <Send className="mr-2 h-4 w-4" />
                    Send
                </Button>
                <Button onClick={handleGenerate} className="w-full" variant="secondary">
                    <WandSparkles className="mr-2 h-4 w-4" />
                    Regenerate
                </Button>
            </div>
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
