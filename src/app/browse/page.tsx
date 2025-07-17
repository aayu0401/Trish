"use client";

import { useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { ProfileCard } from "@/components/profile-card";
import { MatchAlertDialog } from "@/components/match-alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { profiles } from "@/lib/data";
import type { Gift } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMatchStore } from "@/hooks/use-match-store";

export default function BrowsePage() {
  const { toast } = useToast();
  const { addMatch } = useMatchStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchedProfile, setMatchedProfile] = useState<(typeof profiles)[0] | null>(null);
  const [isMatchAlertOpen, setIsMatchAlertOpen] = useState(false);
  const currentProfile = profiles[currentIndex];

  const handleNextProfile = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
  };

  const handleLike = (profile: (typeof profiles)[0]) => {
    setMatchedProfile(profile);
    addMatch({
      id: profile.id,
      name: profile.name.split(',')[0],
      photo: profile.photos[0],
      data_ai_hint: profile.data_ai_hint,
    });
    setIsMatchAlertOpen(true);
    handleNextProfile();
  };

  const handlePass = () => {
    toast({ title: "Passed", description: "You'll see them again later!" });
    handleNextProfile();
  };
  
  const handleGiftSend = (gift: Gift) => {
    toast({
      title: "Gift Sent!",
      description: `You sent a ${gift.name} to ${currentProfile.name.split(',')[0]}.`,
    });
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        {currentProfile ? (
          <ProfileCard
            key={currentProfile.id}
            profile={currentProfile}
            onLike={handleLike}
            onPass={handlePass}
            onGiftSend={handleGiftSend}
          />
        ) : (
          <Card className="text-center p-8 bg-secondary/30 border-primary/20">
            <CardHeader>
              <CardTitle>That's everyone for now!</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Come back later to see new profiles.</p>
              <Button onClick={() => setCurrentIndex(0)} className="mt-4">Start Over</Button>
            </CardContent>
          </Card>
        )}
      </div>
      <MatchAlertDialog
        isOpen={isMatchAlertOpen}
        onOpenChange={setIsMatchAlertOpen}
        matchedProfile={matchedProfile}
      />
    </AppLayout>
  );
}
