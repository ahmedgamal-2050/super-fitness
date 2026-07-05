import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENDPOINTS } from '../../../../../shared/constants/endpoints';
import { Observable } from 'rxjs';
import { MealCategoryApiResponse } from '../../home.model';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  readonly http = inject(HttpClient);

  getMealCategories(): Observable<MealCategoryApiResponse> {
    const url = `${ENDPOINTS.MEAL_CATEGORIES}`;
    return this.http.get<MealCategoryApiResponse>(url);
  }
}
