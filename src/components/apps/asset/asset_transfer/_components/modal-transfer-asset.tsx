import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import Swal from 'sweetalert2';

import deleteBaseAttributes from '@/hooks/deleteBaseAttribute';

import IconX from '@/components/icon/icon-x';

import { IRootState } from '@/store';

import { useGetAllAsset } from '@/app/api/hooks/fixed_asset/asset_registration/useGetAllAsset';
import { useCreateAssetTransfer } from '@/app/api/hooks/fixed_asset/asset_transfer/useCreateAssetTransfer';
import { useGetAssetTransferByPkid } from '@/app/api/hooks/fixed_asset/asset_transfer/useGetAssetTransferByPkid';
import { useUpdateAssetTransfer } from '@/app/api/hooks/fixed_asset/asset_transfer/useUpdateAssetTransfer';
import { assetTransferInitialState } from '@/helpers/utils/fixed_asset/asset_transfer';

interface IModalAssetTransferProps {
  modal: boolean;
  modalEdit: boolean;
  setModal: (value: boolean) => void;
  setModalEdit: (value: boolean) => void;
  refetch: () => void;
}

interface OptionSelect {
  pkid: string | number;
  name: string | number;
}
interface SelectedOption {
  value: string | number | null | undefined;
  label: string;
}
const ModalAssetTransfer = ({
  modal,
  modalEdit,
  setModal,
  refetch,
  setModalEdit,
}: IModalAssetTransferProps) => {
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
  const { data: listAsset } = useGetAllAsset();
  const { mutateAsync: createAssetTransfer } = useCreateAssetTransfer();
  const { mutateAsync: updateAssetTransfer } = useUpdateAssetTransfer();
  const pkid = useSelector((state: IRootState) => state.themeConfig.pkid);

  const [form, setForm] = useState(assetTransferInitialState);
  const [emptyField, setEmptyField] = useState([] as string[]);
  const [enabled, setEnabled] = useState(false);
  const {
    data: assetTransferDetail,
    isLoading,
    refetch: refetchDetail,
  } = useGetAssetTransferByPkid(pkid, enabled);

  useEffect(() => {
    if (pkid && modalEdit && !isLoading) {
      setEnabled(true);
      refetchDetail();
    }
  }, [pkid, modalEdit, isLoading, refetchDetail]);

  useEffect(() => {
    if (assetTransferDetail && modalEdit) {
      setForm(assetTransferDetail);
    }
  }, [assetTransferDetail, modalEdit]);

  const mandatoryValidation = () => {
    const temp = { ...form };
    const requiredField = [] as string[];
    const excludeItemField = [
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
      'status',
    ] as string[];
    const requiredData = Object.keys(temp).filter(
      data => !excludeItemField.includes(data),
    );
    requiredData.forEach(field => {
      if (
        temp[field as keyof typeof temp] === null ||
        temp[field as keyof typeof temp] === '' ||
        temp[field as keyof typeof temp] === 0 ||
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
  const handleOnChange = (value: string | number | Date, key: string) => {
    setForm({ ...form, [key]: value });
  };
  const handleCancel = () => {
    if (JSON.stringify(form) === JSON.stringify(assetTransferInitialState)) {
      if (modalEdit) {
        setModalEdit(false);
      }
      if (modal) {
        setModal(false);
      }
      setForm(assetTransferInitialState);
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
            setForm(assetTransferInitialState);
            setEmptyField([]);
          } catch (error) {
            Swal.fire('Error!', 'Something went wrong', 'error');
          }
        }
      });
    }
  };
  const handleSubmit = async () => {
    const isMandatoryEmpty = mandatoryValidation();

    if (!isMandatoryEmpty) {
      Swal.fire({
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

              await updateAssetTransfer({
                pkid: pkid,
                data: formAfterDeletion,
              });
              setModalEdit(false);
            }
            if (modal) {
              await createAssetTransfer(form);

              setModal(false);
            }
            setForm(assetTransferInitialState);
            setEmptyField([]);
            Swal.fire('Saved!', 'Your request has been saved.', 'success').then(
              () => {
                refetch();
              },
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
      setForm(assetTransferInitialState);
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
                <h5 className='text-lg font-bold'>New Transfer Asset</h5>
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
                    <label htmlFor='title'>
                      Judul Transfer<span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      id='title'
                      name='title'
                      type='text'
                      placeholder='Nama Kategory'
                      className='form-input'
                      onChange={e =>
                        handleOnChange(String(e.target.value), 'title')
                      }
                      value={form.title || ''}
                      style={{
                        borderColor: emptyField.includes('title') ? 'red' : '',
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor='asset_pkid'>
                      Nama Aset
                      <span style={{ color: 'red' }}>*</span>
                    </label>
                    <Select
                      id='asset_pkid'
                      name='asset_pkid'
                      placeholder='Pilih Aset'
                      className='basic-single'
                      options={listAsset?.map((item: OptionSelect) => ({
                        value: item.pkid,
                        label: item.name,
                      }))}
                      isSearchable={true}
                      isClearable={true}
                      maxMenuHeight={150}
                      styles={{
                        menu: provided => ({
                          ...provided,
                          zIndex: 9999, // Set a high z-index value
                        }),
                        control: provided => ({
                          ...provided,
                          borderColor: emptyField.includes('asset_pkid')
                            ? 'red'
                            : '',
                        }),
                      }}
                      onChange={(selectedOption: SelectedOption | null) =>
                        handleOnChange(
                          selectedOption?.value || '',
                          'asset_pkid',
                        )
                      }
                      value={
                        form.asset_pkid
                          ? {
                              value: form.asset_pkid ?? '',
                              label:
                                listAsset?.find(
                                  (item: OptionSelect) =>
                                    item.pkid === form.asset_pkid,
                                )?.name ?? '',
                            }
                          : null
                      }
                    />
                  </div>
                  <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                    <div>
                      <label htmlFor='new_address'>
                        Alamat Baru Aset<span style={{ color: 'red' }}>*</span>
                      </label>
                      <textarea
                        id='new_address'
                        name='new_address'
                        placeholder='Alamat Baru'
                        className='form-input'
                        onChange={e =>
                          handleOnChange(String(e.target.value), 'new_address')
                        }
                        rows={3}
                        value={form.new_address || ''}
                        style={{
                          borderColor: emptyField.includes('new_address')
                            ? 'red'
                            : '',
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor='new_department'>
                        Departemen Baru Aset
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        id='new_department'
                        name='new_department'
                        type='text'
                        placeholder='Departemen Baru'
                        className='form-input'
                        onChange={e =>
                          handleOnChange(
                            String(e.target.value),
                            'new_department',
                          )
                        }
                        value={form.new_department || ''}
                        style={{
                          borderColor: emptyField.includes('new_department')
                            ? 'red'
                            : '',
                        }}
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                    <div>
                      <label htmlFor='transfer_method'>
                        Metode Transfer Aset
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        id='transfer_method'
                        name='transfer_method'
                        type='text'
                        placeholder='Alasan Disposal'
                        className='form-input'
                        onChange={e =>
                          handleOnChange(
                            String(e.target.value),
                            'transfer_method',
                          )
                        }
                        value={form.transfer_method || ''}
                        style={{
                          borderColor: emptyField.includes('transfer_method')
                            ? 'red'
                            : '',
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor='transfer_date'>
                        Tanggal Disposal Aset{' '}
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <Flatpickr
                        id='transfer_date'
                        name='transfer_date'
                        placeholder='Pilih Tanggal'
                        options={{
                          dateFormat: 'Y-m-d',
                          position: isRtl ? 'auto right' : 'auto left',
                        }}
                        className='form-input'
                        onChange={date =>
                          handleOnChange(date[0], 'transfer_date')
                        }
                        value={form.transfer_date || ''}
                        style={{
                          borderColor: emptyField.includes('transfer_date')
                            ? 'red'
                            : '',
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor='transfer_cost'>
                      Biaya Transfer Aset
                      <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      id='transfer_cost'
                      name='transfer_cost'
                      type='text'
                      placeholder='Biaya Pindah Aset'
                      className='form-input'
                      onChange={e =>
                        handleOnChange(Number(e.target.value), 'transfer_cost')
                      }
                      value={form.transfer_cost || ''}
                      style={{
                        borderColor: emptyField.includes('transfer_cost')
                          ? 'red'
                          : '',
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor='quantity'>
                      Jumlah Aset yang Pindah
                      <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      id='quantity'
                      name='quantity'
                      type='text'
                      placeholder='jumlah'
                      className='form-input'
                      onChange={e =>
                        handleOnChange(Number(e.target.value), 'quantity')
                      }
                      value={form.quantity || ''}
                      style={{
                        borderColor: emptyField.includes('quantity')
                          ? 'red'
                          : '',
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor='description'>
                      Deskripsi Disposal <span style={{ color: 'red' }}>*</span>
                    </label>
                    <textarea
                      id='description'
                      name='description'
                      rows={3}
                      className='form-textarea'
                      placeholder='Deskripsi Pindah Aset'
                      onChange={e =>
                        handleOnChange(String(e.target.value), 'description')
                      }
                      value={form.description || ''}
                      required
                      style={{
                        borderColor: emptyField.includes('description')
                          ? 'red'
                          : '',
                      }}
                    ></textarea>
                  </div>
                </div>
                <div className='mt-8 flex items-center justify-end'>
                  <button
                    onClick={handleCancel}
                    type='button'
                    className='btn btn-outline-danger'
                  >
                    Discard
                  </button>
                  <button
                    onClick={handleSubmit}
                    type='button'
                    className='btn btn-primary ltr:ml-4 rtl:mr-4'
                  >
                    Save
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalAssetTransfer;
