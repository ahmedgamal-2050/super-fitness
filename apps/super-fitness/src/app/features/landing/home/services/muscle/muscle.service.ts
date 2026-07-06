import { inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ENDPOINTS } from '../../../../../shared/constants/endpoints';
import { MuscleGroupResponse, MuscleListResponse } from '../../home.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MuscleService {
  readonly http = inject(HttpClient);

  getMusclesGroups(): Observable<MuscleGroupResponse> {
    const url = `${ENDPOINTS.MUSCLE_GROUP_LIST}`;
    return this.http.get<MuscleGroupResponse>(url);
  }

  getMusclesListByGroupId(groupId: string): Observable<MuscleListResponse> {
    const url = `${ENDPOINTS.MUSCLE_LIST_BY_GROUP_ID}`.replace(
      '/{groupId}',
      groupId ? `/${groupId}` : ''
    );
    return this.http.get<MuscleListResponse>(url);
  }
}
