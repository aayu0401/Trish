
'use server';

/**
 * @fileOverview AI agent to suggest ice-breaker messages based on two user profiles.
 *
 * - suggestIceBreaker - A function that suggests ice-breaker messages based on user profiles.
 * - SuggestIceBreakerInput - The input type for the suggestIceBreaker function.
 * - SuggestIceBreakerOutput - The return type for the suggestIceBreaker function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

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
    input: { schema: SuggestIceBreakerInputSchema },
    output: { schema: SuggestIceBreakerOutputSchema },
    prompt: `You are an AI dating assistant. Your goal is to help a user start a meaningful conversation with a new match.

Analyze the two profiles provided: the user's profile and their match's profile. Based on shared interests, unique hobbies, or anything interesting you can find, suggest a personalized, engaging ice-breaker question.

Provide a short reason explaining why the suggestion is good. Also, indicate if the profiles seem well-aligned.

User Profile:
{{{userProfile}}}

Match's Profile:
{{{matchProfile}}}
`,
});

const suggestIceBreakerFlow = ai.defineFlow(
    {
        name: 'suggestIceBreakerFlow',
        inputSchema: SuggestIceBreakerInputSchema,
        outputSchema: SuggestIceBreakerOutputSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        return output!;
    }
);
