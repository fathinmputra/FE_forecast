import { Metadata } from 'next';
import React from 'react';

import ComponentsGeneralLedger from '@/components/apps/accounting_report/general_ledger/component-general-ledger';

export const metadata: Metadata = {
  title: 'General Ledger',
};

const GeneralLedgerPage = () => {
  return <ComponentsGeneralLedger />;
};

export default GeneralLedgerPage;
