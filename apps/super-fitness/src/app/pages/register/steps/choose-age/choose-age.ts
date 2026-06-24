import { NgStyle } from '@angular/common';
import { Component, output } from '@angular/core';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { SfButtonComponent } from 'apps/super-fitness/src/app/shared/components/sf-button/sf-button.component';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { SfWheelComponent } from 'apps/super-fitness/src/app/shared/components/sf-wheel/sf-wheel.component';
import { SfStepProgressComponent } from 'apps/super-fitness/src/app/shared/components/sf-step-progress/sf-step-progress.component';

@Component({
  selector: 'app-choose-age',
  imports: [NgStyle, SfButtonComponent, SfWheelComponent, SfStepProgressComponent],
  templateUrl: './choose-age.html',
})
export class ChooseAge {
  nextClicked = output<void>();
}
