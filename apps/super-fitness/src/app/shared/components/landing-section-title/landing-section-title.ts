import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { LucideDumbbell } from '@lucide/angular';

@Component({
  selector: 'app-landing-section-title',
  imports: [TranslocoPipe, LucideDumbbell],
  templateUrl: './landing-section-title.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingSectionTitle {
  title = input.required<string>();
  type = input<'workouts' | 'why-us' | 'healthy'>('workouts');
  isCenter = input<boolean>(false);
}
