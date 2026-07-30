import { Routes } from '@angular/router';

export const revenueRoutes: Routes = [
  {
    path: 'entries',
    loadComponent: () =>
      import('./revenue-entries/revenue-entries')
        .then(component => component.RevenueEntries),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./revenue-dashboard/revenue-dashboard')
        .then(component => component.RevenueDashboard),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
];