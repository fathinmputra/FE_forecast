'use client'

import { DataTable } from 'mantine-datatable';

import IconTrashLines from '@/components/icon/icon-trash-lines';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { useGetAllSupplierExperience } from '@/app/api/hooks/supplier_profile/experience/useCRUDSupplierExperience';
import { setModalEdit, setModalForm } from '@/store/themeConfigSlice';
import ModalExperience from '@/components/apps/supplier_profile/experience/_components/experience-modal';

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
  }
]

const ExperiencePanel = () => {
  const dispatch = useDispatch();
  const modalForm = useSelector(
    (state: IRootState) => state.themeConfig.modalForm,
  );
  const modalEdit = useSelector(
    (state: IRootState) => state.themeConfig.modalEdit,
  );
  const { data: listBankAccount, isLoading, refetch } = useGetAllSupplierExperience(); // data lainnya akan digunakan untuk table

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
            <h2 className="text-xl font-semibold">Pengalaman</h2>
            <p className="text-gray-500 italic">Jika diisi, file akan diupload pada bagian Dokumen</p>
          </div>
          <button
            type='button' 
            className='btn btn-primary'
            onClick={() => handleSetModal(true)}
          >
            Tambah data
          </button>
          <ModalExperience
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
              { accessor: 'client_name', title: 'Nama Client' },
              { accessor: 'project_name', title: 'Nama Proyek' },
              { accessor: 'contract_number', title: 'No. Kontrak' },
              { accessor: 'start_date', title: 'Tanggal Berlaku' },
              { accessor: 'end_date', title: 'Tanggal Berakhir' },
              { accessor: 'description', title: 'Keterangan' },
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

export default ExperiencePanel;