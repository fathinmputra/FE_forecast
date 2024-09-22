import { Metadata } from 'next';
import React from 'react';

import ComponentsCashFlow from '@/components/apps/accounting_report/cash_flow/component-cash-flow';

export const metadata: Metadata = {
  title: 'Cash Flow',
};

const CashFlowPage = () => {
  return <ComponentsCashFlow />;
};

export default CashFlowPage;
