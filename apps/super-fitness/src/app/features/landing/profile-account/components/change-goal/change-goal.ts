import { Component, inject, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { APP_ROUTES } from '../../../../../shared/constants/app-routes';
import { AuthFacade } from '../../../../auth/data-access';
import { GoalSelection } from 'shared-components/src/lib/goal-selection/goal-selection';

@Component({
  selector: 'app-change-goal-page',
  standalone: true,
  imports: [GoalSelection],
  templateUrl: './change-goal.html',
})
export class ChangeGoalPage implements OnInit {
  currentGoal: string | null = null;

  private readonly authFacade = inject(AuthFacade);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.getProfileData();
  }

  getProfileData() {
    this.authFacade.getProfile().subscribe({
      next: res => {
        this.currentGoal = res.user.goal;
      },
    });
  }

  updateGoal(goal: string) {
    this.authFacade
      .editProfile({
        goal,
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
