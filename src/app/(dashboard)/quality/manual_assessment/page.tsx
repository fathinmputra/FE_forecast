import { Metadata } from 'next';
import React from 'react';

import ComponentsManualAssessment from '@/components/apps/quality/manual_assessment/component-manual-assessment';

export const metadata: Metadata = {
  title: 'Manual Assessment',
};

const ManualAssessmentPage = () => {
  return <ComponentsManualAssessment />;
};

export default ManualAssessmentPage;
