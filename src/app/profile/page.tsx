
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Camera, ShieldCheck, ShieldAlert, LogOut, Wallet } from "lucide-react";
import { currentUser, profiles } from "@/lib/data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useToast } from "@/hooks/use-toast";

// Using a demo profile for display
const userProfile = profiles[0];


export default function ProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const isVerified = currentUser.identityVerified; // Use dynamic verification status

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.push('/');
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold font-headline text-primary">My Profile</h1>
          <p className="text-muted-foreground">This is how others see you. Manage your account here.</p>
        </header>

        <Card className="max-w-2xl mx-auto shadow-xl rounded-2xl overflow-hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {userProfile.photos.map((photo, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-80 bg-primary/10">
                    <Image
                      src={photo}
                      alt={`${userProfile.name} photo ${index + 1}`}
                      fill
                      className="object-cover"
                      data-ai-hint={userProfile.data_ai_hint}
                    />
                    {index === 0 && (
                       <Button size="icon" className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 rounded-full">
                         <Camera className="h-5 w-5"/>
                       </Button>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4" />
            <CarouselNext className="absolute right-4" />
          </Carousel>
          
          <CardHeader className="text-center -mt-20 relative z-10">
            <div className="relative inline-block">
               <Image
                src={userProfile.photos[0]}
                alt={userProfile.name}
                width={128}
                height={128}
                className="rounded-full border-4 border-white shadow-lg mx-auto"
                data-ai-hint={userProfile.data_ai_hint}
              />
              {isVerified && (
                <div className="absolute bottom-1 right-1 bg-green-500 rounded-full p-1 border-2 border-white">
                    <ShieldCheck className="h-4 w-4 text-white"/>
                </div>
              )}
            </div>
             <CardTitle className="mt-4 text-3xl font-bold font-headline">{userProfile.name}</CardTitle>
             <CardDescription>View and manage your profile.</CardDescription>
          </CardHeader>

          <CardContent className="p-6 pt-4 text-center">
             <div className="space-y-6">
                {!isVerified && (
                  <Card className="bg-destructive/10 border-destructive/50 p-4 rounded-xl">
                    <div className="flex flex-col items-center gap-2">
                       <ShieldAlert className="h-8 w-8 text-destructive"/>
                       <h3 className="font-semibold text-destructive">Verify Your Identity</h3>
                       <p className="text-sm text-destructive/80">
                         Complete a quick photo verification to get a badge and build trust.
                       </p>
                       <Link href="/profile/verify" passHref>
                          <Button variant="destructive" className="mt-2">Verify Now</Button>
                       </Link>
                    </div>
                  </Card>
                )}
                <div>
                    <h3 className="font-semibold text-primary text-lg">Bio</h3>
                    <p className="text-muted-foreground mt-1">{userProfile.bio}</p>
                </div>
                 <div>
                    <h3 className="font-semibold text-primary text-lg">Interests</h3>
                     <div className="flex flex-wrap gap-2 justify-center mt-2">
                        {userProfile.interests.map((interest) => (
                        <Badge key={interest} variant="secondary" className="text-base py-1 px-3">
                            {interest}
                        </Badge>
                        ))}
                    </div>
                </div>
             </div>
          </CardContent>
          <CardFooter className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-secondary/30">
             <Link href="/profile/edit" passHref className="w-full">
                <Button className="w-full bg-primary hover:bg-primary/90 rounded-full">
                    <Pencil className="mr-2 h-4 w-4"/>
                    Edit Profile
                </Button>
            </Link>
             <Link href="/profile/wallet" passHref className="w-full">
                <Button variant="outline" className="w-full rounded-full">
                    <Wallet className="mr-2 h-4 w-4"/>
                    My Wallet
                </Button>
            </Link>
            <Button variant="outline" className="w-full rounded-full" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4"/>
                Logout
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
}
