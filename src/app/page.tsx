"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]"></div>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-transparent bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      <div className="w-full max-w-lg text-center z-10">
        <div className="mx-auto bg-primary text-primary-foreground rounded-full p-4 w-fit mb-6 shadow-lg shadow-primary/30">
          <Heart className="h-12 w-12" />
        </div>
        <h1 className="text-6xl font-bold font-headline text-foreground">Trish</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-md mx-auto">
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
       <footer className="py-8 text-center text-muted-foreground text-sm absolute bottom-0 z-10">
          © {new Date().getFullYear()} Trish. All Rights Reserved.
        </footer>
    </main>
  );
}
