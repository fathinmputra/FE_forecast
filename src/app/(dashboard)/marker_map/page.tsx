import { Metadata } from 'next';
import React from 'react';

import MarkerMap from '@/components/apps/marker_map/MarkerMap';

export const metadata: Metadata = {
  title: 'Marker Map',
};

const page = () => {
  return <MarkerMap />;
};

export default page;
