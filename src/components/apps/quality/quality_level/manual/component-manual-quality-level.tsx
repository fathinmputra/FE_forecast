'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import CreateBreadCrumb from '@/hooks/createBreadCrumb';

const getDonutColor = (percentage: number) => {
  if (percentage >= 75) return ['#34A853', '#76c893']; // Hijau Gradasi
  if (percentage >= 50) return ['#FBBC05', '#fcbf49']; // Kuning Gradasi
  if (percentage >= 25) return ['#EA4335', '#f28f3b']; // Oranye Gradasi
  return ['#FF0000', '#ff6b6b']; // Merah Gradasi
};

const DonutChart = ({ percentage }: { percentage: number }) => {
  const [startColor, endColor] = getDonutColor(percentage);

  return (
    <div className='relative h-32 w-32'>
      <svg viewBox='0 0 36 36' className='circular-chart'>
        <defs>
          <linearGradient
            id={`gradient-${percentage}`}
            gradientTransform='rotate(90)'
          >
            <stop offset='0%' stopColor={startColor} />
            <stop offset='100%' stopColor={endColor} />
          </linearGradient>
        </defs>
        <path
          className='circle-bg'
          d='M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831'
          fill='none'
          stroke='#eee'
          strokeWidth='3.8'
        />
        <path
          className='circle'
          strokeDasharray={`${percentage}, 100`}
          d='M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831'
          fill='none'
          stroke={`url(#gradient-${percentage})`}
          strokeWidth='3.8'
          strokeLinecap='round'
        />
      </svg>
      <div className='absolute inset-0 flex items-center justify-center'>
        <span className='text-lg font-semibold'>{percentage}%</span>
      </div>
    </div>
  );
};

const ComponentsManualQualityLevel = () => {
  const pathname = usePathname();
  const assessmentData = [
    { aspect: 'Kejelasan dan transparansi kontrak', percentage: 85 },
    { aspect: 'Komunikasi dan responsivitas', percentage: 70 },
    { aspect: 'Harga yang Kompetitif', percentage: 60 },
    { aspect: 'Fleksibilitas dan Kemampuan', percentage: 40 },
    { aspect: 'Keandalan dan Kredibilitas', percentage: 30 },
    { aspect: 'Kepatuhan terhadap Regulasi dan Standar', percentage: 90 },
    { aspect: 'Kepatuhan terhadap Kesepakatan/Kontrak', percentage: 50 },
    { aspect: 'Kualitas Layanan', percentage: 80 },
  ];

  return (
    <div className='space-y-5'>
      <CreateBreadCrumb pathname={pathname} key={1} />
      <div className='flex-1 space-y-4 rounded bg-white p-6 shadow'>
        <h2 className='mb-4 text-lg font-semibold'>Quality Level</h2>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {assessmentData.map((item, index) => (
            <div
              key={index}
              className='flex transform flex-col items-center rounded-lg bg-white p-4 shadow-md transition-shadow duration-300 hover:scale-105 hover:shadow-lg'
            >
              {/* Aspect Name - Memperbesar dan Mempertebal */}
              <h3 className='mb-4 text-center text-base font-bold'>
                {item.aspect}
              </h3>

              {/* Donut Chart */}
              <DonutChart percentage={item.percentage} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComponentsManualQualityLevel;
