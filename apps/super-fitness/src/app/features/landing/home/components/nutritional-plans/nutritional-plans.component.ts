import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-nutritional-plans',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './nutritional-plans.component.html',
  styleUrl: './nutritional-plans.component.css',
})
export class NutritionalPlansComponent {}
