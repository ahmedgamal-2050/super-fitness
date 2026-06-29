import { Component, output } from '@angular/core';
import { AuthMainHeader } from '../auth-main-header/auth-main-header';
import { AuthSecondHeader } from '../auth-second-header/auth-second-header';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { SfButtonComponent } from 'apps/super-fitness/src/app/shared/components/sf-button/sf-button.component';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { SfStepProgressComponent } from '../../../../apps/super-fitness/src/app/shared/components/sf-step-progress/sf-step-progress.component';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { SfWheelComponent } from '../../../../apps/super-fitness/src/app/shared/components/sf-wheel/sf-wheel.component';
@Component({
  selector: 'lib-age-selection',
  imports: [
    AuthMainHeader,
    AuthSecondHeader,
    SfButtonComponent,
    SfStepProgressComponent,
    SfWheelComponent,
  ],
  templateUrl: './age-selection.html',
  styleUrl: './age-selection.css',
})
export class AgeSelection {
  nextClicked = output<void>();
}
