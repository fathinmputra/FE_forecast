'use client';

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

import deleteBaseAttributes from "@/hooks/deleteBaseAttribute";

import IconX from "@/components/icon/icon-x";

import { IRootState } from "@/store";

import { useCreateSupplierBankAccount } from "@/app/api/hooks/supplier_profile/general_info/useCRUDSupplierBankAccount";
import { useGetSupplierBankAccountByPkid } from "@/app/api/hooks/supplier_profile/general_info/useCRUDSupplierBankAccount";
import { useUpdateSupplierBankAccount } from "@/app/api/hooks/supplier_profile/general_info/useCRUDSupplierBankAccount";
import { supplierBankAccountInitialState } from "@/helpers/utils/supplier_portal/supplier_bank_account";

interface IModalBankAccountProps {
  modal: boolean;
  modalEdit: boolean;
  setModal: (value: boolean) => void;
  setModalEdit: (value: boolean) => void;
  refetch: () => void;
}

const ModalBankAccount = ({
  modal,
  modalEdit,
  setModal,
  setModalEdit,
  refetch,
}: IModalBankAccountProps) => {
  // const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
  
  const { mutateAsync: createBankAccount } = useCreateSupplierBankAccount();
  const { mutateAsync: updateBankAccount } = useUpdateSupplierBankAccount();
  const pkid = useSelector((state: IRootState) => state.themeConfig.pkid);

  const [form, setForm] = useState(supplierBankAccountInitialState);
  const [emptyField, setEmptyField] = useState([] as string[]);
  const [enabled, setEnabled] = useState(false);
  const {
    data: bankAccountDetail,
    isLoading,
    refetch: refetchDetail,
  } = useGetSupplierBankAccountByPkid(pkid, enabled);``

  // CHECK IF THE MODAL IS USED FOR EDITING
  useEffect(() => {
    if (pkid && modalEdit && !isLoading) {
      setEnabled(true);
      refetchDetail();
    }
  }, [pkid, modalEdit, isLoading, refetchDetail]);

  useEffect(() => {
    if(bankAccountDetail && modalEdit) {
      setForm(bankAccountDetail);
    }
  })

  const mandatoryValidation = () => {
    const temp = { ...form };
    const requiredField = [] as string[];
    const exludeItemField = [
      'created_by',
      'created_date',
      'created_host',
      'updated_by',
      'updated_date',
      'updated_host',
      'is_deleted',
      'deleted_by',
      'deleted_date',
      'deleted_host',
    ] as string[];
    const requiredData = Object.keys(temp).filter(
      data => !exludeItemField.includes(data),
    )
    requiredData.forEach(field => {
      if (
        temp[field as keyof typeof temp] === null ||
        temp[field as keyof typeof temp] === '' ||
        // temp[field as keyof typeof temp] === 0 ||
        temp[field as keyof typeof temp] === undefined
      ) {
        requiredField.push(field);
      }
    });
    if (requiredField.length > 0) {
      setEmptyField(requiredField);
      return false;
    }
    return true;
  }

  const handleOnChange = (
    value: string | null,
    key: string,
  ) => {
    setForm({ ...form, [key]: value });
  };

  const handleCancel = () => {
    if(JSON.stringify(form) === JSON.stringify(supplierBankAccountInitialState)) {
      if (modalEdit) {
        setModalEdit(false);
      }
      if (modal) {
        setModal(false);
      }
      setForm(supplierBankAccountInitialState);
      setEmptyField([]);
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Your data will not be saved!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Discard it!',
        cancelButtonText: 'No, cancel!',
      }).then(async result => {
        if (result.isConfirmed) {
          try {
            if (modalEdit) {
              setModalEdit(false);
            }
            if (modal) {
              setModal(false);
            }
            setForm(supplierBankAccountInitialState);
            setEmptyField([]);
          } catch (error) {
            await Swal.fire('Error!', 'Something went wrong', 'error');
          }
        }
      })
    }
  };

  const handleSubmit = async () => {
    const isMandatoryEmpty = mandatoryValidation();

    if(!isMandatoryEmpty) {
      await Swal.fire({
        title: 'Some Field is Empty',
        text: 'Please fill all mandatory field',
        icon: 'error',
        confirmButtonText: 'Close',
      });
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Save it!',
        cancelButtonText: 'No, cancel!',
      }).then(async result => {
        if (result.isConfirmed) {
          try {
            if (modalEdit) {
              const tempForm = { ...form };
              const formAfterDeletion = deleteBaseAttributes(tempForm);
              
              await updateBankAccount({
                pkid: pkid,
                data: formAfterDeletion,
              });
              setModalEdit(false);
            }
            if (modal) {
              await createBankAccount(form);

              setModal(false);
            }
            setForm(supplierBankAccountInitialState);
            setEmptyField([]);
            Swal.fire('Saved!', 'Your data has been saved.', 'success')
              .then(() => refetch());
          } catch (error) {
            await Swal.fire('Error!', 'Something went wrong', 'error');
          }
        }
      });
    }
  };

  const handleClose = () => {
    if(modalEdit) {
      setModalEdit(false);
      setForm(supplierBankAccountInitialState);
    }
    if(modal) {
      setModal(false);
    }
  };

  return (
    <Transition appear show={modal || modalEdit} as={Fragment}>
      <Dialog
        as="div"
        open={modal || modalEdit}
        onClose={() => {
          if(modalEdit) {
            setModalEdit(true);
          }
          if(modal) {
            setModal(true);
          }
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0" />
        </Transition.Child>
        <div
          id="slideIn_down_modal"
          className="fixed inset-0 z-[998] overflow-y-auto bg-[black]/60"
        >
          <div className="flex min-h-screen items-start justify-center px-4">
            <Dialog.Panel className='panel animate__animated animate__slideInDown dark:text-white-dark my-8 w-full max-w-6xl overflow-hidden rounded-lg border-0 p-0 text-black'>
              <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                <h5 className="text-lg font-bold">
                  {modal ? 'New' : 'Edit'} Supplier Bank Account
                </h5>
                <button
                  onClick={handleClose}
                  type='button'
                  className='text-white-dark hover:text-dark'
                >
                  <IconX />
                </button>
              </div>
              <div className="p-5">
                <div className="space-y-5">
                  <div>
                    <label htmlFor='modal_account_number'>
                      Nomor Rekening<span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                    id="modal_account_number"
                    name="modal_account_number"
                    placeholder="Nomor Rekening"
                    className="form-input"
                    type="text" 
                    onChange={
                      e => handleOnChange(String(e.target.value), 'account_number')
                    }
                    value={form.account_number || ''}
                    style={{
                      borderColor: emptyField.includes('account_number') ? 'red' : '',
                    }}
                    />
                  </div>
                  <div>
                    <label htmlFor='modal_owner'>
                      Pemilik Rekening<span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                    id="modal_owner"
                    name="modal_owner"
                    placeholder="Pemilik Rekening"
                    className="form-input"
                    type="text" 
                    onChange={
                      e => handleOnChange(String(e.target.value), 'owner')
                    }
                    value={form.owner || ''}
                    style={{
                      borderColor: emptyField.includes('owner') ? 'red' : '',
                    }}
                    />
                  </div>
                  <div>
                    <label htmlFor='modal_bank_name'>
                      Nama Bank<span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                    id="modal_bank_name"
                    name="modal_bank_name"
                    placeholder="Nama Bank"
                    className="form-input"
                    type="text" 
                    onChange={
                      e => handleOnChange(String(e.target.value), 'bank_name')
                    }
                    value={form.bank_name || ''}
                    style={{
                      borderColor: emptyField.includes('bank_name') ? 'red' : '',
                    }}
                    />
                  </div>
                  <div>
                    <label htmlFor='modal_branch_name'>
                      Cabang<span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                    id="modal_branch_name"
                    name="modal_branch_name"
                    placeholder="Cabang"
                    className="form-input"
                    type="text" 
                    onChange={
                      e => handleOnChange(String(e.target.value), 'branch_name')
                    }
                    value={form.branch_name || ''}
                    style={{
                      borderColor: emptyField.includes('branch_name') ? 'red' : '',
                    }}
                    />
                  </div>
                  <div>
                    <label htmlFor='modal_address'>
                      Alamat<span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                    id="modal_address"
                    name="modal_address"
                    placeholder="Alamat"
                    className="form-input"
                    type="text" 
                    onChange={
                      e => handleOnChange(String(e.target.value), 'modal_address')
                    }
                    value={form.address || ''}
                    style={{
                      borderColor: emptyField.includes('address') ? 'red' : '',
                    }}
                    />
                  </div>
                  <div className="mt-8 flex items-center justify-end">
                    <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={handleCancel}
                    >
                      Discard
                    </button>
                    <button
                    type="button"
                    className="btn btn-primary ltr:ml-4 rtl:mr-4"
                    onClick={handleSubmit}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalBankAccount;