'use client';

import mapboxgl from 'mapbox-gl';
import React, { useEffect, useRef, useState } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';

const ComponentMarkerMap = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const [markerPosition, setMarkerPosition] = useState<{
    lng: number;
    lat: number;
  } | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env
      .NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [112.7907, -7.2794],
        zoom: 15,
      });

      mapRef.current.on('click', async e => {
        const { lng, lat } = e.lngLat;

        if (markerRef.current) {
          markerRef.current.setLngLat([lng, lat]);
        } else {
          markerRef.current = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(mapRef.current as mapboxgl.Map);
        }

        setMarkerPosition({ lng, lat });

        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`,
        );
        const data = await response.json();

        if (data.features && data.features.length > 0) {
          setAddress(data.features[0].place_name);
        } else {
          setAddress('Address not found');
        }
      });

      const zoomInButton = document.createElement('button');
      zoomInButton.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-zoom-in';
      zoomInButton.innerHTML = '+';
      zoomInButton.onclick = () => {
        mapRef.current?.zoomIn();
      };

      const zoomOutButton = document.createElement('button');
      zoomOutButton.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-zoom-out';
      zoomOutButton.innerHTML = '-';
      zoomOutButton.onclick = () => {
        mapRef.current?.zoomOut();
      };

      const zoomControls = document.createElement('div');
      zoomControls.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
      zoomControls.appendChild(zoomInButton);
      zoomControls.appendChild(zoomOutButton);

      mapRef.current.addControl({
        onAdd: () => zoomControls,
        onRemove: () => {
          zoomControls.parentNode?.removeChild(zoomControls);
        },
      });
    }
  }, []);

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async position => {
        const { latitude, longitude } = position.coords;

        if (mapRef.current) {
          mapRef.current.flyTo({
            center: [longitude, latitude],
            zoom: 15,
          });

          if (markerRef.current) {
            markerRef.current.setLngLat([longitude, latitude]);
          } else {
            markerRef.current = new mapboxgl.Marker()
              .setLngLat([longitude, latitude])
              .addTo(mapRef.current as mapboxgl.Map);
          }

          setMarkerPosition({ lng: longitude, lat: latitude });

          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`,
          );
          const data = await response.json();

          if (data.features && data.features.length > 0) {
            setAddress(data.features[0].place_name);
          } else {
            setAddress('Address not found');
          }
        }
      });
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className='h-auto w-full bg-slate-50 px-10'>
      <div className='mt-8 flex flex-col gap-y-5'>
        <h1 className='text-3xl font-bold text-slate-700'>Marker Maps</h1>
        <div className='relative overflow-hidden rounded-lg bg-yellow-100'>
          <div ref={mapContainerRef} id='map' style={{ height: '600px' }}></div>
          {markerPosition && (
            <div className='absolute left-5 top-5 flex flex-col gap-y-2 rounded-md bg-white p-4'>
              <p className='text-xs font-normal'>Marker Position:</p>
              <p className='text-xs font-normal'>
                Longitude: {markerPosition.lng.toFixed(4)}
              </p>
              <p className='text-xs font-normal'>
                Latitude: {markerPosition.lat.toFixed(4)}
              </p>
              <p className='text-xs font-normal'>Address: {address}</p>
            </div>
          )}
        </div>
        <div className='mt-4 flex justify-center gap-4'>
          <button
            className='rounded-md bg-blue-500 px-4 py-2 text-white'
            onClick={handleCurrentLocation}
          >
            Get Current Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComponentMarkerMap;
