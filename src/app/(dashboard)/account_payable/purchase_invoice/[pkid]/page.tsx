import { Metadata } from 'next';
import React from 'react';

import ComponentPurchaseInvoiceDetail from '@/components/apps/account_payable/purchase_invoice/component-purchase-invoice-detail';

export const metadata: Metadata = {
  title: 'Purchase Invoice',
};

const PurchaseInvoiceDetailPage = ({
  params,
}: {
  params: { pkid: number };
}) => {
  return <ComponentPurchaseInvoiceDetail pkid={params.pkid} />;
};

export default PurchaseInvoiceDetailPage;
