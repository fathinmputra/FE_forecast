import { InventoryTypeLabel } from '@/components/apps/inventory/_components/inventory_type_label';
import RenderDataTable from '@/components/commons/data-tables';

interface MyData {
  [key: string]: unknown;
}
interface IProps<T extends object> {
  data?: T[];
  isLoading?: boolean;
  refetch?: () => void;
}

const TransfersTable = <T extends object>({
  data,
  isLoading,
  refetch,
}: IProps<T>) => {
  const cols = [
    { accessor: 'pkid', title: 'ID' },
    { accessor: 'date', title: 'Date' },
    {
      accessor: 'type',
      title: 'Type',
      render: (row: MyData) => (
        <InventoryTypeLabel type={row.type as 'purchase' | 'sales'} />
      ),
    },
    { accessor: 'activity_target', title: 'Activity' },
    { accessor: 'action', title: 'Action' },
  ];

  return (
    <RenderDataTable
      title='Transfers Table'
      data={data as MyData[]}
      columns={cols}
      isLoading={isLoading}
      refetch={refetch}
      hide_columns={['pkid', 'action']}
    />
  );
};

export default TransfersTable;
