import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

export type ButtonVariant = 'primary' | 'social';
export type SocialIcon = 'facebook' | 'google' | 'apple';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'sf-button',
  templateUrl: './sf-button.component.html',
  imports: [NgClass],
})
export class SfButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() label = '';
  @Input() social: SocialIcon | null = null;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
}
