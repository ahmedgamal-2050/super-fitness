import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { WorkoutOptionsComponent } from './components/workout-options/workout-options.component';
import { WhyUsComponent } from './components/why-us/why-us.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, WorkoutOptionsComponent, WhyUsComponent],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
