'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import React from 'react';

import CreateBreadCrumb from '@/hooks/createBreadCrumb';

const ComparisonChart = dynamic(
  () => import('./_components/comparison_procurement_contract_chart'),
  { ssr: false },
);
const ContractChart = dynamic(() => import('./_components/contract_chart'), {
  ssr: false,
});
const ContractCost = dynamic(
  () => import('./_components/contract_cost_chart'),
  { ssr: false },
);
const ProcurementChart = dynamic(
  () => import('./_components/procurement_chart'),
  { ssr: false },
);
const SummaryCard = dynamic(
  () => import('./_components/summary_procurement_contract_chart'),
  { ssr: false },
);

const ComponentsQualityDashboard = () => {
  const pathname = usePathname();

  return (
    <div className='space-y-5 p-4'>
      <CreateBreadCrumb pathname={pathname} key={1} />

      <SummaryCard />

      <div className='flex space-x-5'>
        <div className='w-full sm:w-1/2 lg:w-1/2'>
          <ProcurementChart />
        </div>
        <div className='w-full sm:w-1/2 lg:w-1/2'>
          <ContractChart />
        </div>
      </div>

      <div className='mt-5 w-full'>
        <ComparisonChart />
      </div>

      <div className='mt-5 w-full'>
        <ContractCost />
      </div>
    </div>
  );
};

export default ComponentsQualityDashboard;
