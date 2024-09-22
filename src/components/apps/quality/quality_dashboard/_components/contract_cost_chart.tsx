'use client';

import ApexCharts from 'apexcharts';
import React, { useEffect, useRef } from 'react';

const ContractCost = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  const createChartOptions = (isDark: boolean) => ({
    series: [
      {
        name: 'Total Biaya Kontrak',
        data: [200, 250, 300, 350, 400, 450, 500], // Data contoh dalam juta rupiah
      },
    ],
    chart: {
      type: 'area',
      height: 300,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ['#34A853'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
      curve: 'smooth',
    },
    xaxis: {
      categories: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
      axisBorder: {
        color: isDark ? '#191e3a' : '#e0e6ed',
      },
      title: {
        text: 'Tahun',
        offsetX: 0,
        offsetY: -6,
        style: {
          fontSize: '10px',
          fontWeight: 'bold',
          color: isDark ? '#ffffff' : '#000000',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Total (juta rupiah)',
        offsetX: 4,
        offsetY: 0,
        style: {
          fontSize: '10px',
          fontWeight: 'bold',
          color: isDark ? '#ffffff' : '#000000',
        },
      },
      labels: {
        formatter: (value: number) => `${value}M`, // Format menjadi juta rupiah
      },
      max: 600, // Maksimal 600 juta rupiah
    },
    legend: {
      horizontalAlign: 'left',
    },
    grid: {
      borderColor: isDark ? '#191e3a' : '#e0e6ed',
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
    },
  });

  useEffect(() => {
    const isDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (chartRef.current) {
      const chart = new ApexCharts(
        chartRef.current,
        createChartOptions(isDark),
      );
      chart.render();

      const updateTheme = (e: MediaQueryListEvent) => {
        chart.updateOptions(createChartOptions(e.matches));
      };

      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', updateTheme);

      return () => {
        chart.destroy();
        window
          .matchMedia('(prefers-color-scheme: dark)')
          .removeEventListener('change', updateTheme);
      };
    }
  }, []);

  return (
    <div className='relative h-full w-full rounded-lg bg-white dark:bg-black'>
      {/* Judul Chart */}
      <div className='absolute left-4 top-4'>
        <h3 className='mb-4 text-base font-semibold'>Total Biaya Kontrak</h3>
      </div>
      <div ref={chartRef} className='h-full w-full pt-8'></div>
    </div>
  );
};

export default ContractCost;
