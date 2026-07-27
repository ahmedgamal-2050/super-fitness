import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoPipe } from '@jsverse/transloco';

import { MealService } from '../../../home/services/meal/meal.service';
import {
  Ingredient,
  MealDetailsApi,
  MealDetailsApiResponse,
} from './ingredients.model';

@Component({
  selector: 'app-ingredients',
  imports: [TranslocoPipe],
  templateUrl: './ingredients.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Ingredients {
  readonly mealService = inject(MealService);
  readonly destroyRef = inject(DestroyRef);

  mealId = input.required<string>();

  ingredientList = signal<Ingredient[]>([]);

  constructor() {
    effect(() => {
      const mealId = this.mealId();
      if (mealId) {
        this.getMealDetails(mealId);
      }
    });
  }

  getMealDetails(mealId: string) {
    this.mealService
      .getMealDetails(mealId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: MealDetailsApiResponse) => {
        this.ingredientList.set(this.mapIngredientList(res.meals[0]));
      });
  }

  mapIngredientList(meal: MealDetailsApi): Ingredient[] {
    const ingredientList: Ingredient[] = [];

    for (let i = 1; i <= 20; i++) {
      const name = meal[`strIngredient${i}` as keyof MealDetailsApi];
      const quantity = meal[`strMeasure${i}` as keyof MealDetailsApi];

      if (name?.trim()) {
        ingredientList.push({
          name: name.trim(),
          quantity: quantity?.trim() ?? '',
        });
      }
    }

    return ingredientList;
  }
}
