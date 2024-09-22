'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import CreateBreadCrumb from '@/hooks/createBreadCrumb';

import WorkTime from '@/components/apps/hrm/work_time/_components/work_time';

const ComponentsWorkTime = () => {
  const pathname = usePathname();

  return (
    <div className='mb-5 space-y-5'>
      <CreateBreadCrumb pathname={pathname} key={1} />
      <div className='relative flex h-full flex-col gap-5 sm:h-[calc(100vh_-_150px)]'>
        <WorkTime />
      </div>
    </div>
  );
};

export default ComponentsWorkTime;
