import RenderDataTable from '@/components/commons/data-tables';

interface MyData {
  [key: string]: unknown;
}
interface IProps<T extends object> {
  data?: T[];
  isLoading?: boolean;
  refetch?: () => void;
}
const PPHTable = <T extends object>({
  data,
  isLoading,
  refetch,
}: IProps<T>) => {
  const cols = [
    { accessor: 'pkid', title: 'ID' },
    { accessor: 'ter_category', title: 'Category' },
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

export default PPHTable;
