import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { WorkoutOptionsComponent } from './components/workout-options/workout-options.component';
import { WhyUsComponent } from './components/why-us/why-us.component';
// import { NutritionalPlansComponent } from './components/nutritional-plans/nutritional-plans.component';
import { UpcomingWorkoutsComponent } from './components/upcoming-workouts/upcoming-workouts.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    WorkoutOptionsComponent,
    WhyUsComponent,
    UpcomingWorkoutsComponent,
    // NutritionalPlansComponent,
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
