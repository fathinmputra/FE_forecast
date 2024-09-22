import axios from 'axios';
import Swal from 'sweetalert2';

import RenderDataTable from '@/components/commons/data-tables';

import { useDeletePosition } from '@/app/api/hooks/hrm/position/useDeletePosition';

interface MyData {
  [key: string]: unknown;
}
interface IProps<T extends object> {
  data?: T[];
  permission?: string;
  isLoading?: boolean;
  refetch?: () => void;
}
const PositionTable = <T extends object>({
  data,
  isLoading,
  refetch,
}: IProps<T>) => {
  const { mutateAsync: deletePosition } = useDeletePosition();

  const cols = [
    { accessor: 'pkid', title: 'ID' },
    { accessor: 'name', title: 'Name' },
    { accessor: 'Department.name', title: 'Department' },
    { accessor: 'type', title: 'Collar Type' },
    { accessor: 'tunjangan_tetap', title: 'Tunjangan Tetap' },
    { accessor: 'action', title: 'Action' },
  ];

  const handleDelete = async (id: string | number) => {
    try {
      await deletePosition(id);

      Swal.fire('Deleted!', 'Your data has been deleted.', 'success').then(
        () => {
          refetch?.();
        },
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Swal.fire('Error!', error?.response?.data?.message, 'error');
      } else {
        Swal.fire('Error!', 'An unexpected error occurred', 'error');
      }
    }
  };

  return (
    <RenderDataTable
      title='Position'
      data={data as MyData[]}
      columns={cols}
      isLoading={isLoading}
      refetch={refetch}
      deleteFunc={handleDelete}
      detailPath='/hrm/position'
      action='RUD'
    />
  );
};

export default PositionTable;
