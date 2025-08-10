
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
  gender: z.enum(["Man", "Woman", "Other"]),
  interestedIn: z.enum(["Men", "Women", "Everyone"]),
  bio: z.string().max(200, "Bio must be 200 characters or less.").optional(),
  interests: z.array(z.string()).min(3, "Please select at least 3 interests."),
});

const GoogleIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24">
        <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
        ></path>
        <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
        ></path>
        <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
        ></path>
        <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
        ></path>
        <path d="M1 1h22v22H1z" fill="none"></path>
    </svg>
)

export default function SignupPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [firebaseError, setFirebaseError] = useState<string | null>(null);
    
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
        setFirebaseError(null);
        try {
            // MOCK: Simulate account creation
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast({
              title: "Account Created!",
              description: "Your profile has been successfully created.",
            });
            router.push("/browse");
        } catch (error: any) {
            setFirebaseError('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    async function handleGoogleSignIn() {
        setIsGoogleLoading(true);
        setFirebaseError(null);
        try {
            // MOCK: Simulate successful Google sign-in
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast({
                title: "Welcome!",
                description: "Your account is created. Don't forget to complete your profile!",
            });
            router.push("/browse");
        } catch (error: any) {
            setFirebaseError("Google sign-in is currently unavailable.");
        } finally {
            setIsGoogleLoading(false);
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
            <div className="w-full max-w-md my-8">
                <Card className="shadow-2xl rounded-2xl border-primary/20 bg-secondary/20">
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full p-4 w-fit mb-4 shadow-lg shadow-primary/30">
                            <Heart className="h-10 w-10" />
                        </div>
                        <CardTitle className="text-4xl font-headline font-bold text-foreground">Create Your Profile</CardTitle>
                        <CardDescription className="text-muted-foreground pt-2">
                           Join a community of real, verified users.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            variant="outline"
                            className="w-full text-lg py-6 rounded-xl mb-4"
                            onClick={handleGoogleSignIn}
                            disabled={isLoading || isGoogleLoading}
                        >
                             {isGoogleLoading ? 'Signing in...' : <><GoogleIcon /> <span className="ml-2">Continue with Google</span></>}
                        </Button>
                        <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-secondary/20 px-2 text-muted-foreground">Or sign up with email</span>
                            </div>
                        </div>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                {firebaseError && (
                                    <Alert variant="destructive">
                                        <AlertDescription>{firebaseError}</AlertDescription>
                                    </Alert>
                                )}
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Your Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="What should we call you?" {...field} disabled={isLoading || isGoogleLoading} />
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
                                                  disabled={isLoading || isGoogleLoading}
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
                                                  <Input type={showPassword ? "text" : "password"} placeholder="Choose a strong password" {...field} disabled={isLoading || isGoogleLoading} />
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
                                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading || isGoogleLoading}>
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
                                                 <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading || isGoogleLoading}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select interest" />
                                                        </Trigger>
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
                                        <Textarea placeholder="Tell us a little about yourself..." {...field} disabled={isLoading || isGoogleLoading} />
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
                                                        disabled={isLoading || isGoogleLoading}
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

                                <Button type="submit" disabled={isLoading || isGoogleLoading} className="w-full bg-primary hover:bg-primary/90 text-lg py-6 rounded-xl mt-4 shadow-lg shadow-primary/20">
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
