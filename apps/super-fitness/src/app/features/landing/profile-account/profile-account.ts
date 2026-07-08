import { Component, computed, inject, signal } from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import {
  LucideRefreshCw,
  LucideGlobe,
  LucideSunMoon,
  LucideShield,
  LucideShieldCheck,
  LucideLifeBuoy,
  LucideLogOut,
} from '@lucide/angular';
import { ProfileColumn } from './components/profile-column/profile-column';
import { ProfileActionCard } from './components/profile-action-card/profile-action-card';
import { ThemeService } from '../../../shared/services/theme/theme';
import { APP_STORAGE } from '../../../shared/constants/app-storage';
import { ProfilePicture } from './components/profile-picture/profile-picture';
import { APP_ROUTES } from '../../../shared/constants/app-routes';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/data-access';

@Component({
  selector: 'app-profile-account',
  imports: [
    TranslocoPipe,
    LucideRefreshCw,
    LucideGlobe,
    LucideSunMoon,
    LucideShield,
    LucideShieldCheck,
    LucideLifeBuoy,
    LucideLogOut,
    ProfileColumn,
    ProfileActionCard,
    ProfilePicture,
  ],
  templateUrl: './profile-account.html',
})
export class ProfileAccount {
  readonly themeService = inject(ThemeService);
  translocoService = inject(TranslocoService);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  lang = signal<string>(this.translocoService.getActiveLang());

  isDarkTheme = computed<boolean>(() => this.themeService.isDarkTheme());

  changeGoal() {
    console.log('Change Goal clicked');
  }

  changeLevel() {
    console.log('Change Level clicked');
  }

  changeWeight() {
    console.log('Change Weight clicked');
  }

  changePassword() {
    void this.router.navigate([
      '/',
      APP_ROUTES.LANDING.ROOT,
      APP_ROUTES.LANDING.CHANGE_PASSWORD,
    ]);
  }

  selectLanguage() {
    const newLang = this.lang() === 'en' ? 'ar' : 'en';
    this.translocoService.setActiveLang(newLang);
    this.lang.set(newLang);
    if (newLang === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
    localStorage.setItem(APP_STORAGE.language, newLang);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  viewSecurity() {
    console.log('View Security clicked');
  }

  viewPrivacyPolicy() {
    console.log('View Privacy Policy clicked');
  }

  getHelp() {
    console.log('Get Help clicked');
  }

  logout() {
    this.authService.clearToken();
    void this.router.navigate([
      '/',
      APP_ROUTES.LANDING.ROOT,
      APP_ROUTES.LANDING.HOME,
    ]);
  }
}
