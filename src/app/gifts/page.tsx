
'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { gifts, Gift } from "@/lib/data";
import { ShoppingBag, Star, Package, Send, Sparkles, Inbox } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SendGiftDialog } from "@/components/send-gift-dialog";
import { useMatchStore } from "@/hooks/use-match-store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IncomingGiftCard } from "@/components/incoming-gift-card";

const GiftCard = ({ gift, onSendClick }: { gift: Gift; onSendClick: (gift: Gift) => void; }) => {

  return (
    <Card className="shadow-lg rounded-2xl overflow-hidden flex flex-col">
      <CardHeader className="p-0">
        <div className="relative aspect-video bg-primary/10">
          <Image
            src={gift.image}
            alt={gift.name}
            fill
            className="object-cover"
            data-ai-hint="gift present"
          />
          <Badge
            variant={gift.type === 'real' ? 'destructive' : 'secondary'}
            className="absolute top-2 right-2"
          >
            {gift.type === 'real' ? <Star className="h-3 w-3 mr-1"/> : <Sparkles className="h-3 w-3 mr-1" />}
            {gift.type.charAt(0).toUpperCase() + gift.type.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-headline">{gift.name}</CardTitle>
        <p className="text-muted-foreground text-sm mt-1">{gift.description}</p>
      </CardContent>
      <CardFooter className="p-4 bg-secondary/30 flex justify-between items-center">
        <p className="text-lg font-bold text-primary">₹{gift.cost}</p>
        <Button size="sm" onClick={() => onSendClick(gift)}>
          <Send className="mr-2 h-4 w-4" />
          Send
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function GiftStorePage() {
  const { toast } = useToast();
  const { matches } = useMatchStore();
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [isSendGiftDialogOpen, setIsSendGiftDialogOpen] = useState(false);

  const virtualGifts = gifts.filter((g) => g.type === 'virtual');
  const realGifts = gifts.filter((g) => g.type === 'real');

  const handleSendClick = (gift: Gift) => {
    setSelectedGift(gift);
    setIsSendGiftDialogOpen(true);
  }

  const handleSendGift = (matchName: string) => {
    if (selectedGift) {
        toast({
            title: 'Gift Sent!',
            description: `You sent a ${selectedGift.name} to ${matchName}.`
        });
    }
    setIsSendGiftDialogOpen(false);
    setSelectedGift(null);
  }


  return (
    <>
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold font-headline text-primary flex items-center justify-center gap-3">
            <ShoppingBag className="h-10 w-10"/> Gift Center
          </h1>
          <p className="text-muted-foreground">Surprise your matches or manage your incoming gifts.</p>
        </header>

        <Tabs defaultValue="store" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-6">
                <TabsTrigger value="store">
                    <ShoppingBag className="mr-2 h-4 w-4"/>
                    Gift Store
                </TabsTrigger>
                <TabsTrigger value="incoming">
                    <Link href="/gifts/incoming" className="flex items-center">
                         <Inbox className="mr-2 h-4 w-4"/>
                        Incoming
                    </Link>
                </TabsTrigger>
            </TabsList>
            <TabsContent value="store">
                <section className="mb-12">
                <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                    <Package className="h-6 w-6 text-accent"/>
                    Real Gifts
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {realGifts.map((gift) => (
                    <GiftCard key={gift.name} gift={gift} onSendClick={handleSendClick} />
                    ))}
                </div>
                </section>

                <section>
                <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                    <Sparkles className="h-6 w-6 text-accent"/>
                    Virtual Gifts
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {virtualGifts.map((gift) => (
                    <GiftCard key={gift.name} gift={gift} onSendClick={handleSendClick} />
                    ))}
                </div>
                </section>
            </TabsContent>
            {/* The incoming content will be on its own page */}
            <TabsContent value="incoming"></TabsContent>
        </Tabs>
      </div>
    </AppLayout>
    {selectedGift && (
        <SendGiftDialog
            isOpen={isSendGiftDialogOpen}
            onOpenChange={setIsSendGiftDialogOpen}
            gift={selectedGift}
            matches={matches}
            onSendGift={handleSendGift}
        />
    )}
    </>
  );
}
