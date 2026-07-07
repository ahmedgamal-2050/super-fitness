import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-error-message',
  imports: [],
  templateUrl: './input-error-message.html',
})
export class InputErrorMessage {
  @Input({ required: true }) control!: FormControl<string>;
  @Input() messages: Record<string, string> = {};
  @Input() errorClass = 'mt-1 text-sm text-main';

  get error(): string | null {
    if (!this.control.touched || !this.control.errors) {
      return null;
    }

    for (const [key, message] of Object.entries(this.messages)) {
      if (this.control.errors[key]) {
        return message;
      }
    }

    return null;
  }
}
