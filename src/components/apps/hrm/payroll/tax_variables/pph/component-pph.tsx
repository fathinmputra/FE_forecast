'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CreateBreadCrumb from '@/hooks/createBreadCrumb';

import ModalPPH from '@/components/apps/hrm/payroll/tax_variables/pph/_components/modal-pph';
import PPHTable from '@/components/apps/hrm/payroll/tax_variables/pph/_components/pph-table';

import { IRootState } from '@/store';
import { setModalForm } from '@/store/themeConfigSlice';

import { useGetAllPPH } from '@/app/api/hooks/hrm/tax_variables/pph/useGetAllPPH';

const ComponentsPPH = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const modalForm = useSelector(
    (state: IRootState) => state.themeConfig.modalForm,
  );
  const { data: listCategory, isLoading, refetch } = useGetAllPPH();
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
        Add New Status Keluarga, PTKP & Tunjangan
      </button>
      <ModalPPH modal={modalForm} setModal={handleSetModal} refetch={refetch} />
      <div className='relative flex h-full flex-col gap-5 sm:h-[calc(100vh_-_150px)]'>
        <PPHTable data={listCategory} isLoading={isLoading} refetch={refetch} />
      </div>
    </div>
  );
};

export default ComponentsPPH;
