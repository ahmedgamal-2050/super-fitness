import {
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  NgZone,
  Output,
  QueryList,
  ViewChildren,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthFacade } from '../../../data-access';
import { EmailService } from '../../../data-access/services/email.service';
import { CustomButton } from '../../../../../shared/components/custom-button/custom-button';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [ReactiveFormsModule, CustomButton],
  templateUrl: './verify-otp.html',
})
export class VerifyOTP {
  @Output() verified = new EventEmitter<void>();
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  private readonly authFacade = inject(AuthFacade);
  private readonly emailService = inject(EmailService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly ngZone = inject(NgZone);
  private intervalId: ReturnType<typeof setInterval> | null = null;

  email = this.emailService.emailSignal;
  isLoading = signal(false);
  isResending = signal(false);
  errorMessage = signal<string | null>(null);
  resendSuccess = signal(false);
  disableResend = signal(false);
  countdown = signal(0);

  otpForm = new FormGroup({
    digits: new FormArray(
      Array.from(
        { length: 4 },
        () =>
          new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.pattern(/^\d$/)],
          })
      )
    ),
  });

  constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    });
  }

  get otpDigits(): FormArray<FormControl<string>> {
    return this.otpForm.controls.digits;
  }

  onDigitInput(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '').slice(-1);

    input.value = value;
    this.otpDigits.at(index).setValue(value);

    if (value && index < this.otpDigits.length - 1) {
      this.otpInputs.get(index + 1)?.nativeElement.focus();
    }
  }

  onDigitKeydown(index: number, event: KeyboardEvent): void {
    if (
      event.key === 'Backspace' &&
      !this.otpDigits.at(index).value &&
      index > 0
    ) {
      this.otpInputs.get(index - 1)?.nativeElement.focus();
    }
  }

  onDigitPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pasted = event.clipboardData
      ?.getData('text')
      .replace(/\D/g, '')
      .slice(0, this.otpDigits.length);
    if (!pasted) return;
    pasted.split('').forEach((digit, index) => {
      this.otpDigits.at(index).setValue(digit);
    });

    const nextIndex = Math.min(pasted.length, this.otpDigits.length - 1);
    this.otpInputs.get(nextIndex)?.nativeElement.focus();
  }

  submitOtpForm(): void {
    if (this.otpForm.invalid) {
      this.otpForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const resetCode = this.otpDigits.getRawValue().join('');

    this.authFacade
      .verifyResetCode({ resetCode })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.verified.emit();
        },
        error: () => {
          this.isLoading.set(false);
          this.errorMessage.set('Reset code is invalid or has expired');
        },
      });
  }

  resendOtp(): void {
    const email = this.emailService.getEmail();

    if (!email) {
      this.errorMessage.set(
        'Email not found. Please go back and enter your email again.'
      );
      return;
    }

    if (this.disableResend() || this.isResending()) return;

    this.errorMessage.set(null);
    this.resendSuccess.set(false);
    this.disableResend.set(true);
    this.isResending.set(true);
    this.startCountdown(30);

    this.authFacade.forgotPassword({ email }).subscribe({
      next: () => {
        this.isResending.set(false);
        this.resendSuccess.set(true);
        this.otpForm.reset();
        this.otpInputs.first?.nativeElement.focus();
      },
      error: () => {
        this.isResending.set(false);
        this.errorMessage.set('Reset code is invalid or has expired');
      },
    });
  }

  private startCountdown(seconds: number): void {
    this.countdown.set(seconds);

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      this.ngZone.run(() => {
        const next = this.countdown() - 1;
        this.countdown.set(next);

        if (next <= 0) {
          this.disableResend.set(false);
          if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
          }
        }
      });
    }, 1000);
  }
}
