'use server';
/**
 * @fileOverview Summarizes a tenant's support history for property managers.
 *
 * - summarizeSupportHistory - A function that summarizes the support history.
 * - SummarizeSupportHistoryInput - The input type for the summarizeSupportHistory function.
 * - SummarizeSupportHistoryOutput - The return type for the summarizeSupportHistory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeSupportHistoryInputSchema = z.object({
  tenantId: z.string().describe('The ID of the tenant.'),
  supportHistory: z.string().describe('The tenant support history.'),
});
export type SummarizeSupportHistoryInput = z.infer<typeof SummarizeSupportHistoryInputSchema>;

const SummarizeSupportHistoryOutputSchema = z.object({
  summary: z.string().describe('A summary of the tenant support history.'),
});
export type SummarizeSupportHistoryOutput = z.infer<typeof SummarizeSupportHistoryOutputSchema>;

export async function summarizeSupportHistory(
  input: SummarizeSupportHistoryInput
): Promise<SummarizeSupportHistoryOutput> {
  return summarizeSupportHistoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeSupportHistoryPrompt',
  input: {schema: SummarizeSupportHistoryInputSchema},
  output: {schema: SummarizeSupportHistoryOutputSchema},
  prompt: `You are an AI agent assisting property managers. Summarize the following support history for tenant {{tenantId}}:\n\n{{supportHistory}}`,
});

const summarizeSupportHistoryFlow = ai.defineFlow(
  {
    name: 'summarizeSupportHistoryFlow',
    inputSchema: SummarizeSupportHistoryInputSchema,
    outputSchema: SummarizeSupportHistoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
