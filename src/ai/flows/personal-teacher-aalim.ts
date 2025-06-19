// src/ai/flows/personal-teacher-aalim.ts
'use server';
/**
 * @fileOverview An AI-powered personal teacher named 'Aalim' for teaching Islamic morality and ethics.
 *
 * - personalTeacherAalim - A function that handles the interaction with the Aalim AI teacher.
 * - PersonalTeacherAalimInput - The input type for the personalTeacherAalim function.
 * - PersonalTeacherAalimOutput - The return type for the personalTeacherAalim function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalTeacherAalimInputSchema = z.object({
  lessonTopic: z.string().describe('The topic of the lesson.'),
  userProgress: z.string().optional().describe('The user progress in the lesson.'),
  userQuestion: z.string().optional().describe('The user question about the topic.'),
});
export type PersonalTeacherAalimInput = z.infer<typeof PersonalTeacherAalimInputSchema>;

const PersonalTeacherAalimOutputSchema = z.object({
  explanation: z.string().describe('The explanation of the topic.'),
  evaluation: z.string().optional().describe('The evaluation of the user progress.'),
  prize: z.string().optional().describe('The virtual prize awarded to the user.'),
});
export type PersonalTeacherAalimOutput = z.infer<typeof PersonalTeacherAalimOutputSchema>;

export async function personalTeacherAalim(input: PersonalTeacherAalimInput): Promise<PersonalTeacherAalimOutput> {
  return personalTeacherAalimFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalTeacherAalimPrompt',
  input: {schema: PersonalTeacherAalimInputSchema},
  output: {schema: PersonalTeacherAalimOutputSchema},
  prompt: `You are Aalim, an AI-powered personal teacher for young Muslim users. Your role is to teach Islamic morality and ethics in a fun and engaging way.

  You should provide explanations, evaluate the user's progress, and award virtual prizes to encourage consistent engagement.

  Lesson Topic: {{{lessonTopic}}}
  User Progress: {{{userProgress}}}
  User Question: {{{userQuestion}}}

  Explanation: Provide a clear and concise explanation of the lesson topic.
  Evaluation: If the user has made progress, evaluate their understanding and provide feedback. Otherwise, set this field to null.
  Prize: If the user has shown excellent understanding or completed a milestone, award them a virtual prize. Otherwise, set this field to null.`,
});

const personalTeacherAalimFlow = ai.defineFlow(
  {
    name: 'personalTeacherAalimFlow',
    inputSchema: PersonalTeacherAalimInputSchema,
    outputSchema: PersonalTeacherAalimOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
