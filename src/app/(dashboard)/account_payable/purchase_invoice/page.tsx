import { Metadata } from 'next';
import React from 'react';

import ComponentsPurchaseInvoice from '@/components/apps/account_payable/purchase_invoice/component-purchase-invoice';

export const metadata: Metadata = {
  title: 'Purchase Invoice',
};

const PurchaseInvoicePage = () => {
  return <ComponentsPurchaseInvoice />;
};

export default PurchaseInvoicePage;
