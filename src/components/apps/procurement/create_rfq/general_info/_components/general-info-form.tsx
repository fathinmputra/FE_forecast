import Flatpickr from 'react-flatpickr';
import Select from 'react-select'

const typeOptions = [
  { value: 'Terbuka', label: 'Terbuka' },
  { value: 'Undangan', label: 'Undangan' },
]

const GeneralInfoForm = () => {
  return (
    <div className='panel mb-5'>
      <div className="mb-5 flex flex-col gap-5 px-5">
        <h2 className="text-xl font-semibold">Data Umum RFQ</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className='sm:order-1'>
            <label htmlFor="name">
              Nama RFQ <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Nama RFQ"
              className="form-input"
              onChange={() => {return}}
              value=''
              // style=
              // required
            />
          </div>
          <div className='sm:order-3'>
            <label htmlFor="register_start_date">
              Masa Pendaftaran Dimulai
            </label>
            <Flatpickr
              id='register_start_date'
              name='registert_start_date'
              placeholder='Masa Pendaftaran Dimulai'
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
          <div className='sm:order-4'>
            <label htmlFor="register_end_date">
              Akhir Masa Pendaftaran
            </label>
            <Flatpickr
              id='register_end_date'
              name='registert_end_date'
              placeholder='Akhir Masa Pendaftaran'
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
          <div className='sm:order-2'>
            <label htmlFor="rfq_type">
              Jenis RFQ
            </label>
            <Select
              id='rfq_type'
              name='rfq_type'
              placeholder='Jenis RFQ'
              className='basic-single'
              options={typeOptions}
              isSearchable={true}
              isClearable={true}
              // onChange={}
              value=''
              // styles={}
            />
          </div>
          <div className='sm:order-5'>
            <label htmlFor="rfq_start_date">
              Awal RFQ
            </label>
            <Flatpickr
              id='rfq_start_date'
              name='rfq_start_date'
              placeholder='Awal RFQ'
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
          <div className='sm:order-6'>
            <label htmlFor="rfq_end_date">
              Akhir RFQ
            </label>
            <Flatpickr
              id='rfq_end_date'
              name='rfq_end_date'
              placeholder='Akhir RFQ'
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
          <div className='sm:order-7'>
            <label htmlFor="pic_name">
              Nama PIC <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="pic_name"
              name="pic_name"
              type="text"
              placeholder="Nama PIC"
              className="form-input"
              onChange={() => {return}}
              value=''
              // style=
              // required
            />
          </div>
          <div className='sm:order-8'>
            <label htmlFor="pic_email">
              Nama PIC <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="pic_email"
              name="pic_email"
              type="email"
              placeholder="Email PIC"
              className="form-input"
              onChange={() => {return}}
              value=''
              // style=
              // required
            />
          </div>
          <div className='sm:order-9'>
            <label htmlFor="pic_contact">
              Kontak PIC <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="pic_contact"
              name="pic_contact"
              type="number"
              placeholder="Nama PIC"
              className="form-input"
              onChange={() => {return}}
              value=''
              // style=
              // required
            />
          </div>
          <div className='sm:col-span-2 sm:order-10 lg:col-span-3 '>
            <label htmlFor="rfq_detail">
              Detail RFQ
            </label>
            <textarea 
              id='rfq_detail'
              name='rfq_detail'
              rows={5}
              className='form-textarea'
              onChange={() => {return}}
              value=''
              required
              // style={}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeneralInfoForm;