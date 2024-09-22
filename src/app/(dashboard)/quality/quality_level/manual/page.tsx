import { Metadata } from 'next';
import React from 'react';

import ComponentsManualQualityLevel from '@/components/apps/quality/quality_level/manual/component-manual-quality-level';

export const metadata: Metadata = {
  title: 'Manual Quality Level',
};

const ManualQualityLevelPage = () => {
  return <ComponentsManualQualityLevel />;
};

export default ManualQualityLevelPage;
