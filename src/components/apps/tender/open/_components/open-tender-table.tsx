import RenderDataTable from '@/components/commons/data-tables';

interface MyData {
  [key: string]: unknown;
}

interface IProps<T extends object> {
  data?: T[];
  isLoading?: boolean;
  refetch?: () => void;
  exportCSV?: () => void;
}


const OpenTenderTable = <T extends object>({
  data,
  isLoading,
  refetch = () => undefined,
  // exportCSV,
}: IProps<T>) => {

  // const { generatePDF } = useGeneratePDFPurchaseInvoice();
  // const { mutateAsync: deletePurchaseInvoice } = useHardDeletePurchaseInvoice();

  // ! Temporary Functions
  // const generatePDF = (id: number) => {
  //   return id;
  // };
  // const deleteRow = (id: number) => {
  //   return id;
  // };

  const cols = [
    { accessor: 'pkid', title: 'ID' },
    { accessor: 'code', title: 'RFQ Code' },
    { accessor: 'name_procurement', title: 'Nama Pengadaan' },
    { accessor: 'name_industry', title: 'Nama Industri' },
    { accessor: 'start_date', title: 'RFQ Dimulai' },
    { accessor: 'end_date', title: 'RFQ Diakhiri' },
    { accessor: 'status', title: 'Status' },
    { accessor: 'hps', title: 'Harga Perkiraan Sementara' },
    { accessor: 'action', title: 'Action' },
  ];

  /*
  * CATATAN:
  * 1. Buat fungsi untuk menentukan batas maksimal karakter
  * 2. Pertimbangkan untuk membuat table yang khusus untuk Tender, 
  * karena tender tidak perlu tombol seperti bulk-insert, action selain read, link pada setiap rows, dll
  */
  
  return (
    <RenderDataTable
      title='Open Tenders'
      data={data as MyData[]}
      columns={cols}
      isLoading={isLoading}
      refetch={refetch}
      hide_columns={['pkid']}
      detailPath='/'
      action='R'
      // exportCSV={exportCSV}
      // handleDownloadRow={handleDownloadRow}
      // deleteFunc={handleDeleteRow}
    />
  );
};

export default OpenTenderTable;