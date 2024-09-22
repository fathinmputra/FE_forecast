import { Metadata } from 'next';
import React from 'react';

import ComponentsIncomeStatement from '@/components/apps/accounting_report/income_statement/component-income-statement';

export const metadata: Metadata = {
  title: 'Income Statement Report',
};

const IncomeStatementPage = () => {
  return <ComponentsIncomeStatement />;
};

export default IncomeStatementPage;
