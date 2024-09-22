import { Metadata } from 'next';
import React from 'react';

import ComponentsDashboardCrypto from '@/components/dashboard/components-dashboard-crypto';

export const metadata: Metadata = {
  title: 'Crypto',
};

const Crypto = () => {
  return <ComponentsDashboardCrypto />;
};

export default Crypto;
