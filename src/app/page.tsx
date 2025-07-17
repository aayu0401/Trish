"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto bg-primary text-primary-foreground rounded-full p-4 w-fit mb-6 shadow-lg">
          <Heart className="h-10 w-10" />
        </div>
        <h1 className="text-5xl font-bold font-headline text-primary">Trish</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A new wave of connection. Secure dating with Aadhar verification. No bots, real connections.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup" passHref>
            <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-lg py-7 px-8 rounded-xl">
              Create Account
            </Button>
          </Link>
          <Link href="/signin" passHref>
            <Button size="lg" variant="secondary" className="w-full sm:w-auto text-lg py-7 px-8 rounded-xl">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
       <footer className="py-8 text-center text-muted-foreground text-sm absolute bottom-0">
          © {new Date().getFullYear()} Trish. All Rights Reserved.
        </footer>
    </main>
  );
}
