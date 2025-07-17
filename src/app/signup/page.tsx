
"use client";

import Link from "next/link";
import { Heart, Tag, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { interests } from "@/lib/data";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  mobile: z.string().regex(/^\+91\s[1-9][0-9]{9}$/, "Please enter a valid Indian mobile number (+91 XXXXXXXXXX)."),
  aadhar: z.string().regex(/^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/, "Please enter a valid 12-digit Aadhar number."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
  interests: z.array(z.string()).min(3, "Please select at least 3 interests."),
});

export default function SignupPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [showPassword, setShowPassword] = useState(false);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            mobile: "+91 ",
            aadhar: "",
            password: "",
            interests: [],
        },
    });

    const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.startsWith('91')) {
          value = value.substring(2);
      }
      const formattedValue = `+91 ${value.substring(0, 10)}`;
      form.setValue('mobile', formattedValue.trim());
    };

    const handleAadharChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').substring(0, 12);
        const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
        form.setValue('aadhar', formattedValue);
    };

    const toggleInterest = (interest: string) => {
        const currentInterests = form.getValues("interests");
        const newInterests = currentInterests.includes(interest)
            ? currentInterests.filter((i) => i !== interest)
            : [...currentInterests, interest];
        form.setValue("interests", newInterests, { shouldValidate: true });
    };
    
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        toast({
          title: "Account Created!",
          description: "Your profile has been successfully created.",
        });
        router.push("/browse");
    }

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
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="mobile"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-primary">Mobile Number</FormLabel>
                                            <FormControl>
                                                <Input
                                                  placeholder="+91 XXXXXXXXXX"
                                                  {...field}
                                                  onChange={handleMobileChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="aadhar"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-primary">Aadhar Number</FormLabel>
                                            <FormControl>
                                                <Input 
                                                  placeholder="XXXX XXXX XXXX" 
                                                  {...field}
                                                  onChange={handleAadharChange}
                                                />
                                            </FormControl>
                                            <p className="text-xs text-muted-foreground pt-1">We use Aadhar for one-time verification to ensure a safe community.</p>
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

                                <FormField
                                  control={form.control}
                                  name="interests"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-primary flex items-center gap-2">
                                        <Tag className="h-4 w-4" />
                                        Select Your Interests (min. 3)
                                      </FormLabel>
                                       <FormControl>
                                            <div className="flex flex-wrap gap-2">
                                                {interests.map((interest) => (
                                                    <button
                                                        key={interest}
                                                        type="button"
                                                        onClick={() => toggleInterest(interest)}
                                                        className={cn(
                                                            "rounded-full px-3 py-1 text-sm border transition-colors",
                                                            field.value.includes(interest)
                                                                ? "bg-primary text-primary-foreground border-primary"
                                                                : "bg-secondary/50 hover:bg-secondary border-transparent"
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

                                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-lg py-6 rounded-xl mt-4">
                                    Verify & Create Profile
                                </Button>
                            </form>
                        </Form>
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
