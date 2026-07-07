import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-form-field',
  imports: [],
  templateUrl: './custom-form-field.html',
})
export class CustomFormField {
  @Input() label?: string | null;
  @Input() error?: string | null;
  @Input() inputId?: string;
  @Input() labelClass = '';
  @Input() errorClass = '';
}
