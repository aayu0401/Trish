
"use client";

import { useState, useMemo } from "react";
import { AppLayout } from "@/components/app-layout";
import { ProfileCard } from "@/components/profile-card";
import { MatchAlertDialog } from "@/components/match-alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { profiles, currentUser } from "@/lib/data";
import type { Gift } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMatchStore } from "@/hooks/use-match-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";


// Haversine formula to calculate distance between two lat/lon points
const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

export default function BrowsePage() {
  const { toast } = useToast();
  const { addMatch } = useMatchStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchedProfile, setMatchedProfile] = useState<(typeof profiles)[0] | null>(null);
  const [isMatchAlertOpen, setIsMatchAlertOpen] = useState(false);
  
  const [filters, setFilters] = useState({
      gender: currentUser.interestedIn,
      radius: currentUser.searchRadius,
  });

  const filteredProfiles = useMemo(() => {
    return profiles.filter(profile => {
      // Don't show the current user in the browse list
      if (profile.id === currentUser.id) {
        return false;
      }
      
      const genderMatch = filters.gender === 'Everyone' || profile.gender === filters.gender;
      
      const distance = getDistance(
        currentUser.location.lat,
        currentUser.location.lon,
        profile.location.lat,
        profile.location.lon
      );
      const radiusMatch = distance <= filters.radius;

      return genderMatch && radiusMatch;
    });
  }, [filters]);

  const currentProfile = filteredProfiles[currentIndex];

  const handleNextProfile = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex >= filteredProfiles.length) {
        return 0; // Loop back to the start
      }
      return nextIndex;
    });
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
        <Collapsible className="w-full max-w-sm mb-6">
          <CollapsibleTrigger asChild>
             <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                Filter Options
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
             <Card className="w-full p-4 mt-2 bg-secondary/30">
                <CardContent className="space-y-4 p-2">
                    <div className="grid gap-2">
                        <Label htmlFor="gender-filter">Show me</Label>
                        <Select
                            value={filters.gender}
                            onValueChange={(value) => setFilters(prev => ({...prev, gender: value as 'Men' | 'Women' | 'Everyone'}))}
                        >
                            <SelectTrigger id="gender-filter">
                                <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Women">Women</SelectItem>
                                <SelectItem value="Men">Men</SelectItem>
                                <SelectItem value="Everyone">Everyone</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="grid gap-2">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="radius-filter">Search Radius</Label>
                            <span className="text-sm font-medium text-primary">{filters.radius} km</span>
                        </div>
                        <Slider
                            id="radius-filter"
                            min={5}
                            max={100}
                            step={5}
                            value={[filters.radius]}
                            onValueChange={(value) => setFilters(prev => ({...prev, radius: value[0]}))}
                        />
                    </div>
                </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>


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
              <p>Try expanding your search radius or changing your filters.</p>
              <Button onClick={() => setCurrentIndex(0)} className="mt-4">Reset Search</Button>
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
