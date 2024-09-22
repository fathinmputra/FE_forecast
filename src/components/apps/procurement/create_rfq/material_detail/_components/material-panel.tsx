'use client'

import Flatpickr from 'react-flatpickr';
import Select from 'react-select'

type MaterialPanelProps = {
  title: string;
}

const typeOptions = [
  { value: 'Tungga', label: 'Tunggal' },
  { value: 'Periodik', label: 'Periodik' },
  { value: 'Terjadwal', label: 'Terjadwal' },
]

const uomOptions = [
  { value: 'Pcs', label: 'Pcs' },
  { value: 'Kg', label: 'Kg' },
  { value: 'L', label: 'L' },
]

const taxOptions = [
  { value: '11%', label: 'PPN' },
  { value: '12%', label: 'PPH' },
]

const MaterialPanel = ({ title }: MaterialPanelProps) => {
  return (
    <div className="panel mb-5">
      <div className="mb-5 flex flex-col gap-5 px-5">
        <div className='flex flex-row justify-between'>
          <h2 className="text-xl font-semibold">{title}</h2>
          <button type='button' className='btn btn-danger'>Hapus</button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label htmlFor="material_name">
              Nama Material <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="material_name"
              name="material_name"
              type="text"
              placeholder="Nama Material"
              className="form-input"
              onChange={() => {return}}
              value=''
              // style=
              // required
            />
          </div>
          <div>
            <label htmlFor="material_description">
              Deskripsi
            </label>
            <input
              id="material_description"
              name="material_description"
              type="text"
              placeholder="Deskripsi"
              className="form-input"
              onChange={() => {return}}
              value=''
              // style=
              // required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label htmlFor="material_name">
              Jenis Kontrak <span style={{ color: 'red' }}>*</span>
            </label>
            <Select
              id='contract_type'
              name='contract_type'
              placeholder='Jenis Kontrak'
              className='basic-single'
              options={typeOptions}
              isSearchable={true}
              isClearable={true}
              // onChange={}
              value=''
              // styles={}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label htmlFor="quantity">
              Kuantitas Pengiriman <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              placeholder="Kuantitas Pengiriman"
              className="form-input"
              onChange={() => {return}}
              value=''
              // style=
              // required
            />
          </div>
          <div>
            <label htmlFor="uom">
              Satuan <span style={{ color: 'red' }}>*</span>
            </label>
            <Select
              id='uom'
              name='uom'
              placeholder='Satuan'
              className='basic-single'
              options={uomOptions}
              isSearchable={true}
              isClearable={true}
              // onChange={}
              value=''
              // styles={}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label htmlFor="hps">
              Target Harga Satuan <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="hps"
              name="hps"
              type="number"
              placeholder="Target Harga Satuan"
              className="form-input"
              onChange={() => {return}}
              value=''
              // style=
              // required
            />
          </div>
          <div>
            <label htmlFor="tax">
              Pajak <span style={{ color: 'red' }}>*</span>
            </label>
            <Select
              id='tax'
              name='tax'
              placeholder='Tax'
              className='basic-single'
              options={taxOptions}
              isSearchable={true}
              isClearable={true}
              // onChange={}
              value=''
              // styles={}
            />
          </div>
          <div>
            <label htmlFor="total_price_material">
              Total Harga Barang
            </label>
            <input
              id="total_price_material"
              name="total_price_material"
              type="number"
              placeholder="Total Harga Barang"
              className="form-input"
              onChange={() => {return}}
              value=''
              // style=
              // required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label htmlFor="shipment_cost">
              Biaya Pengiriman <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="shipment_cost"
              name="shipment_cost"
              type="number"
              placeholder="Biaya Pengiriman"
              className="form-input"
              onChange={() => {return}}
              value=''
              // style=
              // required
            />
          </div>
          <div>
            <label htmlFor="accepted_date">
              Tanggal diterima <span style={{ color: 'red' }}>*</span>
            </label>
            <Flatpickr
              id='accepted_date'
              name='accepted_date'
              placeholder='Tanggal Diterima'
              options={{
                dateFormat: 'Y-m-d',
                position: 'auto left'
              }}
              className='form-input'
              onChange={() => {return}}
              value=''
              // style={}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label htmlFor="grand_total">
              Grand Total
            </label>
            <input
              id="grand_total"
              name="grand_total"
              type="number"
              placeholder="Grand Total"
              className="form-input"
              onChange={() => {return}}
              value='11000000'
              disabled
              // style=
              // required
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 

export default MaterialPanel