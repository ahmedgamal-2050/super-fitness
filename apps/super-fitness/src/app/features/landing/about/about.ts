import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WorkoutOptionsComponent } from '../home/components/workout-options/workout-options.component';

@Component({
  selector: 'app-about',
  imports: [WorkoutOptionsComponent],
  templateUrl: './about.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {}
