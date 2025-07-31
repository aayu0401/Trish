
"use client";

import Link from "next/link";
import { Heart, Tag, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { interests as allInterests } from "@/lib/data";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
  gender: z.enum(["Man", "Woman", "Other"]),
  interestedIn: z.enum(["Men", "Women", "Everyone"]),
  bio: z.string().max(200, "Bio must be 200 characters or less.").optional(),
  interests: z.array(z.string()).min(3, "Please select at least 3 interests."),
});

export default function SignupPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            interests: [],
            bio: "",
        },
    });

    const toggleInterest = (interest: string) => {
        const currentInterests = form.getValues("interests");
        const newInterests = currentInterests.includes(interest)
            ? currentInterests.filter((i) => i !== interest)
            : [...currentInterests, interest];
        form.setValue("interests", newInterests, { shouldValidate: true });
    };
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredential.user;

            // Create user profile in Firestore
            await setDoc(doc(db, "users", user.uid), {
                name: values.name,
                email: values.email,
                gender: values.gender,
                interestedIn: values.interestedIn,
                bio: values.bio,
                interests: values.interests,
                photos: ['https://placehold.co/600x800.png?text=Profile+Photo'], // Default photo
                createdAt: new Date(),
            });

            toast({
              title: "Account Created!",
              description: "Your profile has been successfully created.",
            });
            router.push("/browse");
        } catch (error: any) {
             toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: error.message,
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
             <Link href="/" passHref>
                <Button variant="ghost" className="absolute top-4 left-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
            </Link>
            <div className="w-full max-w-md">
                <Card className="shadow-2xl rounded-2xl border-primary/20 bg-secondary/20">
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4 shadow-lg shadow-primary/30">
                            <Heart className="h-8 w-8" />
                        </div>
                        <CardTitle className="text-4xl font-headline font-bold text-foreground">Create Your Profile</CardTitle>
                        <CardDescription className="text-muted-foreground pt-2">
                           Join a community of real, verified users.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Your Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="What should we call you?" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                  type="email"
                                                  placeholder="you@example.com"
                                                  {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Create Password</FormLabel>
                                              <FormControl>
                                                <div className="relative">
                                                  <Input type={showPassword ? "text" : "password"} placeholder="Choose a strong password" {...field} />
                                                  <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground"
                                                  >
                                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                                  </button>
                                                </div>
                                              </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex gap-4">
                                     <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem className="w-1/2">
                                                <FormLabel>You are a</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select gender" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Man">Man</SelectItem>
                                                        <SelectItem value="Woman">Woman</SelectItem>
                                                        <SelectItem value="Other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                     <FormField
                                        control={form.control}
                                        name="interestedIn"
                                        render={({ field }) => (
                                            <FormItem className="w-1/2">
                                                <FormLabel>Looking for</FormLabel>
                                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select interest" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Men">Men</SelectItem>
                                                        <SelectItem value="Women">Women</SelectItem>
                                                        <SelectItem value="Everyone">Everyone</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                  control={form.control}
                                  name="bio"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Your Bio</FormLabel>
                                      <FormControl>
                                        <Textarea placeholder="Tell us a little about yourself..." {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name="interests"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="flex items-center gap-2">
                                        <Tag className="h-4 w-4" />
                                        Select Your Interests (min. 3)
                                      </FormLabel>
                                       <FormControl>
                                            <div className="flex flex-wrap gap-2 pt-2">
                                                {allInterests.map((interest) => (
                                                    <button
                                                        key={interest}
                                                        type="button"
                                                        onClick={() => toggleInterest(interest)}
                                                        className={cn(
                                                            "rounded-full px-4 py-2 text-sm border transition-colors duration-300",
                                                            field.value.includes(interest)
                                                                ? "bg-primary text-primary-foreground border-primary"
                                                                : "bg-secondary/50 hover:bg-secondary border-secondary"
                                                        )}
                                                    >
                                                        {interest}
                                                    </button>
                                                ))}
                                            </div>
                                       </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-lg py-6 rounded-xl mt-4 shadow-lg shadow-primary/20">
                                    {isLoading ? 'Creating Account...' : 'Create Profile'}
                                </Button>
                            </form>
                        </Form>
                        <div className="mt-6 text-center text-sm">
                            Already have an account?{" "}
                            <Link href="/signin" className="underline font-semibold text-primary">
                                Sign in
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}

