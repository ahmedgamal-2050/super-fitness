/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @nx/enforce-module-boundaries */
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { SfButtonComponent } from 'apps/super-fitness/src/app/shared/components/sf-button/sf-button.component';
import { SfInputComponent } from 'apps/super-fitness/src/app/shared/components/sf-input/sf-input.component';
import { PersonalInfo } from 'apps/super-fitness/src/app/core/models/auth.models';
import {
  passwordStrengthValidator,
  passwordMatchValidator,
} from 'apps/super-fitness/src/app/shared/validators/password.validator';

@Component({
  selector: 'app-step-personal-info',
  imports: [SfInputComponent, SfButtonComponent, ReactiveFormsModule],
  templateUrl: './step-personal-info.component.html',
  standalone: true,
})
export class StepPersonalInfoComponent implements OnInit {
  @Input() savedData: PersonalInfo | null = null;
  @Output() loginClicked = new EventEmitter<PersonalInfo>();

  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordStrengthValidator()]],
      rePassword: ['', [Validators.required, passwordStrengthValidator()]],
    },
    { validators: passwordMatchValidator }
  );

  ngOnInit() {
    if (this.savedData) {
      this.form.patchValue(this.savedData);
    }
  }

  get passwordControl() {
    return this.form.controls.password;
  }

  get rePasswordControl() {
    return this.form.controls.rePassword;
  }

  get passwordError(): boolean {
    const c = this.passwordControl;
    return c.invalid && (c.dirty || c.touched);
  }

  get rePasswordError(): boolean {
    const c = this.rePasswordControl;
    return (
      (c.invalid || this.form.hasError('passwordMismatch')) &&
      (c.dirty || c.touched)
    );
  }

  get rePasswordErrorMessage(): string {
    if (this.rePasswordControl.hasError('passwordStrength')) {
      return 'Password must contain uppercase, lowercase, number & special character (#?!@$%^&*-).';
    }
    if (this.form.hasError('passwordMismatch')) {
      return 'Passwords do not match.';
    }
    return '';
  }

  onRegister() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loginClicked.emit(this.form.getRawValue());
    }
  }
}
