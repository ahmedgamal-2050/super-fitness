import { Component, computed, forwardRef, Input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Eye, EyeOff, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-custom-input',
  imports: [LucideAngularModule],
  templateUrl: './custom-input.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInput),
      multi: true,
    },
  ],
})
export class CustomInput implements ControlValueAccessor {
  @Input() type: 'text' | 'email' | 'password' | 'tel' = 'text';
  @Input() placeholder = '';
  @Input() inputId?: string;
  @Input() autocomplete?: string;
  @Input() inputClass = '';

  icons = {
    Eye,
    EyeOff,
  };

  value = signal('');
  isDisabled = signal(false);
  showPassword = signal(false);

  inputType = computed(() => {
    if (this.type === 'password') {
      return this.showPassword() ? 'text' : 'password';
    }
    return this.type;
  });

  onChange: (value: string) => void = () => undefined;
  onTouched: () => void = () => undefined;

  writeValue(value: string): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  onInput(value: string): void {
    this.value.set(value);
    this.onChange(value);
  }

  onToggle(): void {
    if (this.type !== 'password') return;
    this.showPassword.update(v => !v);
  }
}
