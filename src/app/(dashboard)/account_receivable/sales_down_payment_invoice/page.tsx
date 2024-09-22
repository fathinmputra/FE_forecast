import { Metadata } from 'next';
import React from 'react';

import ComponentsSalesDownPaymentInvoice from '@/components/apps/account_receivable/sales_down_payment_invoice/component-sales-down-payment-invoice';

export const metadata: Metadata = {
  title: 'Sales Down Payment Invoice',
};

const SalesDownPaymentInvoicePage = () => {
  return <ComponentsSalesDownPaymentInvoice />;
};

export default SalesDownPaymentInvoicePage;
