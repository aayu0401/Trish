"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl rounded-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
              <Heart className="h-8 w-8" />
            </div>
            <CardTitle className="text-4xl font-headline font-bold text-primary">Trish</CardTitle>
            <CardDescription className="text-muted-foreground pt-2">
              Secure dating with Aadhar verification. No bots, real connections.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="aadhar" className="text-primary">Aadhar Number</Label>
                <Input id="aadhar" type="text" placeholder="XXXX XXXX XXXX" required className="text-base"/>
                <p className="text-xs text-muted-foreground pt-1">We use Aadhar for one-time verification to ensure a safe community.</p>
              </div>
              <Link href="/browse" passHref>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-lg py-6 rounded-xl">
                  Verify & Create Profile
                </Button>
              </Link>
            </form>
          </CardContent>
        </Card>
      </div>
       <footer className="py-8 text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} Trish. All Rights Reserved.
        </footer>
    </main>
  );
}
