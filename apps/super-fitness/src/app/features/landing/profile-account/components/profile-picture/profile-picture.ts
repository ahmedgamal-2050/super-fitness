import { Component, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { LucidePlus, LucideUser } from '@lucide/angular';

@Component({
  selector: 'app-profile-picture',
  imports: [TranslocoPipe, LucidePlus, LucideUser],
  templateUrl: './profile-picture.html',
})
export class ProfilePicture {
  previewUrl = signal<string>('');
  pendingPhotoFormData = signal<FormData | null>(null);

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('photo', file);
    this.pendingPhotoFormData.set(formData);

    const reader = new FileReader();
    reader.onload = () => this.previewUrl.set(reader.result as string);
    reader.readAsDataURL(file);
  }
}
