"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { AiIceBreaker } from "./ai-icebreaker";
import type { profiles } from "@/lib/data";

type Profile = (typeof profiles)[0];

type MatchAlertDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  matchedProfile: Profile | null;
};

export function MatchAlertDialog({
  isOpen,
  onOpenChange,
  matchedProfile,
}: MatchAlertDialogProps) {
  if (!matchedProfile) return null;

  const handleSend = () => {
    onOpenChange(false);
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-3xl font-headline text-primary">
            It's a Match!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            You and {matchedProfile.name.split(',')[0]} have liked each other.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AiIceBreaker matchedProfile={matchedProfile} onSend={handleSend} />
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
