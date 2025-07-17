"use client";

import Image from "next/image";
import { X, Heart, Gift, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Gift as GiftType } from "@/lib/data";
import { GiftDialog } from "./gift-dialog";
import { useState } from "react";

type Profile = {
  id: number;
  name: string;
  bio: string;
  interests: string[];
  photos: string[];
  data_ai_hint: string;
  fullProfile: string;
};

type ProfileCardProps = {
  profile: Profile;
  onLike: (profile: Profile) => void;
  onPass: () => void;
  onGiftSend: (gift: GiftType) => void;
};

export function ProfileCard({ profile, onLike, onPass, onGiftSend }: ProfileCardProps) {
  const [isGiftDialogOpen, setIsGiftDialogOpen] = useState(false);

  return (
    <>
      <Card className="relative w-full max-w-sm mx-auto h-[70vh] shadow-2xl rounded-3xl overflow-hidden border-2 border-primary/20">
        <Image
          src={profile.photos[0]}
          alt={profile.name}
          fill
          className="object-cover"
          data-ai-hint={profile.data_ai_hint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h2 className="text-3xl font-bold font-headline">{profile.name}</h2>
          <p className="mt-1 text-base">{profile.bio}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {profile.interests.map((interest) => (
              <Badge key={interest} variant="secondary" className="bg-white/20 text-white backdrop-blur-sm border-0">
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
      <CardFooter className="flex justify-center items-center gap-4 mt-6">
        <Button
          variant="outline"
          size="icon"
          className="w-20 h-20 rounded-full border-4 border-destructive/50 text-destructive bg-white hover:bg-destructive/10"
          onClick={onPass}
        >
          <X className="h-10 w-10" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="w-16 h-16 rounded-full border-2 border-accent/80 text-accent bg-white hover:bg-accent/10"
          onClick={() => setIsGiftDialogOpen(true)}
        >
          <Gift className="h-8 w-8" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="w-20 h-20 rounded-full border-4 border-primary/50 text-primary bg-white hover:bg-primary/10"
          onClick={() => onLike(profile)}
        >
          <Heart className="h-10 w-10" />
        </Button>
      </CardFooter>
      <GiftDialog
        isOpen={isGiftDialogOpen}
        onOpenChange={setIsGiftDialogOpen}
        onGiftSend={(gift) => {
          onGiftSend(gift);
          setIsGiftDialogOpen(false);
        }}
      />
    </>
  );
}
