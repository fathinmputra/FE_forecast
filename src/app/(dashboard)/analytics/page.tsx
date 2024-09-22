import { Metadata } from 'next';
import React from 'react';

import ComponentsDashboardAnalytics from '@/components/dashboard/components-dashboard-analytics';

export const metadata: Metadata = {
  title: 'Analytics Admin',
};

const Analytics = () => {
  return <ComponentsDashboardAnalytics />;
};

export default Analytics;
