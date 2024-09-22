import { Metadata } from 'next';
import React from 'react';

import ComponentPurchaseDownPaymentInvoiceDetail from '@/components/apps/account_payable/purchase_down_payment_invoice/component-purchase-down-payment-invoice-detail';

export const metadata: Metadata = {
  title: 'Purchase Down Payment Invoice',
};
const PurchaseDownPaymentInvoiceDetailPage = ({
  params,
}: {
  params: { pkid: number };
}) => {
  return <ComponentPurchaseDownPaymentInvoiceDetail pkid={params.pkid} />;
};

export default PurchaseDownPaymentInvoiceDetailPage;
