import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NutritionalPlansComponent } from '../home/components/nutritional-plans/nutritional-plans.component';

@Component({
  selector: 'app-healthy',
  imports: [NutritionalPlansComponent],
  templateUrl: './healthy.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Healthy {}
