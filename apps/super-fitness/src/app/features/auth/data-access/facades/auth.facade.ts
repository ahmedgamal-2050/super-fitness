import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import {
  AuthMessageResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  ResetPasswordRequest,
  VerifyResetCodeRequest,
} from '../models/auth.models';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.authService.login(credentials).pipe(
      tap(response => {
        this.authService.setToken(response.token);
        void this.router.navigate(['/home']);
      })
    );
  }

  forgotPassword(
    payload: ForgotPasswordRequest
  ): Observable<AuthMessageResponse> {
    return this.authService.forgotPassword(payload);
  }

  verifyResetCode(
    payload: VerifyResetCodeRequest
  ): Observable<AuthMessageResponse> {
    return this.authService.verifyResetCode(payload);
  }

  resetPassword(
    payload: ResetPasswordRequest
  ): Observable<AuthMessageResponse> {
    return this.authService.resetPassword(payload);
  }

  changePassword(
    payload: ChangePasswordRequest
  ): Observable<ChangePasswordResponse> {
    return this.authService.changePassword(payload);
  }
}
