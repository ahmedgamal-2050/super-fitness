import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GEMINI_BASE_URL } from '../../../../shared/constants/endpoints';
import { GEMINI_MODEL, SMART_COACH_SYSTEM_PROMPT } from '../gemini.config';
import { ChatMessage } from '../models/chat-message.model';
import { GEMINI_API_KEY } from '../gemini-api-key.local';

interface GeminiContentPart {
  text: string;
}

interface GeminiContent {
  role: 'user' | 'model';
  parts: GeminiContentPart[];
}

interface GeminiGenerateContentResponse {
  candidates?: {
    content?: {
      parts?: GeminiContentPart[];
    };
  }[];
}

@Injectable({ providedIn: 'root' })
export class GeminiService {
  private readonly http = inject(HttpClient);

  generateReply(
    prompt: string,
    history: ChatMessage[]
  ): Observable<string | null> {
    if (!GEMINI_API_KEY) {
      return of(null);
    }

    const url = `${GEMINI_BASE_URL}/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
    const contents: GeminiContent[] = [
      ...history.map(
        (message): GeminiContent => ({
          role: message.sender === 'user' ? 'user' : 'model',
          parts: [{ text: message.text }],
        })
      ),
      { role: 'user', parts: [{ text: prompt }] },
    ];

    return this.http
      .post<GeminiGenerateContentResponse>(url, {
        contents,
        systemInstruction: { parts: [{ text: SMART_COACH_SYSTEM_PROMPT }] },
      })
      .pipe(
        map(
          response =>
            response.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? null
        )
      );
  }
}
