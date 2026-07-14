/* eslint-disable @nx/enforce-module-boundaries */
import { Component, Input, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    FormsModule,
  ],
  templateUrl: './wight-selection.html',
  styleUrl: './wight-selection.css',
})
export class WightSelection implements OnInit {
  @Input() savedWeight = 90;

  nextClicked = output<number>();
  backClicked = output<void>();
  weight = 90;

  ngOnInit() {
    this.weight = this.savedWeight;
  }

  onNext() {
    this.nextClicked.emit(this.weight);
  }
}
