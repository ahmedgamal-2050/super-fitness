import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { MealService } from '../../meal.service';
import { CustomCarousel } from '@org/shared-components';

interface RecommendationMeal {
  id: string;
  name: string;
  image: string;
}

@Component({
  selector: 'app-recommendation-meals',
  standalone: true,
  imports: [CustomCarousel],
  templateUrl: './recommendation-meals.htm',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendationMealsComponent implements OnInit {
  private readonly mealService = inject(MealService);
  mealCategories = signal<RecommendationMeal[]>([]);

  ngOnInit(): void {
    this.getMealCategories();
  }

  getMealCategories(): void {
    this.mealService.getMealCategories().subscribe({
      next: res => {
        console.log(res.categories);
        this.mealCategories.set(
          res.categories.slice(0, 3).map(meal => ({
            id: meal.idCategory,
            name: meal.strCategory.toUpperCase(),
            image: meal.strCategoryThumb,
          }))
        );
      },
    });
  }

  openMeal(id: string): void {
    console.log(id);
  }
}
