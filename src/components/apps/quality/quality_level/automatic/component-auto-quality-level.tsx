'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import React from 'react';

import CreateBreadCrumb from '@/hooks/createBreadCrumb';

const CostComplianceCharts = dynamic(
  () => import('./_components/cost_compliace_charts'),
  { ssr: false },
);
const OnTimeDeliveryCharts = dynamic(
  () => import('./_components/ontime_dilevery_charts'),
  { ssr: false },
);
const QualityCheckCharts = dynamic(
  () => import('./_components/quality_check_charts'),
  { ssr: false },
);

const ComponentsAutoQualityLevel = () => {
  const pathname = usePathname();

  return (
    <div className='space-y-5'>
      <CreateBreadCrumb pathname={pathname} key={1} />

      {/* Grid layout with 2 columns */}
      <div className='grid grid-cols-1 gap-6'>
        {/* First row */}
        <div className='rounded bg-white p-6 shadow'>
          <h2 className='mb-4 text-lg font-semibold'>
            On-Time Delivery Analysis
          </h2>
          <OnTimeDeliveryCharts />
        </div>

        {/* Second row */}
        <div className='rounded bg-white p-6 shadow'>
          <h2 className='mb-4 text-lg font-semibold'>
            Cost Compliance Analysis
          </h2>
          <CostComplianceCharts />
        </div>

        {/* Third row */}
        <div className='rounded bg-white p-6 shadow'>
          <h2 className='mb-4 text-lg font-semibold'>Quality Check Analysis</h2>
          <QualityCheckCharts /> {/* Add the new charts component here */}
        </div>
      </div>
    </div>
  );
};

export default ComponentsAutoQualityLevel;
