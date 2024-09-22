import { Metadata } from 'next';
import React from 'react';

import ComponentPayroll from '@/components/apps/hrm/payroll/component-payroll';

export const metadata: Metadata = {
  title: 'Recruitment Request',
};

const PayrollPage = () => {
  return <ComponentPayroll />;
};

export default PayrollPage;
