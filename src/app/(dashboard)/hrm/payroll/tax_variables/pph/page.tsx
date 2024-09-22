import { Metadata } from 'next';
import React from 'react';

import ComponentPPH from '@/components/apps/hrm/payroll/tax_variables/pph/component-pph';

export const metadata: Metadata = {
  title: 'PPH',
};

const PPHPage = () => {
  return <ComponentPPH />;
};

export default PPHPage;
