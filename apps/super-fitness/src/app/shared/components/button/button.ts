import {
  Component,
  input,
  output,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideArrowUpRight } from '@lucide/angular';

@Component({
  selector: 'app-button',
  imports: [RouterLink, NgTemplateOutlet, LucideArrowUpRight],
  templateUrl: './button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  type = input.required<'button' | 'link'>();
  routerLink = input<string | string[]>(['/']);
  buttonClass = input<string>(''); // to customize button class
  isPrimary = input<boolean>(true);
  isLargeSpacing = input<boolean>(true);
  buttonClick = output<void>();

  defaultClass = computed<string>(() => {
    let baseClass =
      'rounded-full font-bold flex items-center justify-center gap-2 text-base relative';

    const colorClass = this.isPrimary()
      ? ' bg-main text-white'
      : ' bg-transparent text-main border border-main';

    const spacingClass = this.isLargeSpacing() ? ' px-8 py-4' : ' px-4 py-2';

    baseClass += colorClass + spacingClass;

    return baseClass;
  });
}
