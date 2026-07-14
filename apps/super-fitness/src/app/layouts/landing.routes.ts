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
    path: APP_ROUTES.LANDING.ABOUT,
    loadComponent: () =>
      import('../features/landing/about/about').then(m => m.About),
  },
  {
    path: APP_ROUTES.LANDING.CLASSES,
    loadComponent: () =>
      import('../features/landing/classes/classes').then(m => m.Classes),
  },
  {
    path: APP_ROUTES.LANDING.HEALTHY,
    loadComponent: () =>
      import('../features/landing/healthy/healthy').then(m => m.Healthy),
  },
  {
    path: APP_ROUTES.LANDING.PROFILE,
    loadComponent: () =>
      import('../features/landing/profile-account/profile-account').then(
        m => m.ProfileAccount
      ),
  },
  {
    path: APP_ROUTES.LANDING.CHANGE_PASSWORD,
    loadComponent: () =>
      import('../features/landing/profile-account/components/change-password/change-password').then(
        m => m.ChangePasswordPage
      ),
  },
  {
    path: `${APP_ROUTES.LANDING.Meal_Details}:id`,
    loadComponent: () =>
      import('../features/landing/home/services/meal/pages/meal-details/meal-details').then(
        m => m.MealDetails
      ),
  },
  {
    path: '',
    redirectTo: APP_ROUTES.LANDING.HOME,
    pathMatch: 'full',
  },
];
