import { Dialog, Tab, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import Swal from 'sweetalert2';

import deleteBaseAttributes from '@/hooks/deleteBaseAttribute';

import IconX from '@/components/icon/icon-x';

import { IRootState } from '@/store';

import { useGetAllAssetCategory } from '@/app/api/hooks/fixed_asset/asset_category/useGetAllAssetCategory';
import { useCreateAsset } from '@/app/api/hooks/fixed_asset/asset_registration/useCreateAsset';
import { useGetAssetByPkid } from '@/app/api/hooks/fixed_asset/asset_registration/useGetAssetByPkid';
import { useUpdateAsset } from '@/app/api/hooks/fixed_asset/asset_registration/useUpdateAsset';
import { useGetAllFiscalType } from '@/app/api/hooks/fixed_asset/fiscal_type/useGetAllFiscalType';
import { useGetAllGroup } from '@/app/api/hooks/fixed_asset/group/useGetAllGroup';
import { useGetAllNumberGroup } from '@/app/api/hooks/fixed_asset/number_group/useGetAllNumberGroup';
import { useGetAllCoa } from '@/app/api/hooks/general_ledger/coa/useGetAllCoa';
import { assetRegistrationInitialState } from '@/helpers/utils/fixed_asset/asset_registration';
interface IModalRegisterAssetProps {
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
  value: string | number | boolean | Date | null | undefined;
  label: string;
}
const typeOptions = [
  { value: 'Berwujud', label: 'Berwujud' },
  { value: 'Tidak Berwujud', label: 'Tidak Berwujud' },
];
const ModalRegisterAsset = ({
  modal,
  modalEdit,
  setModal,
  setModalEdit,
  refetch,
}: IModalRegisterAssetProps) => {
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
  const { data: listCategory } = useGetAllAssetCategory();
  const { data: listFiscalType } = useGetAllFiscalType();
  const { data: listGroup } = useGetAllGroup();
  const { data: listNumberGroup } = useGetAllNumberGroup();
  const { data: listCoa } = useGetAllCoa();
  const { mutateAsync: createAsset } = useCreateAsset();
  const { mutateAsync: updateAsset } = useUpdateAsset();
  const pkid = useSelector((state: IRootState) => state.themeConfig.pkid);

  const [form, setForm] = useState(assetRegistrationInitialState);
  const [emptyField, setEmptyField] = useState([] as string[]);
  const [total_price, setTotalPrice] = useState(0);
  const [enabled, setEnabled] = useState(false);

  const {
    data: assetDetail,
    isLoading,
    refetch: refetchDetail,
  } = useGetAssetByPkid(pkid, enabled);

  useEffect(() => {
    if (pkid && modalEdit && !isLoading) {
      setEnabled(true);
      refetchDetail();
    }
  }, [pkid, modalEdit, isLoading, refetchDetail]);

  useEffect(() => {
    if (assetDetail && modalEdit) {
      setForm(assetDetail);
    }
  }, [assetDetail, modalEdit]);

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
      'monthly_depreciation_tax',
      'actual_hours_per_day',
      'actual_days_per_week',
      'total_price',
      'status',
    ];
    const requiredData = Object.keys(temp).filter(
      data => !excludeItemField.includes(data),
    );
    if (temp.is_machine) {
      requiredData.push('actual_hours_per_day');
      requiredData.push('actual_days_per_week');
    }
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
  const handleOnChange = (
    value: string | number | boolean | Date | null,
    name: string,
  ) => {
    if (name.includes('date') && value instanceof Date) {
      const date = new Date(value.toString());
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      value = `${year}-${month}-${day}`;
    }

    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      if (form.quantity && form.price) {
        const totalPrice = form.quantity * form.price;
        setTotalPrice(totalPrice);
        setForm(prevForm => ({
          ...prevForm,
          total_price: totalPrice,
        }));
      } else {
        setTotalPrice(0);
        setForm(prevForm => ({
          ...prevForm,
          total_price: 0,
        }));
      }
    };

    calculateTotalPrice();
  }, [form.quantity, form.price]);

  const handleCancel = () => {
    if (
      JSON.stringify(form) === JSON.stringify(assetRegistrationInitialState)
    ) {
      if (modalEdit) {
        setModalEdit(false);
      }
      if (modal) {
        setModal(false);
      }
      setForm(assetRegistrationInitialState);
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
            setForm(assetRegistrationInitialState);
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

              await updateAsset({
                pkid: pkid,
                data: formAfterDeletion,
              });
              setModalEdit(false);
            }
            if (modal) {
              delete (form as { is_machine?: string }).is_machine;

              await createAsset(form);
              setModal(false);
            }
            setForm(assetRegistrationInitialState);
            setEmptyField([]);
            Swal.fire('Saved!', 'Your asset has been saved.', 'success').then(
              () => {
                refetch();
              },
            );
          } catch (error) {
            await Swal.fire('Error!', 'Something went wrong', 'error');
          }
        }
      });
    }
  };
  const handleClose = () => {
    if (modalEdit) {
      setModalEdit(false);
      setForm(assetRegistrationInitialState);
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
                  {modal ? 'New' : 'Edit'} Asset
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
                <Tab.Group>
                  <Tab.List className='border-white-light mt-3 flex flex-wrap border-b dark:border-[#191e3a]'>
                    <Tab as={Fragment}>
                      {({ selected }) => (
                        <button
                          type='button'
                          className={`${
                            selected
                              ? '!border-white-light text-primary  !border-b-white !outline-none dark:!border-[#191e3a] dark:!border-b-black '
                              : ''
                          } hover:text-primary -mb-[1px] block border border-transparent p-3.5 py-2 dark:hover:border-b-black`}
                        >
                          Information of Asset
                        </button>
                      )}
                    </Tab>
                    <Tab as={Fragment}>
                      {({ selected }) => (
                        <button
                          type='button'
                          className={`${
                            selected
                              ? '!border-white-light text-primary  !border-b-white !outline-none dark:!border-[#191e3a] dark:!border-b-black '
                              : ''
                          }-mb-[1px] hover:text-primary block border border-transparent p-3.5 py-2 dark:hover:border-b-black`}
                        >
                          Purchasing Information
                        </button>
                      )}
                    </Tab>
                    <Tab as={Fragment}>
                      {({ selected }) => (
                        <button
                          type='button'
                          className={`${
                            selected
                              ? '!border-white-light text-primary  !border-b-white !outline-none dark:!border-[#191e3a] dark:!border-b-black '
                              : ''
                          }-mb-[1px] hover:text-primary block border border-transparent p-3.5 py-2 dark:hover:border-b-black`}
                        >
                          Account Utilization
                        </button>
                      )}
                    </Tab>
                  </Tab.List>
                  <Tab.Panels className='text-sm'>
                    <Tab.Panel>
                      <div className='active pt-5'>
                        <div className='space-y-5'>
                          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                            <div>
                              <label htmlFor='name'>
                                Nama <span style={{ color: 'red' }}>*</span>
                              </label>
                              <input
                                id='name'
                                name='name'
                                type='text'
                                placeholder='Nama Aset'
                                className='form-input'
                                onChange={e =>
                                  handleOnChange(String(e.target.value), 'name')
                                }
                                value={form.name || ''}
                                style={{
                                  borderColor: emptyField.includes('name')
                                    ? 'red'
                                    : '',
                                }}
                              />
                            </div>
                            <div>
                              <label htmlFor='department'>
                                Nama Departemen
                                <span style={{ color: 'red' }}>*</span>
                              </label>
                              <input
                                id='department'
                                name='department'
                                type='text'
                                placeholder='Nama Departemen'
                                className='form-input'
                                onChange={e =>
                                  handleOnChange(
                                    String(e.target.value),
                                    'department',
                                  )
                                }
                                value={form.department || ''}
                                style={{
                                  borderColor: emptyField.includes('department')
                                    ? 'red'
                                    : '',
                                }}
                              />
                            </div>
                          </div>

                          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                            <div>
                              <label htmlFor='category_pkid'>
                                Kategori <span style={{ color: 'red' }}>*</span>
                              </label>
                              <Select
                                id='category_pkid'
                                placeholder='Pilih Kategori Aset'
                                name='category_pkid'
                                className='basic-single'
                                options={listCategory?.map(
                                  (item: OptionSelect) => ({
                                    value: item.pkid,
                                    label: item.name,
                                  }),
                                )}
                                onChange={(
                                  selectedOption: SelectedOption | null,
                                ) =>
                                  handleOnChange(
                                    selectedOption?.value || null,
                                    'category_pkid',
                                  )
                                }
                                isSearchable={true}
                                isClearable={true}
                                value={
                                  form.category_pkid
                                    ? {
                                        value: form.category_pkid ?? '',
                                        label:
                                          listCategory?.find(
                                            (item: OptionSelect) =>
                                              item.pkid === form.category_pkid,
                                          )?.name ?? '',
                                      }
                                    : null
                                }
                                styles={{
                                  control: provided => ({
                                    ...provided,
                                    borderColor: emptyField.includes(
                                      'category_pkid',
                                    )
                                      ? 'red'
                                      : '',
                                  }),
                                }}
                              />
                            </div>
                            <div>
                              <label htmlFor='type_of_asset'>
                                Tipe Aset{' '}
                                <span style={{ color: 'red' }}>*</span>
                              </label>
                              <Select
                                id='type_of_asset'
                                placeholder='Pilih Tipe Aset'
                                name='type_of_asset'
                                className='basic-single'
                                options={typeOptions}
                                isSearchable={true}
                                isClearable={true}
                                onChange={(
                                  selectedOption: SelectedOption | null,
                                ) =>
                                  handleOnChange(
                                    selectedOption?.value || null,
                                    'type_of_asset',
                                  )
                                }
                                value={
                                  form.type_of_asset
                                    ? {
                                        value: form.type_of_asset ?? '',
                                        label: form.type_of_asset ?? '',
                                      }
                                    : null
                                }
                                styles={{
                                  control: provided => ({
                                    ...provided,
                                    borderColor: emptyField.includes(
                                      'type_of_asset',
                                    )
                                      ? 'red'
                                      : '',
                                  }),
                                }}
                              />
                            </div>
                          </div>
                          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                            <div>
                              <label htmlFor='group_pkid'>
                                Kelompok Aset{' '}
                                <span style={{ color: 'red' }}>*</span>
                              </label>
                              <Select
                                id='group_pkid'
                                placeholder='Pilih Kelompok Aset'
                                name='group_pkid'
                                className='basic-single'
                                options={listGroup?.map(
                                  (item: OptionSelect) => ({
                                    value: item.pkid,
                                    label: item.name,
                                  }),
                                )}
                                onChange={(
                                  selectedOption: SelectedOption | null,
                                ) =>
                                  handleOnChange(
                                    selectedOption?.value || null,
                                    'group_pkid',
                                  )
                                }
                                isSearchable={true}
                                isClearable={true}
                                value={
                                  form.group_pkid
                                    ? {
                                        value: form.group_pkid ?? '',
                                        label:
                                          listGroup?.find(
                                            (item: OptionSelect) =>
                                              item.pkid === form.group_pkid,
                                          )?.name ?? '',
                                      }
                                    : null
                                }
                                styles={{
                                  control: provided => ({
                                    ...provided,
                                    borderColor: emptyField.includes(
                                      'group_pkid',
                                    )
                                      ? 'red'
                                      : '',
                                  }),
                                }}
                              />
                            </div>
                            <div>
                              <label htmlFor='number_group_pkid'>
                                Golongan Kelompok Aset{' '}
                                <span style={{ color: 'red' }}>*</span>
                              </label>
                              <Select
                                id='number_group_pkid'
                                placeholder='Pilih Golongan Kelompok Aset'
                                name='number_group_pkid'
                                className='basic-single'
                                options={listNumberGroup?.map(
                                  (item: OptionSelect) => ({
                                    value: item.pkid,
                                    label: item.name,
                                  }),
                                )}
                                onChange={(
                                  selectedOption: SelectedOption | null,
                                ) =>
                                  handleOnChange(
                                    selectedOption?.value || null,
                                    'number_group_pkid',
                                  )
                                }
                                isSearchable={true}
                                isClearable={true}
                                value={
                                  form.number_group_pkid
                                    ? {
                                        value: form.number_group_pkid ?? '',
                                        label:
                                          listNumberGroup?.find(
                                            (item: OptionSelect) =>
                                              item.pkid ===
                                              form.number_group_pkid,
                                          )?.name ?? '',
                                      }
                                    : null
                                }
                                styles={{
                                  control: provided => ({
                                    ...provided,
                                    borderColor: emptyField.includes(
                                      'number_group_pkid',
                                    )
                                      ? 'red'
                                      : '',
                                  }),
                                }}
                              />
                            </div>
                          </div>
                          <div>
                            <label className='mt-1 flex cursor-pointer items-center'>
                              <span className='text-white-dark mr-2'>
                                Apakah Aset untuk Manufaktur ?{' '}
                                <span style={{ color: 'red' }}>*</span>
                              </span>
                              <input
                                id='is_machine'
                                type='checkbox'
                                className='form-checkbox'
                                onChange={e =>
                                  handleOnChange(e.target.checked, 'is_machine')
                                }
                                checked={form.is_machine || false}
                              />
                            </label>
                          </div>
                          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                            <div>
                              <label htmlFor='actual_hours_per_day'>
                                Waktu Penggunaan Satu Hari (jam){' '}
                                {form.is_machine && (
                                  <span style={{ color: 'red' }}>*</span>
                                )}
                              </label>
                              <input
                                id='actual_hours_per_day'
                                name='actual_hours_per_day'
                                type='text'
                                disabled={!form.is_machine}
                                style={{
                                  cursor: !form.is_machine
                                    ? 'not-allowed'
                                    : 'auto',
                                  borderColor: emptyField.includes(
                                    'actual_hours_per_day',
                                  )
                                    ? 'red'
                                    : '',
                                }}
                                placeholder='Waktu penggunaan aset (jam)'
                                className='form-input'
                                onChange={e =>
                                  handleOnChange(
                                    Number(e.target.value),
                                    'actual_hours_per_day',
                                  )
                                }
                                value={form.actual_hours_per_day || ''}
                              />
                            </div>
                            <div>
                              <label htmlFor='actual_days_per_week'>
                                Waktu Penggunaan Satu Minggu (hari){' '}
                                {form.is_machine && (
                                  <span style={{ color: 'red' }}>*</span>
                                )}
                              </label>
                              <input
                                id='actual_days_per_week'
                                name='actual_days_per_week'
                                type='text'
                                disabled={!form.is_machine}
                                style={{
                                  cursor: !form.is_machine
                                    ? 'not-allowed'
                                    : 'auto',
                                  borderColor: emptyField.includes(
                                    'actual_days_per_week',
                                  )
                                    ? 'red'
                                    : '',
                                }}
                                placeholder='Waktu penggunaan aset (hari)'
                                className='form-input'
                                onChange={e =>
                                  handleOnChange(
                                    Number(e.target.value),
                                    'actual_days_per_week',
                                  )
                                }
                                value={form.actual_days_per_week || ''}
                              />
                            </div>
                          </div>
                          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                            <div>
                              <label htmlFor='fiscal_type_pkid'>
                                Jenis Pajak Aset{' '}
                                <span style={{ color: 'red' }}>*</span>
                              </label>
                              <Select
                                id='fiscal_type_pkid'
                                placeholder='Pilih Jenis Pajak Aset'
                                name='fiscal_type_pkid'
                                className='basic-single'
                                options={listFiscalType?.map(
                                  (item: OptionSelect) => ({
                                    value: item.pkid,
                                    label: item.name,
                                  }),
                                )}
                                menuPortalTarget={document.body}
                                isSearchable={true}
                                isClearable={true}
                                onChange={(
                                  selectedOption: SelectedOption | null,
                                ) =>
                                  handleOnChange(
                                    selectedOption?.value || null,
                                    'fiscal_type_pkid',
                                  )
                                }
                                value={
                                  form.fiscal_type_pkid
                                    ? {
                                        value: form.fiscal_type_pkid ?? '',
                                        label:
                                          listFiscalType?.find(
                                            (item: OptionSelect) =>
                                              item.pkid ===
                                              form.fiscal_type_pkid,
                                          )?.name ?? '',
                                      }
                                    : null
                                }
                                styles={{
                                  control: provided => ({
                                    ...provided,
                                    borderColor: emptyField.includes(
                                      'fiscal_type_pkid',
                                    )
                                      ? 'red'
                                      : '',
                                  }),
                                  menuPortal: provided => ({
                                    ...provided,
                                    zIndex: 9999,
                                  }),
                                }}
                              />
                            </div>
                            <div>
                              <label htmlFor='start_depreciation_date'>
                                Tanggal Mulai Penyusutan Aset{' '}
                                <span style={{ color: 'red' }}>*</span>
                              </label>
                              <Flatpickr
                                // value={date1}
                                id='start_depreciation_date'
                                name='start_depreciation_date'
                                placeholder='Pilih Tanggal'
                                options={{
                                  dateFormat: 'Y-m-d',
                                  position: isRtl ? 'auto right' : 'auto left',
                                }}
                                className='form-input'
                                onChange={date =>
                                  handleOnChange(
                                    date[0],
                                    'start_depreciation_date',
                                  )
                                }
                                value={form.start_depreciation_date || ''}
                                style={{
                                  borderColor: emptyField.includes(
                                    'start_depreciation_date',
                                  )
                                    ? 'red'
                                    : '',
                                }}
                              />
                            </div>
                          </div>
                          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                            <div>
                              <label htmlFor='address'>
                                Alamat Aset{' '}
                                <span style={{ color: 'red' }}>*</span>
                              </label>
                              <textarea
                                id='address'
                                name='address'
                                rows={3}
                                className='form-textarea'
                                placeholder='Enter Address'
                                onChange={e =>
                                  handleOnChange(
                                    String(e.target.value),
                                    'address',
                                  )
                                }
                                value={form.address || ''}
                                required
                                style={{
                                  borderColor: emptyField.includes('address')
                                    ? 'red'
                                    : '',
                                }}
                              ></textarea>
                            </div>
                            <div>
                              <label htmlFor='description'>
                                Deskripsi Aset{' '}
                                <span style={{ color: 'red' }}>*</span>
                              </label>
                              <textarea
                                id='description'
                                name='description'
                                rows={3}
                                className='form-textarea'
                                placeholder='Enter Address'
                                onChange={e =>
                                  handleOnChange(
                                    String(e.target.value),
                                    'description',
                                  )
                                }
                                value={form.description || ''}
                                required
                                style={{
                                  borderColor: emptyField.includes(
                                    'description',
                                  )
                                    ? 'red'
                                    : '',
                                }}
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel>
                      <div>
                        <div className='flex items-start pt-5'>
                          <div className='flex-auto'>
                            <div className='space-y-5'>
                              <div>
                                <label htmlFor='supplier'>
                                  Nama Supplier{' '}
                                  <span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                  id='supplier'
                                  type='text'
                                  placeholder='Nilai Sisa Aset'
                                  className='form-input'
                                  onChange={e =>
                                    handleOnChange(
                                      String(e.target.value),
                                      'supplier',
                                    )
                                  }
                                  value={form.supplier || ''}
                                  style={{
                                    borderColor: emptyField.includes('supplier')
                                      ? 'red'
                                      : '',
                                  }}
                                />
                              </div>
                              <div>
                                <label htmlFor='purchase_date'>
                                  Tanggal Pembelian Aset{' '}
                                  <span style={{ color: 'red' }}>*</span>
                                </label>
                                <Flatpickr
                                  id='purchase_date'
                                  name='purchase_date'
                                  placeholder='Pilih Tanggal'
                                  options={{
                                    dateFormat: 'Y-m-d',
                                    position: isRtl
                                      ? 'auto right'
                                      : 'auto left',
                                  }}
                                  className='form-input'
                                  onChange={date =>
                                    handleOnChange(date[0], 'purchase_date')
                                  }
                                  value={form.purchase_date || ''}
                                  style={{
                                    borderColor: emptyField.includes(
                                      'purchase_date',
                                    )
                                      ? 'red'
                                      : '',
                                  }}
                                />
                              </div>
                              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                                <div>
                                  <label htmlFor='price'>
                                    Harga Aset (Rupiah){' '}
                                    <span style={{ color: 'red' }}>*</span>
                                  </label>
                                  <input
                                    id='price'
                                    name='price'
                                    type='email'
                                    placeholder='Harga Aset'
                                    className='form-input'
                                    onChange={e =>
                                      handleOnChange(
                                        Number(e.target.value),
                                        'price',
                                      )
                                    }
                                    value={form.price || ''}
                                    style={{
                                      borderColor: emptyField.includes('price')
                                        ? 'red'
                                        : '',
                                    }}
                                  />
                                </div>
                                <div>
                                  <label htmlFor='quantity'>
                                    Kuantitas (unit){' '}
                                    <span style={{ color: 'red' }}>*</span>
                                  </label>
                                  <input
                                    id='quantity'
                                    name='quantity'
                                    placeholder='Enter Password'
                                    className='form-input'
                                    onChange={e =>
                                      handleOnChange(
                                        Number(e.target.value),
                                        'quantity',
                                      )
                                    }
                                    value={form.quantity || ''}
                                    style={{
                                      borderColor: emptyField.includes(
                                        'quantity',
                                      )
                                        ? 'red'
                                        : '',
                                    }}
                                  />
                                </div>
                              </div>
                              <div className='mb-5'>
                                <label htmlFor='quantity'>
                                  Harga Total (Rupiah)
                                </label>
                                <div className='flex'>
                                  <div className='border-white-light flex items-center justify-center border bg-[#eee] px-3 font-semibold ltr:rounded-l-md ltr:border-r-0 rtl:rounded-r-md rtl:border-l-0 dark:border-[#17263c] dark:bg-[#1b2e4b]'>
                                    Rp
                                  </div>
                                  <input
                                    type='text'
                                    placeholder='Harga Total'
                                    className='form-input ltr:rounded-l-none rtl:rounded-r-none'
                                    disabled
                                    style={{
                                      cursor: !form.is_machine
                                        ? 'not-allowed'
                                        : 'auto',
                                      borderColor: emptyField.includes(
                                        'total_price',
                                      )
                                        ? 'red'
                                        : '',
                                    }}
                                    value={total_price}
                                  />
                                </div>
                              </div>
                              <div>
                                <label htmlFor='residual_value'>
                                  Nilai Sisa (Rupiah){' '}
                                  <span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                  id='residual_value'
                                  type='text'
                                  placeholder='Nilai Sisa Aset'
                                  className='form-input'
                                  onChange={e =>
                                    handleOnChange(
                                      Number(e.target.value),
                                      'residual_value',
                                    )
                                  }
                                  value={form.residual_value || ''}
                                  style={{
                                    borderColor: emptyField.includes(
                                      'residual_value',
                                    )
                                      ? 'red'
                                      : '',
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel>
                      <div className='pt-5'>
                        <div className='space-y-5'>
                          <div>
                            <label htmlFor='account_of_asset'>
                              Akun Aset <span style={{ color: 'red' }}>*</span>
                            </label>

                            <Select
                              id='account_of_asset'
                              name='account_of_asset'
                              placeholder='Pilih Akun Aset'
                              className='basic-single'
                              options={listCoa?.map((item: OptionSelect) => ({
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
                                  borderColor: emptyField.includes(
                                    'account_of_asset',
                                  )
                                    ? 'red'
                                    : '',
                                }),
                              }}
                              onChange={(
                                selectedOption: SelectedOption | null,
                              ) =>
                                handleOnChange(
                                  selectedOption?.value || null,
                                  'account_of_asset',
                                )
                              }
                              value={
                                form.account_of_asset
                                  ? {
                                      value: form.account_of_asset ?? '',
                                      label:
                                        listCoa?.find(
                                          (item: OptionSelect) =>
                                            item.pkid === form.account_of_asset,
                                        )?.name ?? '',
                                    }
                                  : null
                              }
                            />
                          </div>
                          <div>
                            <label htmlFor='account_modal_asset'>
                              Akun Modal Aset{' '}
                              <span style={{ color: 'red' }}>*</span>
                            </label>

                            <Select
                              id='account_modal_asset'
                              name='account_modal_asset'
                              placeholder='Pilih Akun Modal Aset'
                              className='basic-single'
                              options={listCoa?.map((item: OptionSelect) => ({
                                value: item.pkid,
                                label: item.name,
                              }))}
                              isSearchable={true}
                              isClearable={true}
                              styles={{
                                menu: provided => ({
                                  ...provided,
                                  zIndex: 9999, // Set a high z-index value
                                }),
                                control: provided => ({
                                  ...provided,
                                  borderColor: emptyField.includes(
                                    'account_modal_asset',
                                  )
                                    ? 'red'
                                    : '',
                                }),
                              }}
                              maxMenuHeight={150}
                              onChange={(
                                selectedOption: SelectedOption | null,
                              ) =>
                                handleOnChange(
                                  selectedOption?.value || null,
                                  'account_modal_asset',
                                )
                              }
                              value={
                                form.account_modal_asset
                                  ? {
                                      value: form.account_modal_asset ?? '',
                                      label:
                                        listCoa?.find(
                                          (item: OptionSelect) =>
                                            item.pkid ===
                                            form.account_modal_asset,
                                        )?.name ?? '',
                                    }
                                  : null
                              }
                            />
                          </div>
                          <div>
                            <label htmlFor='account_depreciation_expense_asset'>
                              Akun Beban Penyusutan Aset{' '}
                              <span style={{ color: 'red' }}>*</span>
                            </label>

                            <Select
                              id='account_depreciation_expense_asset'
                              name='account_depreciation_expense_asset'
                              placeholder='Pilih Akun Beban Penyusutan Aset'
                              className='basic-single'
                              options={listCoa?.map((item: OptionSelect) => ({
                                value: item.pkid,
                                label: item.name,
                              }))}
                              isSearchable={true}
                              isClearable={true}
                              styles={{
                                menu: provided => ({
                                  ...provided,
                                  zIndex: 9999, // Set a high z-index value
                                }),
                                control: provided => ({
                                  ...provided,
                                  borderColor: emptyField.includes(
                                    'account_depreciation_expense_asset',
                                  )
                                    ? 'red'
                                    : '',
                                }),
                              }}
                              maxMenuHeight={150}
                              onChange={(
                                selectedOption: SelectedOption | null,
                              ) =>
                                handleOnChange(
                                  selectedOption?.value || null,
                                  'account_depreciation_expense_asset',
                                )
                              }
                              value={
                                form.account_depreciation_expense_asset
                                  ? {
                                      value:
                                        form.account_depreciation_expense_asset ??
                                        '',
                                      label:
                                        listCoa?.find(
                                          (item: OptionSelect) =>
                                            item.pkid ===
                                            form.account_depreciation_expense_asset,
                                        )?.name ?? '',
                                    }
                                  : null
                              }
                            />
                          </div>
                          <div>
                            <label htmlFor='account_accumulated_depreciation_asset'>
                              Akun Akumulasi Penyusutan Aset{' '}
                              <span style={{ color: 'red' }}>*</span>
                            </label>

                            <Select
                              id='account_accumulated_depreciation_asset'
                              name='account_accumulated_depreciation_asset'
                              placeholder='Pilih Akun Akumulasi Penyusutan Aset'
                              className='basic-single'
                              options={listCoa?.map((item: OptionSelect) => ({
                                value: item.pkid,
                                label: item.name,
                              }))}
                              isSearchable={true}
                              isClearable={true}
                              menuPlacement='top'
                              styles={{
                                menu: provided => ({
                                  ...provided,
                                  zIndex: 9999, // Set a high z-index value
                                }),
                                control: provided => ({
                                  ...provided,
                                  borderColor: emptyField.includes(
                                    'account_accumulated_depreciation_asset',
                                  )
                                    ? 'red'
                                    : '',
                                }),
                              }}
                              maxMenuHeight={150}
                              onChange={(
                                selectedOption: SelectedOption | null,
                              ) =>
                                handleOnChange(
                                  selectedOption?.value || null,
                                  'account_accumulated_depreciation_asset',
                                )
                              }
                              value={
                                form.account_accumulated_depreciation_asset
                                  ? {
                                      value:
                                        form.account_accumulated_depreciation_asset ??
                                        '',
                                      label:
                                        listCoa?.find(
                                          (item: OptionSelect) =>
                                            item.pkid ===
                                            form.account_accumulated_depreciation_asset,
                                        )?.name ?? '',
                                    }
                                  : null
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel>Disabled</Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
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

export default ModalRegisterAsset;
