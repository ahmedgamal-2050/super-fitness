import { APP_STORAGE } from './../../shared/constants/app-storage';
import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Get token from localStorage
  const token = localStorage.getItem(APP_STORAGE.token) ?? '';

  let apiHeader = new HttpHeaders({
    'Accept-Language': localStorage.getItem(APP_STORAGE.language) ?? 'en',
  });
  if (token) {
    apiHeader = apiHeader
      .set('Authorization', `Bearer ${token}`)
      .set('token', token)
      .set(
        'Accept-Language',
        localStorage.getItem(APP_STORAGE.language) ?? 'en'
      );
  }

  const cloned = req.clone({
    headers: apiHeader,
  });
  return next(cloned);
};
