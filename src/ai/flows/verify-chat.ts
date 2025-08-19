
'use server';
/**
 * @fileOverview An AI agent to moderate chat messages.
 *
 * - verifyChatMessage - A function that handles chat message moderation.
 * - VerifyChatInput - The input type for the verifyChatMessage function.
 * - VerifyChatOutput - The return type for the verifyChatMessage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

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
    prompt: `You are a chat moderator for a dating app. Your job is to ensure that messages are safe, respectful, and do not violate our community guidelines.

Guidelines:
- No harassment or hate speech.
- No spam or promotional content.
- No sexually explicit content.
- No sharing of private contact information (phone numbers, email addresses, etc.).

Please analyze the following message and determine if it is safe. Provide a classification and a reason if it is not safe.

Message: "{{message}}"
`,
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
