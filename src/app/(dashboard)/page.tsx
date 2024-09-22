import { Metadata } from 'next';
import React from 'react';

import ComponentsDashboardSales from '@/components/dashboard/components-dashboard-sales';

export const metadata: Metadata = {
  title: 'ERP Admin',
};

const Sales = () => {
  return <ComponentsDashboardSales />;
};

export default Sales;
