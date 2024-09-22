import RenderDataTable from '@/components/commons/data-tables';

interface MyData {
  [key: string]: unknown;
}
interface IProps<T extends object> {
  data?: T[];
  isLoading?: boolean;
  refetch?: () => void;
}
const VariableSalaryTypesTable = <T extends object>({
  data,
  isLoading,
  refetch,
}: IProps<T>) => {
  const cols = [
    { accessor: 'pkid', title: 'ID' },
    { accessor: 'code', title: 'Code' },
    { accessor: 'description', title: 'Description' },
    { accessor: 'amount', title: 'Jumlah PTKP' },
    { accessor: 'ter_category', title: 'Ter PPH' },
    { accessor: 'tunjangan_tetap', title: 'Tunjangan Keluarga' },
    { accessor: 'action', title: 'Action' },
  ];

  return (
    <RenderDataTable
      title='Variable Salary Types'
      data={data as MyData[]}
      columns={cols}
      isLoading={isLoading}
      refetch={refetch}
      // hide_columns={['action']}
      action='U'
    />
  );
};

export default VariableSalaryTypesTable;
