export const GEMINI_MODEL = 'gemini-2.0-flash';

// TODO: paste your real Gemini API key here. This is a client-side SPA with
// no backend proxy, so this key ships inside the browser bundle and is
// readable by anyone via devtools/network tab — do not use a
// production/billing-sensitive key.
export const GEMINI_API_KEY = '';

export const SMART_COACH_SYSTEM_PROMPT =
  'You are Smart Coach, a friendly AI fitness assistant embedded in the Super Fitness gym app. ' +
  'Answer concisely and only about fitness, workouts, nutrition, and healthy living. ' +
  'If asked about anything unrelated, politely redirect the conversation back to fitness topics.';
