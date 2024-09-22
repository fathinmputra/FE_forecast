'use client';

import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useState } from 'react';

// Dynamically import ReactApexChart to avoid SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const QualityCheckCharts = () => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [radialBarSeries, setRadialBarSeries] = useState<number[]>([0, 0, 0]);
  const [totalDataCount, setTotalDataCount] = useState<number>(0);
  interface LineChartSeries {
    name: string;
    data: number[];
  }

  const [lineChartSeries, setLineChartSeries] = useState<LineChartSeries[]>([]);

  // Memoize data to prevent unnecessary recalculations
  const data = useMemo(
    () => [
      {
        contract_date: '2018-05-16',
        contract_no: 'C015',
        clean: 1,
        brix_check_1: 14.7,
        brix_val_1: 0,
        brix_check_2: 16.9,
        brix_val_2: 1,
      },
      {
        contract_date: '2018-12-20',
        contract_no: 'C005',
        clean: 1,
        brix_check_1: 13.9,
        brix_val_1: 1,
        brix_check_2: 15.4,
        brix_val_2: 0,
      },
      {
        contract_date: '2019-06-03',
        contract_no: 'C018',
        clean: 0,
        brix_check_1: 16.7,
        brix_val_1: 0,
        brix_check_2: 15.8,
        brix_val_2: 1,
      },
      {
        contract_date: '2019-07-30',
        contract_no: 'C003',
        clean: 1,
        brix_check_1: 15.2,
        brix_val_1: 1,
        brix_check_2: 13.8,
        brix_val_2: 0,
      },
      {
        contract_date: '2019-09-25',
        contract_no: 'C007',
        clean: 1,
        brix_check_1: 16.0,
        brix_val_1: 1,
        brix_check_2: 14.5,
        brix_val_2: 1,
      },
      {
        contract_date: '2019-10-22',
        contract_no: 'C011',
        clean: 1,
        brix_check_1: 16.1,
        brix_val_1: 1,
        brix_check_2: 15.0,
        brix_val_2: 1,
      },
      {
        contract_date: '2020-03-17',
        contract_no: 'C008',
        clean: 1,
        brix_check_1: 16.8,
        brix_val_1: 1,
        brix_check_2: 14.7,
        brix_val_2: 0,
      },
      {
        contract_date: '2020-11-12',
        contract_no: 'C002',
        clean: 1,
        brix_check_1: 14.5,
        brix_val_1: 1,
        brix_check_2: 16.0,
        brix_val_2: 1,
      },
      {
        contract_date: '2021-01-29',
        contract_no: 'C009',
        clean: 1,
        brix_check_1: 13.6,
        brix_val_1: 1,
        brix_check_2: 15.5,
        brix_val_2: 1,
      },
      {
        contract_date: '2021-03-12',
        contract_no: 'C014',
        clean: 1,
        brix_check_1: 15.0,
        brix_val_1: 1,
        brix_check_2: 14.5,
        brix_val_2: 0,
      },
      {
        contract_date: '2021-05-15',
        contract_no: 'C004',
        clean: 1,
        brix_check_1: 15.8,
        brix_val_1: 1,
        brix_check_2: 16.7,
        brix_val_2: 1,
      },
      {
        contract_date: '2021-08-14',
        contract_no: 'C012',
        clean: 1,
        brix_check_1: 14.4,
        brix_val_1: 1,
        brix_check_2: 16.1,
        brix_val_2: 1,
      },
      {
        contract_date: '2021-12-05',
        contract_no: 'C019',
        clean: 0,
        brix_check_1: 15.0,
        brix_val_1: 1,
        brix_check_2: 13.8,
        brix_val_2: 0,
      },
      {
        contract_date: '2022-06-23',
        contract_no: 'C001',
        clean: 1,
        brix_check_1: 16.5,
        brix_val_1: 1,
        brix_check_2: 14.0,
        brix_val_2: 0,
      },
      {
        contract_date: '2022-07-16',
        contract_no: 'C010',
        clean: 1,
        brix_check_1: 14.2,
        brix_val_1: 1,
        brix_check_2: 16.0,
        brix_val_2: 1,
      },
      {
        contract_date: '2022-09-09',
        contract_no: 'C013',
        clean: 1,
        brix_check_1: 15.5,
        brix_val_1: 0,
        brix_check_2: 17.0,
        brix_val_2: 1,
      },
      {
        contract_date: '2022-10-19',
        contract_no: 'C020',
        clean: 0,
        brix_check_1: 14.8,
        brix_val_1: 1,
        brix_check_2: 16.5,
        brix_val_2: 1,
      },
      {
        contract_date: '2023-03-12',
        contract_no: 'C014',
        clean: 1,
        brix_check_1: 15.0,
        brix_val_1: 1,
        brix_check_2: 14.5,
        brix_val_2: 0,
      },
      {
        contract_date: '2023-04-10',
        contract_no: 'C006',
        clean: 1,
        brix_check_1: 14.3,
        brix_val_1: 1,
        brix_check_2: 13.9,
        brix_val_2: 0,
      },
      {
        contract_date: '2023-11-25',
        contract_no: 'C017',
        clean: 1,
        brix_check_1: 13.9,
        brix_val_1: 0,
        brix_check_2: 17.2,
        brix_val_2: 1,
      },
      {
        contract_date: '2024-02-08',
        contract_no: 'C016',
        clean: 1,
        brix_check_1: 15.6,
        brix_val_1: 0,
        brix_check_2: 13.7,
        brix_val_2: 0,
      },
    ],
    [],
  );

  const calculatePercentages = useCallback(() => {
    const totalData = data.length;
    setTotalDataCount(totalData); // Set total data count for use in formatter

    const cleanlinessCount = data.filter(item => item.clean === 1).length;
    const cleanlinessPercentage = (
      (cleanlinessCount / totalData) *
      100
    ).toFixed(0);

    const brix1Count = data.filter(item => item.brix_val_1 === 1).length;
    const brix1Percentage = ((brix1Count / totalData) * 100).toFixed(0);

    const brix2Count = data.filter(item => item.brix_val_2 === 1).length;
    const brix2Percentage = ((brix2Count / totalData) * 100).toFixed(0);

    return [
      parseFloat(cleanlinessPercentage),
      parseFloat(brix1Percentage),
      parseFloat(brix2Percentage),
    ];
  }, [data]);

  const calculateLineChartData = useCallback(() => {
    const years = Array.from(
      new Set(data.map(item => new Date(item.contract_date).getFullYear())),
    );
    const cleanlinessTrend = years.map(year => {
      const yearlyData = data.filter(
        item => new Date(item.contract_date).getFullYear() === year,
      );
      const passed = yearlyData.filter(item => item.clean === 1).length;
      return (passed / yearlyData.length) * 100;
    });

    const brix1Trend = years.map(year => {
      const yearlyData = data.filter(
        item => new Date(item.contract_date).getFullYear() === year,
      );
      const passed = yearlyData.filter(item => item.brix_val_1 === 1).length;
      return (passed / yearlyData.length) * 100;
    });

    const brix2Trend = years.map(year => {
      const yearlyData = data.filter(
        item => new Date(item.contract_date).getFullYear() === year,
      );
      const passed = yearlyData.filter(item => item.brix_val_2 === 1).length;
      return (passed / yearlyData.length) * 100;
    });

    setLineChartSeries([
      { name: 'Kebersihan', data: cleanlinessTrend },
      { name: 'Brix 1', data: brix1Trend },
      { name: 'Brix 2', data: brix2Trend },
    ]);
  }, [data]);

  useEffect(() => {
    const percentages = calculatePercentages();
    setRadialBarSeries(percentages);
    calculateLineChartData();

    const theme = 'light' as 'light' | 'dark'; // Example to fetch the theme
    setIsDark(theme === 'dark');
  }, [calculatePercentages, calculateLineChartData]);

  const radialBarOptions: ApexOptions = {
    chart: {
      height: 1000,
      type: 'radialBar',
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    colors: ['#4361ee', '#805dca', '#e2a03f'],
    grid: { borderColor: isDark ? '#191e3a' : '#e0e6ed' },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: { fontSize: '20px' },
          value: { fontSize: '16px' },
          total: {
            show: true,
            label: 'Contracts',
            formatter: function () {
              return totalDataCount.toString(); // Display total data count
            },
          },
        },
      },
    },
    tooltip: {
      enabled: true,
      custom: ({ seriesIndex }: { seriesIndex: number }) => {
        let tooltipContent = '';
        switch (seriesIndex) {
          case 0:
            tooltipContent = `
              <div style="padding: 10px; background-color: #4361ee; color: white; border-radius: 5px;">
                <strong>Cek Kebersihan:</strong><br>
                - Bersih: ${data.filter(item => item.clean === 1).length}<br>
                - Kotor: ${data.filter(item => item.clean === 0).length}
              </div>
            `;
            break;
          case 1:
            tooltipContent = `
              <div style="padding: 10px; background-color: #805dca; color: white; border-radius: 5px;">
                <strong>Cek Brix 1:</strong><br>
                - Lulus: ${
                  data.filter(item => item.brix_val_1 === 1).length
                }<br>
                - Tidak Lulus: ${
                  data.filter(item => item.brix_val_1 === 0).length
                }
              </div>
            `;
            break;
          case 2:
            tooltipContent = `
              <div style="padding: 10px; background-color: #e2a03f; color: white; border-radius: 5px;">
                <strong>Cek Brix 2:</strong><br>
                - Lulus: ${
                  data.filter(item => item.brix_val_2 === 1).length
                }<br>
                - Tidak Lulus: ${
                  data.filter(item => item.brix_val_2 === 0).length
                }
              </div>
            `;
            break;
        }
        return tooltipContent;
      },
    },
    fill: { type: 'solid' },
    stroke: { lineCap: 'round' },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      offsetY: 0,
    },
    labels: ['Kebersihan', 'Brix 1', 'Brix 2'],
  };

  const lineChartOptions: ApexOptions = {
    chart: {
      type: 'line',
      height: 300,
      zoom: { enabled: false },
      toolbar: { show: false }, // Hide toolbar as in the reference
    },
    stroke: {
      width: 2, // Adjust stroke width to match the reference
      curve: 'smooth', // Smooth curve as in the reference
    },
    colors: ['#4361ee', '#805dca', '#e2a03f'],
    tooltip: {
      theme: isDark ? 'dark' : 'light', // Matching tooltip theme to the dark/light mode
      marker: { show: false }, // Hide markers on the line
      y: {
        formatter: number => `${number.toFixed(0)}%`, // Format values as percentages
      },
    },
    grid: {
      borderColor: isDark ? '#191e3a' : '#e0e6ed', // Border color based on theme
    },
    xaxis: {
      categories: Array.from(
        new Set(data.map(item => new Date(item.contract_date).getFullYear())),
      ),
      title: { text: 'Year' },
      axisBorder: {
        color: isDark ? '#191e3a' : '#e0e6ed', // Border color for x-axis
      },
    },
    yaxis: {
      title: { text: 'Tingkat Lolos (%)' },
      labels: {
        formatter: value => `${value.toFixed(0)}%`,
        offsetX: 0,
      },
    },
    legend: {
      show: true,
      position: 'top', // Move legend to the top-right corner
      horizontalAlign: 'right',
      offsetY: 0,
    },
  };

  return (
    <div className='p-4'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div className='rounded-lg bg-white p-4 shadow dark:bg-gray-800'>
          <h3 className='mb-4 text-left text-lg font-semibold'>
            Tingkat Lolos Pengecekan Barang
          </h3>
          <ReactApexChart
            options={radialBarOptions}
            series={radialBarSeries}
            type='radialBar'
            height={300}
          />
        </div>
        <div className='rounded-lg bg-white p-4 shadow dark:bg-gray-800'>
          <h3 className='mb-4 text-left text-lg font-semibold'>
            Tren Tingkat Lolos Pengecekan Barang
          </h3>
          <ReactApexChart
            options={lineChartOptions}
            series={lineChartSeries}
            type='line'
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default QualityCheckCharts;
