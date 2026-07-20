import { Route } from '@angular/router';
import { APP_ROUTES } from '../shared/constants/app-routes';
import { loggedInGuard } from '../core/guards/logged-in.guard';

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
    canActivate: [loggedInGuard],
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
    path: APP_ROUTES.LANDING.CHANGE_WEIGHT,
    loadComponent: () =>
      import('../features/landing/profile-account/components/change-weight/change-weight').then(
        m => m.ChangeWeightPage
      ),
  },
  {
    path: APP_ROUTES.LANDING.CHANGE_GOAL,
    loadComponent: () =>
      import('../features/landing/profile-account/components/change-goal/change-goal').then(
        m => m.ChangeGoalPage
      ),
  },
  {
    path: APP_ROUTES.LANDING.CHANGE_LEVEL,
    loadComponent: () =>
      import('../features/landing/profile-account/components/change-level/change-level').then(
        m => m.ChangeLevelPage
    ),
  },
  {
    path: `${APP_ROUTES.LANDING.Class_Details}/:groupId/:muscleId`,
    loadComponent: () =>
      import('../features/landing/classes/pages/class-details/class-details').then(
        m => m.ClassDetails
      ),
  },
  {
    path: '',
    redirectTo: APP_ROUTES.LANDING.HOME,
    pathMatch: 'full',
  },
];
