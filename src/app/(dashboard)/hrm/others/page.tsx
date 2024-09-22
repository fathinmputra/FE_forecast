import { Metadata } from 'next';
import React from 'react';

import ComponentOthers from '@/components/apps/hrm/others/component-others';

export const metadata: Metadata = {
  title: 'Others',
};

const OthersPage = () => {
  return <ComponentOthers />;
};

export default OthersPage;
