import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { TranslocoService, TranslocoPipe } from '@jsverse/transloco';
import { APP_STORAGE } from '../../constants/app-storage';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Button } from '../button/button';
import { LucideUser } from '@lucide/angular';
import { AuthService } from '../../../features/auth/data-access';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslocoPipe, RouterLink, RouterLinkActive, Button, LucideUser],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private translocoService = inject(TranslocoService);
  private readonly authService = inject(AuthService);

  isMenuOpen = signal(false);
  isAuthenticated = this.authService.isAuthenticated;
  headerMenuList = signal([
    {
      label: 'landing_page_header_section_home_label',
      route: '/landing/home',
    },
    {
      label: 'landing_page_header_section_about_label',
      route: '/landing/about',
    },
    {
      label: 'landing_page_header_section_classes_label',
      route: '/landing/classes',
    },
    {
      label: 'landing_page_header_section_healthy_label',
      route: '/landing/healthy',
    },
  ]);

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  toggleLanguage() {
    const currentLang = this.translocoService.getActiveLang();
    const nextLang = currentLang === 'en' ? 'ar' : 'en';

    this.translocoService.setActiveLang(nextLang);
    localStorage.setItem(APP_STORAGE.language, nextLang);
    document.documentElement.dir = nextLang === 'ar' ? 'rtl' : 'ltr';
  }
}
