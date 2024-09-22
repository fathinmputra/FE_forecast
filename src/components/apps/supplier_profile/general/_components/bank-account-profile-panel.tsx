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
  { accessor: 'action', title: 'Action' },
]

const BankAccountProfilePanel = () => {
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
        action='D'
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
    </div>
  );
};

export default BankAccountProfilePanel;
