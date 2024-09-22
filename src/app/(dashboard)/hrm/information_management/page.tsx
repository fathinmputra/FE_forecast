import { Metadata } from 'next';
import React from 'react';

import ComponentsInformationManagement from '@/components/apps/hrm/information_management/component-information_management';

export const metadata: Metadata = {
  title: 'Human Resource Management',
};

const InformationManagementPage = () => {
  return <ComponentsInformationManagement />;
};

export default InformationManagementPage;
