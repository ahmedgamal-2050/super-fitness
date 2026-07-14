import { Component, input, model, output } from '@angular/core';
import { MealByCategory, MealCategoryApi } from '../../../../home.model';
import { CategoryFilter } from '../category-filter/category-filter';

@Component({
  selector: 'app-meal-list',
  imports: [CategoryFilter],
  templateUrl: './meal-list.html',
  styleUrl: './meal-list.css',
})
export class MealList {
  categoryList = input.required<MealCategoryApi[]>();
  meals = input.required<MealByCategory[]>();
  activeCategory = model('');
  mealSelected = output<string>();
}
