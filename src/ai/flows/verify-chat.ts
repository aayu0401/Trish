
'use server';
/**
 * @fileOverview An AI agent to moderate chat messages.
 *
 * - verifyChatMessage - A function that handles chat message moderation.
 * - VerifyChatInput - The input type for the verifyChatMessage function.
 * - VerifyChatOutput - The return type for the verifyChatMessage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const VerifyChatInputSchema = z.object({
  message: z.string().describe('The chat message to be verified.'),
});
export type VerifyChatInput = z.infer<typeof VerifyChatInputSchema>;

const VerifyChatOutputSchema = z.object({
  isSafe: z
    .boolean()
    .describe('Whether the message is safe and complies with the policy.'),
  reason: z
    .string()
    .describe(
      'A brief explanation if the message is not safe, explaining the violation.'
    ),
  classification: z.enum(['safe', 'spam', 'harassment', 'inappropriate', 'other']).describe('The classification of the message content.')
});
export type VerifyChatOutput = z.infer<typeof VerifyChatOutputSchema>;

export async function verifyChatMessage(input: VerifyChatInput): Promise<VerifyChatOutput> {
  return verifyChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'verifyChatPrompt',
  input: { schema: VerifyChatInputSchema },
  output: { schema: VerifyChatOutputSchema },
  prompt: `You are a chat message moderation AI for a dating app. Your role is to ensure the safety and comfort of our users by identifying and flagging inappropriate content.

  Analyze the following message based on these rules:
  1.  **No Harassment:** Personal attacks, insults, bullying, or threatening language are not allowed.
  2.  **No Spam:** Unsolicited advertisements, promotions, or repetitive messages are considered spam.
  3.  **No Inappropriate Content:** Explicit or suggestive content is forbidden.
  4.  **General Safety:** Do not allow the exchange of sensitive personal information like phone numbers, addresses, or financial details in the initial conversations.

  Based on your analysis, classify the message and determine if it is safe. If it is not safe, provide a clear and concise reason for the user.

  Message: "{{{message}}}"
`,
config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
    ],
  },
});

const verifyChatFlow = ai.defineFlow(
  {
    name: 'verifyChatFlow',
    inputSchema: VerifyChatInputSchema,
    outputSchema: VerifyChatOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
