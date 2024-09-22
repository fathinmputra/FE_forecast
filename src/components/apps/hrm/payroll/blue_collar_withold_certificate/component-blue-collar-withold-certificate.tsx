'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import CreateBreadCrumb from '@/hooks/createBreadCrumb';

const ComponentsBlueCollarWitholdCertificate = () => {
  const pathname = usePathname();
  return (
    <div className='space-y-5'>
      <CreateBreadCrumb pathname={pathname} key={1} />
      <div className='flex min-h-screen items-center justify-center'>
        {' '}
        <h2 className='text-4xl font-semibold text-blue-500'>
          {' '}
          Blue Collar Withold Certificate Template
        </h2>
      </div>
    </div>
  );
};

export default ComponentsBlueCollarWitholdCertificate;
