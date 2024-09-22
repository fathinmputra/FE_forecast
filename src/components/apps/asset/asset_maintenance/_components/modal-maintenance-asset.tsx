import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import Swal from 'sweetalert2';

import deleteBaseAttributes from '@/hooks/deleteBaseAttribute';

import IconX from '@/components/icon/icon-x';

import { IRootState } from '@/store';

import { useCreateAssetMaintenance } from '@/app/api/hooks/fixed_asset/asset_maintenance/useCreateAssetMaintenance';
import { useGetAssetMaintenanceByPkid } from '@/app/api/hooks/fixed_asset/asset_maintenance/useGetAssetMaintenanceByPkid';
import { useUpdateAssetMaintenance } from '@/app/api/hooks/fixed_asset/asset_maintenance/useUpdateAssetMaintenance';
import { useGetAllAsset } from '@/app/api/hooks/fixed_asset/asset_registration/useGetAllAsset';
import { assetMaintenanceInitialState } from '@/helpers/utils/fixed_asset/asset_maintenance';
interface IModalAssetMaintenanceProps {
  modal: boolean;
  modalEdit: boolean;
  setModal: (value: boolean) => void;
  setModalEdit: (value: boolean) => void;
  refetch: () => void;
}
interface SelectedOption {
  value: string | number | null | undefined;
  label: string;
}
interface OptionSelect {
  pkid: string | number;
  name: string | number;
}
const optionsType = [
  { value: 'Ringan', label: 'Ringan' },
  { value: 'Sedang', label: 'Sedang' },
  { value: 'Berat', label: 'Berat' },
];

const ModalAssetMaintenance = ({
  modal,
  modalEdit,
  setModal,
  refetch,
  setModalEdit,
}: IModalAssetMaintenanceProps) => {
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
  const { data: listAsset } = useGetAllAsset();
  const { mutateAsync: createAssetMaintenance } = useCreateAssetMaintenance();
  const { mutateAsync: updateAssetMaintenance } = useUpdateAssetMaintenance();
  const pkid = useSelector((state: IRootState) => state.themeConfig.pkid);

  const [form, setForm] = useState(assetMaintenanceInitialState);
  const [emptyField, setEmptyField] = useState([] as string[]);
  const [enabled, setEnabled] = useState(false);

  const {
    data: assetMaintenanceDetail,
    isLoading,
    refetch: refetchDetail,
  } = useGetAssetMaintenanceByPkid(pkid, enabled);

  useEffect(() => {
    if (pkid && modalEdit && !isLoading) {
      setEnabled(true);
      refetchDetail();
    }
  }, [pkid, modalEdit, isLoading, refetchDetail]);

  useEffect(() => {
    if (assetMaintenanceDetail && modalEdit) {
      setForm(assetMaintenanceDetail);
    }
  }, [assetMaintenanceDetail, modalEdit]);

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
    if (JSON.stringify(form) === JSON.stringify(assetMaintenanceInitialState)) {
      if (modalEdit) {
        setModalEdit(false);
      }
      if (modal) {
        setModal(false);
      }
      setForm(assetMaintenanceInitialState);
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
            setForm(assetMaintenanceInitialState);
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

              await updateAssetMaintenance({
                pkid: pkid,
                data: formAfterDeletion,
              });
              setModalEdit(false);
            }
            if (modal) {
              await createAssetMaintenance(form);

              setModal(false);
            }
            setForm(assetMaintenanceInitialState);
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
      setForm(assetMaintenanceInitialState);
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
                  {modal ? 'New' : 'Edit'} Maintenance Asset
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
                    <label htmlFor='title'>
                      Judul Maintenance <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      id='title'
                      name='title'
                      type='text'
                      placeholder='Judul Perbaikan Aset'
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
                      menuPlacement='top'
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
                  <div>
                    <label htmlFor='maintenance_type'>
                      Jenis Maintenance<span style={{ color: 'red' }}>*</span>
                    </label>
                    <Select
                      id='maintenance_type'
                      name='maintenance_type'
                      placeholder='Pilih Jenis Maintenance'
                      className='basic-single'
                      options={optionsType}
                      isSearchable={true}
                      isClearable={true}
                      maxMenuHeight={150}
                      menuPlacement='top'
                      styles={{
                        menu: provided => ({
                          ...provided,
                          zIndex: 9999, // Set a high z-index value
                        }),
                        control: provided => ({
                          ...provided,
                          borderColor: emptyField.includes('maintenance_type')
                            ? 'red'
                            : '',
                        }),
                      }}
                      onChange={(selectedOption: SelectedOption | null) =>
                        handleOnChange(
                          selectedOption?.value || '',
                          'maintenance_type',
                        )
                      }
                      value={
                        form.maintenance_type
                          ? {
                              value: form.maintenance_type ?? '',
                              label: form.maintenance_type ?? '',
                            }
                          : null
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor='maintenance_cost'>
                      Biaya Maintenance <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      id='maintenance_cost'
                      name='maintenance_cost'
                      type='text'
                      placeholder='Biaya Perbaikan'
                      className='form-input'
                      onChange={e =>
                        handleOnChange(
                          String(e.target.value),
                          'maintenance_cost',
                        )
                      }
                      value={form.maintenance_cost || ''}
                      style={{
                        borderColor: emptyField.includes('maintenance_cost')
                          ? 'red'
                          : '',
                      }}
                    />
                  </div>
                  <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                    <div>
                      <label htmlFor='start_date'>
                        Tanggal Mulai Maintenance Aset{' '}
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <Flatpickr
                        id='start_date'
                        name='start_date'
                        placeholder='Pilih Tanggal'
                        options={{
                          dateFormat: 'Y-m-d',
                          position: isRtl ? 'auto right' : 'auto left',
                        }}
                        className='form-input'
                        onChange={date => handleOnChange(date[0], 'start_date')}
                        value={form.start_date || ''}
                        style={{
                          borderColor: emptyField.includes('start_date')
                            ? 'red'
                            : '',
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor='finish_date'>
                        Tanggal Selesai Maintenance Aset{' '}
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <Flatpickr
                        id='finish_date'
                        name='finish_date'
                        placeholder='Pilih Tanggal'
                        options={{
                          dateFormat: 'Y-m-d',
                          position: isRtl ? 'auto right' : 'auto left',
                        }}
                        className='form-input'
                        onChange={date =>
                          handleOnChange(date[0], 'finish_date')
                        }
                        value={form.finish_date || ''}
                        style={{
                          borderColor: emptyField.includes('finish_date')
                            ? 'red'
                            : '',
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor='description'>
                      Deskripsi Maintenance{' '}
                      <span style={{ color: 'red' }}>*</span>
                    </label>
                    <textarea
                      id='description'
                      name='description'
                      rows={3}
                      className='form-textarea'
                      placeholder='Deskripsi Perbaikan Aset'
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

export default ModalAssetMaintenance;
