
'use server';
/**
 * @fileOverview An AI agent to moderate chat messages.
 *
 * - verifyChatMessage - A function that handles chat message moderation.
 * - VerifyChatInput - The input type for the verifyChatMessage function.
 * - VerifyChatOutput - The return type for the verifyChatMessage function.
 */

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
  // Mock implementation
  return Promise.resolve({
    isSafe: true,
    reason: '',
    classification: 'safe',
  });
}
