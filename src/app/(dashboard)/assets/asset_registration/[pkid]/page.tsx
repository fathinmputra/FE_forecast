import { Metadata } from 'next';

import ComponentAssetRegistrationDetail from '@/components/apps/asset/asset_registration/component-asset-registration-detail';

export const metadata: Metadata = {
  title: 'Asset Additional',
};
const AssetRegistrationDetailPage = ({
  params,
}: {
  params: { pkid: number };
}) => {
  return <ComponentAssetRegistrationDetail pkid={params.pkid} />;
};

export default AssetRegistrationDetailPage;
