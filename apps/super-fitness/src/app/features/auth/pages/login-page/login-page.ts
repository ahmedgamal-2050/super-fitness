import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomFormField } from '../../../../shared/components/custom-form-field/custom-form-field';
import { CustomInput } from '../../../../shared/components/custom-input/custom-input';
import { Lock, LucideAngularModule, Mail } from 'lucide-angular';
import { APP_ROUTES } from '../../../../shared/constants/app-routes';
import { AuthService } from '../../data-access';
import {
  getEmailError,
  getNewPasswordError,
  PASSWORD_PATTERN,
} from '../../utils/auth-form.utils';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CustomFormField,
    CustomInput,
    LucideAngularModule,
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
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

  get emailError(): string | null {
    return getEmailError(this.loginForm.controls.email);
  }

  get passwordError(): string | null {
    return getNewPasswordError(this.loginForm.controls.password);
  }

  submitLoginForm(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.getRawValue();
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.authService
      .login({ email, password })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          console.log('login success');

          void this.router.navigate(['/home']);
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
