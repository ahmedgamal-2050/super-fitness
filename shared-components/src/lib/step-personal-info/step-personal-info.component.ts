/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @nx/enforce-module-boundaries */
import { Component, EventEmitter, Output } from '@angular/core';
import { SfButtonComponent } from 'apps/super-fitness/src/app/shared/components/sf-button/sf-button.component';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { SfInputComponent } from 'apps/super-fitness/src/app/shared/components/sf-input/sf-input.component';

@Component({
  selector: 'app-step-personal-info',
  imports: [SfInputComponent, SfButtonComponent],
  templateUrl: './step-personal-info.component.html',
  standalone: true,
})
export class StepPersonalInfoComponent {
  @Output() loginClicked = new EventEmitter<void>();
}
