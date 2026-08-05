import { Routes } from '@angular/router';

export const administrationRoutes: Routes = [
  {
    path: 'users',
    loadComponent: () => import('./users/users').then((x) => x.Users),
  },
  {
    path: 'roles',
    loadComponent: () => import('./roles/roles').then((x) => x.Roles),
  },
  {
    path: 'permissions',
    loadComponent: () =>
      import('./permissions/permissions').then((x) => x.Permissions),
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users',
  },
];
