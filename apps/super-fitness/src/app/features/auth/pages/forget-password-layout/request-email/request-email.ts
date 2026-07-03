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
import { AuthFacade } from '../../../data-access';
import { EmailService } from '../../../data-access/services/email.service';
import { CustomButton } from '../../../../../shared/components/custom-button/custom-button';
import { CustomFormField } from '../../../../../shared/components/custom-form-field/custom-form-field';
import { LucideAngularModule, Mail } from 'lucide-angular';
import { InputErrorMessage } from '../../../../../shared/components/input-error-message/input-error-message';
import { CustomInput } from '../../../../../shared/components/custom-input/custom-input';

@Component({
  selector: 'app-request-email',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CustomButton,
    CustomFormField,
    LucideAngularModule,
    InputErrorMessage,
    CustomInput,
  ],

  templateUrl: './request-email.html',
})
export class RequestResetEmail {
  @Output() continue = new EventEmitter<void>();

  private readonly authFacade = inject(AuthFacade);
  private readonly emailService = inject(EmailService);
  private readonly destroyRef = inject(DestroyRef);
  readonly icons = { Mail };

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  readonly emailErrorMessages = {
    required: 'Email is required',
    email: 'Invalid email address',
  };

  forgetPassForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

  submitForgetPassForm(): void {
    if (this.forgetPassForm.invalid) {
      this.forgetPassForm.markAllAsTouched();
      return;
    }
    this.isLoading.set(true);
    this.errorMessage.set(null);
    const { email } = this.forgetPassForm.getRawValue();

    this.authFacade
      .forgotPassword({ email })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.emailService.setEmail(email);
          this.isLoading.set(false);
          this.continue.emit();
        },
        error: () => {
          this.isLoading.set(false);
          this.errorMessage.set('Something went wrong');
        },
      });
  }
}
