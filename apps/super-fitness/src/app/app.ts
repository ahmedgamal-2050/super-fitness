import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './shared/services/theme/theme';
import { SmartCoach } from './features/smart-coach/smart-coach';

@Component({
  imports: [RouterOutlet, SmartCoach],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  readonly themeService = inject(ThemeService);

  ngOnInit() {
    this.themeService.initializeTheme();
  }
}
