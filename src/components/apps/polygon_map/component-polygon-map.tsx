'use client';

import MapboxDraw from '@mapbox/mapbox-gl-draw';
import * as turf from '@turf/turf';
import mapboxgl, { MapEventType } from 'mapbox-gl';
import React, { useEffect, useRef, useState } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

const ComponentPolygonMap = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [roundedArea, setRoundedArea] = useState<number | undefined>();

  useEffect(() => {
    mapboxgl.accessToken = process.env
      .NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/outdoors-v12',
        center: [112.7907, -7.2794],
        zoom: 15,
      });

      const draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true,
        },
        defaultMode: 'draw_polygon',
      });

      mapRef.current.addControl(draw as unknown as mapboxgl.IControl);

      mapRef.current.on('load', () => {
        mapRef.current?.on('draw.create' as MapEventType, updateArea);
        mapRef.current?.on('draw.delete' as MapEventType, updateArea);
        mapRef.current?.on('draw.update' as MapEventType, updateArea);
      });

      const updateArea = () => {
        const data = draw.getAll();
        if (data.features.length > 0) {
          const area = turf.area(data);
          setRoundedArea(Math.round(area * 100) / 100);
        } else {
          setRoundedArea(undefined);
        }
      };
    }
  }, []);

  return (
    <div className='h-auto w-full bg-slate-50 px-10'>
      <div className='mt-8 flex flex-col gap-y-5'>
        <h1 className='text-3xl font-bold text-slate-700'>Polygon Maps</h1>
        <div className='relative overflow-hidden rounded-lg bg-yellow-100'>
          <div ref={mapContainerRef} id='map' style={{ height: '600px' }}></div>
          <div className='absolute left-5 top-5 flex h-fit w-fit flex-col items-center justify-center gap-y-2 rounded-md bg-white p-4'>
            <p className='text-xs font-normal'>
              Click the map to draw a polygon.
            </p>
            {roundedArea !== undefined && (
              <div className='flex items-center gap-x-2'>
                <p className='text-base font-semibold'>
                  <strong>{roundedArea}</strong>
                </p>
                <p className='text-xs font-normal'>square meters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentPolygonMap;
