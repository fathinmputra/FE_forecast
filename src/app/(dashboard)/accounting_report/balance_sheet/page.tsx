import { Metadata } from 'next';
import React from 'react';

import ComponentsBalanceSheet from '@/components/apps/accounting_report/balance_sheet/component-balance-sheet';

export const metadata: Metadata = {
  title: 'Balance Sheet',
};

const BalanceSheetPage = () => {
  return <ComponentsBalanceSheet />;
};

export default BalanceSheetPage;
