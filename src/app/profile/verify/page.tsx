
'use client';

import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader, Camera, CheckCircle, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { verifyIdentity, VerifyIdentityOutput } from '@/ai/flows/verify-identity';
import { profiles } from '@/lib/data';

export default function VerifyPage() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationResult, setVerificationResult] = useState<VerifyIdentityOutput | null>(null);
    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {
        const getCameraPermission = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                setHasCameraPermission(true);

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Error accessing camera:', error);
                setHasCameraPermission(false);
                toast({
                    variant: 'destructive',
                    title: 'Camera Access Denied',
                    description: 'Please enable camera permissions in your browser settings to use this app.',
                });
            }
        };

        getCameraPermission();

        return () => {
             if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        }
    }, [toast]);

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                return canvas.toDataURL('image/jpeg');
            }
        }
        return null;
    };

    const handleVerify = async () => {
        const capturedPhotoDataUri = capturePhoto();
        if (!capturedPhotoDataUri) {
            toast({
                variant: 'destructive',
                title: 'Capture Failed',
                description: 'Could not capture photo. Please try again.',
            });
            return;
        }

        setIsVerifying(true);
        setVerificationResult(null);

        try {
            const userProfilePhoto = profiles[0].photos[0]; // Using first photo for verification
            const result = await verifyIdentity({
                livePhotoDataUri: capturedPhotoDataUri,
                profilePhotoUrl: userProfilePhoto,
            });
            setVerificationResult(result);

            if(result.isMatch) {
                 toast({
                    title: "Verification Successful!",
                    description: "You're now a verified user.",
                });
                setTimeout(() => router.push('/profile'), 2000);
            } else {
                 toast({
                    variant: 'destructive',
                    title: "Verification Failed",
                    description: result.reason,
                });
            }

        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: 'Verification Error',
                description: 'An unexpected error occurred. Please try again later.',
            });
        } finally {
            setIsVerifying(false);
        }
    };

    const renderResult = () => {
        if (!verificationResult) return null;

        if (verificationResult.isMatch) {
            return (
                 <Alert variant="default" className="bg-green-100/50 border-green-500 text-green-700">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertTitle>Verification Successful</AlertTitle>
                    <AlertDescription>
                        {verificationResult.reason} You are now verified! Redirecting...
                    </AlertDescription>
                </Alert>
            )
        } else {
             return (
                 <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertTitle>Verification Failed</AlertTitle>
                    <AlertDescription>
                        {verificationResult.reason}
                    </AlertDescription>
                </Alert>
            )
        }
    }

    return (
        <AppLayout>
            <div className="container mx-auto px-4 py-8 flex flex-col items-center">
                <Card className="max-w-md w-full shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-center text-primary font-headline">Photo Verification</CardTitle>
                        <CardDescription className="text-center">
                            Look straight into the camera and take a clear photo.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="relative aspect-video w-full bg-secondary rounded-lg overflow-hidden border">
                            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                            {hasCameraPermission === false && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white p-4">
                                     <Camera className="h-12 w-12 mb-4"/>
                                     <h3 className="font-bold text-lg">Camera Access Needed</h3>
                                     <p className="text-center text-sm">Please allow camera access in your browser to continue.</p>
                                </div>
                            )}
                             {hasCameraPermission === null && (
                                <div className="absolute inset-0 flex items-center justify-center bg-secondary">
                                    <Loader className="h-8 w-8 animate-spin text-primary"/>
                                </div>
                            )}
                        </div>
                        <canvas ref={canvasRef} className="hidden" />
                        
                        {verificationResult && <div className="py-2">{renderResult()}</div>}

                        <Button
                            onClick={handleVerify}
                            disabled={!hasCameraPermission || isVerifying}
                            className="w-full bg-primary hover:bg-primary/90"
                            size="lg"
                        >
                            {isVerifying ? (
                                <>
                                    <Loader className="mr-2 h-5 w-5 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    <Camera className="mr-2 h-5 w-5" />
                                    Verify My Identity
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
