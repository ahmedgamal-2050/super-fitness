import { Injectable } from '@angular/core';
import { Content, GoogleGenAI } from '@google/genai';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GEMINI_MODEL, SMART_COACH_SYSTEM_PROMPT } from '../gemini.config';
import { GEMINI_API_KEY } from '../gemini-api-key.local.example';
import { ChatMessage } from '../models/chat-message.model';

@Injectable({ providedIn: 'root' })
export class GeminiService {
  private readonly client: GoogleGenAI | null = GEMINI_API_KEY
    ? new GoogleGenAI({ apiKey: GEMINI_API_KEY })
    : null;

  get isConfigured(): boolean {
    return this.client !== null;
  }

  generateReply(
    prompt: string,
    history: ChatMessage[]
  ): Observable<string | null> {
    if (!this.client) {
      return throwError(() => new Error('GEMINI_NOT_CONFIGURED'));
    }

    const contents: Content[] = [
      ...history.map(
        (message): Content => ({
          role: message.sender === 'user' ? 'user' : 'model',
          parts: [{ text: message.text }],
        })
      ),
      { role: 'user', parts: [{ text: prompt }] },
    ];

    return from(
      this.client.models.generateContent({
        model: GEMINI_MODEL,
        contents,
        config: {
          systemInstruction: SMART_COACH_SYSTEM_PROMPT,
        },
      })
    ).pipe(
      map(response => response.text?.trim() ?? null),
      catchError(error => {
        console.error('[GeminiService] generateContent failed:', error);
        return throwError(() => error);
      })
    );
  }
}
