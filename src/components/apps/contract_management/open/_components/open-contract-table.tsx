import RenderDataTable from "@/components/commons/data-tables";

interface MyData {
  [key: string]: unknown;
}

interface IProps<T extends object> {
  data?: T[];
  isLoading?: boolean;
  refetch?: () => void;
  exportCSV?: () => void;
}

const OpenContracTable = <T extends object>({
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
    { accessor: 'code', title: 'Kode Kontrak' },
    { accessor: 'contract_name', title: 'Nama Kontrak' },
    { accessor: 'industy_name', title: 'RFQ Dimulai' },
    { accessor: 'vendor_name', title: 'RFQ Diakhiri' },
    { accessor: 'status', title: 'Persetujuan' },
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
    <div className="mb-5">
      <RenderDataTable
        title='List Kontrak Terbuka'
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
    </div>
  );
};

export default OpenContracTable;