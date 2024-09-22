'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CreateBreadCrumb from '@/hooks/createBreadCrumb';

import CustomerTable from '@/components/apps/sales/sales_customer/_components/customer-table';
import ModalNewCustomer from '@/components/apps/sales/sales_customer/_components/modal-new-customer';

import { IRootState } from '@/store';
import { setModalForm } from '@/store/themeConfigSlice';

import { useGetAllCustomer } from '@/app/api/hooks/sales/customer/useCRUDCustomer';

const ComponentsCustomer = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const modalForm = useSelector(
    (state: IRootState) => state.themeConfig.modalForm,
  );
  const { data: listCustomers, isLoading, refetch } = useGetAllCustomer();

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
        Add New Customer
      </button>
      <ModalNewCustomer
        modal={modalForm}
        setModal={handleSetModal}
        refetch={refetch}
      />
      <div className='relative flex h-full flex-col sm:h-[calc(100vh_-_150px)]'>
        <CustomerTable
          data={listCustomers}
          isLoading={isLoading}
          refetch={refetch}
        />
      </div>
    </div>
  );
};

export default ComponentsCustomer;
