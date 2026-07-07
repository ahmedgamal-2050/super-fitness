import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Bot, LucideAngularModule, User } from 'lucide-angular';
import { ChatMessage } from '../../data-access/models/chat-message.model';

@Component({
  selector: 'app-chat-bubble',
  imports: [LucideAngularModule],
  templateUrl: './chat-bubble.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatBubble {
  message = input.required<ChatMessage>();

  icons = { Bot, User };
}
