import { Routes } from '@angular/router';

export const procurementRoutes: Routes = [
  {
    path: 'purchase-requisitions',
    loadComponent: () => import('./purchase-requisitions/purchase-requisitions').then(component => component.PurchaseRequisitions),
  },
  {
    path: 'rfqs',
    loadComponent: () => import('./rfqs/rfqs').then(component => component.Rfqs),
  },
  {
    path: 'quotations',
    loadComponent: () => import('./quotations/quotation').then(component => component.Quotations),
  },
  {
    path: 'quotations/:id',
    loadComponent: () => import('./quotations/quotation-detail/quotation-detail').then(c => c.QuoatationDetail)
  },
  {
    path: 'quotation-comparison',
    loadComponent: () => import('./quotation-comparison/quotation-comparison').then(component => component.QuotationComparison),
  },
  {
    path: 'purchase-orders',
    loadComponent: () => import('./purchase-orders/purchase-orders').then(component => component.PurchaseOrders),
  },
  {
    path: 'purchase-orders/:id',
    loadComponent: () => import('./purchase-orders/purchase-order-detail/purchase-order-detail').then(c => c.PurchaseOrderDetail)
  },
  {
    path: 'goods-receipts',
    loadComponent: () => import('./goods-receipts/goods-receipts').then(component => component.GoodsReceipts),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'purchase-requisitions',
  },
];