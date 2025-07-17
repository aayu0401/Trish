'use server';

/**
 * @fileOverview AI agent to suggest ice-breaker messages based on two user profiles.
 *
 * - suggestIceBreaker - A function that suggests ice-breaker messages based on user profiles.
 * - SuggestIceBreakerInput - The input type for the suggestIceBreaker function.
 * - SuggestIceBreakerOutput - The return type for the suggestIceBreaker function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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
  return suggestIceBreakerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestIceBreakerPrompt',
  input: {schema: SuggestIceBreakerInputSchema},
  output: {schema: SuggestIceBreakerOutputSchema},
  prompt: `You are a dating assistant AI that helps users start conversations with their matches.

  Based on the user's profile and the match's profile, you will suggest an ice-breaker message that is relevant to both of them.  You must also include reasoning for why the suggestion is relevant to both profiles.

  User Profile: {{{userProfile}}}
  Match Profile: {{{matchProfile}}}

  Pay special attention to extracting shared interests and experiences from the profiles. The ice breaker message should be casual and inviting to encourage a response.
  You will also make a determination of whether the suggested topics are aligned to the profiles of the users involved, and set the isAligned output field appropriately.

  Output the ice breaker suggestion, reasoning, and alignment as a JSON object.
`,
});

const suggestIceBreakerFlow = ai.defineFlow(
  {
    name: 'suggestIceBreakerFlow',
    inputSchema: SuggestIceBreakerInputSchema,
    outputSchema: SuggestIceBreakerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
