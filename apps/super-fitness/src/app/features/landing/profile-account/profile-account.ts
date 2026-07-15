import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
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
import { AuthFacade } from '../../auth/data-access/facades/auth.facade';
import { AuthService, User } from '../../auth/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { APP_ROUTES } from '../../../shared/constants/app-routes';
import { Router } from '@angular/router';

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
  readonly translocoService = inject(TranslocoService);
  readonly authFacade = inject(AuthFacade);
  readonly authService = inject(AuthService);
  readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  readonly userProfile = computed<User>(() =>
    this.authService.getUserProfileData()
  );
  readonly isDarkTheme = computed<boolean>(() =>
    this.themeService.isDarkTheme()
  );

  lang = signal<string>(this.translocoService.getActiveLang());

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
    this.authFacade
      .logout()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
