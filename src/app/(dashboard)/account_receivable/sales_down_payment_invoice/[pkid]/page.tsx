import { Metadata } from 'next';
import React from 'react';

import ComponentSalesDownPaymentInvoiceDetail from '@/components/apps/account_receivable/sales_down_payment_invoice/component-sales-down-payment-invoice-detail';

export const metadata: Metadata = {
  title: 'Sales Down Payment Invoice',
};
const SalesDownPaymentInvoiceDetailPage = ({
  params,
}: {
  params: { pkid: number };
}) => {
  return <ComponentSalesDownPaymentInvoiceDetail pkid={params.pkid} />;
};

export default SalesDownPaymentInvoiceDetailPage;
