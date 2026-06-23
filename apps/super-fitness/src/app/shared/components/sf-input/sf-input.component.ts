import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type InputIcon = 'user' | 'email' | 'lock';

@Component({
  selector: 'sf-input',
  templateUrl: './sf-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SfInputComponent),
      multi: true,
    },
  ],
})
export class SfInputComponent implements ControlValueAccessor {
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() placeholder = '';
  @Input() icon: InputIcon | null = null;

  value = '';
  showPassword = false;

  onChange = (_: string) => {};
  onTouched = () => {};

  get inputType(): string {
    return this.type === 'password' && this.showPassword ? 'text' : this.type;
  }

  toggle() {
    this.showPassword = !this.showPassword;
  }

  onInput(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
  }

  writeValue(v: string) {
    this.value = v ?? '';
  }

  registerOnChange(fn: (v: string) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }
}
