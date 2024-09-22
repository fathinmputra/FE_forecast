'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CreateBreadCrumb from '@/hooks/createBreadCrumb';

import ModalNewTransfer from '@/components/apps/inventory/inventory_transfers/_components/modal-new-transfers';
import TransfersTable from '@/components/apps/inventory/inventory_transfers/_components/transfers-table';

import { IRootState } from '@/store';
import { setModalForm } from '@/store/themeConfigSlice';

import { useGetAllTransfers } from '@/app/api/hooks/inventory/transfer/useCRUDTransfer';

const ComponentsInventoryTransfers = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const modalForm = useSelector(
    (state: IRootState) => state.themeConfig.modalForm,
  );
  const { data: listTransfers, isLoading, refetch } = useGetAllTransfers();

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
        Add New Transfer
      </button>
      <ModalNewTransfer
        modal={modalForm}
        setModal={handleSetModal}
        refetch={refetch}
      />
      <div className='relative flex h-full flex-col sm:h-[calc(100vh_-_150px)]'>
        <TransfersTable
          data={listTransfers}
          isLoading={isLoading}
          refetch={refetch}
        />
      </div>
    </div>
  );
};

export default ComponentsInventoryTransfers;
