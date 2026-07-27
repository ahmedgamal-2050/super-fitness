import { Route } from '@angular/router';
import { APP_ROUTES } from '../shared/constants/app-routes';

export const authRoutes: Route[] = [
  { path: '', redirectTo: APP_ROUTES.AUTH.LOGIN, pathMatch: 'full' },
  {
    path: APP_ROUTES.AUTH.LOGIN,
    loadComponent: () =>
      import('../features/auth/pages/login-page/login-page').then(
        m => m.LoginPage
      ),
  },
  {
    path: APP_ROUTES.AUTH.REGISTER,
    loadComponent: () =>
      import('../pages/register/register.component').then(
        m => m.RegisterComponent
      ),
  },
  {
    path: 'forget-password',
    loadComponent: () =>
      import('../features/auth/pages/forget-password-layout/forget-password-layout').then(
        m => m.ForgetPasswordLayout
      ),
  },
];
