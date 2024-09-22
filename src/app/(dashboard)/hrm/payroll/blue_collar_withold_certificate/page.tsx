import { Metadata } from 'next';
import React from 'react';

import ComponentBlueCollarWitholdCertificate from '@/components/apps/hrm/payroll/blue_collar_withold_certificate/component-blue-collar-withold-certificate';

export const metadata: Metadata = {
  title: 'Blue Collar Withold Certificate',
};

const BlueCollarWitholdCertificatePage = () => {
  return <ComponentBlueCollarWitholdCertificate />;
};

export default BlueCollarWitholdCertificatePage;
