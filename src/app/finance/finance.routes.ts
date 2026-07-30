import { Routes } from '@angular/router';

export const financeRoutes: Routes = [
  {
    path: 'accounts-payable',
    loadComponent: () =>
      import('./accounts-payable/accounts-payable')
        .then(component => component.AccountsPayable),
  },
  {
    path: 'accounts-receivable',
    loadComponent: () =>
      import('./accounts-receivable/accounts-receivable')
        .then(component => component.AccountsReceivable),
  },
  {
    path: 'payments',
    loadComponent: () =>
      import('./payments/payments')
        .then(component => component.Payments),
  },
  {
    path: 'journal-entries',
    loadComponent: () =>
      import('./journal-entries/journal-entries')
        .then(component => component.JournalEntries),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'accounts-payable',
  },
];