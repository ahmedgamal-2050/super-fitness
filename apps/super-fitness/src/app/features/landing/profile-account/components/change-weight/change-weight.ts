import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { APP_ROUTES } from '../../../../../shared/constants/app-routes';
import { AuthFacade } from '../../../../auth/data-access';
import { WightSelection } from '@org/shared-components';
@Component({
  selector: 'app-change-password-page',
  imports: [ReactiveFormsModule, WightSelection],
  templateUrl: './change-weight.html',
})
export class ChangeWeightPage implements OnInit {
  currentWeight = 90;

  private router = inject(Router);
  private readonly authFacade = inject(AuthFacade);

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.authFacade.getProfile().subscribe({
      next: res => {
        this.currentWeight = res.user.weight;
      },
    });
  }

  updateWeight(weight: number) {
    this.authFacade
      .editProfile({
        weight,
      })
      .subscribe({
        next: () => {
          this.router.navigate([
            '/',
            APP_ROUTES.LANDING.ROOT,
            APP_ROUTES.LANDING.PROFILE,
          ]);
        },
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
