import { inject } from '@angular/core';
import { AuthService } from '../../features/auth/data-access';
import { APP_STORAGE } from './../../shared/constants/app-storage';
import { HttpInterceptorFn } from '@angular/common/http';
import { SECONDARY_BASE_URL } from '../../shared/constants/endpoints';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getToken();

  if (token && !req.url.includes(SECONDARY_BASE_URL)) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Accept-Language': localStorage.getItem(APP_STORAGE.language) ?? 'en',
      },
    });
    return next(cloned);
  }

  const cloned = req.clone({
    setHeaders: {
      'Accept-Language': localStorage.getItem(APP_STORAGE.language) ?? 'en',
    },
  });
  return next(cloned);
};
