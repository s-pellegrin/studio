import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-support-history.ts';
import '@/ai/flows/respond-to-tenant-inquiries.ts';
import '@/ai/flows/suggest-maintenance-actions.ts';