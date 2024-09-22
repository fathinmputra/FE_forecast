import RenderDataTable from '@/components/commons/data-tables';

import { useDeleteAssetCategory } from '@/app/api/hooks/fixed_asset/asset_category/useDeleteAssetCategory';
import { useBulkUpdateTransferMaterialByProductionOrderPkid } from '@/app/api/hooks/manufacturing/transfer_material/useBulkUpdateTransferMaterialByProductionOrderPkid';

interface MyData {
  [key: string]: unknown;
  ProductionOrder: {
    code: string;
  };
}
interface IProps<T extends object> {
  data?: T[];
  isLoading?: boolean;
  refetch?: () => void;
}
const TransferMaterialTable = <T extends object>({
  data,
  isLoading,
  refetch,
}: IProps<T>) => {
  const { mutateAsync: deleteAssetCategory } = useDeleteAssetCategory();
  const { mutateAsync: bulkUpdateTransferMaterial } =
    useBulkUpdateTransferMaterialByProductionOrderPkid();
  const cols = [
    { accessor: 'pkid', title: 'ID' },
    {
      accessor: 'production_order_pkid',
      title: 'Production Order Code',
      render: (row: MyData) => row.ProductionOrder.code,
    },
    { accessor: 'action', title: 'Action' },
  ];
  return (
    <RenderDataTable
      title='Transfer Material'
      data={data as MyData[]}
      columns={cols}
      isLoading={isLoading}
      refetch={refetch}
      hide_columns={['pkid']}
      deleteFunc={deleteAssetCategory}
      approveFunc={bulkUpdateTransferMaterial}
      customDetailPath='production_order_pkid'
      detailPath='/manufacturing/transfer_material'
      action='RA'
    />
  );
};

export default TransferMaterialTable;
