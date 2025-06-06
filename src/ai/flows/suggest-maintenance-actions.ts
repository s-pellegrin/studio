// src/ai/flows/suggest-maintenance-actions.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow that suggests maintenance actions based on tenant inquiries.
 *
 * - suggestMaintenanceActions - A function that takes a tenant inquiry and returns suggested maintenance actions.
 * - SuggestMaintenanceActionsInput - The input type for the suggestMaintenanceActions function.
 * - SuggestMaintenanceActionsOutput - The return type for the suggestMaintenanceActions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestMaintenanceActionsInputSchema = z.object({
  tenantInquiry: z
    .string()
    .describe('The tenant inquiry regarding a potential maintenance issue.'),
});
export type SuggestMaintenanceActionsInput = z.infer<typeof SuggestMaintenanceActionsInputSchema>;

const SuggestMaintenanceActionsOutputSchema = z.object({
  suggestedActions: z
    .array(z.string())
    .describe('A list of suggested maintenance actions based on the tenant inquiry.'),
});
export type SuggestMaintenanceActionsOutput = z.infer<typeof SuggestMaintenanceActionsOutputSchema>;

export async function suggestMaintenanceActions(
  input: SuggestMaintenanceActionsInput
): Promise<SuggestMaintenanceActionsOutput> {
  return suggestMaintenanceActionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestMaintenanceActionsPrompt',
  input: {schema: SuggestMaintenanceActionsInputSchema},
  output: {schema: SuggestMaintenanceActionsOutputSchema},
  prompt: `You are a property manager. A tenant has sent the following inquiry:

  {{tenantInquiry}}

  Based on this inquiry, suggest a list of maintenance actions that should be taken to address the issue. Be specific and actionable.
  Return the actions as a numbered list.`,
});

const suggestMaintenanceActionsFlow = ai.defineFlow(
  {
    name: 'suggestMaintenanceActionsFlow',
    inputSchema: SuggestMaintenanceActionsInputSchema,
    outputSchema: SuggestMaintenanceActionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
