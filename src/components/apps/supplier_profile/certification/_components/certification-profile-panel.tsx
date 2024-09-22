'use client';

import { useGetAllSupplierCertification } from '@/app/api/hooks/supplier_profile/certification/useCRUDSupplierCertification';
import ModalCertification from '@/components/apps/supplier_profile/certification/_components/certification-modal';
import RenderPlainDataTable from '@/components/commons/plain-data-tables';
import { IRootState } from '@/store';
import { setModalEdit, setModalForm } from '@/store/themeConfigSlice';
import { useDispatch, useSelector } from 'react-redux';

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
  },
];

const tableColumns = [
  { accessor: 'id', title: 'ID' },
  { accessor: 'no', title: 'No.' },
  { accessor: 'certification_type', title: 'Jenis Sertifikasi' },
  { accessor: 'certification_name', title: 'Nama Sertifikasi' },
  { accessor: 'certification_number', title: 'No. Sertifikasi' },
  { accessor: 'released_by', title: 'Penerbit' },
  { accessor: 'released_date', title: 'Tanggal Berlaku' },
  { accessor: 'expiration_date', title: 'Tanggal Berakhir' },
  { accessor: 'action', title: 'Action' },
];

const CertificationProfilePanel = () => {
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
  } = useGetAllSupplierCertification(); // data lainnya akan digunakan untuk table

  const handleSetModal = (isOpen: boolean) => {
    dispatch(setModalForm(isOpen));
  };
  const handleSetModalEdit = (isOpen: boolean) => {
    dispatch(setModalEdit(isOpen));
  };

  return (
    <div className='panel mb-5'>
      <ModalCertification
        modal={modalForm}
        modalEdit={modalEdit}
        setModal={handleSetModal}
        setModalEdit={handleSetModalEdit}
        refetch={refetch}
      />

      <RenderPlainDataTable
        title='Sertifikasi'
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

export default CertificationProfilePanel;
