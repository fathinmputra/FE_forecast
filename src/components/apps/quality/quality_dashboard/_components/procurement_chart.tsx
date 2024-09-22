'use client';

import ApexCharts from 'apexcharts';
import React, { useEffect, useRef } from 'react';

const ProcurementChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  const createChartOptions = (isDark: boolean) => ({
    series: [
      {
        name: 'Terbuka',
        data: [5, 10, 20, 30, 40, 50, 55], // Contoh data
      },
      {
        name: 'Tertutup',
        data: [5, 15, 20, 25, 30, 35, 45], // Contoh data
      },
    ],
    chart: {
      type: 'bar',
      height: 300,
      width: '100%',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ['#3A7DFF', '#7FD9FF'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    grid: {
      borderColor: isDark ? '#191e3a' : '#e0e6ed',
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
      labels: {
        offsetX: 0,
        formatter: (value: number) => value.toString(),
      },
      title: {
        text: 'Total Procurement',
        offsetX: 5,
        offsetY: 0,
        style: {
          fontSize: '10px',
          fontWeight: 'bold',
          color: isDark ? '#ffffff' : '#000000',
        },
      },
      tickAmount: 6,
      min: 0,
      max: 60,
      forceNiceScale: true,
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      y: {
        formatter: (val: number) => val,
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '70%',
            },
          },
        },
      },
      {
        breakpoint: 768,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '85%',
            },
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
          Perbandingan Jenis Procurement
        </h3>
      </div>
      <div ref={chartRef} className='h-full w-full pt-8'></div>
    </div>
  );
};

export default ProcurementChart;
