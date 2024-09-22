import { Metadata } from 'next';
import React from 'react';

import ComponentSalesInvoiceDetail from '@/components/apps/account_receivable/sales_invoice/component-sales-invoice-detail';

export const metadata: Metadata = {
  title: 'Sales Invoice',
};

const SalesInvoiceDetailPage = ({ params }: { params: { pkid: number } }) => {
  return <ComponentSalesInvoiceDetail pkid={params.pkid} />;
};

export default SalesInvoiceDetailPage;
