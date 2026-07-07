import { Route } from '@angular/router';
import { APP_ROUTES } from '../shared/constants/app-routes';

export const authRoutes: Route[] = [
  { path: '', redirectTo: APP_ROUTES.AUTH.LOGIN, pathMatch: 'full' },
  {
    path: APP_ROUTES.AUTH.LOGIN,
    loadComponent: () =>
      import('.../features/auth/pages/login/login.component').then(
        m => m.LoginComponent
      ),
  },
  {
    path: APP_ROUTES.AUTH.REGISTER,
    loadComponent: () =>
      import('../pages/register/register.component').then(
        m => m.RegisterComponent
      ),
  },
  // {
  //   path: APP_ROUTES.AUTH.FORGET_PASSWORD,
  //   loadComponent: () =>
  //     import('./pages/register-page/register-page').then((m) => m.RegisterPage),
  // },
  {
    path: 'forget-password',
    loadComponent: () =>
      import('../features/auth/pages/forget-password-layout/forget-password-layout').then(
        m => m.ForgetPasswordLayout
      ),
  },
  // {
  //   path: APP_ROUTES.AUTH.SET_PASSWORD,
  //   loadComponent: () =>
  //     import('../pages/set-password/set-password.component').then(
  //       (m) => m.SetPasswordComponent,
  //     ),
  // },
];
