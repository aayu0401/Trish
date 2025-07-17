
'use server';
/**
 * @fileOverview An AI agent to verify a user's identity by comparing a live photo with a profile photo.
 *
 * - verifyIdentity - A function that handles the identity verification process.
 * - VerifyIdentityInput - The input type for the verifyIdentity function.
 * - VerifyIdentityOutput - The return type for the verifyIdentity function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const VerifyIdentityInputSchema = z.object({
    livePhotoDataUri: z
        .string()
        .describe(
            "A live photo of the user, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
        ),
    profilePhotoUrl: z.string().describe('The URL of the user\'s main profile photo.'),
});
export type VerifyIdentityInput = z.infer<typeof VerifyIdentityInputSchema>;

const VerifyIdentityOutputSchema = z.object({
    isMatch: z
        .boolean()
        .describe('Whether the person in the live photo and the profile photo is the same.'),
    reason: z
        .string()
        .describe(
            'A brief explanation for the decision, highlighting similarities or differences.'
        ),
});
export type VerifyIdentityOutput = z.infer<typeof VerifyIdentityOutputSchema>;

export async function verifyIdentity(input: VerifyIdentityInput): Promise<VerifyIdentityOutput> {
    return verifyIdentityFlow(input);
}

const prompt = ai.definePrompt({
    name: 'verifyIdentityPrompt',
    input: { schema: VerifyIdentityInputSchema },
    output: { schema: VerifyIdentityOutputSchema },
    prompt: `You are a highly accurate AI identity verification agent. Your task is to determine if two photos are of the same person.

    You will be given a live photo captured from a webcam and a main profile photo.

    Analyze key facial features in both images (e.g., eye shape, nose, jawline, unique markers). Account for minor variations like lighting, expression, and hairstyle.

    - If you are confident they are the same person, set isMatch to true.
    - If you are confident they are different people, or if the live photo is unclear (e.g., blurry, dark, face obscured), set isMatch to false.

    Provide a concise reason for your decision in the 'reason' field.

    Live Photo:
    {{media url=livePhotoDataUri}}

    Profile Photo:
    {{media url=profilePhotoUrl}}
`,
});

const verifyIdentityFlow = ai.defineFlow(
    {
        name: 'verifyIdentityFlow',
        inputSchema: VerifyIdentityInputSchema,
        outputSchema: VerifyIdentityOutputSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        return output!;
    }
);
