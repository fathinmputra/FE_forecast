'use client'

import { DataTable } from 'mantine-datatable';
import { useDispatch, useSelector } from 'react-redux';

import ModalCertification from '@/components/apps/supplier_profile/certification/_components/certification-modal';
import IconTrashLines from '@/components/icon/icon-trash-lines';

import { IRootState } from '@/store';
import { setModalEdit, setModalForm } from '@/store/themeConfigSlice';

import { useGetAllSupplierCertification } from '@/app/api/hooks/supplier_profile/certification/useCRUDSupplierCertification';

const rowData = [
  {
    id: 1,
    no: 1,
    certification_type: 'Mutu',
    certification_name: 'ISO 9001:2015',
    certification_number: '12345678',
    released_by: 'DYLOID',
    released_date: '2020-01-01',
    expiration_date: '2030-01-01',
  }
]

const CertificationPanel = () => {
  const dispatch = useDispatch();
  const modalForm = useSelector(
    (state: IRootState) => state.themeConfig.modalForm,
  );
  const modalEdit = useSelector(
    (state: IRootState) => state.themeConfig.modalEdit,
  );
  const { data: listBankAccount, isLoading, refetch } = useGetAllSupplierCertification(); // data lainnya akan digunakan untuk table

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
          <div className="flex flex-col gap-0">
            <h2 className="text-xl font-semibold">Sertifikasi</h2>
            <p className="text-gray-500 italic">Jika diisi, file akan diupload pada bagian Dokumen</p>
          </div>
          <button
            type='button' 
            className='btn btn-primary'
            onClick={() => handleSetModal(true)}
          >
            Tambah data
          </button>
          <ModalCertification
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
              { accessor: 'certification_type', title: 'Jenis Sertifikasi' },
              { accessor: 'certification_name', title: 'Nama Sertifikasi' },
              { accessor: 'certification_number', title: 'No. Sertifikasi' },
              { accessor: 'released_by', title: 'Penerbit' },
              { accessor: 'released_date', title: 'Tanggal Berlaku' },
              { accessor: 'expiration_date', title: 'Tanggal Berakhir' },
              {
                accessor: 'action',
                title: 'Action',
                render: () => (
                  <>
                    <button className='btn btn-error btn-sm'>
                      <IconTrashLines className='h-4.5 w-4.5 text-red-600' />
                    </button>
                  </>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default CertificationPanel;