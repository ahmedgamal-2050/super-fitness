import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UpcomingWorkoutsComponent } from '../home/components/upcoming-workouts/upcoming-workouts.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-classes',
  imports: [UpcomingWorkoutsComponent],
  templateUrl: './classes.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Classes {
  private router = inject(Router);
  goToMealDetails = () => {
    this.router.navigate(['/landing/class-details']);
  };
}
