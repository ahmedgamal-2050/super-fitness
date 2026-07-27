import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../../../../shared/constants/app-routes';
import { AuthFacade } from '../../../../auth/data-access';
import { PhyscialSelection } from 'shared-components/src/lib/physcial-selection/physcial-selection';

const ACTIVITY_MAP: Record<string, string> = {
  Rookie: 'level1',
  Beginner: 'level2',
  Intermediate: 'level3',
  Advance: 'level4',
  'True Beast': 'level5',
};

@Component({
  selector: 'app-change-level-page',
  standalone: true,
  imports: [PhyscialSelection],
  templateUrl: './change-level.html',
})
export class ChangeLevelPage implements OnInit {
  currentLevel: string | null = null;

  private readonly authFacade = inject(AuthFacade);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.getProfileData();
  }

  getProfileData() {
    this.authFacade.getProfile().subscribe({
      next: res => {
        this.currentLevel = this.getDisplayLevel(res.user.activityLevel);
      },
    });
  }

  private getDisplayLevel(level: string): string {
    const map: Record<string, string> = {
      level1: 'Rookie',
      level2: 'Beginner',
      level3: 'Intermediate',
      level4: 'Advance',
      level5: 'True Beast',
    };

    return map[level];
  }

  updateLevel(level: string) {
    this.authFacade
      .editProfile({
        activityLevel: ACTIVITY_MAP[level],
      })
      .subscribe(() => {
        this.router.navigate([
          '/',
          APP_ROUTES.LANDING.ROOT,
          APP_ROUTES.LANDING.PROFILE,
        ]);
      });
  }

  goBack() {
    this.router.navigate([
      '/',
      APP_ROUTES.LANDING.ROOT,
      APP_ROUTES.LANDING.PROFILE,
    ]);
  }
}
