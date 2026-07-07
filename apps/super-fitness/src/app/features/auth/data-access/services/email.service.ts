import { Injectable, signal } from '@angular/core';

const RESET_PASSWORD_EMAIL_KEY = 'reset_password_email';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private _email = signal<string | null>(this.readStoredEmail());

  setEmail(email: string): void {
    this._email.set(email);
    sessionStorage.setItem(RESET_PASSWORD_EMAIL_KEY, email);
  }

  getEmail(): string | null {
    return this._email() ?? this.readStoredEmail();
  }

  clearEmail(): void {
    this._email.set(null);
    sessionStorage.removeItem(RESET_PASSWORD_EMAIL_KEY);
  }

  emailSignal = this._email.asReadonly();

  private readStoredEmail(): string | null {
    return sessionStorage.getItem(RESET_PASSWORD_EMAIL_KEY);
  }
}
