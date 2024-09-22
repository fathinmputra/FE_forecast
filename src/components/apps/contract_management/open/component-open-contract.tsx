'use client'

import { usePathname } from 'next/navigation';

import CreateBreadCrumb from '@/hooks/createBreadCrumb';

import OpenContractChart1 from '@/components/apps/contract_management/open/_components/open-contract-chart-1';
import OpenContractChart2 from '@/components/apps/contract_management/open/_components/open-contract-chart-2';
import ContractPanel from '@/components/apps/contract_management/open/_components/open-contract-panel';
import OpenContractTable from '@/components/apps/contract_management/open/_components/open-contract-table';


const ComponentsOpenContract = () => {
  const listKontrakTerbuka = [
    {
      id: 1,
      code: "OCTR12345",
      contract_name: 'Kontrak Pengadaan Gula',
      industry_name: 'PT ABC',
      vendor_name: 'CV Berkah Indah',
      status: 'need_approve',
      created_date: '2018-07-22',
      modified_date: '2018-07-22',
    },
    {
      id: 2,
      code: "OCTR54321",
      contract_name: 'Kontrak Pengadaan Tebu',
      industry_name: 'PT ABC',
      vendor_name: 'CV Anugrah Berkah',
      status: 'need_approve',
      created_date: '2018-07-22',
      modified_date: '2018-07-22',
    },
  ];

  const pathname = usePathname();

  return (
    <div className='space-y-5'>
      <CreateBreadCrumb pathname={pathname} key={1} />
      <div className='relative flex h-full flex-col gap-5 sm:h-[calc(100vh_-_150px)]'>
        <ContractPanel />
        <div className='grid grid-cols-2 gap-5 mt-5'>
          <div className="panel p-0">
            <OpenContractChart1 />
          </div>
          <div className="panel p-0">
            <OpenContractChart2 />
          </div>
        </div>
        <OpenContractTable 
          data={listKontrakTerbuka}
          isLoading={false}
          refetch={() => {return}}
          exportCSV={() => {return}}
        />
      </div>
    </div>
  );
};

export default ComponentsOpenContract;
