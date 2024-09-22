import Flatpickr from 'react-flatpickr';
import { useSelector } from 'react-redux';
import Select from 'react-select';

import { IRootState } from '@/store';

import { useGetAllAsset } from '@/app/api/hooks/fixed_asset/asset_registration/useGetAllAsset';
import { AssetMaintenanceProperty } from '@/helpers/utils/fixed_asset/asset_maintenance';

interface IAssetMaintenanceDetail {
  data: AssetMaintenanceProperty;
}
interface OptionSelect {
  pkid: string | number;
  name: string | number;
}
const AssetMaintenanceDetailComponent = ({ data }: IAssetMaintenanceDetail) => {
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
  const { data: listAsset } = useGetAllAsset();
  return (
    <div className='panel border-white-light h-full px-0'>
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
              placeholder='Nama Kategory'
              className='form-input'
              value={data.title || ''}
              disabled
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
              placeholder='Pilih Metode Depresiasi'
              className='basic-single'
              isSearchable={true}
              isClearable={true}
              maxMenuHeight={150}
              menuPlacement='top'
              value={
                data.asset_pkid
                  ? {
                      value: data.asset_pkid ?? '',
                      label:
                        listAsset?.find(
                          (item: OptionSelect) => item.pkid === data.asset_pkid,
                        )?.name ?? '',
                    }
                  : null
              }
              isDisabled
            />
          </div>
          <div>
            <label htmlFor='maintenance_type'>
              Jenis Maintenance<span style={{ color: 'red' }}>*</span>
            </label>
            <Select
              id='maintenance_type'
              name='maintenance_type'
              placeholder='Pilih Metode Depresiasi'
              className='basic-single'
              isSearchable={true}
              isClearable={true}
              maxMenuHeight={150}
              menuPlacement='top'
              value={
                data.maintenance_type
                  ? {
                      value: data.maintenance_type ?? '',
                      label: data.maintenance_type ?? '',
                    }
                  : null
              }
              isDisabled
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
              placeholder='Nama Kategory'
              className='form-input'
              value={data.maintenance_cost || ''}
              disabled
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
                value={data.start_date || ''}
                disabled
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
                value={data.finish_date || ''}
                disabled
              />
            </div>
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
              placeholder='Enter Address'
              value={data.description || ''}
              disabled
              required
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetMaintenanceDetailComponent;
