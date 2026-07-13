import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  MealCategory,
  MealCategoryApiResponse,
  MealCategoryApi,
  MealListApiResponse,
  MealApi,
  Meal,
} from '../home/home.model';
import { MealService } from '../home/services/meal/meal.service';
import { TranslocoPipe } from '@jsverse/transloco';
import { CustomCarousel } from '@org/shared-components';
import { Button } from '../../../shared/components/button/button';
import { switchMap } from 'rxjs';
import { HealthyWrapper } from '../home/components/healthy-wrapper/healthy-wrapper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-healthy',
  imports: [TranslocoPipe, Button, CustomCarousel, HealthyWrapper],
  templateUrl: './healthy.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Healthy implements OnInit {
  readonly mealService = inject(MealService);
  readonly destroyRef = inject(DestroyRef);

  private router = inject(Router);

  mealCategoryList = signal<MealCategory[]>([]);
  mealList = signal<Meal[]>([]);
  selectedCategoryName = signal<string>('');

  ngOnInit(): void {
    this.getInitMealList();
  }

  goToMealDetails = (meal: Meal) => {
    console.log(meal);
    this.router.navigate(['/landing/meal-details', meal._id]);
  };

  getInitMealList() {
    this.mealService
      .getMealCategories()
      .pipe(
        switchMap((res: MealCategoryApiResponse) => {
          this.mealCategoryList.set(
            res.categories.map((category: MealCategoryApi) => ({
              _id: category.idCategory,
              name: category.strCategory,
              image: category.strCategoryThumb,
              description: category.strCategoryDescription,
            }))
          );
          return this.mealService.getMealListByCategoryName(
            this.mealCategoryList()[0].name
          );
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((res: MealListApiResponse) => {
        this.mealList.set(this.mapMealList(res.meals));
        this.selectedCategoryName.set(this.mealCategoryList()[0].name);
      });
  }

  selectCategory(catName: string) {
    this.getMealListByCategoryName(catName);
  }

  getMealListByCategoryName(catName: string) {
    this.mealService
      .getMealListByCategoryName(catName)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: MealListApiResponse) => {
        this.selectedCategoryName.set(catName);
        this.mealList.set(this.mapMealList(res.meals));
      });
  }

  mapMealList(mealList: MealApi[]): Meal[] {
    return mealList.map((meal: MealApi) => ({
      _id: meal.idMeal,
      name: meal.strMeal,
      image: meal.strMealThumb,
      country: meal.strArea,
      area: meal.strCountry,
    }));
  }
}
