
'use server';
/**
 * @fileOverview An AI agent to verify a user's PAN card for KYC.
 *
 * - verifyPanCard - A function that handles the PAN card verification process.
 * - VerifyPanCardInput - The input type for the verifyPanCard function.
 * - VerifyPanCardOutput - The return type for the verifyPanCard function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const VerifyPanCardInputSchema = z.object({
  panNumber: z
    .string()
    .describe('The 10-character PAN card number provided by the user.'),
  panCardDataUri: z
    .string()
    .describe(
      "A photo of the user's PAN card, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type VerifyPanCardInput = z.infer<typeof VerifyPanCardInputSchema>;

const VerifyPanCardOutputSchema = z.object({
  isVerified: z
    .boolean()
    .describe('Whether the PAN card details are verified successfully.'),
  reason: z
    .string()
    .describe(
      'A brief explanation for the decision, especially in case of failure.'
    ),
  extractedName: z.string().optional().describe('The name extracted from the PAN card image.'),
  extractedPan: z.string().optional().describe('The PAN number extracted from the image.'),
});
export type VerifyPanCardOutput = z.infer<typeof VerifyPanCardOutputSchema>;


export async function verifyPanCard(
  input: VerifyPanCardInput
): Promise<VerifyPanCardOutput> {
  return verifyPanCardFlow(input);
}


const prompt = ai.definePrompt({
    name: 'verifyPanCardPrompt',
    input: { schema: VerifyPanCardInputSchema },
    output: { schema: VerifyPanCardOutputSchema },
    prompt: `You are an AI KYC verification agent. Your task is to verify a user's PAN card.

1.  Extract the name and PAN number from the provided image.
2.  Compare the extracted PAN number with the user-provided PAN number.
3.  Check if the image appears to be a legitimate PAN card.

User-provided PAN: {{panNumber}}
PAN Card Image: {{media url=panCardDataUri}}

Based on your analysis, determine if the verification is successful. Provide the extracted details and a reason for your decision. If it fails, explain why (e.g., mismatch, blurry image).
`,
});


const verifyPanCardFlow = ai.defineFlow(
    {
        name: 'verifyPanCardFlow',
        inputSchema: VerifyPanCardInputSchema,
        outputSchema: VerifyPanCardOutputSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        return output!;
    }
);
