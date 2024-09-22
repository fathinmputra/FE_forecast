'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CreateBreadCrumb from '@/hooks/createBreadCrumb';

import ModalNewSalesOrder from '@/components/apps/sales/sales_order/_components/modal-new-sales-order';
import SalesOrderTable from '@/components/apps/sales/sales_order/_components/sales-order-table';

import { IRootState } from '@/store';
import { setModalForm } from '@/store/themeConfigSlice';

import { useGetAllSalesOrders } from '@/app/api/hooks/sales/sales_order/useCRUDSalesOrder';

const ComponentsSalesOrder = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const modalForm = useSelector(
    (state: IRootState) => state.themeConfig.modalForm,
  );
  const { data: listSalesOrder, isLoading, refetch } = useGetAllSalesOrders();

  const handleSetModal = (isOpen: boolean) => {
    dispatch(setModalForm(isOpen));
  };
  return (
    <div className='space-y-5'>
      <CreateBreadCrumb pathname={pathname} key={1} />
      <button
        type='button'
        className='btn btn-primary'
        onClick={() => dispatch(setModalForm(true))}
      >
        Add New Sales Order
      </button>
      <ModalNewSalesOrder
        modal={modalForm}
        setModal={handleSetModal}
        refetch={refetch}
      />
      <div className='relative flex h-full flex-col sm:h-[calc(100vh_-_150px)]'>
        <SalesOrderTable
          data={listSalesOrder}
          isLoading={isLoading}
          refetch={refetch}
        />
      </div>
    </div>
  );
};

export default ComponentsSalesOrder;
