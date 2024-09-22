import React from 'react';

import RenderDataTable from '@/components/commons/data-tables';

// import { useGeneratePDFPurchaseInvoice } from '@/app/api/hooks/account_payable/purchase_invoice/useGeneratePDFPurchaseInvoice';
// import { useHardDeletePurchaseInvoice } from '@/app/api/hooks/account_payable/purchase_invoice/useHardDeletePurchaseInvoice';

interface MyData {
  [key: string]: unknown;
}

interface IProps<T extends object> {
  data?: T[];
  isLoading?: boolean;
  refetch?: () => void;
  exportCSV?: () => void;
}

const OpenProcurementTable = <T extends object>({
  data,
  isLoading,
  refetch = () => undefined,
  exportCSV,
}: IProps<T>) => {
  // const { generatePDF } = useGeneratePDFPurchaseInvoice();
  // const { mutateAsync: deletePurchaseInvoice } = useHardDeletePurchaseInvoice();

  const generatePDF = (id: number) => {
    return id;
  };
  const deletePurchaseInvoice = (id: number) => {
    return id;
  };

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
  ];

  const handleDownloadRow = (id: number) => {
    generatePDF(id);
  };

  const handleDeleteRow = async (id: number) => {
    await deletePurchaseInvoice(id);
    refetch();
  };

  return (
    <RenderDataTable
      title='Open Procurement'
      data={data as MyData[]}
      columns={cols}
      isLoading={isLoading}
      refetch={refetch}
      hide_columns={['pkid']}
      detailPath='/'
      action='RUDX'
      exportCSV={exportCSV}
      handleDownloadRow={handleDownloadRow}
      deleteFunc={handleDeleteRow}
    />
  );
};

export default OpenProcurementTable;
