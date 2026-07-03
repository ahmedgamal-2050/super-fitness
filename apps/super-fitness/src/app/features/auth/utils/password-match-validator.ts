import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('newPassword');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) {
    return null;
  }

  if (confirmPassword.errors && !confirmPassword.errors['passwordMismatch']) {
    return null;
  }

  if (password.value !== confirmPassword.value) {
    confirmPassword.setErrors({
      ...confirmPassword.errors,
      passwordMismatch: true,
    });
  } else {
    if (confirmPassword.hasError('passwordMismatch')) {
      const errors = { ...(confirmPassword.errors ?? {}) };
      delete errors['passwordMismatch'];

      confirmPassword.setErrors(Object.keys(errors).length ? errors : null);
    }
  }

  return null;
};
