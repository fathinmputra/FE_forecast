'use client'

import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import RenderDataTable from '@/components/commons/data-tables';

const rowData = [
  {
    id: 1,
    name: 'Jumlah karyawan',
  }
]

const AdditionalRequirementPanel = () => {
  return (
    <div className="panel mb-5">
      <div className='mb-5 flex flex-col gap-5 px-5'>
        <div>
          <h2 className='text-xl font-semibold'>Kebutuhan Tambahan RFQ</h2>
          <p className='italic'>
            (*) Dokumen tambahan yang dibutuhkan industri terhadap pemasok
          </p>
        </div>

        <div className="datatables">
          <DataTable
            className='table-hover whitespace-nowrap'
            records={rowData}
            columns={[
              { accessor: 'id', title: 'ID' },
              { accessor: 'name', title: 'Kebutuhan Tambahan' },
              { accessor: 'action', title: 'Action', render: () => (<>
                <button
                  className='btn btn-error btn-sm'
                >
                  <IconTrashLines className='h-4.5 w-4.5 text-red-600' />
                </button>
              </>) },
            ]}
          />
        </div>
        <div className='flex justify-end'>
          <button className='btn btn-success'>Add Requirement</button>
        </div>
      </div>
    </div>
  );
};

export default AdditionalRequirementPanel;