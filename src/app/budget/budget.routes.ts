import { Routes } from '@angular/router';

export const budgetRoutes: Routes = [
  {
    path: 'budgets',
    loadComponent: () =>
      import('./budgets/budgets').then(component => component.Budgets),
  },
  {
    path: 'opex-approval',
    loadComponent: () =>
      import('./opex-approval/opex-approval')
        .then(component => component.OpexApproval),
  },
  {
    path: 'capex-approval',
    loadComponent: () =>
      import('./capex-approval/capex-approval')
        .then(component => component.CapexApproval),
  },
  {
    path: 'expense-approval',
    loadComponent: () =>
      import('./expense-approval/expense-approval')
        .then(component => component.ExpenseApproval),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'budgets',
  },
];