import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterRenderEffect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { LucideAngularModule, Menu, PenLine, SendHorizontal } from 'lucide-angular';
import { SmartCoachService } from '../../data-access/services/smart-coach.service';
import { ChatBubble } from '../chat-bubble/chat-bubble';

@Component({
  selector: 'app-smart-coach-panel',
  imports: [TranslocoPipe, LucideAngularModule, ChatBubble],
  templateUrl: './smart-coach-panel.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartCoachPanel {
  readonly chatService = inject(SmartCoachService);

  private readonly messagesContainer =
    viewChild<ElementRef<HTMLDivElement>>('messagesContainer');

  draft = signal('');
  icons = { Menu, PenLine, SendHorizontal };

  constructor() {
    afterRenderEffect(() => {
      this.chatService.messages();
      this.chatService.isTyping();
      const container = this.messagesContainer()?.nativeElement;
      if (container) {
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
}
