
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Loader, Upload, ShieldCheck, XCircle } from 'lucide-react';
import { verifyPanCard, VerifyPanCardOutput } from '@/ai/flows/verify-pan-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const kycSchema = z.object({
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Please enter a valid PAN card number.'),
  panPhoto: z.any().refine((files) => files?.length === 1, 'PAN card photo is required.'),
});

export default function KycPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerifyPanCardOutput | null>(null);

  const form = useForm<z.infer<typeof kycSchema>>({
    resolver: zodResolver(kycSchema),
    defaultValues: {
      panNumber: '',
    },
  });

  const fileRef = form.register('panPhoto');

  const onSubmit = async (data: z.infer<typeof kycSchema>) => {
    setIsLoading(true);
    setVerificationResult(null);

    const file = data.panPhoto[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const panCardDataUri = reader.result as string;
      try {
        const result = await verifyPanCard({
          panNumber: data.panNumber,
          panCardDataUri: panCardDataUri,
        });
        setVerificationResult(result);

        if (result.isVerified) {
          toast({
            title: 'KYC Verification Successful!',
            description: 'You can now add funds to your wallet.',
          });
          // In a real app, you would update user's KYC status in the database here
          setTimeout(() => router.push('/profile/wallet'), 2000);
        } else {
          toast({
            variant: 'destructive',
            title: 'KYC Verification Failed',
            description: result.reason,
          });
        }
      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          title: 'Verification Error',
          description: 'An unexpected error occurred. Please try again.',
        });
      } finally {
        setIsLoading(false);
      }
    };
  };

   const renderResult = () => {
    if (!verificationResult) return null;

    if (verificationResult.isVerified) {
      return (
        <Alert variant="default" className="bg-green-100/50 border-green-500 text-green-700">
          <ShieldCheck className="h-4 w-4 text-green-500" />
          <AlertTitle>Verification Successful</AlertTitle>
          <AlertDescription>
            {verificationResult.reason} Redirecting to wallet...
          </AlertDescription>
        </Alert>
      );
    } else {
      return (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Verification Failed</AlertTitle>
          <AlertDescription>{verificationResult.reason}</AlertDescription>
        </Alert>
      );
    }
  };


  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <Link href="/profile/wallet" passHref>
          <Button variant="ghost" className="absolute top-4 left-4 md:top-8 md:left-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Wallet
          </Button>
        </Link>
        <Card className="max-w-md w-full shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-primary font-headline">KYC Verification</CardTitle>
            <CardDescription className="text-center">
              Verify your PAN card to enable wallet transactions.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="panNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PAN Card Number</FormLabel>
                      <FormControl>
                        <Input placeholder="ABCDE1234F" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="panPhoto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload PAN Card Photo</FormLabel>
                      <FormControl>
                        <Input type="file" accept="image/*" {...fileRef} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 {verificationResult && <div className="py-2">{renderResult()}</div>}
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90" size="lg">
                  {isLoading ? (
                    <>
                      <Loader className="mr-2 h-5 w-5 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Submit for Verification'
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </AppLayout>
  );
}
