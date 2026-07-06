import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { CustomCarousel } from '@org/shared-components';
import { Button } from '../../../../../shared/components/button/button';
import { MealService } from '../../services/meal/meal.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  MealCategory,
  MealCategoryApi,
  MealCategoryApiResponse,
} from '../../home.model';
import { HealthyWrapper } from '../healthy-wrapper/healthy-wrapper';

@Component({
  selector: 'app-nutritional-plans',
  standalone: true,
  imports: [HealthyWrapper, Button, CustomCarousel, TranslocoPipe],
  templateUrl: './nutritional-plans.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NutritionalPlansComponent implements OnInit {
  readonly mealService = inject(MealService);
  readonly destroyRef = inject(DestroyRef);

  mealCategoryList = signal<MealCategory[]>([]);

  ngOnInit(): void {
    this.getMealCategories();
  }

  getMealCategories() {
    this.mealService
      .getMealCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: MealCategoryApiResponse) => {
        this.mealCategoryList.set(
          res.categories.map((category: MealCategoryApi) => ({
            _id: category.idCategory,
            name: category.strCategory,
            image: category.strCategoryThumb,
            description: category.strCategoryDescription,
          }))
        );
      });
  }
}
