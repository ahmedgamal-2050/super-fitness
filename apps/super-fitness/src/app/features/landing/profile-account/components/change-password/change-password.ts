import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomButton } from '../../../../../shared/components/custom-button/custom-button';
import { CustomFormField } from '../../../../../shared/components/custom-form-field/custom-form-field';
import { Lock, LucideAngularModule } from 'lucide-angular';
import { InputErrorMessage } from '../../../../../shared/components/input-error-message/input-error-message';
import { CustomInput } from '../../../../../shared/components/custom-input/custom-input';
import { AuthFacade, AuthService } from '../../../../auth/data-access';
import { PASSWORD_PATTERN } from '../../../../auth/utils/auth-form.utils';
import { passwordMatchValidator } from '../../../../auth/utils/password-match-validator';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../../../../shared/constants/app-routes';

@Component({
  selector: 'app-change-password-page',
  imports: [
    ReactiveFormsModule,
    CustomButton,
    CustomFormField,
    CustomInput,
    InputErrorMessage,
    LucideAngularModule,
  ],
  templateUrl: './change-password.html',
})
export class ChangePasswordPage {
  private readonly authFacade = inject(AuthFacade);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  readonly icons = {
    Lock,
  };

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  readonly oldPasswordErrorMessages = {
    required: 'Current password is required',
    pattern:
      'Password must include upper, lower, number, and special character',
  };

  readonly newPasswordErrorMessages = {
    required: 'New password is required',
    pattern:
      'Password must include upper, lower, number, and special character',
  };

  readonly confirmPasswordErrorMessages = {
    required: 'Please confirm your password',
    pattern:
      'Password must include upper, lower, number, and special character',
    passwordMismatch: 'Passwords do not match',
  };

  form = new FormGroup(
    {
      oldPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(PASSWORD_PATTERN)],
      }),

      newPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(PASSWORD_PATTERN)],
      }),

      confirmPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(PASSWORD_PATTERN)],
      }),
    },
    {
      validators: passwordMatchValidator,
    }
  );

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { oldPassword, newPassword } = this.form.getRawValue();
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);
    this.authFacade
      .changePassword({
        password: oldPassword,
        newPassword,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.successMessage.set(
            "Password changed successfully. You'll be logged out now."
          );

          setTimeout(() => {
            this.authService.clearToken();

            void this.router.navigate([
              '/',
              APP_ROUTES.AUTH.ROOT,
              APP_ROUTES.AUTH.LOGIN,
            ]);
          }, 3000);
        },
        error: () => {
          this.isLoading.set(false);
          this.errorMessage.set('Failed to change password');
        },
      });
  }
}
