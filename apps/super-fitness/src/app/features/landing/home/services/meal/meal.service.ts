import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENDPOINTS } from '../../../../../shared/constants/endpoints';
import { Observable } from 'rxjs';
import { MealCategoryApiResponse, MealListApiResponse } from '../../home.model';
import { MealDetailsApiResponse } from '../../../healthy/components/ingredients/ingredients.model';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  readonly http = inject(HttpClient);

  getMealCategories(): Observable<MealCategoryApiResponse> {
    const url = `${ENDPOINTS.MEAL_CATEGORIES}`;
    return this.http.get<MealCategoryApiResponse>(url);
  }

  getMealListByCategoryName(
    categoryName: string
  ): Observable<MealListApiResponse> {
    const url = ENDPOINTS.MEAL_LIST_BY_CATEGORY_NAME.replace(
      '{categoryName}',
      categoryName
    );
    return this.http.get<MealListApiResponse>(url);
  }

  getMealDetails(mealId: string): Observable<MealDetailsApiResponse> {
    const url = ENDPOINTS.MEAL_DETAILS.replace('{mealId}', mealId);
    return this.http.get<MealDetailsApiResponse>(url);
  }
}
