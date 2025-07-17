"use client";

import Image from "next/image";
import Link from "next/link";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMatchStore } from "@/hooks/use-match-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare } from "lucide-react";

export default function MatchesPage() {
  const { matches } = useMatchStore();

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold font-headline text-primary">Chats</h1>
          <p className="text-muted-foreground">Conversations with your matches.</p>
        </header>

        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="flex flex-col gap-4 max-w-2xl mx-auto">
            {matches.map((match) => (
              <Link href={`/chat/${match.id}`} key={match.id} passHref>
                <Card className="overflow-hidden rounded-xl shadow-md transform transition-transform hover:scale-105 cursor-pointer hover:bg-secondary/50">
                  <CardContent className="p-3 flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-primary/50">
                      <AvatarImage src={match.photo} alt={match.name} />
                      <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <h3 className="font-bold text-lg">{match.name}</h3>
                      <p className="text-sm text-muted-foreground">It's a match! Send the first message.</p>
                    </div>
                     <MessageSquare className="h-6 w-6 text-primary/70" />
                  </CardContent>
                </Card>
              </Link>
            ))}
            {matches.length === 0 && (
              <div className="col-span-full text-center py-16">
                <p className="text-muted-foreground">No matches yet. Keep browsing!</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </AppLayout>
  );
}
