import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { ThemeService } from './shared/services/theme/theme';
import { SmartCoach } from './features/smart-coach/smart-coach';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SmartCoach],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  readonly themeService = inject(ThemeService);
  readonly router = inject(Router);

  isAuthRoute = false;

  ngOnInit() {
    this.themeService.initializeTheme();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isAuthRoute = this.router.url.startsWith('/auth');
      });

    this.isAuthRoute = this.router.url.startsWith('/auth');
  }
}
