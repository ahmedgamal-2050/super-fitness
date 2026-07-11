export const GEMINI_MODEL = 'gemini-2.0-flash';

// gemini-api-key.local.ts is git-ignored; copy gemini-api-key.local.example.ts
// to create it and paste your real key there. See that file for why the key
// still can't be fully secret in a client-side SPA with no backend proxy.

export const SMART_COACH_SYSTEM_PROMPT =
  'You are Smart Coach, a friendly AI fitness assistant embedded in the Super Fitness gym app. ' +
  'Answer concisely and only about fitness, workouts, nutrition, and healthy living. ' +
  'If asked about anything unrelated, politely redirect the conversation back to fitness topics.';

export interface QuickQuestion {
  id: string;
  questionKey: string;
}

export const QUICK_QUESTIONS: QuickQuestion[] = [
  { id: 'calories', questionKey: 'smart_coach_quick_question_calories' },
  { id: 'workout', questionKey: 'smart_coach_quick_question_workout' },
  { id: 'diet', questionKey: 'smart_coach_quick_question_diet' },
  { id: 'water', questionKey: 'smart_coach_quick_question_water' },
  { id: 'rest', questionKey: 'smart_coach_quick_question_rest' },
];
