'use server';
/**
 * @fileOverview An AI agent that responds to tenant inquiries.
 *
 * - respondToTenantInquiry - A function that handles tenant inquiries.
 * - RespondToTenantInquiryInput - The input type for the respondToTenantInquiry function.
 * - RespondToTenantInquiryOutput - The return type for the respondToTenantInquiry function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RespondToTenantInquiryInputSchema = z.object({
  inquiry: z.string().describe('The tenant inquiry.'),
  tenantId: z.string().describe('The ID of the tenant making the inquiry.'),
});
export type RespondToTenantInquiryInput = z.infer<typeof RespondToTenantInquiryInputSchema>;

const RespondToTenantInquiryOutputSchema = z.object({
  response: z.string().describe('The response to the tenant inquiry.'),
});
export type RespondToTenantInquiryOutput = z.infer<typeof RespondToTenantInquiryOutputSchema>;

export async function respondToTenantInquiry(input: RespondToTenantInquiryInput): Promise<RespondToTenantInquiryOutput> {
  return respondToTenantInquiryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'respondToTenantInquiryPrompt',
  input: {schema: RespondToTenantInquiryInputSchema},
  output: {schema: RespondToTenantInquiryOutputSchema},
  prompt: `You are a helpful AI agent for a property management company.

  A tenant has the following inquiry:
  {{inquiry}}

  Respond to the tenant inquiry in a concise and helpful manner.
  Do not be overly verbose, and do not offer information that was not requested.
  The tenant ID is {{tenantId}}.
  Make sure you don't reveal the tenant ID in the response.
  If you can't address the request, then direct the tenant to contact the property manager directly.
  `,
});

const respondToTenantInquiryFlow = ai.defineFlow(
  {
    name: 'respondToTenantInquiryFlow',
    inputSchema: RespondToTenantInquiryInputSchema,
    outputSchema: RespondToTenantInquiryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
