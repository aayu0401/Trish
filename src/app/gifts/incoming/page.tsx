
'use client';

import { useState } from "react";
import Link from "next/link";
import { AppLayout } from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { incomingGifts } from "@/lib/data";
import type { Gift } from "@/lib/data";
import { ArrowLeft, Inbox } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { IncomingGiftCard } from "@/components/incoming-gift-card";

export default function IncomingGiftsPage() {
    const { toast } = useToast();
    const [gifts, setGifts] = useState<Gift[]>(incomingGifts);

    const handleGiftResponse = (giftId: string, accepted: boolean) => {
        const gift = gifts.find(g => g.id === giftId);
        if (!gift) return;

        // Update the gift's status
        setGifts(prevGifts => 
            prevGifts.map(g => g.id === giftId ? { ...g, status: accepted ? 'accepted' : 'declined' } : g)
        );

        toast({
            title: `Gift ${accepted ? 'Accepted' : 'Declined'}`,
            description: `You have ${accepted ? 'accepted' : 'declined'} the ${gift.name} from ${gift.sender?.name}.`,
        });
    }

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
         <Link href="/gifts" passHref>
          <Button variant="ghost" className="absolute top-4 left-4 md:top-8 md:left-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Gift Center
          </Button>
        </Link>
        <header className="mb-8 text-center pt-10">
          <h1 className="text-4xl font-bold font-headline text-primary flex items-center justify-center gap-3">
            <Inbox className="h-10 w-10"/> Incoming Gifts
          </h1>
          <p className="text-muted-foreground">Accept or decline gifts sent to you by your matches.</p>
        </header>

        <div className="max-w-2xl mx-auto flex flex-col gap-6">
            {gifts.map((gift) => (
                <IncomingGiftCard 
                    key={gift.id} 
                    gift={gift} 
                    onRespond={handleGiftResponse}
                />
            ))}

            {gifts.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                    <p>You have no incoming gifts right now.</p>
                </div>
            )}
        </div>

      </div>
    </AppLayout>
  );
}
