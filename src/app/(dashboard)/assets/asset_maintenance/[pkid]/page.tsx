import { Metadata } from 'next';
import React from 'react';

import ComponentAssetMaintenanceDetail from '@/components/apps/asset/asset_maintenance/component-asset-maintenance-detail';

export const metadata: Metadata = {
  title: 'Asset Maintenance',
};
const AssetMaintenanceDetailPage = ({
  params,
}: {
  params: { pkid: number };
}) => {
  return <ComponentAssetMaintenanceDetail pkid={params.pkid} />;
};

export default AssetMaintenanceDetailPage;
