import { Tab } from '@headlessui/react';
import React, { Fragment } from 'react';
import Flatpickr from 'react-flatpickr';
import { useSelector } from 'react-redux';
import Select from 'react-select';

import { IRootState } from '@/store';

import { useGetAllAssetCategory } from '@/app/api/hooks/fixed_asset/asset_category/useGetAllAssetCategory';
import { useGetAllFiscalType } from '@/app/api/hooks/fixed_asset/fiscal_type/useGetAllFiscalType';
import { useGetAllGroup } from '@/app/api/hooks/fixed_asset/group/useGetAllGroup';
import { useGetAllNumberGroup } from '@/app/api/hooks/fixed_asset/number_group/useGetAllNumberGroup';
import { useGetAllCoa } from '@/app/api/hooks/general_ledger/coa/useGetAllCoa';
import { AssetProperty } from '@/helpers/utils/fixed_asset/asset_registration';
interface IAssetDetail {
  data: AssetProperty;
}

interface OptionSelect {
  pkid: string | number;
  name: string | number;
}
const typeOptions = [
  { value: 'Berwujud', label: 'Berwujud' },
  { value: 'Tidak Berwujud', label: 'Tidak Berwujud' },
];
const AssetDetailComponent = ({ data }: IAssetDetail) => {
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
  const { data: listCategory } = useGetAllAssetCategory();
  const { data: listFiscalType } = useGetAllFiscalType();
  const { data: listGroup } = useGetAllGroup();
  const { data: listNumberGroup } = useGetAllNumberGroup();
  const { data: listCoa } = useGetAllCoa();

  return (
    <div className='panel border-white-light h-full gap-5 space-y-5  px-5 '>
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
                <div>
                  <label htmlFor='name'>Nama</label>
                  <input
                    id='name'
                    name='name'
                    type='text'
                    placeholder='Nama Aset'
                    className='form-input'
                    value={data.name || ''}
                    disabled
                  />
                </div>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div>
                    <label htmlFor='category_pkid'>Kategori</label>
                    <Select
                      id='category_pkid'
                      placeholder='Pilih Kategori Aset'
                      name='category_pkid'
                      className='basic-single'
                      isSearchable={true}
                      isClearable={true}
                      value={
                        data.category_pkid
                          ? {
                              value: data.category_pkid ?? '',
                              label:
                                listCategory?.find(
                                  (item: OptionSelect) =>
                                    item.pkid === data.category_pkid,
                                )?.name ?? '',
                            }
                          : null
                      }
                      isDisabled
                    />
                  </div>
                  <div>
                    <label htmlFor='type_of_asset'>Tipe Aset</label>
                    <Select
                      id='type_of_asset'
                      placeholder='Pilih Tipe Aset'
                      name='type_of_asset'
                      className='basic-single'
                      options={typeOptions}
                      isSearchable={true}
                      isClearable={true}
                      value={
                        data.type_of_asset
                          ? {
                              value: data.type_of_asset ?? '',
                              label: data.type_of_asset ?? '',
                            }
                          : null
                      }
                      isDisabled
                    />
                  </div>
                </div>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div>
                    <label htmlFor='group_pkid'>Kelompok Aset</label>
                    <Select
                      id='group_pkid'
                      placeholder='Pilih Kelompok Aset'
                      name='group_pkid'
                      className='basic-single'
                      options={listGroup?.map((item: OptionSelect) => ({
                        value: item.pkid,
                        label: item.name,
                      }))}
                      isSearchable={true}
                      isClearable={true}
                      value={
                        data.group_pkid
                          ? {
                              value: data.group_pkid ?? '',
                              label:
                                listGroup?.find(
                                  (item: OptionSelect) =>
                                    item.pkid === data.group_pkid,
                                )?.name ?? '',
                            }
                          : null
                      }
                      isDisabled
                    />
                  </div>
                  <div>
                    <label htmlFor='number_group_pkid'>
                      Golongan Kelompok Aset{' '}
                    </label>
                    <Select
                      id='number_group_pkid'
                      placeholder='Pilih Golongan Kelompok Aset'
                      name='number_group_pkid'
                      className='basic-single'
                      options={listNumberGroup?.map((item: OptionSelect) => ({
                        value: item.pkid,
                        label: item.name,
                      }))}
                      isSearchable={true}
                      isClearable={true}
                      value={
                        data.number_group_pkid
                          ? {
                              value: data.number_group_pkid ?? '',
                              label:
                                listNumberGroup?.find(
                                  (item: OptionSelect) =>
                                    item.pkid === data.number_group_pkid,
                                )?.name ?? '',
                            }
                          : null
                      }
                      isDisabled
                    />
                  </div>
                </div>
                <div>
                  <label className='mt-1 flex cursor-pointer items-center'>
                    <span className='text-white-dark mr-2'>
                      Apakah Aset untuk Manufaktur ?{' '}
                    </span>
                    <input
                      id='is_machine'
                      type='checkbox'
                      className='form-checkbox'
                      disabled
                      checked={data.is_machine ?? false}
                      value={data.is_machine ? 'true' : 'false'}
                    />
                  </label>
                </div>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div>
                    <label htmlFor='actual_hours_per_day'>
                      Waktu Penggunaan Satu Hari (jam){' '}
                    </label>
                    <input
                      id='actual_hours_per_day'
                      name='actual_hours_per_day'
                      type='text'
                      disabled={!data.is_machine}
                      placeholder='Pilih Kategori Aset'
                      className='form-input'
                      value={data.actual_hours_per_day || ''}
                    />
                  </div>
                  <div>
                    <label htmlFor='actual_days_per_week'>
                      Waktu Penggunaan Satu Minggu (hari){' '}
                    </label>
                    <input
                      id='actual_days_per_week'
                      name='actual_days_per_week'
                      type='text'
                      disabled={!data.is_machine}
                      placeholder='Pilih Tipe Aset'
                      className='form-input'
                      value={data.actual_days_per_week || ''}
                    />
                  </div>
                </div>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div>
                    <label htmlFor='fiscal_type_pkid'>Jenis Pajak Aset</label>
                    <Select
                      id='fiscal_type_pkid'
                      placeholder='Pilih Jenis Pajak Aset'
                      name='fiscal_type_pkid'
                      className='basic-single'
                      isSearchable={true}
                      isClearable={true}
                      value={
                        data.fiscal_type_pkid
                          ? {
                              value: data.fiscal_type_pkid ?? '',
                              label:
                                listFiscalType?.find(
                                  (item: OptionSelect) =>
                                    item.pkid === data.fiscal_type_pkid,
                                )?.name ?? '',
                            }
                          : null
                      }
                      isDisabled
                    />
                  </div>
                  <div>
                    <label htmlFor='start_depreciation_date'>
                      Tanggal Mulai Penyusutan Aset{' '}
                    </label>
                    <Flatpickr
                      id='start_depreciation_date'
                      name='start_depreciation_date'
                      placeholder='Pilih Tanggal'
                      className='form-input'
                      disabled
                      value={data.start_depreciation_date || ''}
                    />
                  </div>
                </div>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div>
                    <label htmlFor='address'>Alamat Aset</label>
                    <textarea
                      id='address'
                      name='address'
                      rows={3}
                      className='form-textarea'
                      placeholder='Enter Address'
                      value={data.address || ''}
                      required
                      disabled
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor='description'>Deskripsi Aset</label>
                    <textarea
                      id='description'
                      name='description'
                      rows={3}
                      className='form-textarea'
                      placeholder='Enter Address'
                      value={data.description || ''}
                      required
                      disabled
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
                      <label htmlFor='supplier'>Nama Supplier</label>
                      <input
                        id='supplier'
                        type='text'
                        placeholder='Nilai Sisa Aset'
                        className='form-input'
                        value={data.supplier || ''}
                        disabled
                      />
                    </div>
                    <div>
                      <label htmlFor='purchase_date'>
                        Tanggal Pembelian Aset{' '}
                      </label>
                      <Flatpickr
                        id='purchase_date'
                        name='purchase_date'
                        placeholder='Pilih Tanggal'
                        options={{
                          dateFormat: 'Y-m-d',
                          position: isRtl ? 'auto right' : 'auto left',
                        }}
                        className='form-input'
                        disabled
                        value={data.purchase_date || ''}
                      />
                    </div>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                      <div>
                        <label htmlFor='price'>Harga Aset (Rupiah) </label>
                        <input
                          id='price'
                          name='price'
                          type='email'
                          placeholder='Harga Aset'
                          className='form-input'
                          value={data.price || ''}
                          disabled
                        />
                      </div>
                      <div>
                        <label htmlFor='quantity'>Kuantitas (unit) </label>
                        <input
                          id='quantity'
                          name='quantity'
                          placeholder='Enter Password'
                          className='form-input'
                          value={data.quantity || ''}
                          disabled
                        />
                      </div>
                    </div>
                    <div className='mb-5'>
                      <label htmlFor='quantity'>Harga Total (Rupiah)</label>
                      <div className='flex'>
                        <div className='border-white-light flex items-center justify-center border bg-[#eee] px-3 font-semibold ltr:rounded-l-md ltr:border-r-0 rtl:rounded-r-md rtl:border-l-0 dark:border-[#17263c] dark:bg-[#1b2e4b]'>
                          Rp
                        </div>
                        <input
                          type='text'
                          placeholder='Harga Total'
                          className='form-input ltr:rounded-l-none rtl:rounded-r-none'
                          value={data.total_price || ''}
                          disabled
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor='residual_value'>
                        Nilai Sisa (Rupiah){' '}
                      </label>
                      <input
                        id='residual_value'
                        type='text'
                        placeholder='Nilai Sisa Aset'
                        className='form-input'
                        value={data.residual_value || ''}
                        disabled
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
                  <label htmlFor='account_of_asset'>Akun Aset</label>
                  <Select
                    id='account_of_asset'
                    name='account_of_asset'
                    placeholder='Pilih Akun Aset'
                    className='basic-single'
                    isSearchable={true}
                    isClearable={true}
                    maxMenuHeight={150}
                    value={
                      data.account_of_asset
                        ? {
                            value: data.account_of_asset ?? '',
                            label:
                              listCoa?.find(
                                (item: OptionSelect) =>
                                  item.pkid === data.account_of_asset,
                              )?.name ?? '',
                          }
                        : null
                    }
                    isDisabled
                  />
                </div>
                <div>
                  <label htmlFor='account_modal_asset'>Akun Modal Aset</label>

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
                    maxMenuHeight={150}
                    value={
                      data.account_modal_asset
                        ? {
                            value: data.account_modal_asset ?? '',
                            label:
                              listCoa?.find(
                                (item: OptionSelect) =>
                                  item.pkid === data.account_modal_asset,
                              )?.name ?? '',
                          }
                        : null
                    }
                    isDisabled
                  />
                </div>
                <div>
                  <label htmlFor='account_depreciation_expense_asset'>
                    Akun Beban Penyusutan Aset{' '}
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
                    maxMenuHeight={150}
                    value={
                      data.account_depreciation_expense_asset
                        ? {
                            value:
                              data.account_depreciation_expense_asset ?? '',
                            label:
                              listCoa?.find(
                                (item: OptionSelect) =>
                                  item.pkid ===
                                  data.account_depreciation_expense_asset,
                              )?.name ?? '',
                          }
                        : null
                    }
                    isDisabled
                  />
                </div>
                <div>
                  <label htmlFor='account_accumulated_depreciation_asset'>
                    Akun Akumulasi Penyusutan Aset{' '}
                  </label>
                  <Select
                    id='account_accumulated_depreciation_asset'
                    name='account_accumulated_depreciation_asset'
                    placeholder='Pilih Akun Akumulasi Penyusutan Aset'
                    className='basic-single'
                    isSearchable={true}
                    isClearable={true}
                    menuPlacement='top'
                    maxMenuHeight={150}
                    value={
                      data.account_accumulated_depreciation_asset
                        ? {
                            value:
                              data.account_accumulated_depreciation_asset ?? '',
                            label:
                              listCoa?.find(
                                (item: OptionSelect) =>
                                  item.pkid ===
                                  data.account_accumulated_depreciation_asset,
                              )?.name ?? '',
                          }
                        : null
                    }
                    isDisabled
                  />
                </div>
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel>Disabled</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default AssetDetailComponent;
