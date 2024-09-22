import { Metadata } from 'next';
import React from 'react';

import ComponentsQualityDashboard from '@/components/apps/quality/quality_dashboard/component-quality-dashboard';

export const metadata: Metadata = {
  title: 'Quality Dashboard',
};

const QualityDashboardPage = () => {
  return <ComponentsQualityDashboard />;
};

export default QualityDashboardPage;
