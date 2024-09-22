'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CreateBreadCrumb from '@/hooks/createBreadCrumb';

import ModalNewPurchaseOrder from '@/components/apps/purchasing/purchasing_order/_components/modal-new-purchase-order';
import PurchaseOrderTable from '@/components/apps/purchasing/purchasing_order/_components/purchase-order-table';

import { IRootState } from '@/store';
import { setModalForm } from '@/store/themeConfigSlice';

import { useGetAllPurchaseOrders } from '@/app/api/hooks/purchasing/purchase_order/useCRUDPurchaseOrder';
const ComponentsPurchasingOrder = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const modalForm = useSelector(
    (state: IRootState) => state.themeConfig.modalForm,
  );
  const {
    data: listPurchaseOrder,
    isLoading,
    refetch,
  } = useGetAllPurchaseOrders();

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
        Add New Purchase Order
      </button>
      <ModalNewPurchaseOrder
        modal={modalForm}
        setModal={handleSetModal}
        refetch={refetch}
      />
      <div className='relative flex h-full flex-col sm:h-[calc(100vh_-_150px)]'>
        <PurchaseOrderTable
          data={listPurchaseOrder}
          isLoading={isLoading}
          refetch={refetch}
        />
      </div>
    </div>
  );
};

export default ComponentsPurchasingOrder;
