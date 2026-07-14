import { Component, effect, inject, signal } from '@angular/core';
import { MealList } from '../meal-list/meal-list';
import { MediaArea } from '../media-area/media-area';
import { MealService } from '../../meal.service';
import {
  MealByCategory,
  MealCategoryApi,
  mealDetails,
} from '../../../../home.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-meal-details',
  imports: [MealList, MediaArea],
  templateUrl: './meal-details.html',
  styleUrl: './meal-details.css',
})
export class MealDetails {
  constructor() {
    effect(() => {
      const category = this.activeCategory();

      if (category) {
        this.getMealByCategory(category);
      }
    });
  }
  private route = inject(ActivatedRoute);
  private mealService = inject(MealService);
  activeCategory = signal('');
  categoryList = signal<MealCategoryApi[]>([]);
  mealList = signal<MealByCategory[]>([]);
  mealDetails = signal<mealDetails[]>([]);
  ingredients = signal<{ ingredient: string; measure: string }[]>([]);

  getMealDetails(mealId: string) {
    this.mealService.mealDetailsById(mealId).subscribe(response => {
      this.mealDetails.set(response.meals);

      const meal = response.meals[0];

      const ingredients: { ingredient: string; measure: string }[] = [];

      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[
          `strIngredient${i}` as keyof mealDetails
        ] as string;

        const measure = meal[`strMeasure${i}` as keyof mealDetails] as string;

        if (ingredient?.trim()) {
          ingredients.push({
            ingredient,
            measure: measure ?? '',
          });
        }
      }

      this.ingredients.set(ingredients);
    });
  }

  getMealCategory() {
    this.mealService.getMealCategories().subscribe(res => {
      this.categoryList.set(res.categories);

      if (res.categories.length) {
        this.activeCategory.set(res.categories[0].strCategory);
      }
    });
  }

  getMealByCategory(mealId: string) {
    this.mealService.getMealListByCategoryName(mealId).subscribe(res => {
      this.mealList.set(res.meals);
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const mealId = params.get('id');

      if (mealId) {
        this.getMealDetails(mealId);
      }
    });

    this.getMealCategory();
  }
}
