import { Routes } from '@angular/router';

export const masterRoutes: Routes = [
  {
    path: 'organization',
    loadComponent: () =>
      import('./organization/organization').then(x => x.Organization),
  },
  {
    path: 'departments',
    loadComponent: () =>
      import('./departments/departments').then(x => x.Departments),
  },
  {
    path: 'employees',
    loadComponent: () =>
      import('./employees/employees').then(x => x.Employees),
  },
  {
    path: 'account-masters',
    loadComponent: () =>
      import('./account-masters/account-masters')
        .then(x => x.AccountMasters),
  },
  {
    path: 'assets',
    loadComponent: () =>
      import('./assets/assets').then(x => x.Assets),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'organization',
  },
];