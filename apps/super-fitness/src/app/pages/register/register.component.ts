/* eslint-disable @nx/enforce-module-boundaries */
import { Component } from '@angular/core';
import { StepPersonalInfoComponent } from '../../../../../../shared-components/src/lib/step-personal-info/step-personal-info.component';
import { GoalSelection } from '../../../../../../shared-components/src/lib/goal-selection/goal-selection';
import { PhyscialSelection } from '../../../../../../shared-components/src/lib/physcial-selection/physcial-selection';
import {
  AgeSelection,
  GenderComponent,
  HeightSelection,
  WightSelection,
} from '@org/shared-components';

@Component({
  selector: 'app-register',
  imports: [
    StepPersonalInfoComponent,
    GenderComponent,
    AgeSelection,
    WightSelection,
    HeightSelection,
    GoalSelection,
    PhyscialSelection,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  showGender = false;
  showAge = false;
  showWeight = false;
  showHeight = false;
  showGoal = false;
  showPhysical = false;
}
