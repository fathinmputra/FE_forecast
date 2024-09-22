import RenderDataTable from '@/components/commons/data-tables';

interface MyData {
  [key: string]: unknown;
}
interface IProps<T extends object> {
  data?: T[];
  isLoading?: boolean;
  refetch?: () => void;
}

const SupplierTable = <T extends object>({
  data,
  isLoading,
  refetch,
}: IProps<T>) => {
  const cols = [
    { accessor: 'pkid', title: 'ID' },
    { accessor: 'name', title: 'Nama Supplier' },
    { accessor: 'phone_number', title: 'No. Telepon' },
    { accessor: 'email', title: 'Email' },
    { accessor: 'address', title: 'Alamat' },
    { accessor: 'npwp', title: 'NPWP' },
    { accessor: 'post_code', title: 'Kode Pos' },
    { accessor: 'action', title: 'Action' },
  ];

  return (
    <RenderDataTable
      title='Supplier Table'
      data={data as MyData[]}
      columns={cols}
      isLoading={isLoading}
      refetch={refetch}
      hide_columns={['pkid', 'action']}
    />
  );
};

export default SupplierTable;
