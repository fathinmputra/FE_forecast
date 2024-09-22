'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import CreateBreadCrumb from '@/hooks/createBreadCrumb';

import InformationManagement from '@/components/apps/hrm/information_management/_components/information-management';

const ComponentsInformationManagement = () => {
  const pathname = usePathname();

  return (
    <div className='mb-5 space-y-5'>
      <CreateBreadCrumb pathname={pathname} key={1} />
      <div className='relative flex h-full flex-col gap-5 sm:h-[calc(100vh_-_150px)]'>
        <InformationManagement />
      </div>
    </div>
  );
};

export default ComponentsInformationManagement;
