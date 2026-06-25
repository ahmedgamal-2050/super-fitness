import { FormControl } from '@angular/forms';

export const PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export function getEmailError(control: FormControl<string>): string | null {
  if (control.touched && control.errors?.['required']) {
    return 'Email is required';
  }
  if (control.touched && control.errors?.['email']) {
    return 'Invalid email address';
  }
  return null;
}

export function getNewPasswordError(control: FormControl<string>): string | null {
  if (control.touched && control.errors?.['required']) {
    return 'Password is required';
  }
  if (control.touched && control.errors?.['pattern']) {
    return 'Password must include upper, lower, number, and special character';
  }
  return null;
}
