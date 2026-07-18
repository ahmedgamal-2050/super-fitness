import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-bot-bubble',
  imports: [],
  templateUrl: './bot-bubble.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class BotBubble {
  wrapperClass = input('items-start');
  bubbleClass = input(
    'p-2 text-sm text-dark dark:text-light text-left max-w-[80%] min-w-0 break-words whitespace-pre-wrap'
  );
}
