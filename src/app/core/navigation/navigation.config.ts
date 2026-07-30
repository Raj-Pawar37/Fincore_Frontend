import { NavigationItem } from './navigation.interface';

export const navigationItems: NavigationItem[] = [
  {
    label: 'Dashboard',
    icon: 'bi-speedometer2',
    route: '/dashboard',
  },
  {
    label: 'Administration',
    icon: 'bi-shield-lock',
    children: [
      {
        label: 'Users',
        icon: 'bi-people',
        route: '/administration/users',
        // description: 'Create and manage ERP user accounts.',
      },
      {
        label: 'Roles',
        icon: 'bi-person-badge',
        route: '/administration/roles',
        // description: 'Manage roles and role permissions.',
      },
      {
        label: 'Permissions',
        icon: 'bi-key',
        route: '/administration/permissions',
        // description: 'Manage page and action permissions.',
      },
    ],
  },
  {
    label: 'Business Partners',
    icon: 'bi-briefcase',
    children: [
      {
        label: 'Customers',
        icon: 'bi-person-vcard',
        route: '/business-partners/customers',
        // description: 'Create and maintain customer information.',
      },
      {
        label: 'Vendors',
        icon: 'bi-truck',
        route: '/business-partners/vendors',
        // description: 'Create and maintain vendor information.',
      },
    ],
  },
  {
    label: 'Masters',
    icon: 'bi-database',
    children: [
      {
        label: 'Organization',
        icon: 'bi-building',
        route: '/masters/organization',
      },
      {
        label: 'Departments',
        icon: 'bi-diagram-3',
        route: '/masters/departments',
      },
      {
        label: 'Employees',
        icon: 'bi-person-workspace',
        route: '/masters/employees',
      },
      {
        label: 'Account Masters',
        icon: 'bi-journal-text',
        route: '/masters/account-masters',
      },
      {
        label: 'Assets',
        icon: 'bi-box-seam',
        route: '/masters/assets',
      },
    ],
  },
  {
    label: 'Budget',
    icon: 'bi-wallet2',
    children: [
      {
        label: 'Budgets',
        icon: 'bi-cash-stack',
        route: '/budget/budgets',
      },
      {
        label: 'OPEX Approval',
        icon: 'bi-check2-square',
        route: '/budget/opex-approval',
      },
      {
        label: 'CAPEX Approval',
        icon: 'bi-check-circle',
        route: '/budget/capex-approval',
      },
      {
        label: 'Expense Approval',
        icon: 'bi-receipt',
        route: '/budget/expense-approval',
      },
    ],
  },
  {
    label: 'Employee Services',
    icon: 'bi-person-lines-fill',
    children: [
      {
        label: 'CAPEX Requests',
        icon: 'bi-file-earmark-plus',
        route: '/employee-services/capex-requests',
      },
      {
        label: 'Expense Claims',
        icon: 'bi-receipt-cutoff',
        route: '/employee-services/expense-claims',
      },
    ],
  },
  {
    label: 'Procurement',
    icon: 'bi-cart3',
    children: [
      {
        label: 'Purchase Requisitions',
        icon: 'bi-file-earmark-text',
        route: '/procurement/purchase-requisitions',
      },
      {
        label: 'Requests for Quotation',
        icon: 'bi-send',
        route: '/procurement/rfqs',
      },
      {
        label: 'Quotations',
        icon: 'bi-file-text',
        route: '/procurement/quotations',
      },
      {
        label: 'Quotation Comparison',
        icon: 'bi-bar-chart',
        route: '/procurement/quotation-comparison',
      },
      {
        label: 'Purchase Orders',
        icon: 'bi-bag-check',
        route: '/procurement/purchase-orders',
      },
      {
        label: 'Goods Receipts',
        icon: 'bi-box-arrow-in-down',
        route: '/procurement/goods-receipts',
      },
    ],
  },
  {
    label: 'Finance',
    icon: 'bi-bank',
    children: [
      {
        label: 'Accounts Payable',
        icon: 'bi-arrow-up-right-circle',
        route: '/finance/accounts-payable',
      },
      {
        label: 'Accounts Receivable',
        icon: 'bi-arrow-down-left-circle',
        route: '/finance/accounts-receivable',
      },
      {
        label: 'Payments',
        icon: 'bi-credit-card',
        route: '/finance/payments',
      },
      {
        label: 'Journal Entries',
        icon: 'bi-journal-check',
        route: '/finance/journal-entries',
      },
    ],
  },
  {
    label: 'Revenue',
    icon: 'bi-graph-up-arrow',
    children: [
      {
        label: 'Revenue Entries',
        icon: 'bi-table',
        route: '/revenue/entries',
      },
      {
        label: 'Revenue Dashboard',
        icon: 'bi-pie-chart',
        route: '/revenue/dashboard',
      },
    ],
  },
  {
    label: 'Reports',
    icon: 'bi-file-earmark-bar-graph',
    children: [
      {
        icon: 'bi-pie-chart',
        label: 'Procurement Reports',
        route: '/reports/procurement',
      },
      {
        icon: 'bi-pie-chart',
        label: 'Warehouse Reports',
        route: '/reports/warehouse',
      },
      {
        icon: 'bi-pie-chart',
        label: 'Finance Reports',
        route: '/reports/finance',
      },
      {
        icon: 'bi-pie-chart',
        label: 'Employee Reports',
        route: '/reports/employee',
      },
    ],
  },
];