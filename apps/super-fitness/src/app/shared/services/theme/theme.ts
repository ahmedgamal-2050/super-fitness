import { Injectable, signal } from '@angular/core';
import { APP_STORAGE } from '../../constants/app-storage';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkTheme = signal<boolean>(false);

  initializeTheme() {
    const savedTheme = localStorage.getItem(APP_STORAGE.theme);
    if (savedTheme) {
      this.isDarkTheme.set(savedTheme === 'dark');
    } else {
      const prefersDark = globalThis.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      this.isDarkTheme.set(prefersDark);
    }
    this.updateTheme();
  }

  toggleTheme() {
    this.isDarkTheme.update(current => !current);
    this.updateTheme();
  }

  private updateTheme() {
    if (this.isDarkTheme()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(
      APP_STORAGE.theme,
      this.isDarkTheme() ? 'dark' : 'light'
    );
  }
}
