import { Metadata } from 'next';
import React from 'react';

import ComponentsHpp from '@/components/apps/accounting_report/hpp/component-hpp';

export const metadata: Metadata = {
  title: 'HPP Report',
};

const HppPage = () => {
  return <ComponentsHpp />;
};

export default HppPage;
