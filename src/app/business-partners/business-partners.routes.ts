import { Routes } from '@angular/router';

export const businessPartnerRoutes: Routes = [
  {
    path: 'customers',
    loadComponent: () =>
      import('./customers/customers').then(x => x.Customers),
  },
  {
    path: 'vendors',
    loadComponent: () =>
      import('./vendors/vendors').then(x => x.Vendors),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'customers',
  },
];