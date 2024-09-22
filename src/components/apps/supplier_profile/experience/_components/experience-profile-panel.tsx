'use client';

import { useGetAllSupplierExperience } from '@/app/api/hooks/supplier_profile/experience/useCRUDSupplierExperience';
import ModalExperience from '@/components/apps/supplier_profile/experience/_components/experience-modal';
import RenderPlainDataTable from '@/components/commons/plain-data-tables';
import { IRootState } from '@/store';
import { setModalEdit, setModalForm } from '@/store/themeConfigSlice';
import { useDispatch, useSelector } from 'react-redux';

const rowData = [
  {
    id: 1,
    no: 1,
    client_name: 'WIKA',
    project_name: 'Tol Cilacap',
    contract_number: '01.200.10/III/2024',
    start_date: '2024-01-01',
    end_date: '2025-01-01',
    description: '-',
  },
];

const tableColumns = [
  { accessor: 'id', title: 'ID' },
  { accessor: 'no', title: 'No.' },
  { accessor: 'client_name', title: 'Nama Client' },
  { accessor: 'project_name', title: 'Nama Proyek' },
  { accessor: 'contract_number', title: 'No. Kontrak' },
  { accessor: 'start_date', title: 'Tanggal Berlaku' },
  { accessor: 'end_date', title: 'Tanggal Berakhir' },
  { accessor: 'description', title: 'Keterangan' },
  { accessor: 'action', title: 'Action' },
];

const SupplierExperienceProfilePanel = () => {
  const dispatch = useDispatch();
  const modalForm = useSelector(
    (state: IRootState) => state.themeConfig.modalForm,
  );
  const modalEdit = useSelector(
    (state: IRootState) => state.themeConfig.modalEdit,
  );
  const {
    data: listBankAccount,
    isLoading,
    refetch,
  } = useGetAllSupplierExperience(); // data lainnya akan digunakan untuk table

  const handleSetModal = (isOpen: boolean) => {
    dispatch(setModalForm(isOpen));
  };
  const handleSetModalEdit = (isOpen: boolean) => {
    dispatch(setModalEdit(isOpen));
  };

  return (
    <div className='panel mb-5'>
      <ModalExperience
        modal={modalForm}
        modalEdit={modalEdit}
        setModal={handleSetModal}
        setModalEdit={handleSetModalEdit}
        refetch={refetch}
      />

      <RenderPlainDataTable
        title='Pengalaman'
        data={rowData}
        columns={tableColumns}
        isLoading={isLoading}
        refetch={refetch}
        hide_columns={['id']}
        detailPath='/'
        action='ED'
        deleteFunc={() => {
          return;
        }}
        AdditionalButtons={
          <button
            type='button'
            className='btn btn-primary'
            onClick={() => handleSetModal(true)}
          >
            Tambah data
          </button>
        }
      />
    </div>
  );
};

export default SupplierExperienceProfilePanel;
