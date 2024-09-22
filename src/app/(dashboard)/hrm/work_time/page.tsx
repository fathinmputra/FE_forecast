import { Metadata } from 'next';
import React from 'react';

import ComponentsWorkTime from '@/components/apps/hrm/work_time/component-work-time';

export const metadata: Metadata = {
  title: 'Human Resource Management',
};

const WorkTimePage = () => {
  return <ComponentsWorkTime />;
};

export default WorkTimePage;
