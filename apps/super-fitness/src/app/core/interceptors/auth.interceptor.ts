import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../features/auth/data-access';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getToken();

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        token,
      },
    });
    return next(cloned);
  }

  return next(req);
};
