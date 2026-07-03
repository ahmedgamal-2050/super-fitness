import {
  Component,
  DestroyRef,
  EventEmitter,
  Output,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LucideAngularModule, Lock } from 'lucide-angular';
import { AuthFacade } from '../../../data-access';
import { EmailService } from '../../../data-access/services/email.service';
import { PASSWORD_PATTERN } from '../../../utils/auth-form.utils';

import { CustomButton } from '../../../../../shared/components/custom-button/custom-button';
import { CustomFormField } from '../../../../../shared/components/custom-form-field/custom-form-field';
import { CustomInput } from '../../../../../shared/components/custom-input/custom-input';
import { InputErrorMessage } from '../../../../../shared/components/input-error-message/input-error-message';
import { passwordMatchValidator } from '../../../utils/password-match-validator';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CustomButton,
    CustomFormField,
    CustomInput,
    InputErrorMessage,
    LucideAngularModule,
  ],
  templateUrl: './reset-password.html',
})
export class ResetPassword {
  @Output() done = new EventEmitter<void>();

  private readonly authFacade = inject(AuthFacade);
  private readonly emailService = inject(EmailService);
  private readonly destroyRef = inject(DestroyRef);

  readonly icons = { Lock };

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  readonly passwordErrorMessages = {
    required: 'Password is required',
    pattern:
      'Password must include upper, lower, number, and special character',
  };
  readonly confirmPasswordErrorMessages = {
    required: 'Please confirm your password',
    passwordMismatch: 'Passwords do not match',
  };

  resetPasswordForm = new FormGroup(
    {
      newPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(PASSWORD_PATTERN)],
      }),
      confirmPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    },
    {
      validators: passwordMatchValidator,
    }
  );

  submitResetPassword(): void {
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }
    this.isLoading.set(true);
    this.errorMessage.set(null);
    const email = this.emailService.getEmail();
    const { newPassword } = this.resetPasswordForm.getRawValue();
    if (!email) {
      this.errorMessage.set(
        'Email not found. Please start the reset process again.'
      );
      return;
    }
    this.authFacade
      .resetPassword({
        email,
        newPassword,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.done.emit();
        },
        error: err => {
          this.isLoading.set(false);
          this.errorMessage.set(err.message || 'Something went wrong');
        },
      });
  }
}
