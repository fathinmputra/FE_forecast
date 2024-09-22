'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CreateBreadCrumb from '@/hooks/createBreadCrumb';

import MaintenanceTable from '@/components/apps/asset/asset_maintenance/_components/maintenance-table';
import ModalAssetMaintenance from '@/components/apps/asset/asset_maintenance/_components/modal-maintenance-asset';

import { IRootState } from '@/store';
import { setModalEdit, setModalForm } from '@/store/themeConfigSlice';

import { useGetAllAssetMaintenance } from '@/app/api/hooks/fixed_asset/asset_maintenance/useGetAllAssetMaintenance';

const ComponentsAssetMaintenance = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const {
    data: listMaintenance,
    isLoading,
    refetch,
  } = useGetAllAssetMaintenance();
  const modalForm = useSelector(
    (state: IRootState) => state.themeConfig.modalForm,
  );
  const modalEdit = useSelector(
    (state: IRootState) => state.themeConfig.modalEdit,
  );
  const handleSetModal = (isOpen: boolean) => {
    dispatch(setModalForm(isOpen));
  };
  const handleSetModalEdit = (isOpen: boolean) => {
    dispatch(setModalEdit(isOpen));
  };
  return (
    <div className='space-y-5'>
      <CreateBreadCrumb pathname={pathname} key={1} />
      <button
        type='button'
        className='btn btn-primary'
        onClick={() => dispatch(setModalForm(true))}
      >
        Add New Maintenance
      </button>
      <ModalAssetMaintenance
        modal={modalForm}
        modalEdit={modalEdit}
        setModal={handleSetModal}
        setModalEdit={handleSetModalEdit}
        refetch={refetch}
      />
      <div className='relative flex h-full flex-col gap-5'>
        <MaintenanceTable
          data={listMaintenance}
          isLoading={isLoading}
          refetch={refetch}
        />
      </div>
    </div>
  );
};

export default ComponentsAssetMaintenance;
