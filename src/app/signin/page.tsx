"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SigninPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl rounded-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
              <Heart className="h-8 w-8" />
            </div>
            <CardTitle className="text-4xl font-headline font-bold text-primary">Welcome Back</CardTitle>
            <CardDescription className="text-muted-foreground pt-2">
              Sign in to continue your journey.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-primary">Mobile Number</Label>
                <Input id="mobile" type="tel" placeholder="+91 XXXXX XXXXX" required className="text-base"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" required className="text-base"/>
              </div>
              <Link href="/browse" passHref>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-lg py-6 rounded-xl">
                  Sign In
                </Button>
              </Link>
            </form>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link href="/signup" className="underline text-primary">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
       <footer className="py-8 text-center text-muted-foreground text-sm absolute bottom-0">
          © {new Date().getFullYear()} Trish. All Rights Reserved.
        </footer>
    </main>
  );
}
