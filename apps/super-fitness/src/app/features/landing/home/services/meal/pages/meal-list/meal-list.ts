import {
  Component,
  inject,
  input,
  Input,
  model,
  output,
  signal,
} from '@angular/core';
import { MealService } from '../../meal.service';
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
