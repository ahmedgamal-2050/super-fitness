import { Component, Input, OnInit, output, signal } from '@angular/core';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { SfButtonComponent } from 'apps/super-fitness/src/app/shared/components/sf-button/sf-button.component';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AuthMainHeader } from '../auth-main-header/auth-main-header';
import { AuthSecondHeader } from '../auth-second-header/auth-second-header';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { SfStepProgressComponent } from 'apps/super-fitness/src/app/shared/components/sf-step-progress/sf-step-progress.component';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { OptionItem } from '../../../../apps/super-fitness/src/app/shared/components/option-item/option-item';

@Component({
  selector: 'lib-goal-selection',
  imports: [
    SfButtonComponent,
    AuthMainHeader,
    AuthSecondHeader,
    SfStepProgressComponent,
    OptionItem,
  ],
  templateUrl: './goal-selection.html',
  styleUrl: './goal-selection.css',
})
export class GoalSelection implements OnInit {
  @Input() savedGoal: string | null = null;

  nextClicked = output<string>();
  backClicked = output<void>();

  goals = [
    'Gain Weight',
    'Lose Weight',
    'Get Fitter',
    'Gain More Flexible',
    'Learn The Basic',
  ];

  selectedGoal = signal<string | null>(null);

  ngOnInit() {
    if (this.savedGoal) {
      this.selectedGoal.set(this.savedGoal);
    }
  }

  selectGoal(goal: string) {
    this.selectedGoal.set(goal);
  }
}
