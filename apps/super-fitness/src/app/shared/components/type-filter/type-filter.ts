import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { MealService } from '../../../features/landing/home/services/meal/meal.service';
import {
  Meal,
  MealApi,
  MealCategoryApi,
} from '../../../features/landing/home/home.model';

export interface TypeFilterItem {
  label: string;
  value: string;
}

@Component({
  selector: 'app-type-filter',
  imports: [],
  templateUrl: './type-filter.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeFilter implements OnInit, OnDestroy {
  readonly mealService = inject(MealService);

  items = signal<TypeFilterItem[]>([]);
  meals = signal<Meal[]>([]);
  selected = signal<string | null>(null);
  loading = signal<boolean>(false);

  mealsChange = output<Meal[]>();
  selectionChange = output<string>();

  private categoriesSubscription?: Subscription;
  private mealsSubscription?: Subscription;

  ngOnInit(): void {
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.categoriesSubscription?.unsubscribe();
    this.mealsSubscription?.unsubscribe();
  }

  loadCategories(): void {
    this.loading.set(true);
    this.categoriesSubscription = this.mealService
      .getMealCategories()
      .pipe(
        switchMap(res => {
          const items = res.categories.map((category: MealCategoryApi) => ({
            label: category.strCategory,
            value: category.strCategory,
          }));
          this.items.set(items);
          const firstValue = items[0]?.value ?? null;
          this.selected.set(firstValue);
          return firstValue
            ? this.mealService.getMealListByCategoryName(firstValue)
            : [];
        })
      )
      .subscribe(res => {
        this.loading.set(false);
        if (!res) return;
        const meals = this.mapMeals(res.meals);
        this.meals.set(meals);
        this.mealsChange.emit(meals);
      });
  }

  onSelect(value: string): void {
    if (value === this.selected()) return;
    this.selected.set(value);
    this.selectionChange.emit(value);
    this.loadMeals(value);
  }

  loadMeals(value: string): void {
    this.loading.set(true);
    this.mealsSubscription = this.mealService
      .getMealListByCategoryName(value)
      .subscribe(res => {
        this.loading.set(false);
        const meals = this.mapMeals(res.meals);
        this.meals.set(meals);
        this.mealsChange.emit(meals);
      });
  }

  mapMeals(meals: MealApi[]): Meal[] {
    return meals.map(meal => ({
      _id: meal.idMeal,
      name: meal.strMeal,
      image: meal.strMealThumb,
      area: meal.strArea,
      country: meal.strCountry,
    }));
  }
}
