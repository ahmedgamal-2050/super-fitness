/* eslint-disable @nx/enforce-module-boundaries */
import { Component, Input, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    FormsModule,
  ],
  templateUrl: './height-selection.html',
  styleUrl: './height-selection.css',
})
export class HeightSelection implements OnInit {
  @Input() savedHeight = 180;

  nextClicked = output<number>();
  backClicked = output<void>();
  height = 180;

  ngOnInit() {
    this.height = this.savedHeight;
  }

  onNext() {
    this.nextClicked.emit(this.height);
  }
}
