import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterRenderEffect,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { LucideAngularModule, Menu, PenLine, SendHorizontal } from 'lucide-angular';
import { QuickQuestion } from '../../data-access/gemini.config';
import { SmartCoachService } from '../../data-access/services/smart-coach.service';
import { ChatBubble } from '../chat-bubble/chat-bubble';

@Component({
  selector: 'app-smart-coach-panel',
  imports: [TranslocoPipe, LucideAngularModule, ChatBubble],
  templateUrl: './smart-coach-panel.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col flex-1 min-h-0 overflow-hidden' },
})
export class SmartCoachPanel {
  readonly chatService = inject(SmartCoachService);

  private readonly messagesContainer =
    viewChild<ElementRef<HTMLDivElement>>('messagesContainer');

  draft = signal('');
  isMenuOpen = signal(false);
  icons = { Menu, PenLine, SendHorizontal };

  readonly previousQuestions = computed(() =>
    this.chatService.messages().filter(message => message.sender === 'user')
  );

  constructor() {
    afterRenderEffect(() => {
      this.chatService.messages();
      this.chatService.isTyping();
      const container = this.messagesContainer()?.nativeElement;
      if (container && !this.isMenuOpen()) {
        container.scrollTop = container.scrollHeight;
      }
    });
  }

  onSend(): void {
    const text = this.draft();
    if (!text.trim() || this.chatService.isTyping()) {
      return;
    }
    this.chatService.sendMessage(text);
    this.draft.set('');
  }

  onQuickQuestion(question: QuickQuestion): void {
    if (this.chatService.isTyping()) {
      return;
    }
    this.chatService.selectQuickQuestion(question);
  }

  toggleMenu(): void {
    this.isMenuOpen.update(open => !open);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  goToQuestion(messageId: string): void {
    const container = this.messagesContainer()?.nativeElement;
    const target = container?.querySelector<HTMLElement>(`#msg-${messageId}`);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.closeMenu();
  }
}
