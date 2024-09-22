import RenderDataTable from '@/components/commons/data-tables';

interface MyData {
  [key: string]: unknown;
}
interface IProps<T extends object> {
  data?: T[];
  isLoading?: boolean;
  refetch?: () => void;
}
const PKPTable = <T extends object>({
  data,
  isLoading,
  refetch,
}: IProps<T>) => {
  const cols = [
    { accessor: 'pkid', title: 'ID' },
    { accessor: 'pkp_min', title: 'PKP Min' },
    { accessor: 'pkp_max', title: 'PKP Max' },
    { accessor: 'tariff_percentage', title: 'Tariff Percentage' },
    { accessor: 'action', title: 'Action' },
  ];

  return (
    <RenderDataTable
      title='Status Keluarga, PTKP & Tunjangan'
      data={data as MyData[]}
      columns={cols}
      isLoading={isLoading}
      refetch={refetch}
      hide_columns={['action']}
    />
  );
};

export default PKPTable;
