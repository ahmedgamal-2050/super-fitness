import { Component, Input } from '@angular/core';

const PRIMARY_BUTTON_CLASSES =
  'w-full rounded-3xl bg-main py-3 text-base font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50';

const ICON_BUTTON_CLASSES =
  'flex h-10 w-10 items-center justify-center border border-[#2f2f2f]/70 bg-[#2f2f2f] rounded-full transition hover:border-main disabled:cursor-not-allowed disabled:opacity-50';

@Component({
  selector: 'app-custom-button',
  imports: [],
  templateUrl: './custom-button.html',
})
export class CustomButton {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'icon' = 'primary';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() loadingLabel = 'Loading...';
  @Input() buttonClass = '';
  @Input() ariaLabel?: string;

  get classes(): string {
    const base =
      this.variant === 'icon' ? ICON_BUTTON_CLASSES : PRIMARY_BUTTON_CLASSES;

    return this.buttonClass ? `${base} ${this.buttonClass}` : base;
  }
}
