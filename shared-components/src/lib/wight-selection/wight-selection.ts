/* eslint-disable @nx/enforce-module-boundaries */
import { Component, output } from '@angular/core';
import { AuthMainHeader } from '../auth-main-header/auth-main-header';
import { AuthSecondHeader } from '../auth-second-header/auth-second-header';
import { SfButtonComponent } from 'apps/super-fitness/src/app/shared/components/sf-button/sf-button.component';
import { SfWheelComponent } from 'apps/super-fitness/src/app/shared/components/sf-wheel/sf-wheel.component';
import { SfStepProgressComponent } from 'apps/super-fitness/src/app/shared/components/sf-step-progress/sf-step-progress.component';
@Component({
  selector: 'lib-weight-selection',
  imports: [
    AuthMainHeader,
    AuthSecondHeader,
    SfButtonComponent,
    SfWheelComponent,
    SfStepProgressComponent,
  ],
  templateUrl: './wight-selection.html',
  styleUrl: './wight-selection.css',
})
export class WightSelection {
  nextClicked = output<void>();
}
