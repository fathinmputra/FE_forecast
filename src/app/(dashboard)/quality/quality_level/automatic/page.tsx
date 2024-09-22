import { Metadata } from 'next';
import React from 'react';

import ComponentsAutoQualityLevel from '@/components/apps/quality/quality_level/automatic/component-auto-quality-level';

export const metadata: Metadata = {
  title: 'Automatic Quality Level',
};

const AutoQualityLevelPage = () => {
  return <ComponentsAutoQualityLevel />;
};

export default AutoQualityLevelPage;
