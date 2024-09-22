'use client'

import { usePathname } from "next/navigation";

import CreateBreadCrumb from "@/hooks/createBreadCrumb";

import InvitationContractChart1 from "@/components/apps/contract_management/invitation/_components/invitation-contract-chart-1";
import InvitationContractChart2 from "@/components/apps/contract_management/invitation/_components/invitation-contract-chart-2";
import InvitationContractPanel from "@/components/apps/contract_management/invitation/_components/invitation-contract-panel";
import InvitationContractTable from "@/components/apps/contract_management/invitation/_components/invitation-contract-table";

const ComponentsInvitationContract = () => {
  const listKontrakUndangan = [
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
    <div className="space-y-5">
      <CreateBreadCrumb pathname={pathname} key={1} />
      <div className='relative flex h-full flex-col gap-5 sm:h-[calc(100vh_-_150px)]'>
        <InvitationContractPanel />
        <div className='grid grid-cols-2 gap-5 mt-5'>
          <div className="panel p-0">
            <InvitationContractChart1 />
          </div>
          <div className="panel p-0">
            <InvitationContractChart2 />
          </div>
        </div>
        <InvitationContractTable 
          data={listKontrakUndangan}
          isLoading={false}
          refetch={() => {return}}
          exportCSV={() => {return}}
        />
      </div>
    </div>
  );
}

export default ComponentsInvitationContract;