import Image from "next/image";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Camera, ShieldCheck } from "lucide-react";
import { currentUser, profiles } from "@/lib/data";

// Using a demo profile for display
const userProfile = profiles[0];

export default function ProfilePage() {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold font-headline text-primary">My Profile</h1>
          <p className="text-muted-foreground">This is how others see you.</p>
        </header>

        <Card className="max-w-2xl mx-auto shadow-xl rounded-2xl overflow-hidden">
          <div className="relative h-64 bg-primary/10">
            <Image
              src={userProfile.photos[0]}
              alt={userProfile.name}
              fill
              className="object-cover object-top"
              data-ai-hint={userProfile.data_ai_hint}
            />
            <Button size="icon" className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 rounded-full">
              <Camera className="h-5 w-5"/>
            </Button>
          </div>
          <CardHeader className="text-center -mt-16">
            <div className="relative inline-block">
               <Image
                src={userProfile.photos[0]}
                alt={userProfile.name}
                width={128}
                height={128}
                className="rounded-full border-4 border-white shadow-lg mx-auto"
                data-ai-hint={userProfile.data_ai_hint}
              />
               <div className="absolute bottom-1 right-1 bg-green-500 rounded-full p-1 border-2 border-white">
                  <ShieldCheck className="h-4 w-4 text-white"/>
               </div>
            </div>
             <CardTitle className="mt-4 text-3xl font-bold font-headline">{userProfile.name}</CardTitle>
             <CardDescription>Joined 2 months ago</CardDescription>
          </CardHeader>

          <CardContent className="p-6 text-center">
             <div className="space-y-4">
                <div>
                    <h3 className="font-semibold text-primary">Bio</h3>
                    <p className="text-muted-foreground">{userProfile.bio}</p>
                </div>
                 <div>
                    <h3 className="font-semibold text-primary">Interests</h3>
                     <div className="flex flex-wrap gap-2 justify-center mt-2">
                        {userProfile.interests.map((interest) => (
                        <Badge key={interest} variant="secondary" className="text-primary">
                            {interest}
                        </Badge>
                        ))}
                    </div>
                </div>
             </div>
             <Button className="mt-8 w-full max-w-xs mx-auto bg-primary hover:bg-primary/90 rounded-full">
                <Pencil className="mr-2 h-4 w-4"/>
                Edit Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
