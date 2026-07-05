import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UpcomingWorkoutsComponent } from '../home/components/upcoming-workouts/upcoming-workouts.component';

@Component({
  selector: 'app-classes',
  imports: [UpcomingWorkoutsComponent],
  templateUrl: './classes.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Classes {}
