import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { googleCloud } from '@genkit-ai/google-cloud';

// Initialize Genkit with Google AI and Google Cloud plugins
export const ai = genkit({
  plugins: [
    googleAI(),
    googleCloud(),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
