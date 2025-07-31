
'use client';

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Gift } from "@/lib/data";
import { Check, X } from "lucide-react";

type IncomingGiftCardProps = {
    gift: Gift;
    onRespond: (giftId: string, accepted: boolean) => void;
}

export function IncomingGiftCard({ gift, onRespond }: IncomingGiftCardProps) {
    const { id, name, image, sender, status } = gift;

    const renderBadge = () => {
        if (status === 'accepted') {
            return <Badge className="bg-green-500 hover:bg-green-500 text-white">Accepted</Badge>
        }
        if (status === 'declined') {
            return <Badge variant="destructive">Declined</Badge>
        }
        return <Badge variant="secondary">Pending</Badge>
    }

  return (
    <Card className="shadow-lg rounded-2xl overflow-hidden flex flex-col sm:flex-row">
        <div className="relative h-48 sm:h-auto sm:w-1/3">
            <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
                data-ai-hint="gift present"
            />
        </div>
      <div className="flex flex-col flex-1">
        <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                    <CardTitle className="text-xl font-headline">{name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                        From:
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={sender?.photo} alt={sender?.name} />
                            <AvatarFallback>{sender?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-semibold">{sender?.name}</span>
                    </CardDescription>
                </div>
                {renderBadge()}
            </div>
        </CardHeader>
        <CardContent className="flex-grow">
            <p className="text-muted-foreground text-sm">{gift.description}</p>
        </CardContent>
        <CardFooter className="bg-secondary/30">
            {status === 'pending' ? (
                 <div className="flex gap-4 w-full">
                    <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => onRespond(id, true)}>
                       <Check className="mr-2 h-4 w-4"/> Accept
                    </Button>
                    <Button variant="destructive" className="w-full" onClick={() => onRespond(id, false)}>
                        <X className="mr-2 h-4 w-4"/> Decline
                    </Button>
                 </div>
            ) : (
                <p className="text-sm text-muted-foreground">You have already responded to this gift.</p>
            )}
        </CardFooter>
      </div>
    </Card>
  );
};
