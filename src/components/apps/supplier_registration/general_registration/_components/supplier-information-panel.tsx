'use client';

import Select from 'react-select'

const BusinessEntityOptions = [
  { value: 'PT', label: 'PT' },
  { value: 'CV', label: 'CV' },
  { value: 'Perorang', label: 'Perorang' },
]

const SupplierInformatoinPanel = () => {
  return (
    <div className="panel mb-5">
      <div className="mb-5 flex flex-col gap-5 px-5">
        <div className="flex flex-col gap-0">
          <h2 className="text-xl font-semibold">Informasi Pemasok</h2>
          <p className="text-gray-500 italic"><span style={{ color: 'red' }}>*</span> Menunjukkan pernyataan wajib diisi</p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="business_entity">
              Badan Usaha
              <span style={{ color: 'red' }}>*</span>
            </label>
            <Select
              id='business_entity'
              name='business_entity'
              placeholder='Badan Usaha'
              className='basic-single'
              options={BusinessEntityOptions}
              isSearchable={true}
              isClearable={true}
              // onChange={}
              value=''
              // styles={}
            />
          </div>
          <div>
            <label htmlFor="supplier_name">
              Nama
              <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="supplier_name"
              name="supplier_name"
              type="text"
              placeholder="Nama"
              className="form-input"
              onChange={() => {return}}
              value=''
              // style=
              // required
            />
          </div>
          <div>
            <label htmlFor="supplying_type">
              Jenis Pasokan
              <span style={{ color: 'red' }}>*</span>
            </label>
            <div className='flex flex-col gap-2 pl-4'>
              <div>
                <input type='checkbox' className='form-checkbox' />
                <span className='text-dark relative'>
                  Pertanian
                </span>
              </div>
              <div>
                <input type='checkbox' className='form-checkbox' />
                <span className='text-dark relative'>
                  Perkebunan
                </span>
              </div>
              <div>
                <input type='checkbox' className='form-checkbox' />
                <span className='text-dark relative'>
                  Logam
                </span>
              </div>
              <div>
                <input type='checkbox' className='form-checkbox' />
                <span className='text-dark relative'>
                  Lainnya
                </span>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierInformatoinPanel;