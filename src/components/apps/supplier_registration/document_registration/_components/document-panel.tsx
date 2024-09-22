'use client'

import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import IconEye from '@/components/icon/icon-eye';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { useGetAllSupplierDocument } from '@/app/api/hooks/supplier_profile/document/useCRUDSupplierDocument';
import { setModalEdit, setModalForm } from '@/store/themeConfigSlice';
import ModalDocument from '@/components/apps/supplier_profile/document/_components/document-modal';

const rowData = [
  {
    id: 1,
    no: 1,
    document_type: 'Neraca Laporan Rugi Laba (Non-Audit)',
    document_name: 'Laporan Laba Rugi 2024',
  }
]

const DocumentPanel = () => {
  const dispatch = useDispatch();
  const modalForm = useSelector(
    (state: IRootState) => state.themeConfig.modalForm,
  );
  const modalEdit = useSelector(
    (state: IRootState) => state.themeConfig.modalEdit,
  );
  const { data: listDocument, isLoading, refetch } = useGetAllSupplierDocument(); // data lainnya akan digunakan untuk table

  const handleSetModal = (isOpen: boolean) => {
    dispatch(setModalForm(isOpen));
  };
  const handleSetModalEdit = (isOpen: boolean) => {
    dispatch(setModalEdit(isOpen));
  };

  return (
    <div className="panel mb-5">
      <div className="mb-5 flex flex-col gap-5 px-5">
        <div className='flex justify-between'>
          <h2 className="text-xl font-semibold">Dokumen</h2>
          <button 
            type='button' 
            className='btn btn-primary'
            onClick={() => handleSetModal(true)}
          >
            Tambah data
          </button>
          <ModalDocument 
            modal={modalForm}
            modalEdit={modalEdit}
            setModal={handleSetModal}
            setModalEdit={handleSetModalEdit}
            refetch={refetch}
          />
        </div>
        
        <div className="datatables">
          <DataTable
            className='table-hover whitespace-nowrap'
            records={rowData}
            columns={[
              { accessor: 'id', title: 'ID' },
              { accessor: 'no', title: 'No.' },
              { accessor: 'document_type', title: 'Jenis Dokumen' },
              { accessor: 'document_name', title: 'Nama Dokumen' },
              {
                accessor: 'action',
                title: 'Action',
                render: () => (
                  <div className='flex gap-2'>
                    <button className='btn btn-error btn-sm'>
                      <IconTrashLines className='h-4.5 w-4.5 text-red-600' />
                    </button>
                    <button className='btn btn-error btn-sm'>
                      <IconEye className='h-4.5 w-4.5 text-yellow-600' />
                    </button>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentPanel;