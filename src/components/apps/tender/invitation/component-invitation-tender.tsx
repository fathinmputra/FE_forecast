'use client';

import { usePathname } from 'next/navigation';

import CreateBreadCrumb from '@/hooks/createBreadCrumb';

import InvitationTenderTable from '@/components/apps/tender/invitation/_components/invitation-tender-table';

const ComponentsInvitationTender = () => {
  // Data Dummy
  const listOpenTender = [
    {
      pkid: 1,
      code: 'ORFQ12312',
      name_procurement: 'Pengadaan Tebu',
      name_industry: 'PT. ABC',
      start_date: '2018-07-22',
      end_date: '2018-07-22',
      status: 'need_approve',
      hps: 20000000.9,
    },
    {
      pkid: 2,
      code: 'ORFQ12342',
      name_procurement: 'Pengadaan bahan baku berupa bibit unggul untuk PT. ABC',
      name_industry: 'PT. ABC',
      start_date: '2018-07-22',
      end_date: '2018-07-22',
      status: 'need_approve',
      hps: 32300000.9,
    },
  ];


  const pathname = usePathname();

  return (
    <div className='space-y-5'>
      <CreateBreadCrumb pathname={pathname} key={1} />
      <InvitationTenderTable
        data={listOpenTender}
        isLoading={false}
        refetch={() => {return}}
        exportCSV={() => {return}}
      />
    </div>
  );
};

export default ComponentsInvitationTender;
