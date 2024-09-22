'use client';

import ApexCharts, { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import React, { useCallback, useEffect, useRef, useState } from 'react';

// Dynamically import ReactApexChart to avoid SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

// Updated dummy data with contract_date and extended to 2018-2024
// Extended dummy data with contract_date and sorted by contract_date
const costData = [
  {
    contract_date: '2018-01-15',
    cost_target: 100.0,
    cost_actual: 98.0,
    cost_compliance: 1,
  },
  {
    contract_date: '2018-02-20',
    cost_target: 110.0,
    cost_actual: 105.0,
    cost_compliance: 1,
  },
  {
    contract_date: '2018-03-25',
    cost_target: 120.0,
    cost_actual: 125.0,
    cost_compliance: 0,
  },
  {
    contract_date: '2018-06-10',
    cost_target: 130.0,
    cost_actual: 130.0,
    cost_compliance: 1,
  },
  {
    contract_date: '2018-09-05',
    cost_target: 140.0,
    cost_actual: 145.0,
    cost_compliance: 0,
  },
  {
    contract_date: '2018-12-15',
    cost_target: 150.0,
    cost_actual: 155.0,
    cost_compliance: 0,
  },
  {
    contract_date: '2019-01-10',
    cost_target: 160.0,
    cost_actual: 158.0,
    cost_compliance: 1,
  },
  {
    contract_date: '2019-03-20',
    cost_target: 170.0,
    cost_actual: 165.0,
    cost_compliance: 1,
  },
  {
    contract_date: '2019-06-15',
    cost_target: 180.0,
    cost_actual: 185.0,
    cost_compliance: 0,
  },
  {
    contract_date: '2019-09-05',
    cost_target: 190.0,
    cost_actual: 195.0,
    cost_compliance: 0,
  },
  {
    contract_date: '2019-12-10',
    cost_target: 200.0,
    cost_actual: 200.0,
    cost_compliance: 1,
  },
  {
    contract_date: '2020-01-30',
    cost_target: 210.0,
    cost_actual: 215.0,
    cost_compliance: 0,
  },
  {
    contract_date: '2020-04-15',
    cost_target: 220.0,
    cost_actual: 210.0,
    cost_compliance: 1,
  },
  {
    contract_date: '2020-07-10',
    cost_target: 230.0,
    cost_actual: 225.0,
    cost_compliance: 1,
  },
  {
    contract_date: '2020-10-20',
    cost_target: 240.0,
    cost_actual: 245.0,
    cost_compliance: 0,
  },
  {
    contract_date: '2020-12-30',
    cost_target: 250.0,
    cost_actual: 255.0,
    cost_compliance: 0,
  },
  {
    contract_date: '2021-02-25',
    cost_target: 260.0,
    cost_actual: 265.0,
    cost_compliance: 0,
  },
  {
    contract_date: '2021-05-15',
    cost_target: 270.0,
    cost_actual: 275.0,
    cost_compliance: 0,
  },
  {
    contract_date: '2021-08-20',
    cost_target: 280.0,
    cost_actual: 275.0,
    cost_compliance: 1,
  },
  {
    contract_date: '2021-11-10',
    cost_target: 290.0,
    cost_actual: 295.0,
    cost_compliance: 0,
  },
  {
    contract_date: '2022-02-15',
    cost_target: 300.0,
    cost_actual: 305.0,
    cost_compliance: 0,
  },
  {
    contract_date: '2022-05-10',
    cost_target: 310.0,
    cost_actual: 310.0,
    cost_compliance: 1,
  },
  {
    contract_date: '2022-08-15',
    cost_target: 320.0,
    cost_actual: 325.0,
    cost_compliance: 0,
  },
  {
    contract_date: '2022-11-05',
    cost_target: 330.0,
    cost_actual: 340.0,
    cost_compliance: 0,
  },
  {
    contract_date: '2023-01-20',
    cost_target: 340.0,
    cost_actual: 335.0,
    cost_compliance: 1,
  },
  {
    contract_date: '2023-04-15',
    cost_target: 350.0,
    cost_actual: 345.0,
    cost_compliance: 1,
  },
  {
    contract_date: '2023-07-05',
    cost_target: 360.0,
    cost_actual: 355.0,
    cost_compliance: 1,
  },
  {
    contract_date: '2023-10-10',
    cost_target: 370.0,
    cost_actual: 375.0,
    cost_compliance: 0,
  },
  {
    contract_date: '2024-01-15',
    cost_target: 380.0,
    cost_actual: 385.0,
    cost_compliance: 0,
  },
  {
    contract_date: '2024-04-10',
    cost_target: 390.0,
    cost_actual: 395.0,
    cost_compliance: 0,
  },
  {
    contract_date: '2024-07-20',
    cost_target: 400.0,
    cost_actual: 400.0,
    cost_compliance: 1,
  },
  {
    contract_date: '2024-09-30',
    cost_target: 410.0,
    cost_actual: 405.0,
    cost_compliance: 1,
  },
];

// Process data for pie chart
const getPieChartData = () => {
  const compliantCount = costData.filter(
    item => item.cost_compliance === 1,
  ).length;
  const nonCompliantCount = costData.length - compliantCount;
  return [compliantCount, nonCompliantCount];
};

// Process data for line chart
const getLineChartData = () => {
  const yearlyData = costData.reduce((acc, item) => {
    const year = new Date(item.contract_date).getFullYear();
    if (!acc[year]) acc[year] = { compliant: 0, nonCompliant: 0 };
    if (item.cost_compliance === 1) acc[year].compliant++;
    else acc[year].nonCompliant++;
    return acc;
  }, {} as Record<number, { compliant: number; nonCompliant: number }>);

  const years = Object.keys(yearlyData).sort();
  const compliantData = years.map(year => yearlyData[+year].compliant);
  const nonCompliantData = years.map(year => yearlyData[+year].nonCompliant);

  return {
    years,
    compliantData,
    nonCompliantData,
  };
};

const CostCompliancePieChart = () => {
  const [pieChartOptions] = useState<ApexOptions>({
    chart: {
      type: 'pie',
      height: 300,
    },
    labels: ['Compliant', 'Non-Compliant'],
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

  const [pieChartSeries] = useState(getPieChartData()); // Use the processed dummy data

  return (
    <div className='rounded-lg bg-white p-5 shadow-lg dark:bg-black'>
      <h2 className='mb-4 text-lg font-semibold'>
        Tingkat Kesesuaian Harga Barang
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

const CostComplianceLineChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const { years, compliantData, nonCompliantData } = getLineChartData(); // Use the processed dummy data

  const createLineChartOptions = useCallback(
    (isDark: boolean): ApexOptions => ({
      series: [
        {
          name: 'Compliant',
          data: compliantData,
        },
        {
          name: 'Non-Compliant',
          data: nonCompliantData,
        },
      ],
      chart: {
        height: 300,
        type: 'line',
        toolbar: {
          show: false,
        },
      },
      colors: ['#00ab55', '#e7515a'], // Compliant, Non-Compliant
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
        max: Math.max(...compliantData, ...nonCompliantData) + 1, // Adjust max dynamically
        labels: {
          formatter: (val: number) => val.toFixed(0), // Remove decimals on y-axis labels
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
      },
    }),
    [compliantData, nonCompliantData, years],
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
        Tren Tingkat Kesesuaian Harga Barang
      </h2>
      <div ref={chartRef} className='h-full w-full'></div>
    </div>
  );
};

const CostComplianceCharts = () => {
  return (
    <div className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
      {/* Pie Chart */}
      <CostCompliancePieChart />
      {/* Line Chart */}
      <CostComplianceLineChart />
    </div>
  );
};

export default CostComplianceCharts;
