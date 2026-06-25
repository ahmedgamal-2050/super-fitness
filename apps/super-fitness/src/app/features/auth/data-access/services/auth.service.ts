import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, isDevMode } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { Observable, tap } from 'rxjs';
import { APP_STORAGE } from '../../../../shared/constants/app-storage';
import { BASE_URL } from '../../../../shared/constants/endpoints';
import { AuthEndpoint } from '../enums/auth.enums';
import {
  AuthMessageResponse,
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  ResetPasswordRequest,
  VerifyResetCodeRequest,
} from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly cookieService = inject(SsrCookieService);

  readonly isAuthenticated = computed(() => !!this.getToken());

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${BASE_URL}${AuthEndpoint.SIGN_IN}`, credentials)
      .pipe(tap(response => this.setToken(response.token)));
  }

  forgotPassword(
    payload: ForgotPasswordRequest
  ): Observable<AuthMessageResponse> {
    return this.http.post<AuthMessageResponse>(
      `${BASE_URL}${AuthEndpoint.FORGOT_PASSWORD}`,
      payload
    );
  }

  verifyResetCode(
    payload: VerifyResetCodeRequest
  ): Observable<AuthMessageResponse> {
    return this.http.post<AuthMessageResponse>(
      `${BASE_URL}${AuthEndpoint.VERIFY_RESET_CODE}`,
      payload
    );
  }

  resetPassword(
    payload: ResetPasswordRequest
  ): Observable<AuthMessageResponse> {
    return this.http.post<AuthMessageResponse>(
      `${BASE_URL}${AuthEndpoint.RESET_PASSWORD}`,
      payload
    );
  }

  getToken(): string {
    return this.cookieService.get(APP_STORAGE.token);
  }

  clearToken(): void {
    sessionStorage.removeItem(APP_STORAGE.token);
    this.cookieService.delete(APP_STORAGE.token, '/');
  }

  private setToken(token: string): void {
    sessionStorage.removeItem(APP_STORAGE.token);
    this.cookieService.set(APP_STORAGE.token, token, {
      path: '/',
      sameSite: 'Lax',
      secure: !isDevMode(),
    });
  }
}
