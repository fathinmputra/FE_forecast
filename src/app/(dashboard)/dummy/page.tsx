'use client'

import RenderPlainDataTable from "@/components/commons/plain-data-tables";

const DummyPage = () => {
  const generatePDF = (id: number) => {
    return id;
  };
  const deletePurchaseInvoice = (id: number) => {
    return id;
  };

  const listPurchaseInvoice = [
    {
      pkid: 1,
      code: 'RFQ12312',
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
      code: 'ORFQ1231',
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

  const cols = [
    { accessor: 'pkid', title: 'ID' },
    { accessor: 'code', title: 'RFQ Code' },
    { accessor: 'hps', title: 'Harga Perkiraan Sementara' },
    { accessor: 'start_date', title: 'RFQ Dimulai' },
    { accessor: 'end_date', title: 'RFQ Diakhiri' },
    { accessor: 'approver', title: 'Persetujuan' },
    { accessor: 'status', title: 'Status' },
    { accessor: 'location', title: 'Lokasi Pengiriman' },
    { accessor: 'created_date', title: 'Tanggal Penambahan' },
    { accessor: 'modified_date', title: 'Perubahan Terakhir' },
    { accessor: 'action', title: 'Action' },
  ]

  const handleDownloadRow = (id: number) => {
    generatePDF(id);
  };

  const handleDeleteRow = async (id: number) => {
    await deletePurchaseInvoice(id);
    // refetch();
  };

  return (
    <div>
      <RenderPlainDataTable 
        title="Dummy"
        data={listPurchaseInvoice}
        columns={cols}
        isLoading={false}
        refetch={()=>{return;}}
        hide_columns={['pkid']}
        detailPath='/'
        action='RUD'
        // exportCSV={() => {return;}}
        // handleDownloadRow={handleDownloadRow}
        deleteFunc={()=>{return;}}
      />
    </div>
  );
};

export default DummyPage;