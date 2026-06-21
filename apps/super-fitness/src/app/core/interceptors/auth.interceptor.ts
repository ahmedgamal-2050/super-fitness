import { APP_STORAGE } from './../../shared/constants/app-storage';
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Get token from localStorage
  const token = localStorage.getItem(APP_STORAGE.token) ?? '';

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        token: token,
      },
    });
    return next(cloned);
  }

  return next(req);
};
