import { Routes } from '@angular/router';
import { DashboardLayout } from './layout/dashboard-layout/dashboard-layout';
import { Dashboard } from './administration/dashboard/dashboard';
import { Login } from './auth/login/login';
import { Quotation } from './purchase-requisition/quotation/quotation';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },

  {
    path: '',
    component: DashboardLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        path: 'quotation',
        component: Quotation
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      }
    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];
