import { formatDate } from '@fullcalendar/core';

import RenderDataTable from '@/components/commons/data-tables';

interface MyData {
  [key: string]: unknown;
  createdAt: string;
}
interface IProps<T extends object> {
  data?: T[];
  isLoading?: boolean;
  refetch?: () => void;
}

const SalesOrderTable = <T extends object>({
  data,
  isLoading,
  refetch,
}: IProps<T>) => {
  const cols = [
    { accessor: 'pkid', title: 'ID' },
    { accessor: 'code', title: 'Kode Sales' },
    {
      accessor: 'createdAt',
      title: 'Tanggal Penjualan',
      render: (row: MyData) =>
        formatDate(row.createdAt, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
    },
    { accessor: 'customer_name', title: 'Nama Customer' },
    { accessor: 'total_price', title: 'Total Harga' },
    { accessor: 'total_tax', title: 'Total Pajak' },
    { accessor: 'total_price_tax', title: 'Total Pemasukan' },
    { accessor: 'invoice', title: 'No. Invoice' },
    { accessor: 'action', title: 'Action' },
  ];

  return (
    <RenderDataTable
      title='Sales Order Table'
      data={data as MyData[]}
      columns={cols}
      isLoading={isLoading}
      refetch={refetch}
      hide_columns={['pkid', 'action']}
    />
  );
};

export default SalesOrderTable;
