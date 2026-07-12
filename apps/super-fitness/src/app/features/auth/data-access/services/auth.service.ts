import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_STORAGE } from '../../../../shared/constants/app-storage';
import { BASE_URL } from '../../../../shared/constants/endpoints';
import { AuthEndpoint } from '../enums/auth.enums';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import {
  AuthMessageResponse,
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  ResetPasswordRequest,
  User,
  VerifyResetCodeRequest,
} from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly cookieService = inject(SsrCookieService);

  readonly isAuthenticated = computed(() => !!this.getToken());

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${BASE_URL}${AuthEndpoint.SIGN_IN}`,
      credentials
    );
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
    return this.http.put<AuthMessageResponse>(
      `${BASE_URL}${AuthEndpoint.RESET_PASSWORD}`,
      payload
    );
  }

  getUserProfile(): Observable<Omit<LoginResponse, 'token'>> {
    return this.http.get<Omit<LoginResponse, 'token'>>(
      `${BASE_URL}${AuthEndpoint.GET_PROFILE_DATA}`
    );
  }

  updateProfilePicture(payload: FormData) {
    return this.http.put(
      `${BASE_URL}${AuthEndpoint.UPDATE_PROFILE_PICTURE}`,
      payload
    );
  }

  logout(): Observable<void> {
    return this.http.get<void>(`${BASE_URL}${AuthEndpoint.LOGOUT}`);
  }

  getToken(): string {
    return this.cookieService.get(APP_STORAGE.token);
  }

  clearToken(): void {
    sessionStorage.removeItem(APP_STORAGE.token);
    this.cookieService.delete(APP_STORAGE.token, '/');
  }

  setToken(token: string): void {
    sessionStorage.removeItem(APP_STORAGE.token);
    this.cookieService.set(APP_STORAGE.token, token, {
      path: '/',
      sameSite: 'Lax',
      secure: !isDevMode(),
    });
  }

  setUserProfileData(profileData: User) {
    this.cookieService.set(
      APP_STORAGE.userProfile,
      JSON.stringify(profileData),
      {
        path: '/',
        sameSite: 'Lax',
        secure: !isDevMode(),
      }
    );
  }

  getUserProfileData(): User {
    return JSON.parse(
      this.cookieService.get(APP_STORAGE.userProfile) || 'null'
    );
  }

  clearUserProfileData(): void {
    this.cookieService.delete(APP_STORAGE.userProfile, '/');
  }
}
