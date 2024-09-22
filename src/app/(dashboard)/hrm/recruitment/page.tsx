import { Metadata } from 'next';
import React from 'react';

import ComponentsRecruitment from '@/components/apps/hrm/recruitment/component-recruitment';

export const metadata: Metadata = {
  title: 'Human Resource Management',
};

const RecruitmentPage = () => {
  return <ComponentsRecruitment />;
};

export default RecruitmentPage;
