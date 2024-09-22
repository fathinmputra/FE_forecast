import { Metadata } from 'next';
import React from 'react';

import ComponentsSalesInvoice from '@/components/apps/account_receivable/sales_invoice/component-sales-invoice';

export const metadata: Metadata = {
  title: 'Sales Invoice',
};

const SalesInvoicePage = () => {
  return <ComponentsSalesInvoice />;
};

export default SalesInvoicePage;
