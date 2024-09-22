'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import CreateBreadCrumb from '@/hooks/createBreadCrumb';

// Load ApexCharts dynamically to avoid SSR issues
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const ComponentsForecast = () => {
  const pathname = usePathname();
  const [isDark] = useState(false); // Variabel state untuk tema
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Forecast Data',
        data: [], // Data prediksi
        color: '#f78b00', // Warna garis untuk forecast data
      },
      {
        name: 'Actual Data',
        data: [], // Data actual
        color: '#4361ee', // Warna garis untuk actual data
      },
    ],
    options: {
      chart: {
        height: 300,
        type: 'line',
        toolbar: { show: false },
      },
      stroke: {
        width: 2,
        curve: 'smooth',
      },
      xaxis: {
        categories: [] as string[], // Placeholder categories
        axisBorder: {
          color: isDark ? '#191e3a' : '#e0e6ed',
        },
        title: {
          text: 'Tanggal', // Label untuk sumbu X
          style: {
            color: isDark ? '#ffffff' : '#000000',
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        labels: {
          formatter: (val: number) => val.toFixed(2), // Membulatkan angka di sumbu Y
        },
        title: {
          text: 'Harga (Rp)', // Label untuk sumbu Y
          style: {
            color: isDark ? '#ffffff' : '#000000',
            fontSize: '12px',
          },
        },
      },
      grid: {
        borderColor: isDark ? '#191e3a' : '#e0e6ed',
      },
      tooltip: {
        theme: isDark ? 'dark' : 'light',
        y: {
          formatter: (val: number | null | undefined) => {
            if (val == null) return 'Rp 0.00'; // Default value if val is null or undefined
            return `Rp ${val.toFixed(2)}`; // Format value to 2 decimal places
          },
        },
      },
    },
  });

  useEffect(() => {
    // Fetch data from API (adjust endpoint as necessary)
    fetch('http://127.0.0.1:5000/forecast')
      .then(response => response.json())
      .then(data => {
        const actualData = data.actual_data.map(
          (item: { Harga: number }) => item.Harga,
        );
        const forecastData = data.forecast_data.map(
          (item: { Harga: number }) => item.Harga,
        );
        const categories = [
          ...data.actual_data.map((item: { Tanggal: string }) => item.Tanggal),
          ...data.forecast_data.map(
            (item: { Tanggal: string }) => item.Tanggal,
          ),
        ];

        // Gabungkan data forecast dengan actual (forecast = data 1-4 dari actual + data 5-7 dari forecast)
        const combinedForecast = [...actualData, ...forecastData];

        setChartData(prevData => ({
          ...prevData,
          series: [
            {
              name: 'Forecast Data',
              data: combinedForecast, // Tampilkan kombinasi data actual (data 1-4) dan forecast (data 5-7)
              color: '#f78b00', // Warna garis forecast (oranye)
            },
            {
              name: 'Actual Data',
              data: actualData, // Tampilkan hanya actual data (data 1-4)
              color: '#4361ee', // Warna garis actual (biru)
            },
          ],
          options: {
            ...prevData.options,
            xaxis: {
              ...prevData.options.xaxis,
              categories: categories.map(date =>
                new Date(date).toLocaleDateString(),
              ), // Format tanggal di sumbu X
            },
          },
        }));
      });
  }, []);

  return (
    <div className='space-y-5'>
      <CreateBreadCrumb pathname={pathname} key={1} />
      <div className='rounded-lg bg-white p-4 dark:bg-black'>
        <ApexCharts
          options={chartData.options}
          series={chartData.series}
          type='line'
          height={300}
        />
      </div>
    </div>
  );
};

export default ComponentsForecast;
