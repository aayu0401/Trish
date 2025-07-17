
'use server';
/**
 * @fileOverview An AI agent to verify a user's PAN card for KYC.
 *
 * - verifyPanCard - A function that handles the PAN card verification process.
 * - VerifyPanCardInput - The input type for the verifyPanCard function.
 * - VerifyPanCardOutput - The return type for the verifyPanCard function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

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
  prompt: `You are a highly accurate KYC verification AI agent specializing in Indian PAN cards. Your task is to verify a user's PAN card by extracting information from an image and comparing it with the user-provided details.

  **Instructions:**
  1.  **Extract Information:** From the provided PAN card image, extract the full name and the 10-character PAN number.
  2.  **Validate PAN Format:** The PAN number from the image must be in the format 'ABCDE1234F'.
  3.  **Compare PAN Numbers:** The extracted PAN number must exactly match the user-provided PAN number.
  4.  **Assess Image Quality:** The image must be clear, not blurry, and not have any glare obscuring the details.
  5.  **Make a Decision:**
      *   If the extracted PAN matches the provided PAN, the format is valid, and the image is clear, set \`isVerified\` to \`true\`.
      *   In all other cases (mismatch, blurriness, glare, invalid format), set \`isVerified\` to \`false\`.
  6.  **Provide Reason:** Give a concise reason for your decision. For success, say "Details verified successfully." For failure, explain the exact issue (e.g., "PAN number in image does not match provided number," "Image is too blurry to read.").

  **User-provided PAN Number:** {{{panNumber}}}
  **PAN Card Image:**
  {{media url=panCardDataUri}}
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
