'use client';

import { usePathname } from 'next/navigation';

import CreateBreadCrumb from '@/hooks/createBreadCrumb';

import AssetDetailComponent from '@/components/apps/asset/asset_registration/_components/detail-page';
import LoadingDetailPage from '@/components/commons/loading-detail-page';

import { useGetAssetByPkid } from '@/app/api/hooks/fixed_asset/asset_registration/useGetAssetByPkid';

interface IAssetDetail {
  pkid: number;
}
const ComponentAssetRegistrationDetail = ({ pkid }: IAssetDetail) => {
  const pathname = usePathname();

  const { data: assetDetail, isLoading } = useGetAssetByPkid(pkid);

  return (
    <div className='space-y-5'>
      <CreateBreadCrumb pathname={pathname} key={1} />
      <div className='relative flex h-full flex-col gap-5'>
        {isLoading ? (
          <LoadingDetailPage />
        ) : (
          <AssetDetailComponent data={assetDetail} />
        )}
      </div>
    </div>
  );
};

export default ComponentAssetRegistrationDetail;
