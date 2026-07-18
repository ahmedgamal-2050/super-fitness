// Copy this file to gemini-api-key.local.ts and paste your real key below.
// gemini-api-key.local.ts is git-ignored so the key never gets committed.
//
// This is a client-side SPA with no backend proxy, so whatever key you put
// here still ships inside the browser bundle and is readable by anyone via
// devtools/network tab. Restrict it in Google Cloud Console -> Credentials
// with an HTTP referrer restriction limited to this app's domain(s), and

// eslint-disable-next-line @nx/enforce-module-boundaries
import { environment } from 'apps/super-fitness/src/environments/environment.local';

// eslint-disable-next-line @nx/enforce-module-boundaries

// never use a production/billing-sensitive key here.
export const GEMINI_API_KEY = environment.geminiApiKey;
