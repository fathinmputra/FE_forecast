import axios from 'axios';
import Swal from 'sweetalert2';

import RenderDataTable from '@/components/commons/data-tables';

import { useDeleteWhiteCollarPayrollClass } from '@/app/api/hooks/hrm/white_collar_payroll_class/useDeleteWhiteCollarPayrollClass';

interface MyData {
  [key: string]: unknown;
}
interface IProps<T extends object> {
  data?: T[];
  isLoading?: boolean;
  refetch?: () => void;
}
const WhiteCollarPayrollClassTable = <T extends object>({
  data,
  isLoading,
  refetch,
}: IProps<T>) => {
  const { mutateAsync: deleteWhiteCollarPayrollClass } =
    useDeleteWhiteCollarPayrollClass();

  const cols = [
    { accessor: 'pkid', title: 'ID' },
    { accessor: 'nama_golongan', title: 'Nama Golongan' },
    { accessor: 'action', title: 'Action' },
  ];

  const handleDelete = async (id: string | number) => {
    try {
      await deleteWhiteCollarPayrollClass(id);

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
      title='White Collar Payroll Class'
      data={data as MyData[]}
      columns={cols}
      isLoading={isLoading}
      refetch={refetch}
      deleteFunc={handleDelete}
      // hide_columns={['action']}
      detailPath='/white_collar_payroll_class'
      action='RUD'
    />
  );
};

export default WhiteCollarPayrollClassTable;
