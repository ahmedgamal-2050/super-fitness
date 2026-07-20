import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { LucidePlus, LucideUser } from '@lucide/angular';
import { AuthFacade } from '../../../../auth/data-access/facades/auth.facade';
import { AuthService, User } from '../../../../auth/data-access';
import { switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile-picture',
  imports: [TranslocoPipe, LucidePlus, LucideUser],
  templateUrl: './profile-picture.html',
})
export class ProfilePicture {
  readonly authFacade = inject(AuthFacade);
  readonly authService = inject(AuthService);
  readonly destroyRef = inject(DestroyRef);

  readonly userProfile = computed<User>(() =>
    this.authService.getUserProfileData()
  );

  previewUrl = signal<string>(this.userProfile().photo);
  pendingPhotoFormData = signal<FormData | null>(null);

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('photo', file);
    this.pendingPhotoFormData.set(formData);

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl.set(reader.result as string);
      this.uploadPhoto();
    };
    reader.readAsDataURL(file);
  }

  uploadPhoto() {
    const formData = this.pendingPhotoFormData();
    if (!formData) return;

    this.authFacade
      .updateProfilePicture(formData)
      .pipe(
        switchMap(() => this.authFacade.getUserProfile()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: response => {
          this.previewUrl.set(response.user.photo);
          this.pendingPhotoFormData.set(null);
        },
      });
  }
}
