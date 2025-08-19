
'use server';
/**
 * @fileOverview An AI agent to verify a user's identity by comparing a live photo with a profile photo.
 *
 * - verifyIdentity - A function that handles the identity verification process.
 * - VerifyIdentityInput - The input type for the verifyIdentity function.
 * - VerifyIdentityOutput - The return type for the verifyIdentity function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

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
    prompt: `You are an AI identity verification specialist. Your task is to compare a live photo with an existing profile photo and determine if they are the same person.

Analyze the facial features, structure, and key details in both images. Account for minor differences like lighting, expression, or hairstyle.

Profile Photo: {{media url=profilePhotoUrl}}
Live Photo: {{media url=livePhotoDataUri}}

Based on your analysis, decide if it's a match and provide a brief reason for your decision.
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
