import RenderDataTable from '@/components/commons/data-tables';

import { useApproveRequestAssetMaintenance } from '@/app/api/hooks/fixed_asset/asset_maintenance/useApproveRequestAssetMaintenance';
import { useDeleteAssetMaintenance } from '@/app/api/hooks/fixed_asset/asset_maintenance/useDeleteAssetMaintenance';
import { Asset, RowData } from '@/helpers/utils/fixed_asset/general';

interface MyData {
  [key: string]: unknown;
  asset: Asset;
}
interface IProps<T extends object> {
  data?: T[];
  isLoading?: boolean;
  refetch?: () => void;
}
const MaintenanceTable = <T extends object>({
  data,
  isLoading,
  refetch,
}: IProps<T>) => {
  const { mutateAsync: deleteAssetMaintenance } = useDeleteAssetMaintenance();
  const { mutateAsync: approveAssetMaintenance } =
    useApproveRequestAssetMaintenance();
  const cols = [
    { accessor: 'pkid', title: 'ID' },
    { accessor: 'title', title: 'Judul Maintenance' },
    {
      accessor: 'asset.name',
      title: 'Nama Aset',
      render: (row: RowData) => row.asset.name,
    },
    { accessor: 'maintenance_type', title: 'Jenis Maintenance' },
    { accessor: 'maintenance_cost', title: 'Biaya Maintenance' },
    { accessor: 'status', title: 'Status' },
    { accessor: 'action', title: 'Action' },
  ];

  return (
    <RenderDataTable
      title='Asset Maintenance'
      data={data as MyData[]}
      columns={cols}
      isLoading={isLoading}
      refetch={refetch}
      hide_columns={['pkid']}
      deleteFunc={deleteAssetMaintenance}
      approveFunc={approveAssetMaintenance}
      detailPath='/assets/asset_maintenance'
      action='RUA'
    />
  );
};

export default MaintenanceTable;
