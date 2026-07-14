import { Component, computed, inject, OnInit, signal } from '@angular/core';
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
import { AuthFacade, AuthService, UserProfile } from '../../auth/data-access';

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
export class ProfileAccount implements OnInit {
  readonly themeService = inject(ThemeService);
  translocoService = inject(TranslocoService);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly authFacade = inject(AuthFacade);
  lang = signal<string>(this.translocoService.getActiveLang());
  profile = signal<UserProfile | null>(null);

  isDarkTheme = computed<boolean>(() => this.themeService.isDarkTheme());

  readonly levelMap: Record<string, string> = {
    level1: 'Rookie',
    level2: 'Beginner',
    level3: 'Intermediate',
    level4: 'Advance',
    level5: 'True Beast',
  };

  ngOnInit(): void {
    this.getProfileData();
  }

  getProfileData() {
    this.authFacade.getProfile().subscribe({
      next: res => {
        this.profile.set(res.user);
      },
    });
  }

  changeGoal() {
    void this.router.navigate([
      '/',
      APP_ROUTES.LANDING.ROOT,
      APP_ROUTES.LANDING.CHANGE_GOAL,
    ]);
  }

  changeLevel() {
    void this.router.navigate([
      '/',
      APP_ROUTES.LANDING.ROOT,
      APP_ROUTES.LANDING.CHANGE_LEVEL,
    ]);
  }

  changeWeight() {
    void this.router.navigate([
      '/',
      APP_ROUTES.LANDING.ROOT,
      APP_ROUTES.LANDING.CHANGE_WEIGHT,
    ]);
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
