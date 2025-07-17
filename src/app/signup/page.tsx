
"use client";

import Link from "next/link";
import { Heart, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { interests } from "@/lib/data";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function SignupPage() {
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

    const toggleInterest = (interest: string) => {
        setSelectedInterests((prev) =>
            prev.includes(interest)
                ? prev.filter((i) => i !== interest)
                : [...prev, interest]
        );
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
            <div className="w-full max-w-md">
                <Card className="shadow-2xl rounded-2xl">
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                            <Heart className="h-8 w-8" />
                        </div>
                        <CardTitle className="text-4xl font-headline font-bold text-primary">Create Your Profile</CardTitle>
                        <CardDescription className="text-muted-foreground pt-2">
                            Secure dating with Aadhar verification. No bots, real connections.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="mobile" className="text-primary">Mobile Number</Label>
                                <Input id="mobile" type="tel" placeholder="+91 XXXXX XXXXX" required className="text-base" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="aadhar" className="text-primary">Aadhar Number</Label>
                                <Input id="aadhar" type="text" placeholder="XXXX XXXX XXXX" required className="text-base" />
                                <p className="text-xs text-muted-foreground pt-1">We use Aadhar for one-time verification to ensure a safe community.</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Create Password</Label>
                                <Input id="password" type="password" placeholder="Choose a strong password" required className="text-base" />
                            </div>

                            <div className="space-y-3">
                                <Label className="text-primary flex items-center gap-2">
                                    <Tag className="h-4 w-4" />
                                    Select Your Interests
                                </Label>
                                <div className="flex flex-wrap gap-2">
                                    {interests.map((interest) => (
                                        <button
                                            key={interest}
                                            type="button"
                                            onClick={() => toggleInterest(interest)}
                                            className={cn(
                                                "rounded-full px-3 py-1 text-sm border transition-colors",
                                                selectedInterests.includes(interest)
                                                    ? "bg-primary text-primary-foreground border-primary"
                                                    : "bg-secondary/50 hover:bg-secondary border-transparent"
                                            )}
                                        >
                                            {interest}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Link href="/browse" passHref>
                                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-lg py-6 rounded-xl mt-4">
                                    Verify & Create Profile
                                </Button>
                            </Link>
                        </form>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link href="/signin" className="underline text-primary">
                                Sign in
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
