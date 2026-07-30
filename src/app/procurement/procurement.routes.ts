import { Routes } from '@angular/router';

export const procurementRoutes: Routes = [
  {
    path: 'purchase-requisitions',
    loadComponent: () =>
      import('./purchase-requisitions/purchase-requisitions')
        .then(component => component.PurchaseRequisitions),
  },
  {
    path: 'rfqs',
    loadComponent: () =>
      import('./rfqs/rfqs')
        .then(component => component.Rfqs),
  },
  {
    path: 'quotations',
    loadComponent: () =>
      import('./quotations/quotations')
        .then(component => component.Quotations),
  },
  {
    path: 'quotation-comparison',
    loadComponent: () =>
      import('./quotation-comparison/quotation-comparison')
        .then(component => component.QuotationComparison),
  },
  {
    path: 'purchase-orders',
    loadComponent: () =>
      import('./purchase-orders/purchase-orders')
        .then(component => component.PurchaseOrders),
  },
  {
    path: 'goods-receipts',
    loadComponent: () =>
      import('./goods-receipts/goods-receipts')
        .then(component => component.GoodsReceipts),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'purchase-requisitions',
  },
];