
'use server';
/**
 * @fileOverview An AI-powered flow to score a user's coloring work.
 *
 * - scoreColoring - A function that compares a user's colored image to an original and provides a score and feedback.
 * - ScoreColoringInput - The input type for the scoreColoring function.
 * - ScoreColoringOutput - The return type for the scoreColoring function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ScoreColoringInputSchema = z.object({
  userImageUri: z
    .string()
    .describe(
      "The user's colored artwork, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
    originalImageUri: z
    .string()
    .describe(
      "The original, fully-colored reference image, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ScoreColoringInput = z.infer<typeof ScoreColoringInputSchema>;

const ScoreColoringOutputSchema = z.object({
  score: z.number().min(0).max(100).describe('A score from 0 to 100 based on the coloring quality.'),
  feedback: z.string().describe('Brief, encouraging feedback for the user.'),
});
export type ScoreColoringOutput = z.infer<typeof ScoreColoringOutputSchema>;

export async function scoreColoring(input: ScoreColoringInput): Promise<ScoreColoringOutput> {
  return scoreColoringFlow(input);
}

const prompt = ai.definePrompt({
  name: 'scoreColoringPrompt',
  input: {schema: ScoreColoringInputSchema},
  output: {schema: ScoreColoringOutputSchema},
  prompt: `You are a friendly and encouraging art teacher for children. Your task is to evaluate a child's coloring of a provided outline.

  You will be given two images:
  1.  **Original Artwork**: This is the beautifully colored reference image.
  2.  **User's Coloring**: This is the child's attempt at coloring the same picture.

  Your goal is to compare the "User's Coloring" to the "Original Artwork".

  Based on the comparison, provide:
  -   A **score** from 0 to 100. Consider color accuracy (did they use similar colors?), neatness (did they color inside the lines?), and creativity. Be generous with your scoring. If the "User's Coloring" is just the outline, that means they didn't color it in, so give a very low score like 5 and encourage them to try coloring.
  -   A short, positive, and **encouraging feedback** message (1-2 sentences). Praise their effort and mention something you like, even if the score is low.

  Original Artwork: {{media url=originalImageUri}}
  User's Coloring: {{media url=userImageUri}}`,
});

const scoreColoringFlow = ai.defineFlow(
  {
    name: 'scoreColoringFlow',
    inputSchema: ScoreColoringInputSchema,
    outputSchema: ScoreColoringOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
