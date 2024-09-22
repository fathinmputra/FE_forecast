import RenderDataTable from '@/components/commons/data-tables';

import { useDeleteAssetCategory } from '@/app/api/hooks/fixed_asset/asset_category/useDeleteAssetCategory';
import { useApproveInspectionProduct } from '@/app/api/hooks/manufacturing/inspection_product/useApproveInspectionProduct';

interface MyData {
  [key: string]: unknown;
}
interface IProps<T extends object> {
  data?: T[];
  isLoading?: boolean;
  refetch?: () => void;
}
const InspectionProductTable = <T extends object>({
  data,
  isLoading,
  refetch,
}: IProps<T>) => {
  const { mutateAsync: deleteAssetCategory } = useDeleteAssetCategory();
  const { mutateAsync: approveInspectionProduct } =
    useApproveInspectionProduct();
  const cols = [
    { accessor: 'pkid', title: 'ID' },
    { accessor: 'production_order_pkid', title: 'Production Order Code' },
    { accessor: 'receive_product_pkid', title: 'Receive Product Code' },
    { accessor: 'item_pkid', title: 'Item Name' },
    { accessor: 'entry_date', title: 'Entry Date' },
    { accessor: 'quantity', title: 'Quantity Produced' },
    { accessor: 'quantity_used', title: 'Quantity Used' },
    { accessor: 'quantity_reject', title: 'Quantity Reject' },
    { accessor: 'result', title: 'Result' },
    { accessor: 'approval', title: 'Status' },
    { accessor: 'action', title: 'Action' },
  ];
  return (
    <RenderDataTable
      title='Inspection Product'
      data={data as MyData[]}
      columns={cols}
      isLoading={isLoading}
      refetch={refetch}
      hide_columns={['pkid']}
      deleteFunc={deleteAssetCategory}
      approveFunc={approveInspectionProduct}
      detailPath='/manufacturing/inspection_product'
      action='RA'
    />
  );
};

export default InspectionProductTable;
