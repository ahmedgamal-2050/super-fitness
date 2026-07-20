import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Bot, LucideAngularModule, User } from 'lucide-angular';
import { ChatMessage } from '../../data-access/models/chat-message.model';
import { BotBubble } from '../bot-bubble/bot-bubble';

@Component({
  selector: 'app-chat-bubble',
  imports: [LucideAngularModule, BotBubble],
  templateUrl: './chat-bubble.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block w-full' },
})
export class ChatBubble {
  message = input.required<ChatMessage>();

  icons = { Bot, User };
}
