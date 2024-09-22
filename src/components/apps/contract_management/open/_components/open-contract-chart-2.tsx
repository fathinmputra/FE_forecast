import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

import { IRootState } from '@/store';

interface ChartOptions {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  options: ApexOptions;
}

const OpenContractChart2 = () => {
  const isDark = useSelector(
    (state: IRootState) =>
      state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode,
  );
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

  //Revenue Chart
  const revenueChart = (isDark: boolean): ChartOptions => ({
    series: [
      {
        name: 'Income',
        data: [
          16800, 16800, 15500, 17800, 15500, 17000, 19000, 16000, 15000, 17000,
          14000, 17000,
        ],
      },
      {
        name: 'Expenses',
        data: [
          16500, 17500, 16200, 17300, 16000, 19500, 16000, 17000, 16000, 19000,
          18000, 19000,
        ],
      },
    ],
    options: {
      chart: {
        height: 325,
        type: 'area',
        fontFamily: 'Nunito, sans-serif',
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: 'smooth',
        width: 2,
        lineCap: 'square',
      },
      // dropShadow: {
      //   enabled: true,
      //   opacity: 0.2,
      //   blur: 10,
      //   left: -7,
      //   top: 22,
      // },
      colors: isDark ? ['#2196F3', '#E7515A'] : ['#1B55E2', '#E7515A'],
      markers: {
        discrete: [
          {
            seriesIndex: 0,
            dataPointIndex: 6,
            fillColor: '#1B55E2',
            strokeColor: 'transparent',
            size: 7,
          },
          {
            seriesIndex: 1,
            dataPointIndex: 5,
            fillColor: '#E7515A',
            strokeColor: 'transparent',
            size: 7,
          },
        ],
      },
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      xaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          show: true,
        },
        labels: {
          offsetX: isRtl ? 2 : 0,
          offsetY: 5,
          style: {
            fontSize: '12px',
            cssClass: 'apexcharts-xaxis-title',
          },
        },
      },
      yaxis: {
        tickAmount: 7,
        labels: {
          formatter: (value: number) => {
            return value / 1000 + 'K';
          },
          offsetX: isRtl ? -30 : -10,
          offsetY: 0,
          style: {
            fontSize: '12px',
            cssClass: 'apexcharts-yaxis-title',
          },
        },
        opposite: isRtl ? true : false,
      },
      grid: {
        borderColor: isDark ? '#191E3A' : '#E0E6ED',
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        fontSize: '16px',
        markers: {
          width: 10,
          height: 10,
          offsetX: -2,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 5,
        },
      },
      tooltip: {
        marker: {
          show: true,
        },
        x: {
          show: false,
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: !1,
          opacityFrom: isDark ? 0.19 : 0.28,
          opacityTo: 0.05,
          stops: isDark ? [100, 100] : [45, 100],
        },
      },
    },
  });

  return (
    <ReactApexChart
      series={revenueChart(isDark).series}
      options={revenueChart(isDark).options}
      type='area'
      height={325}
      width='100%'
    />
  );
};

export default OpenContractChart2;
