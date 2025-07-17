"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { profiles, Match } from "@/lib/data";
import { useMatchStore } from "@/hooks/use-match-store";
import { useToast } from "@/hooks/use-toast";

// Simulate a list of users who liked the current user
// In a real app, this would come from a backend
const likesYouProfiles = profiles.slice(2, 4);

export default function LikesPage() {
  const { addMatch } = useMatchStore();
  const { toast } = useToast();

  const handleMatchBack = (profile: typeof likesYouProfiles[0]) => {
    const newMatch: Match = {
      id: profile.id,
      name: profile.name.split(',')[0],
      photo: profile.photos[0],
      data_ai_hint: profile.data_ai_hint,
    };
    addMatch(newMatch);
    toast({
      title: "It's a Match!",
      description: `You and ${newMatch.name} can now chat.`,
    });
    // In a real app, you would remove them from the 'likes you' list
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold font-headline text-primary">Who Likes You</h1>
          <p className="text-muted-foreground">These people have already liked your profile. Like them back to match!</p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {likesYouProfiles.map((profile) => (
            <Card key={profile.id} className="relative group overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={profile.photos[0]}
                alt={profile.name}
                width={300}
                height={400}
                className="object-cover w-full h-full"
                data-ai-hint={profile.data_ai_hint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <p className="font-bold text-lg">{profile.name}</p>
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button 
                  size="lg" 
                  className="rounded-full bg-primary hover:bg-primary/90"
                  onClick={() => handleMatchBack(profile)}
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Match Back
                </Button>
              </div>
            </Card>
          ))}
           {likesYouProfiles.length === 0 && (
              <div className="col-span-full text-center py-16">
                <p className="text-muted-foreground">No new likes yet. Check back soon!</p>
              </div>
            )}
        </div>
      </div>
    </AppLayout>
  );
}
