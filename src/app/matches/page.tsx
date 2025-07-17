import Image from "next/image";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { matches } from "@/lib/data";

export default function MatchesPage() {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold font-headline text-primary">Your Matches</h1>
          <p className="text-muted-foreground">People you've connected with.</p>
        </header>

        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {matches.map((match) => (
              <Card key={match.id} className="overflow-hidden rounded-xl shadow-lg transform transition-transform hover:scale-105">
                <CardContent className="p-0">
                  <div className="aspect-square relative">
                    <Image
                      src={match.photo}
                      alt={match.name}
                      fill
                      className="object-cover"
                      data-ai-hint={match.data_ai_hint}
                    />
                     <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                        <p className="text-white font-semibold text-center">{match.name}</p>
                     </div>
                  </div>
                </CardContent>
              </Card>
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
