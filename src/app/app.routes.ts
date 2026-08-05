import { Routes } from '@angular/router';

import { Login } from './auth/login/login';
import { DashboardLayout } from './layout/dashboard-layout/dashboard-layout';
import { Santosh } from './santosh/santosh'; 
import { authGuard } from './core/guards/auth-guard';
import { Dashboard } from './administration/dashboard/dashboard';

export const routes: Routes = [

{
    path: '',
    component: Santosh,
  },
  
  {
    path: 'login',
    component: Login,
  },

  {
    //dashboard
    path: 'dashboard',
    component: DashboardLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },

      {
        path: 'administration',
        loadChildren: () =>
          import('./administration/administration.routes')
            .then(routes => routes.administrationRoutes),
      },

      {
        path: 'business-partners',
        loadChildren: () =>
          import('./business-partners/business-partners.routes')
            .then(routes => routes.businessPartnerRoutes),
      },

      {
        path: 'masters',
        loadChildren: () =>
          import('./masters/masters.routes')
            .then(routes => routes.masterRoutes),
      },

      {
        path: 'budget',
        loadChildren: () =>
          import('./budget/budget.routes')
            .then(routes => routes.budgetRoutes),
      },

      {
        path: 'employee-services',
        loadChildren: () =>
          import('./employee-services/employee-services.routes')
            .then(routes => routes.employeeServicesRoutes),
      },

      {
        path: 'procurement',
        loadChildren: () =>
          import('./procurement/procurement.routes')
            .then(routes => routes.procurementRoutes),
      },

      {
        path: 'finance',
        loadChildren: () =>
          import('./finance/finance.routes')
            .then(routes => routes.financeRoutes),
      },

      {
        path: 'revenue',
        loadChildren: () =>
          import('./revenue/revenue.routes')
            .then(routes => routes.revenueRoutes),
      },

      {
        path: 'reports',
        loadChildren: () =>
          import('./reports/reports.routes')
            .then(routes => routes.reportsRoutes),
      },

      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
    ],
  },

  {
      path: 'unauthorized',
      loadComponent: () =>
        import('./shared/pages/unauthorized/unauthorized').then(component => component.Unauthorized),
    },

    {
      path: 'not-found',
      loadComponent: () => import('./shared/pages/not-found/not-found').then(component => component.NotFound),
    },


  {
    path: '**',
    redirectTo: 'not-found',
  },

];