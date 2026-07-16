import { Injectable, computed, inject, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { QUICK_QUESTIONS, QuickQuestion } from '../gemini.config';
import { ChatMessage, ChatSender } from '../models/chat-message.model';
import { GeminiService } from './gemini.service';

const GREETING_DELAY_MS = 500;
const CHOOSE_FROM_LIST_DELAY_MS = 400;

@Injectable({ providedIn: 'root' })
export class SmartCoachService {
  private readonly gemini = inject(GeminiService);
  private readonly translocoService = inject(TranslocoService);

  private hasGreeted = false;
  private readonly askedQuickQuestionIds = signal<ReadonlySet<string>>(
    new Set()
  );

  readonly messages = signal<ChatMessage[]>([]);
  readonly isTyping = signal(false);
  readonly quickQuestions = computed(() =>
    QUICK_QUESTIONS.filter(
      question => !this.askedQuickQuestionIds().has(question.id)
    )
  );

  reset(): void {
    this.hasGreeted = false;
    this.askedQuickQuestionIds.set(new Set());
    this.messages.set([]);
    this.isTyping.set(false);
  }

  ensureGreeted(): void {
    if (this.hasGreeted) {
      return;
    }
    this.hasGreeted = true;

    setTimeout(() => {
      this.pushMessage(
        'bot',
        this.translocoService.translate('smart_coach_welcome_message')
      );
    }, GREETING_DELAY_MS);
  }

  selectQuickQuestion(question: QuickQuestion): void {
    this.sendMessage(
      this.translocoService.translate(question.questionKey),
      question.id
    );
  }

  sendMessage(text: string, quickQuestionId?: string): void {
    const trimmed = text.trim();

    if (!trimmed || this.isTyping()) {
      return;
    }

    const historyBeforeMessage = this.messages();

    this.pushMessage('user', trimmed);

    const matched = this.matchQuickQuestion(trimmed);
    this.markQuickQuestionAsked(matched?.id ?? quickQuestionId);

    this.isTyping.set(true);

    this.gemini.generateReply(trimmed, historyBeforeMessage).subscribe({
      next: reply => {
        this.isTyping.set(false);

        this.pushMessage(
          'bot',
          reply ??
            this.translocoService.translate(
              'smart_coach_not_configured_message'
            )
        );
      },
      error: () => {
        this.isTyping.set(false);

        this.pushMessage(
          'bot',
          this.translocoService.translate('smart_coach_error_message')
        );
      },
    });
  }

  private markQuickQuestionAsked(id: string | undefined): void {
    if (!id) {
      return;
    }
    this.askedQuickQuestionIds.update(ids => new Set(ids).add(id));
  }

  private matchQuickQuestion(text: string): QuickQuestion | undefined {
    const normalized = text.trim().toLowerCase();
    return QUICK_QUESTIONS.find(
      question =>
        this.translocoService
          .translate(question.questionKey)
          .trim()
          .toLowerCase() === normalized
    );
  }

  private pushMessage(sender: ChatSender, text: string): void {
    this.messages.update(messages => [
      ...messages,
      { id: crypto.randomUUID(), sender, text, timestamp: Date.now() },
    ]);
  }
}
