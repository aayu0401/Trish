
"use client";

import Link from "next/link";
import { Heart, UserPlus, ShieldCheck, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string; }) => (
  <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border-primary/20 bg-background/50">
    <CardHeader>
      <div className="mx-auto bg-primary/10 text-primary rounded-full p-3 w-fit mb-2">
        {icon}
      </div>
      <CardTitle className="text-xl font-headline">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);


export default function LandingPage() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background overflow-hidden">
       <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#C715851a_1px,transparent_1px),linear-gradient(to_bottom,#C715851a_1px,transparent_1px)] bg-size-[14px_24px]"></div>
       <div className="absolute top-0 z-[-2] h-screen w-screen bg-transparent bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(199,21,133,0.1),rgba(255,255,255,0))]"></div>

      <div className="w-full max-w-4xl text-center z-10 pt-20 pb-12">
        <div className="mx-auto bg-white rounded-full p-4 w-fit mb-6 shadow-lg border-4 border-primary/20">
          <Heart className="h-20 w-20 text-primary" fill="currentColor" />
        </div>
        <h1 className="text-7xl font-bold font-headline text-foreground">Trish</h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
          A new wave of connection. Secure dating with Aadhar verification. No bots, real connections.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup" passHref>
            <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-lg py-7 px-8 rounded-full shadow-lg shadow-primary/20 transition-transform hover:scale-105">
              Create Account
            </Button>
          </Link>
          <Link href="/signin" passHref>
            <Button size="lg" variant="secondary" className="w-full sm:w-auto text-lg py-7 px-8 rounded-full shadow-lg transition-transform hover:scale-105">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
      
      <section className="w-full max-w-5xl z-10 py-12">
         <h2 className="text-4xl font-bold text-center mb-10 font-headline">How It Works</h2>
         <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<UserPlus className="h-8 w-8"/>} 
              title="1. Create Profile" 
              description="Sign up and create a profile that truly represents you. Add your interests, photos, and a bio." 
            />
            <FeatureCard 
              icon={<ShieldCheck className="h-8 w-8"/>} 
              title="2. Secure Verification" 
              description="Complete our mandatory Aadhar verification to ensure a community of genuine users." 
            />
            <FeatureCard 
              icon={<Search className="h-8 w-8"/>} 
              title="3. Find Your Match" 
              description="Browse verified profiles, get AI-powered icebreakers, and connect with people near you." 
            />
         </div>
      </section>

       <footer className="py-8 text-center text-muted-foreground text-sm z-10 w-full">
          © {year} Trish. All Rights Reserved.
        </footer>
    </main>
  );
}
