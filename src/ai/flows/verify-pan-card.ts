
'use server';
/**
 * @fileOverview An AI agent to verify a user's PAN card for KYC.
 *
 * - verifyPanCard - A function that handles the PAN card verification process.
 * - VerifyPanCardInput - The input type for the verifyPanCard function.
 * - VerifyPanCardOutput - The return type for the verifyPanCard function.
 */

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
  // Mock implementation
  return new Promise(resolve => {
    setTimeout(() => {
        resolve({
            isVerified: true,
            reason: 'Details verified successfully.',
            extractedName: 'John Doe',
            extractedPan: input.panNumber,
        });
    }, 2000);
  });
}
