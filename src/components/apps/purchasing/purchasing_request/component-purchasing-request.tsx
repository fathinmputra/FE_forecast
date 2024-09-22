'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CreateBreadCrumb from '@/hooks/createBreadCrumb';

import ModalNewPurchaseRequest from '@/components/apps/purchasing/purchasing_request/_components/modal-new-purchase-request';
import PurchaseRequestTable from '@/components/apps/purchasing/purchasing_request/_components/purchase-request-table';

import { IRootState } from '@/store';
import { setModalForm } from '@/store/themeConfigSlice';

import { useGetAllPurchase } from '@/app/api/hooks/purchasing/purchase_request/useCRUDPurchaseRequest';
const ComponentsPurchasingRequest = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const modalForm = useSelector(
    (state: IRootState) => state.themeConfig.modalForm,
  );
  const { data: listPurchaseRequest, isLoading, refetch } = useGetAllPurchase();

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
        Add New Purchase Request
      </button>
      <ModalNewPurchaseRequest
        modal={modalForm}
        setModal={handleSetModal}
        refetch={refetch}
      />
      <div className='relative flex h-full flex-col sm:h-[calc(100vh_-_150px)]'>
        <PurchaseRequestTable
          data={listPurchaseRequest}
          isLoading={isLoading}
          refetch={refetch}
        />
      </div>
    </div>
  );
};

export default ComponentsPurchasingRequest;
