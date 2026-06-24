/* eslint-disable @nx/enforce-module-boundaries */
import { NgStyle } from '@angular/common';
import { Component, output } from '@angular/core';
import { SfButtonComponent } from 'apps/super-fitness/src/app/shared/components/sf-button/sf-button.component';
import { SfWheelComponent } from 'apps/super-fitness/src/app/shared/components/sf-wheel/sf-wheel.component';

@Component({
  selector: 'app-choose-height',
  imports: [NgStyle, SfButtonComponent, SfWheelComponent],
  templateUrl: './choose-height.html',
})
export class ChooseHeight {
  nextClicked = output<void>();
}
