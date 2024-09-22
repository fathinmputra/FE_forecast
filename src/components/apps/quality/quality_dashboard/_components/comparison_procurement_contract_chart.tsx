'use client';

import ApexCharts from 'apexcharts';
import React, { useEffect, useRef } from 'react';

const ComparisonChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  const createChartOptions = (isDark: boolean) => ({
    series: [
      {
        name: 'Procurement',
        data: [5, 10, 20, 30, 40, 50, 55], // Contoh data untuk Procurement
      },
      {
        name: 'Contract',
        data: [10, 15, 25, 35, 45, 50, 55], // Contoh data untuk Contract
      },
    ],
    chart: {
      height: 300,
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    colors: ['#3A7DFF', '#34A853'],
    stroke: {
      width: 2,
      curve: 'smooth',
    },
    grid: {
      borderColor: isDark ? '#191e3a' : '#e0e6ed',
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      y: {
        formatter: (val: number) => val.toString(),
      },
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
        text: 'Total',
        offsetX: 5,
        offsetY: 0,
        style: {
          fontSize: '10px',
          fontWeight: 'bold',
          color: isDark ? '#ffffff' : '#000000',
        },
      },
      labels: {
        formatter: (value: number) => value.toString(),
      },
      tickAmount: 6, // Number of ticks, can be adjusted if needed
      min: 0,
      max: 60,
      forceNiceScale: true,
      tickPlacement: 'on', // Ensure ticks are placed at specified intervals
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          chart: {
            width: '100%',
          },
          stroke: {
            width: 1.5,
          },
        },
      },
      {
        breakpoint: 768,
        options: {
          chart: {
            width: '100%',
          },
          stroke: {
            width: 1.5,
          },
        },
      },
    ],
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

      const resizeChart = () => {
        chart.updateOptions({ chart: { width: '100%' } });
      };

      const updateTheme = (e: MediaQueryListEvent) => {
        chart.updateOptions(createChartOptions(e.matches));
      };

      window.addEventListener('resize', resizeChart);
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', updateTheme);

      return () => {
        chart.destroy();
        window.removeEventListener('resize', resizeChart);
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
        <h3 className='mb-4 text-base font-semibold'>
          Perbandingan Procurement dan Kontrak
        </h3>
      </div>
      <div ref={chartRef} className='h-full w-full pt-8'></div>
    </div>
  );
};

export default ComparisonChart;
