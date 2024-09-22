'use client';

import { usePathname } from 'next/navigation';

import CreateBreadCrumb from '@/hooks/createBreadCrumb';

import InvitationProcurementTable from '@/components/apps/procurement/invitation_procurement/_components/invitation-procurement-table';

const ComponentsInvitationProcurement = () => {
  const listPurchaseInvoice = [
    {
      pkid: 1,
      code: 'RFQCLS53212',
      hps: 20000000.9,
      start_date: '2018-07-22',
      end_date: '2018-07-22',
      approver: 'Jantuar',
      status: 'need_approve',
      location: 'Surabaya, Indonesia',
      created_date: '2018-07-22',
      modified_date: '2018-07-22',
    },
    {
      pkid: 2,
      code: 'RFQCLS12345',
      hps: 20000000.9,
      start_date: '2018-07-22',
      end_date: '2018-07-22',
      approver: 'Jantuar',
      status: 'need_approve',
      location: 'Surabaya, Indonesia',
      created_date: '2018-07-22',
      modified_date: '2018-07-22',
    },
  ];

  const pathname = usePathname();
  // const dispatch = useDispatch();

  return (
    <div className='space-y-5'>
      <CreateBreadCrumb pathname={pathname} key={1} />
      <button
        type='button'
        className='btn btn-primary'
        onAbort={() => {
          return;
        }}
      >
        Tambah RFQ
      </button>
      <div className='relative flex h-full flex-col gap-5 sm:h-[calc(100vh_-_150px)]'>
        <InvitationProcurementTable
          data={listPurchaseInvoice}
          isLoading={false}
          refetch={() => {
            return;
          }}
          exportCSV={() => {
            return;
          }}
        />
      </div>
    </div>
  );
};

export default ComponentsInvitationProcurement;
