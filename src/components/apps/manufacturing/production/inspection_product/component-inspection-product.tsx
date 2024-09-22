'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import CreateBreadCrumb from '@/hooks/createBreadCrumb';

import InspectionProductTable from '@/components/apps/manufacturing/production/inspection_product/_components/inspection-product-table';

import { useGetAllInspectionProduct } from '@/app/api/hooks/manufacturing/inspection_product/useGetAllInspectionProduct';

const ComponentsInspectionProduct = () => {
  const pathname = usePathname();

  const {
    data: listInspectionProduct,
    isLoading,
    refetch,
  } = useGetAllInspectionProduct();

  return (
    <div className='space-y-5'>
      <CreateBreadCrumb pathname={pathname} key={1} />
      <div className='relative flex h-full flex-col gap-5'>
        <InspectionProductTable
          data={listInspectionProduct}
          isLoading={isLoading}
          refetch={refetch}
        />
      </div>
    </div>
  );
};

export default ComponentsInspectionProduct;
