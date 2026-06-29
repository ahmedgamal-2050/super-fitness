import { Route } from '@angular/router';
import { APP_ROUTES } from '../shared/constants/app-routes';

export const landingRoutes: Route[] = [
  {
    path: APP_ROUTES.LANDING.HOME,
    loadComponent: () =>
      import('../features/landing/home/home.component').then(
        m => m.HomeComponent
      ),
  },
  {
    path: '',
    redirectTo: APP_ROUTES.LANDING.HOME,
    pathMatch: 'full',
  },
];
