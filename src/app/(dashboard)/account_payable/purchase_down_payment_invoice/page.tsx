import { Metadata } from 'next';
import React from 'react';

import ComponentsPurchaseDownPaymentInvoice from '@/components/apps/account_payable/purchase_down_payment_invoice/component-purchase-down-payment-invoice';

export const metadata: Metadata = {
  title: 'Purchase Down Payment Invoice',
};

const PurchaseDownPaymentInvoicePage = () => {
  return <ComponentsPurchaseDownPaymentInvoice />;
};

export default PurchaseDownPaymentInvoicePage;
