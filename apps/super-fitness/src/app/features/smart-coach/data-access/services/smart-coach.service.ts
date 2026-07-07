import { Injectable, inject, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { ChatMessage, ChatSender } from '../models/chat-message.model';
import { GeminiService } from './gemini.service';

const GREETING_DELAY_MS = 500;

@Injectable({ providedIn: 'root' })
export class SmartCoachService {
  private readonly gemini = inject(GeminiService);
  private readonly translocoService = inject(TranslocoService);

  private hasGreeted = false;

  readonly messages = signal<ChatMessage[]>([]);
  readonly isTyping = signal(false);

  ensureGreeted(): void {
    if (this.hasGreeted) {
      return;
    }
    this.hasGreeted = true;

    setTimeout(() => {
      this.pushMessage('bot', this.translocoService.translate('smart_coach_welcome_message'));
    }, GREETING_DELAY_MS);
  }

  sendMessage(text: string): void {
    const trimmed = text.trim();
    if (!trimmed || this.isTyping()) {
      return;
    }

    this.pushMessage('user', trimmed);
    this.isTyping.set(true);

    this.gemini.generateReply(trimmed, this.messages()).subscribe({
      next: reply => {
        this.isTyping.set(false);
        this.pushMessage(
          'bot',
          reply ?? this.translocoService.translate('smart_coach_not_configured_message')
        );
      },
      error: () => {
        this.isTyping.set(false);
        this.pushMessage('bot', this.translocoService.translate('smart_coach_error_message'));
      },
    });
  }

  private pushMessage(sender: ChatSender, text: string): void {
    this.messages.update(messages => [
      ...messages,
      { id: crypto.randomUUID(), sender, text, timestamp: Date.now() },
    ]);
  }
}
