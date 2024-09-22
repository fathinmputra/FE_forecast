'use client';

import { useDispatch, useSelector } from 'react-redux';

import ModalBankAccount from '@/components/apps/supplier_profile/general/_components/bank-account-modal';
import IconTrashLines from '@/components/icon/icon-trash-lines';

import { IRootState } from '@/store';
import { setModalEdit, setModalForm } from '@/store/themeConfigSlice';

import { useGetAllBankAccount } from '@/app/api/hooks/cash_bank/bank_account/useGetAllBankAccount';
import RenderPlainDataTable from '@/components/commons/plain-data-tables';

const rowData = [
  {
    id: 1,
    no: 1,
    account_number: '12345678',
    owner: 'John Doe',
    bank_name: 'Bank A',
    branch_name: 'Cabang A',
    address: 'Jalan A',
  },
];

const tableColumns = [
  { accessor: 'id', title: 'ID' },
  { accessor: 'no', title: 'No.' },
  { accessor: 'account_number', title: 'No. Rekening' },
  { accessor: 'owner', title: 'Pemilik Rekening' },
  { accessor: 'bank_name', title: 'Nama Bank' },
  { accessor: 'branch_name', title: 'Cabang' },
  { accessor: 'address', title: 'Alamat' },
  {
    accessor: 'action',
    title: 'Action',
    // render: () => (
    //   <>
    //     <button className='btn btn-error btn-sm'>
    //       <IconTrashLines className='h-4.5 w-4.5 text-red-600' />
    //     </button>
    //   </>
    // ),
  },
]

const BankAccountPanel = () => {
  const dispatch = useDispatch();
  const modalForm = useSelector(
    (state: IRootState) => state.themeConfig.modalForm,
  );
  const modalEdit = useSelector(
    (state: IRootState) => state.themeConfig.modalEdit,
  );
  const { data: listBankAccount, isLoading, refetch } = useGetAllBankAccount(); // data lainnya akan digunakan untuk table

  const handleSetModal = (isOpen: boolean) => {
    dispatch(setModalForm(isOpen));
  };
  const handleSetModalEdit = (isOpen: boolean) => {
    dispatch(setModalEdit(isOpen));
  };

  return (
    <div className='panel mb-5'>
      <ModalBankAccount
        modal={modalForm}
        modalEdit={modalEdit}
        setModal={handleSetModal}
        setModalEdit={handleSetModalEdit}
        refetch={refetch}
      />
      <RenderPlainDataTable
        title='Rekening Bank'
        data={rowData} 
        columns={tableColumns}
        isLoading={isLoading}
        refetch={refetch}
        hide_columns={['pkid']}
        detailPath='/'
        action='UD'
        deleteFunc={() => {return;}}
        AdditionalButtons={
          <button 
            type='button'
            className='btn btn-primary'
            onClick={() => dispatch(setModalForm(true))}
          >
            Tambah data
          </button>
        }
      />
      {/* <div className='mb-5 flex flex-col gap-5 px-5'>
        <div className='flex justify-between'>
          <h2 className='text-xl font-semibold'>Rekening Bank</h2>
          <button 
            type='button'
            className='btn btn-primary'
            onClick={() => dispatch(setModalForm(true))}
          >
            Tambah data
          </button>
          <ModalBankAccount
            modal={modalForm}
            modalEdit={modalEdit}
            setModal={handleSetModal}
            setModalEdit={handleSetModalEdit}
            refetch={refetch}
          />
        </div>

        <div className='datatables'>
          <DataTable
            className='table-hover whitespace-nowrap'
            records={rowData}
            columns={[
              { accessor: 'id', title: 'ID' },
              { accessor: 'no', title: 'No.' },
              { accessor: 'account_number', title: 'No. Rekening' },
              { accessor: 'owner', title: 'Pemilik Rekening' },
              { accessor: 'bank_name', title: 'Nama Bank' },
              { accessor: 'branch_name', title: 'Cabang' },
              { accessor: 'address', title: 'Alamat' },
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
      </div> */}
    </div>
  );
};

export default BankAccountPanel;
