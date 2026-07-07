import { Component } from '@angular/core';
import { RequestResetEmail } from './request-email/request-email';
import { VerifyOTP } from './verify-otp/verify-otp';
import { ResetPassword } from './reset-password/reset-password';

@Component({
  selector: 'app-forget-password-layout',
  standalone: true,
  imports: [RequestResetEmail, VerifyOTP, ResetPassword],
  templateUrl: './forget-password-layout.html',
})
export class ForgetPasswordLayout {
  currentStep: 'email' | 'verify' | 'reset' = 'email';

  continue() {
    this.currentStep = 'verify';
  }

  verified() {
    this.currentStep = 'reset';
  }

  done() {
    this.currentStep = 'email';
  }
}
