'use client';

import { useGetAllSupplierDocument } from '@/app/api/hooks/supplier_profile/document/useCRUDSupplierDocument';
import ModalDocument from '@/components/apps/supplier_profile/document/_components/document-modal';
import RenderPlainDataTable from '@/components/commons/plain-data-tables';
import { IRootState } from '@/store';
import { setModalEdit, setModalForm } from '@/store/themeConfigSlice';
import { useDispatch, useSelector } from 'react-redux';

const rowData = [
  {
    id: 1,
    no: 1,
    document_type: 'Neraca Laporan Rugi Laba (Non-Audit)',
    document_name: 'Laporan Laba Rugi 2024',
  },
];

const tableColumns = [
  { accessor: 'id', title: 'ID' },
  { accessor: 'no', title: 'No.' },
  { accessor: 'document_type', title: 'Jenis Dokumen' },
  { accessor: 'document_name', title: 'Nama Dokumen' },
  { accessor: 'action', title: 'Action' },
];

const DocumentProfilePanel = () => {
  const dispatch = useDispatch();
  const modalForm = useSelector(
    (state: IRootState) => state.themeConfig.modalForm,
  );
  const modalEdit = useSelector(
    (state: IRootState) => state.themeConfig.modalEdit,
  );
  const {
    data: listDocument,
    isLoading,
    refetch,
  } = useGetAllSupplierDocument(); // data lainnya akan digunakan untuk table

  const handleSetModal = (isOpen: boolean) => {
    dispatch(setModalForm(isOpen));
  };
  const handleSetModalEdit = (isOpen: boolean) => {
    dispatch(setModalEdit(isOpen));
  };

  return (
    <div className='panel mb-5'>
      <ModalDocument
        modal={modalForm}
        modalEdit={modalEdit}
        setModal={handleSetModal}
        setModalEdit={handleSetModalEdit}
        refetch={refetch}
      />

      <RenderPlainDataTable
        title='Dokumen'
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

export default DocumentProfilePanel;
