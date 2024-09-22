'use client';

import ApexCharts, { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import React, { useCallback, useEffect, useRef } from 'react';

// Dynamically import ReactApexChart to avoid SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

// Dummy data
const dummyData = [
  {
    receipt_date_target: '2018-01-10',
    receipt_date_actual: '2018-01-09',
    on_time: 1,
  },
  {
    receipt_date_target: '2018-02-15',
    receipt_date_actual: '2018-02-16',
    on_time: 0,
  },
  {
    receipt_date_target: '2018-03-22',
    receipt_date_actual: '2018-03-22',
    on_time: 1,
  },
  {
    receipt_date_target: '2018-04-05',
    receipt_date_actual: '2018-04-06',
    on_time: 0,
  },
  {
    receipt_date_target: '2018-05-18',
    receipt_date_actual: '2018-05-18',
    on_time: 1,
  },
  {
    receipt_date_target: '2018-06-30',
    receipt_date_actual: '2018-06-29',
    on_time: 1,
  },
  {
    receipt_date_target: '2018-07-25',
    receipt_date_actual: '2018-07-26',
    on_time: 0,
  },
  {
    receipt_date_target: '2019-01-10',
    receipt_date_actual: '2019-01-10',
    on_time: 1,
  },
  {
    receipt_date_target: '2019-02-14',
    receipt_date_actual: '2019-02-15',
    on_time: 0,
  },
  {
    receipt_date_target: '2019-03-17',
    receipt_date_actual: '2019-03-17',
    on_time: 1,
  },
  {
    receipt_date_target: '2019-04-05',
    receipt_date_actual: '2019-04-07',
    on_time: 0,
  },
  {
    receipt_date_target: '2019-05-12',
    receipt_date_actual: '2019-05-11',
    on_time: 1,
  },
  {
    receipt_date_target: '2019-06-25',
    receipt_date_actual: '2019-06-24',
    on_time: 1,
  },
  {
    receipt_date_target: '2019-07-30',
    receipt_date_actual: '2019-07-31',
    on_time: 0,
  },
  {
    receipt_date_target: '2020-01-10',
    receipt_date_actual: '2020-01-09',
    on_time: 1,
  },
  {
    receipt_date_target: '2020-02-20',
    receipt_date_actual: '2020-02-21',
    on_time: 0,
  },
  {
    receipt_date_target: '2020-03-10',
    receipt_date_actual: '2020-03-10',
    on_time: 1,
  },
  {
    receipt_date_target: '2020-04-05',
    receipt_date_actual: '2020-04-06',
    on_time: 0,
  },
  {
    receipt_date_target: '2020-05-12',
    receipt_date_actual: '2020-05-12',
    on_time: 1,
  },
  {
    receipt_date_target: '2020-06-25',
    receipt_date_actual: '2020-06-23',
    on_time: 1,
  },
  {
    receipt_date_target: '2020-07-30',
    receipt_date_actual: '2020-07-30',
    on_time: 1,
  },
  {
    receipt_date_target: '2021-01-15',
    receipt_date_actual: '2021-01-16',
    on_time: 0,
  },
  {
    receipt_date_target: '2021-02-22',
    receipt_date_actual: '2021-02-22',
    on_time: 1,
  },
  {
    receipt_date_target: '2021-03-10',
    receipt_date_actual: '2021-03-12',
    on_time: 0,
  },
  {
    receipt_date_target: '2021-04-05',
    receipt_date_actual: '2021-04-05',
    on_time: 1,
  },
  {
    receipt_date_target: '2021-05-12',
    receipt_date_actual: '2021-05-13',
    on_time: 0,
  },
  {
    receipt_date_target: '2021-06-25',
    receipt_date_actual: '2021-06-26',
    on_time: 0,
  },
  {
    receipt_date_target: '2021-07-30',
    receipt_date_actual: '2021-07-31',
    on_time: 0,
  },
  {
    receipt_date_target: '2022-01-10',
    receipt_date_actual: '2022-01-11',
    on_time: 0,
  },
  {
    receipt_date_target: '2022-02-15',
    receipt_date_actual: '2022-02-14',
    on_time: 1,
  },
  {
    receipt_date_target: '2022-03-22',
    receipt_date_actual: '2022-03-22',
    on_time: 1,
  },
  {
    receipt_date_target: '2022-04-05',
    receipt_date_actual: '2022-04-04',
    on_time: 1,
  },
  {
    receipt_date_target: '2022-05-18',
    receipt_date_actual: '2022-05-19',
    on_time: 0,
  },
  {
    receipt_date_target: '2022-06-30',
    receipt_date_actual: '2022-06-30',
    on_time: 1,
  },
  {
    receipt_date_target: '2022-07-25',
    receipt_date_actual: '2022-07-27',
    on_time: 0,
  },
  {
    receipt_date_target: '2023-01-15',
    receipt_date_actual: '2023-01-14',
    on_time: 1,
  },
  {
    receipt_date_target: '2023-02-20',
    receipt_date_actual: '2023-02-21',
    on_time: 0,
  },
  {
    receipt_date_target: '2023-03-10',
    receipt_date_actual: '2023-03-10',
    on_time: 1,
  },
  {
    receipt_date_target: '2023-04-05',
    receipt_date_actual: '2023-04-07',
    on_time: 0,
  },
  {
    receipt_date_target: '2023-05-12',
    receipt_date_actual: '2023-05-12',
    on_time: 1,
  },
  {
    receipt_date_target: '2023-06-25',
    receipt_date_actual: '2023-06-23',
    on_time: 1,
  },
  {
    receipt_date_target: '2023-07-30',
    receipt_date_actual: '2023-07-31',
    on_time: 0,
  },
  {
    receipt_date_target: '2024-01-10',
    receipt_date_actual: '2024-01-10',
    on_time: 1,
  },
  {
    receipt_date_target: '2024-02-20',
    receipt_date_actual: '2024-02-22',
    on_time: 0,
  },
  {
    receipt_date_target: '2024-03-10',
    receipt_date_actual: '2024-03-11',
    on_time: 0,
  },
  {
    receipt_date_target: '2024-04-05',
    receipt_date_actual: '2024-04-05',
    on_time: 1,
  },
  {
    receipt_date_target: '2024-05-12',
    receipt_date_actual: '2024-05-12',
    on_time: 1,
  },
  {
    receipt_date_target: '2024-06-25',
    receipt_date_actual: '2024-06-24',
    on_time: 1,
  },
  {
    receipt_date_target: '2024-07-30',
    receipt_date_actual: '2024-07-30',
    on_time: 1,
  },
];

// Process data for pie chart
const getPieChartData = () => {
  const onTimeCount = dummyData.filter(item => item.on_time === 1).length;
  const lateCount = dummyData.length - onTimeCount;
  return [onTimeCount, lateCount];
};

// Process data for line chart
const getLineChartData = () => {
  const yearlyData = dummyData.reduce((acc, item) => {
    const year = new Date(item.receipt_date_target).getFullYear();
    if (!acc[year]) acc[year] = { onTime: 0, late: 0 };
    if (item.on_time === 1) acc[year].onTime++;
    else acc[year].late++;
    return acc;
  }, {} as Record<number, { onTime: number; late: number }>);

  const years = Object.keys(yearlyData).sort();
  const onTimeData = years.map(year => yearlyData[+year].onTime);
  const lateData = years.map(year => yearlyData[+year].late);

  return {
    years,
    onTimeData,
    lateData,
  };
};

const OnTimeDeliveryPieChart = () => {
  const [pieChartOptions] = React.useState<ApexOptions>({
    chart: {
      type: 'pie',
      height: 300,
    },
    labels: ['On Time', 'Late'],
    colors: ['#00ab55', '#e7515a'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
    legend: {
      position: 'bottom',
    },
  });

  const [pieChartSeries] = React.useState(getPieChartData()); // Use the processed dummy data

  return (
    <div className='rounded-lg bg-white p-5 shadow-lg dark:bg-black'>
      <h2 className='mb-4 text-lg font-semibold'>
        Persentase Tingkat Ketepatan Waktu Penerimaan
      </h2>
      <ReactApexChart
        options={pieChartOptions}
        series={pieChartSeries}
        type='pie'
        height={300}
      />
    </div>
  );
};

const LineChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const { years, onTimeData, lateData } = getLineChartData(); // Use the processed dummy data

  // Define the function with useCallback to memoize it
  const createLineChartOptions = useCallback(
    (isDark: boolean): ApexOptions => ({
      series: [
        {
          name: 'On Time',
          data: onTimeData,
        },
        {
          name: 'Late',
          data: lateData,
        },
      ],
      chart: {
        height: 300,
        type: 'line',
        toolbar: {
          show: false,
        },
      },
      colors: ['#00ab55', '#e7515a'], // On time, late
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
          formatter: (val: number) => val.toFixed(0), // Remove decimals in tooltip
        },
      },
      xaxis: {
        categories: years,
        axisBorder: {
          color: isDark ? '#191e3a' : '#e0e6ed',
        },
        title: {
          text: 'Year',
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
          style: {
            fontSize: '10px',
            fontWeight: 'bold',
            color: isDark ? '#ffffff' : '#000000',
          },
        },
        min: 0,
        max: Math.max(...onTimeData, ...lateData) + 1, // Adjust max dynamically
        labels: {
          formatter: (val: number) => val.toFixed(0), // Remove decimals on y-axis labels
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
      },
    }),
    [onTimeData, lateData, years],
  );

  useEffect(() => {
    const isDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (chartRef.current) {
      const chart = new ApexCharts(
        chartRef.current,
        createLineChartOptions(isDark),
      );
      chart.render();

      const resizeChart = () => {
        chart.updateOptions({ chart: { width: '100%' } });
      };

      const updateTheme = (e: MediaQueryListEvent) => {
        chart.updateOptions(createLineChartOptions(e.matches));
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
  }, [createLineChartOptions]);

  return (
    <div className='rounded-lg bg-white p-5 shadow-lg dark:bg-black'>
      <h2 className='mb-4 text-lg font-semibold'>
        Tren Tingkat Ketepatan Waktu Penerimaan
      </h2>
      <div ref={chartRef} className='h-full w-full'></div>
    </div>
  );
};

const OnTimeDeliveryCharts = () => {
  return (
    <div className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
      {/* Pie Chart */}
      <OnTimeDeliveryPieChart />
      {/* Line Chart */}
      <LineChart />
    </div>
  );
};

export default OnTimeDeliveryCharts;
