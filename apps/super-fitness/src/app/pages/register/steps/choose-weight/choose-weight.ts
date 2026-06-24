import { NgStyle } from '@angular/common';
import { Component, output } from '@angular/core';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { SfButtonComponent } from 'apps/super-fitness/src/app/shared/components/sf-button/sf-button.component';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { SfWheelComponent } from 'apps/super-fitness/src/app/shared/components/sf-wheel/sf-wheel.component';

@Component({
  selector: 'app-choose-weight',
  imports: [NgStyle, SfButtonComponent, SfWheelComponent],
  templateUrl: './choose-weight.html',
})
export class ChooseWeight {
  nextClicked = output<void>();
}
