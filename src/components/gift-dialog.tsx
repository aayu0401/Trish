"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { gifts } from "@/lib/data";
import type { Gift as GiftType } from "@/lib/data";
import { Flower, Package, Mail, Gem, Wine, CakeSlice } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: { [key: string]: React.ElementType } = {
  Flower,
  Package,
  Mail,
  Gem,
  Wine,
  CakeSlice,
};

type GiftDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onGiftSend: (gift: GiftType) => void;
};

export function GiftDialog({ isOpen, onOpenChange, onGiftSend }: GiftDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-primary font-headline text-2xl">Send a Virtual Gift</DialogTitle>
          <DialogDescription>
            Break the ice by sending a thoughtful virtual gift.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 py-4">
          {gifts.map((gift) => {
            const Icon = iconMap[gift.icon];
            return (
              <Button
                key={gift.name}
                variant="outline"
                className="h-24 flex-col gap-2 border-2 hover:border-accent hover:bg-accent/10 group"
                onClick={() => onGiftSend(gift)}
              >
                <Icon className="h-8 w-8 text-accent transition-transform group-hover:scale-110" />
                <span className="text-sm text-center">{gift.name}</span>
              </Button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
