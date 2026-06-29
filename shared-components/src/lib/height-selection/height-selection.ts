/* eslint-disable @nx/enforce-module-boundaries */
import { Component, output } from '@angular/core';
import { AuthMainHeader } from '../auth-main-header/auth-main-header';
import { AuthSecondHeader } from '../auth-second-header/auth-second-header';
import { SfButtonComponent } from 'apps/super-fitness/src/app/shared/components/sf-button/sf-button.component';
import { SfStepProgressComponent } from 'apps/super-fitness/src/app/shared/components/sf-step-progress/sf-step-progress.component';
import { SfWheelComponent } from 'apps/super-fitness/src/app/shared/components/sf-wheel/sf-wheel.component';
@Component({
  selector: 'lib-height-selection',
  imports: [
    AuthMainHeader,
    AuthSecondHeader,
    SfButtonComponent,
    SfStepProgressComponent,
    SfWheelComponent,
  ],
  templateUrl: './height-selection.html',
  styleUrl: './height-selection.css',
})
export class HeightSelection {
  nextClicked = output<void>();
}
