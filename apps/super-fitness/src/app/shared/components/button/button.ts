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
  buttonClick = output<void>();
  buttonSpacing = input<'small' | 'large' | 'none'>('large');
  buttonStyle = input<'solid' | 'outline' | 'none'>('solid');

  defaultClass = computed<string>(() => {
    let baseClass =
      'rounded-full font-bold inline-flex items-center justify-center gap-2 text-base relative';

    let colorClass = ' bg-main text-white';
    switch (this.buttonStyle()) {
      case 'outline':
        colorClass = ' bg-transparent text-main border border-main';
        break;
      case 'none':
        colorClass = ' bg-transparent text-main';
        break;
    }

    let spacingClass = ' px-8 py-4';
    switch (this.buttonSpacing()) {
      case 'small':
        spacingClass = ' px-4 py-2';
        break;
      case 'none':
        spacingClass = ' pe-6';
        break;
    }

    baseClass += colorClass + spacingClass;

    return baseClass;
  });
}
