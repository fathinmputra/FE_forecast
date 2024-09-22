import { Metadata } from 'next';
import React from 'react';

import ComponentPolygonMap from '@/components/apps/polygon_map/component-polygon-map';

export const metadata: Metadata = {
  title: 'Polygon Map',
};

const PolygonMap = () => {
  return <ComponentPolygonMap />;
};

export default PolygonMap;
