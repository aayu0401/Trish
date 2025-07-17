
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save, Trash2, Upload } from 'lucide-react';
import { profiles, interests as allInterests } from '@/lib/data';
import { cn } from '@/lib/utils';

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name is too long'),
  bio: z.string().max(200, 'Bio cannot exceed 200 characters'),
  interests: z.array(z.string()).min(3, 'Please select at least 3 interests'),
});

const userProfile = profiles[0]; // Demo data

export default function EditProfilePage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userProfile.name.split(',')[0],
      bio: userProfile.bio,
      interests: userProfile.interests,
    },
  });

  const toggleInterest = (interest: string) => {
    const currentInterests = form.getValues('interests');
    const newInterests = currentInterests.includes(interest)
      ? currentInterests.filter((i) => i !== interest)
      : [...currentInterests, interest];
    form.setValue('interests', newInterests, { shouldValidate: true });
  };

  const onSubmit = (data: z.infer<typeof profileSchema>) => {
    console.log('Profile updated:', data);
    toast({
      title: 'Profile Saved!',
      description: 'Your changes have been successfully saved.',
    });
    router.push('/profile');
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <Link href="/profile" passHref>
          <Button variant="ghost" className="absolute top-4 left-4 md:top-8 md:left-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Profile
          </Button>
        </Link>
        <header className="mb-8 text-center pt-10">
          <h1 className="text-4xl font-bold font-headline text-primary">Edit Profile</h1>
          <p className="text-muted-foreground">Keep your profile fresh and up-to-date.</p>
        </header>

        <Card className="max-w-2xl mx-auto shadow-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-4">Your Photos</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                    {userProfile.photos.slice(0, 3).map((photo, index) => (
                      <div key={index} className="relative group aspect-square">
                        <Image
                          src={photo}
                          alt={`Photo ${index + 1}`}
                          fill
                          className="object-cover rounded-lg"
                          data-ai-hint={userProfile.data_ai_hint}
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity">
                          <Button variant="destructive" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div className="aspect-square flex items-center justify-center border-2 border-dashed border-border rounded-lg">
                      <Button type="button" variant="outline" size="icon">
                        <Upload className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., Alia" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Bio</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell everyone a little about yourself..." {...field} />
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
                      <FormLabel>Your Interests (min. 3)</FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {allInterests.map((interest) => (
                            <button
                              key={interest}
                              type="button"
                              onClick={() => toggleInterest(interest)}
                              className={cn(
                                'rounded-full px-4 py-2 text-sm border transition-colors duration-300',
                                field.value.includes(interest)
                                  ? 'bg-primary text-primary-foreground border-primary'
                                  : 'bg-secondary/50 hover:bg-secondary border-secondary'
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
              </CardContent>
              <CardFooter>
                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </AppLayout>
  );
}
