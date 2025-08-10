
'use server';

/**
 * @fileOverview AI agent to suggest ice-breaker messages based on two user profiles.
 *
 * - suggestIceBreaker - A function that suggests ice-breaker messages based on user profiles.
 * - SuggestIceBreakerInput - The input type for the suggestIceBreaker function.
 * - SuggestIceBreakerOutput - The return type for the suggestIceBreaker function.
 */

import { z } from 'zod';

const SuggestIceBreakerInputSchema = z.object({
  userProfile: z
    .string()
    .describe('The profile information of the current user.'),
  matchProfile: z.string().describe('The profile information of the matched user.'),
});
export type SuggestIceBreakerInput = z.infer<typeof SuggestIceBreakerInputSchema>;

const SuggestIceBreakerOutputSchema = z.object({
  iceBreakerSuggestion: z
    .string()
    .describe('A suggested ice-breaker message to start a conversation.'),
  reasoning: z
    .string()
    .describe(
      'Reasoning for the suggested ice-breaker message, explaining why it is relevant to both profiles.'
    ),
  isAligned: z.boolean().describe('Whether the suggested topics align to the two profiles involved.'),
});
export type SuggestIceBreakerOutput = z.infer<typeof SuggestIceBreakerOutputSchema>;

export async function suggestIceBreaker(input: SuggestIceBreakerInput): Promise<SuggestIceBreakerOutput> {
  // Mock implementation
  return new Promise(resolve => {
    setTimeout(() => {
        resolve({
            iceBreakerSuggestion: `I see we both love hiking! What's the most adventurous trail you've ever been on?`,
            reasoning: 'Both profiles mention a love for hiking and adventure. This question is open-ended and directly relates to a shared interest, making it a great conversation starter.',
            isAligned: true,
        });
    }, 1000);
  });
}
