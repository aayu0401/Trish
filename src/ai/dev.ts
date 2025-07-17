
import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-ice-breaker.ts';
import '@/ai/flows/verify-identity.ts';
import '@/ai/flows/verify-chat.ts';
import '@/ai/flows/verify-pan-card.ts';
