import { Routes } from '@angular/router';

export const employeeServicesRoutes: Routes = [
  {
    path: 'capex-requests',
    loadComponent: () =>
      import('./capex-requests/capex-requests')
        .then(component => component.CapexRequests),
  },
  {
    path: 'expense-claims',
    loadComponent: () =>
      import('./expense-claims/expense-claims')
        .then(component => component.ExpenseClaims),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'capex-requests',
  },
];