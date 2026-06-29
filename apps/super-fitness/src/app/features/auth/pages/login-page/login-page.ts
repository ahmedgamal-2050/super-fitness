import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CustomButton } from '../../../../shared/components/custom-button/custom-button';
import { CustomFormField } from '../../../../shared/components/custom-form-field/custom-form-field';
import { CustomInput } from '../../../../shared/components/custom-input/custom-input';
import { InputErrorMessage } from '../../../../shared/components/input-error-message/input-error-message';
import { Lock, LucideAngularModule, Mail } from 'lucide-angular';
import { APP_ROUTES } from '../../../../shared/constants/app-routes';
import { AuthFacade } from '../../data-access';
import { PASSWORD_PATTERN } from '../../utils/auth-form.utils';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CustomButton,
    CustomFormField,
    CustomInput,
    InputErrorMessage,
    LucideAngularModule,
  ],
  templateUrl: './login-page.html',
})
export class LoginPage {
  private readonly authFacade = inject(AuthFacade);
  private readonly destroyRef = inject(DestroyRef);

  readonly authRoutes = APP_ROUTES.AUTH;
  readonly icons = { Mail, Lock };
  readonly socialIcons = {
    facebook: '/assets/images/social/facebook.png',
    google: '/assets/images/social/google.png',
    apple: '/assets/images/social/apple.png',
  };

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  readonly emailErrorMessages = {
    required: 'Email is required',
    email: 'Invalid email address',
  };

  readonly passwordErrorMessages = {
    required: 'Password is required',
    pattern:
      'Password must include upper, lower, number, and special character',
  };

  loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(PASSWORD_PATTERN)],
    }),
  });

  submitLoginForm(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.getRawValue();
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.authFacade
      .login({ email, password })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          console.log('login success');
        },
        error: (err: {
          apiErrorMessage?: string;
          error?: { message?: string };
          message?: string;
        }) => {
          this.isLoading.set(false);
          this.errorMessage.set(
            err.error?.message || err.message || 'Invalid email or password'
          );
        },
      });
  }
}
