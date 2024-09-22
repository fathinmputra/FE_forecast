'use client';

import Select from 'react-select'
import { ActionMeta, OnChangeValue, SingleValue } from 'react-select';

// Define the type for the options
interface OptionSelect {
  value: string | number;
  label: string | number;
}

interface SelectedOption {
  value: string | number | boolean | Date | null | undefined;
  label: string;
}

const FinancialReportTypeOptions = [
  { value: 'Audit', label: 'Audit' },
  { value: 'Non', label: 'Non Audit' },
]

const PastFinancialInformationPanel = () => {
  return (
    <div className="panel mb-5">
      <div className="mb-5 flex flex-col gap-5 px-5">
        <div className="flex flex-col gap-0">
          <h2 className="text-xl font-semibold">Informasi Keuangan Terdahulu</h2>
          <p className="text-gray-500 italic">Jika diisi, file akan diupload pada bagian Dokumen</p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="financial_year">
              Tahun
            </label>
            <input
              id="financial_year"
              name="financial_year"
              type="text"
              placeholder="Tahun"
              className="form-input"
              onChange={() => {return}}
              value=''
              // style=
              // required
            />
          </div>
          <div>
            <label htmlFor="financial_report_type">
              Jenis
            </label>
            <Select
              id='financial_report_type'
              name='financial_report_type'
              placeholder='Jenis Laporan Keuangan'
              className='basic-single'
              options={FinancialReportTypeOptions}
              isSearchable={true}
              isClearable={true}
              // onChange={}
              value=''
              // styles={}
            />
          </div>
          <div>
            <label htmlFor="asset_value">
              Nilai Aset
            </label>
            <input
              id="asset_value"
              name="asset_value"
              type="text"
              placeholder="Nilai Aset"
              className="form-input"
              onChange={() => {return}}
              value=''
              // style=
              // required
            />
          </div>
          <div>
            <label htmlFor="loan_value">
              Hutang
            </label>
            <input
              id="loan_value"
              name="loan_value"
              type="text"
              placeholder="Hutang"
              className="form-input"
              onChange={() => {return}}
              value=''
              // style=
              // required
            />
          </div>
          <div>
            <label htmlFor="gross_income">
              Pendapatan Kotor
            </label>
            <input
              id="gross_income"
              name="gross_income"
              type="text"
              placeholder="Pendapatan Kotor"
              className="form-input"
              onChange={() => {return}}
              value=''
              // style=
              // required
            />
          </div>
          <div>
            <label htmlFor="net_income">
              Pendapatan Bersih
            </label>
            <input
              id="net_income"
              name="net_income"
              type="text"
              placeholder="Pendapatan Bersih"
              className="form-input"
              onChange={() => {return}}
              value=''
              // style=
              // required
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PastFinancialInformationPanel