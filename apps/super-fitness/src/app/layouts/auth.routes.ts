import { Route } from '@angular/router';
// import { forgetPasswordGuard } from '../../core/guards/forgetPassword.guard';

export const authRoutes: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('../features/auth/pages/login-page/login-page').then(
        m => m.LoginPage
      ),
  },
  // {
  //   path: 'register',
  //   loadComponent: () =>
  //     import('./pages/register-page/register-page').then((m) => m.RegisterPage),
  // },
  // {
  //   path: 'forget-password',
  //   loadComponent: () =>
  //     import('./pages/forget-password/forget-password.component').then(
  //       (m) => m.ForgetPasswordComponent,
  //     ),
  // },
  // {
  //   path: 'set-password',
  //   loadComponent: () =>
  //     import('./pages/set-password/set-password.component').then(
  //       (m) => m.SetPasswordComponent,
  //     ),
  //   canActivate: [forgetPasswordGuard],
  // },
];
