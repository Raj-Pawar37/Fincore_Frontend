import { Routes } from '@angular/router';

export const reportsRoutes: Routes = [
  {
    path: 'procurement',
    loadComponent: () =>
      import('./procurement-reports/procurement-reports')
        .then(component => component.ProcurementReports),
  },
  {
    path: 'warehouse',
    loadComponent: () =>
      import('./warehouse-reports/warehouse-reports')
        .then(component => component.WarehouseReports),
  },
  {
    path: 'finance',
    loadComponent: () =>
      import('./finance-reports/finance-reports')
        .then(component => component.FinanceReports),
  },
  {
    path: 'employee',
    loadComponent: () =>
      import('./employee-reports/employee-reports')
        .then(component => component.EmployeeReports),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'procurement',
  },
];