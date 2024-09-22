'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import deleteBaseAttributes from '@/hooks/deleteBaseAttribute';

import IconX from '@/components/icon/icon-x';

import { IRootState } from '@/store';

import {
  useCreateSupplierExperience,
  useGetSupplierExperienceByPkid,
  useUpdateSupplierExperience,
} from '@/app/api/hooks/supplier_profile/experience/useCRUDSupplierExperience';
import { supplierExperienceInitialState } from '@/helpers/utils/supplier_portal/supplier_experience';

interface IModalExperienceProps {
  modal: boolean;
  modalEdit: boolean;
  setModal: (value: boolean) => void;
  setModalEdit: (value: boolean) => void;
  refetch: () => void;
}

const ModalExperience = ({
  modal,
  modalEdit,
  setModal,
  setModalEdit,
  refetch,
}: IModalExperienceProps) => {
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
  const { mutateAsync: createExperience } = useCreateSupplierExperience();
  const { mutateAsync: updateExperience } = useUpdateSupplierExperience();
  const pkid = useSelector((state: IRootState) => state.themeConfig.pkid);

  const [form, setForm] = useState(supplierExperienceInitialState);
  const [emptyField, setEmptyField] = useState([] as string[]);
  const [enabled, setEnabled] = useState(false);
  const {
    data: experienceDetail,
    isLoading,
    refetch: refetchDetail,
  } = useGetSupplierExperienceByPkid(pkid, enabled);

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
    );
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
  };

  const handleOnChange = (
    value: string | Date | number | null,
    key: string,
  ) => {
    if (key.includes('date') && value instanceof Date) {
      const date = new Date(value.toString());
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      value = `${year}-${month}-${day}`;
    }

    setForm({ ...form, [key]: value });
  };

  const handleCancel = () => {
    if (
      JSON.stringify(form) === JSON.stringify(supplierExperienceInitialState)
    ) {
      if (modalEdit) {
        setModalEdit(false);
      }
      if (modal) {
        setModal(false);
      }
      setForm(supplierExperienceInitialState);
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
            setForm(supplierExperienceInitialState);
            setEmptyField([]);
          } catch (error) {
            await Swal.fire('Error!', 'Something went wrong', 'error');
          }
        }
      });
    }
  };

  const handleSubmit = async () => {
    const isMandatoryEmpty = mandatoryValidation();

    if (!isMandatoryEmpty) {
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

              await updateExperience({
                pkid: pkid,
                data: formAfterDeletion,
              });
              setModalEdit(false);
            }
            if (modal) {
              await createExperience(form);

              setModal(false);
            }
            setForm(supplierExperienceInitialState);
            setEmptyField([]);
            Swal.fire('Saved!', 'Your data has been saved.', 'success').then(
              () => refetch(),
            );
          } catch (error) {
            Swal.fire('Error!', 'Something went wrong', 'error');
          }
        }
      });
    }
  };

  const handleClose = () => {
    if (modalEdit) {
      setModalEdit(false);
      setForm(supplierExperienceInitialState);
    }
    if (modal) {
      setModal(false);
    }
  };

  return (
    <Transition appear show={modal || modalEdit} as={Fragment}>
      <Dialog
        as='div'
        open={modal || modalEdit}
        onClose={() => {
          if (modalEdit) {
            setModalEdit(true);
          }
          if (modal) {
            setModal(true);
          }
        }}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0' />
        </Transition.Child>
        <div
          id='slideIn_down_modal'
          className='fixed inset-0 z-[998] overflow-y-auto bg-[black]/60'
        >
          <div className='flex min-h-screen items-start justify-center px-4'>
            <Dialog.Panel className='panel animate__animated animate__slideInDown dark:text-white-dark my-8 w-full max-w-6xl overflow-hidden rounded-lg border-0 p-0 text-black'>
              <div className='flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]'>
                <h5 className='text-lg font-bold'>
                  {modal ? 'New' : 'Edit'} Supplier Certificate
                </h5>
                <button
                  onClick={handleClose}
                  type='button'
                  className='text-white-dark hover:text-dark'
                >
                  <IconX />
                </button>
              </div>
              <div className='p-5'>
                <div className='space-y-5'>
                  <div>
                    <label htmlFor='modal_client_name'>Nama Client</label>
                    <input
                      id='modal_client_name'
                      name='modal_client_name'
                      placeholder='Nama Client'
                      className='form-input'
                      type='text'
                      onChange={e =>
                        handleOnChange(String(e.target.value), 'client_name')
                      }
                      value={form.client_name || ''}
                      style={{
                        borderColor: emptyField.includes('client_name')
                          ? 'red'
                          : '',
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor='modal_project_name'>Nama Proyek</label>
                    <input
                      id='modal_project_name'
                      name='modal_project_name'
                      placeholder='Nama Proyek'
                      className='form-input'
                      type='text'
                      onChange={e =>
                        handleOnChange(String(e.target.value), 'project_name')
                      }
                      value={form.project_name || ''}
                      style={{
                        borderColor: emptyField.includes('project_name')
                          ? 'red'
                          : '',
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor='modal_contract_number'>Nomor Kontrak</label>
                    <input
                      id='modal_contract_number'
                      name='modal_contract_number'
                      placeholder='Nomor Kontrak'
                      className='form-input'
                      type='text'
                      onChange={e =>
                        handleOnChange(
                          String(e.target.value),
                          'contract_number',
                        )
                      }
                      value={form.contract_number || ''}
                      style={{
                        borderColor: emptyField.includes('contract_number')
                          ? 'red'
                          : '',
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor='modal_start_date'>Tangal Berlaku</label>
                    <Flatpickr
                      value={form.start_date || ''}
                      id='modal_start_date'
                      name='modal_start_date'
                      placeholder='Tanggal Berlaku'
                      options={{
                        dateFormat: 'Y-m-d',
                        position: isRtl ? 'auto right' : 'auto left',
                      }}
                      className='form-input'
                      onChange={date => handleOnChange(date[0], 'start_date')}
                      style={{
                        borderColor: emptyField.includes('start_date')
                          ? 'red'
                          : '',
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor='modal_end_date'>Tangal Berakhir</label>
                    <Flatpickr
                      value={form.end_date || ''}
                      id='modal_end_date'
                      name='modal_end_date'
                      placeholder='Tanggal Berakhir'
                      options={{
                        dateFormat: 'Y-m-d',
                        position: isRtl ? 'auto right' : 'auto left',
                      }}
                      className='form-input'
                      onChange={date => handleOnChange(date[0], 'end_date')}
                      style={{
                        borderColor: emptyField.includes('end_date')
                          ? 'red'
                          : '',
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor='modal_description'>Deskripsi</label>
                    <input
                      id='modal_description'
                      name='modal_description'
                      placeholder='Deskripsi'
                      className='form-input'
                      type='text'
                      onChange={e =>
                        handleOnChange(
                          String(e.target.value),
                          'description',
                        )
                      }
                      value={form.description || ''}
                      style={{
                        borderColor: emptyField.includes('description')
                          ? 'red'
                          : '',
                      }}
                    />
                  </div>
                  <div className='mt-8 flex items-center justify-end'>
                    <button
                      type='button'
                      className='btn btn-outline-danger'
                      onClick={handleCancel}
                    >
                      Discard
                    </button>
                    <button
                      type='button'
                      className='btn btn-primary ltr:ml-4 rtl:mr-4'
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

export default ModalExperience;
