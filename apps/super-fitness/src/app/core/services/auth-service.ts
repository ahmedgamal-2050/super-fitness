import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENDPOINTS } from '../../shared/constants/endpoints';
import { SignupPayload } from '../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  signup(payload: SignupPayload) {
    return this.http.post(ENDPOINTS.AUTH.SIGNUP, payload);
  }
}
