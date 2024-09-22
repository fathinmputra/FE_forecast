import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

import { IRootState } from "@/store";

interface ChartOptions {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  options: ApexOptions;
}

const InvitationContractChart1 = () => {
  const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
  const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

  const uniqueVisitorSeries: ChartOptions = {
    series: [
      {
        name: 'Direct',
        data: [58, 44, 55, 57, 56, 61, 58, 63, 60, 66, 56, 63],
      },
      {
        name: 'Organic',
        data: [91, 76, 85, 101, 98, 87, 105, 91, 114, 94, 66, 70],
      },
    ],
    options: {
      chart: {
        height: 360,
        type: 'bar',
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
        colors: ['transparent'],
      },
      colors: ['#5c1ac3', '#ffbb44'],
      // dropShadow: {
      //   enabled: true,
      //   blur: 3,
      //   color: '#515365',
      //   opacity: 0.4,
      // },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 8,
          borderRadiusApplication: 'end',
        },
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '14px',
        itemMargin: {
          horizontal: 8,
          vertical: 8,
        },
      },
      grid: {
        borderColor: isDark ? '#191e3a' : '#e0e6ed',
        padding: {
          left: 20,
          right: 20,
        },
      },
      xaxis: {
        categories: [
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
        axisBorder: {
          show: true,
          color: isDark ? '#3b3f5c' : '#e0e6ed',
        },
      },
      yaxis: {
        tickAmount: 6,
        opposite: isRtl ? true : false,
        labels: {
          offsetX: isRtl ? -10 : 0,
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: isDark ? 'dark' : 'light',
          type: 'vertical',
          shadeIntensity: 0.3,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 0.8,
          stops: [0, 100],
        },
      },
      tooltip: {
        marker: {
          show: true,
        },
      },
    },
  };

  return (
    <ReactApexChart 
      options={uniqueVisitorSeries.options} 
      series={uniqueVisitorSeries.series} 
      type="bar" 
      height={360} 
      width="100%" 
    />
  );
};

export default InvitationContractChart1;
