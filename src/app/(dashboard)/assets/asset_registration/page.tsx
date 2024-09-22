import { Metadata } from 'next';
import React from 'react';

import ComponentsAssetRegistration from '@/components/apps/asset/asset_registration/component-asset-registration';

export const metadata: Metadata = {
  title: 'Asset Additional',
};

const AssetRegistrationPage = () => {
  return <ComponentsAssetRegistration />;
};

export default AssetRegistrationPage;
