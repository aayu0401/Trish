
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Gift as GiftIcon, Send } from "lucide-react";
import type { Gift, Match } from "@/lib/data";
import { cn } from "@/lib/utils";

type SendGiftDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  gift: Gift;
  matches: Match[];
  onSendGift: (matchName: string) => void;
};

export function SendGiftDialog({ isOpen, onOpenChange, gift, matches, onSendGift }: SendGiftDialogProps) {
    const [selectedMatchId, setSelectedMatchId] = useState<number | null>(null);

    const handleSend = () => {
        if (selectedMatchId) {
            const match = matches.find(m => m.id === selectedMatchId);
            if (match) {
                onSendGift(match.name);
            }
        }
    }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-primary font-headline text-2xl flex items-center gap-2">
            <GiftIcon className="h-6 w-6" />
            Send "{gift.name}"
          </DialogTitle>
          <DialogDescription>
            Select a match to send this gift to. This will cost ₹{gift.cost}.
          </DialogDescription>
        </DialogHeader>
        
        {matches.length > 0 ? (
            <ScrollArea className="max-h-60 -mx-6 px-6">
                <div className="flex flex-col gap-2 py-2">
                {matches.map((match) => (
                    <div
                    key={match.id}
                    onClick={() => setSelectedMatchId(match.id)}
                    className={cn(
                        "flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors",
                        selectedMatchId === match.id
                        ? "bg-primary/20 ring-2 ring-primary"
                        : "hover:bg-secondary/50"
                    )}
                    >
                    <Avatar className="h-12 w-12 border">
                        <AvatarImage src={match.photo} alt={match.name} />
                        <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold">{match.name}</span>
                    </div>
                ))}
                </div>
            </ScrollArea>
        ) : (
            <p className="text-center text-muted-foreground py-8">
                You have no matches to send gifts to yet.
            </p>
        )}

        <DialogFooter>
          <Button
            type="button"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={!selectedMatchId}
            onClick={handleSend}
          >
            <Send className="mr-2 h-4 w-4"/>
            Confirm & Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
