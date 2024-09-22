import RenderDataTable from '@/components/commons/data-tables';

import { useApproveRequestAsset } from '@/app/api/hooks/fixed_asset/asset_registration/useApproveRequestAsset';
import { useDeleteAsset } from '@/app/api/hooks/fixed_asset/asset_registration/useDeleteAsset';

interface MyData {
  [key: string]: unknown;
}
interface IProps<T extends object> {
  data?: T[];
  isLoading?: boolean;
  refetch?: () => void;
}

const RegistrationTable = <T extends object>({
  data,
  isLoading,
  refetch,
}: IProps<T>) => {
  const { mutateAsync: deleteAsset } = useDeleteAsset();
  const { mutateAsync: approveAsset } = useApproveRequestAsset();
  const cols = [
    { accessor: 'pkid', title: 'ID' },
    { accessor: 'name', title: 'Nama Aset' },
    { accessor: 'code_of_asset', title: 'Kode Aset' },
    { accessor: 'type_of_asset', title: 'Tipe Aset' },
    { accessor: 'quantity', title: 'Kuantitas' },
    { accessor: 'book_value', title: 'Nilai Buku' },
    { accessor: 'purchase_date', title: 'Tanggal Akuisisi' },
    { accessor: 'residual_value', title: 'Nilai Sisa' },
    { accessor: 'status', title: 'Status' },
    { accessor: 'action', title: 'Action' },
  ];

  return (
    <RenderDataTable
      title='Asset Additional'
      data={data as MyData[]}
      columns={cols}
      isLoading={isLoading}
      refetch={refetch}
      hide_columns={['pkid']}
      deleteFunc={deleteAsset}
      approveFunc={approveAsset}
      detailPath='/assets/asset_registration'
      action='RUA'
    />
  );
};

export default RegistrationTable;
