'use client';

import React from 'react';

const SummaryCard = () => {
  return (
    <div className='flex-1 rounded bg-white p-6 shadow'>
      <h2 className='mb-4 text-lg font-semibold'>Quality Dashboard</h2>
      <h3 className='mb-4 text-base font-semibold'>
        Ringkasan Riwayat Procurement & Kontrak
      </h3>
      <div className='flex flex-wrap justify-around'>
        <div className='mx-8 flex flex-col items-center'>
          <p>Total Procurement</p>
          <p className='text-2xl font-bold'>35</p>
        </div>
        <div className='mx-8 flex flex-col items-center'>
          <p>Total Kontrak</p>
          <p className='text-2xl font-bold'>25</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
