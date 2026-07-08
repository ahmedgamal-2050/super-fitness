import { inject } from '@angular/core';
import { AuthService } from '../../features/auth/data-access';
import { APP_STORAGE } from './../../shared/constants/app-storage';
import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getToken();

  let apiHeader = new HttpHeaders({
    'Accept-Language': localStorage.getItem(APP_STORAGE.language) ?? 'en',
  });
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(cloned);
  }

  const cloned = req.clone({
    headers: apiHeader,
  });
  return next(cloned);
};
