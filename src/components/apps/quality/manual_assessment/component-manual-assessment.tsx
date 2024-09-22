'use client';

import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

import CreateBreadCrumb from '@/hooks/createBreadCrumb';

const AccordionItem = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='rounded border border-gray-300'>
      <button
        type='button'
        className='flex w-full items-center justify-between bg-gray-100 px-4 py-2 text-lg hover:bg-gray-200 focus:outline-none focus:ring focus:ring-opacity-50'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className='font-semibold'>{title}</span>
        {/* Tanda dropdown (ikon chevron) */}
        <svg
          className={`h-5 w-5 transform transition-transform duration-200 ${
            isOpen ? 'rotate-0' : 'rotate-90'
          }`}
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          {/* Chevron default ke kanan */}
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M9 5l7 7-7 7'
          />
        </svg>
      </button>
      {isOpen && <div className='p-4'>{children}</div>}
    </div>
  );
};

const StarRating = ({
  rating,
  onChange,
}: {
  rating: number;
  onChange: (rating: number) => void;
}) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className='mt-2 flex space-x-1'>
      {stars.map(star => (
        <button
          key={star}
          type='button'
          className={`text-4xl ${
            rating >= star ? 'text-yellow-500' : 'text-gray-300'
          } focus:outline-none`}
          onClick={() => onChange(star)}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const ManualAssessment = () => {
  const [ratings, setRatings] = useState<number[]>(Array(8).fill(0));
  const [comments, setComments] = useState<string[]>(Array(8).fill(''));

  const handleRatingChange = (index: number, rating: number) => {
    const newRatings = [...ratings];
    newRatings[index] = rating;
    setRatings(newRatings);
  };

  const handleCommentChange = (index: number, comment: string) => {
    const newComments = [...comments];
    newComments[index] = comment;
    setComments(newComments);
  };

  const handleSave = () => {
    // Handle save logic here
    // console.log('Ratings:', ratings);
    // console.log('Comments:', comments);
  };

  const questions = [
    'Seberapa jelas kontrak dibuat?',
    'Seberapa komunikatif dan responsif?',
    'Seberapa baik negosiasi penawaran harga?',
    'Seberapa mampu supplier dapat memenuhi kebutuhan industri?',
    'Seberapa tinggi reputasi atau keterkenalan supplier menurut industri?',
    'Apakah supplier memenuhi semua regulasi dan standar yang berlaku dalam proses produksi dan pengiriman?',
    'Apakah supplier mematuhi semua kesepakatan dan kontrak yang telah dibuat?',
    'Seberapa puas atas layanan yang diberikan?',
  ];

  return (
    <div className='space-y-4'>
      {questions.map((question, index) => (
        <div key={index} className='border-b border-gray-300 pb-4'>
          <span className='font-semibold'>{question}</span>
          <StarRating
            rating={ratings[index]}
            onChange={rating => handleRatingChange(index, rating)}
          />
          <textarea
            className='mt-2 w-full rounded border border-gray-300 p-2'
            placeholder='Tambahkan komentar'
            value={comments[index]}
            onChange={e => handleCommentChange(index, e.target.value)}
          />
        </div>
      ))}
      <div className='mt-4 flex justify-center'>
        <button
          type='button'
          className='h-[39px] w-[187px] rounded bg-[#34A853] font-bold text-white hover:bg-[#2c8b40] focus:outline-none focus:ring focus:ring-opacity-50'
          onClick={handleSave}
        >
          SIMPAN
        </button>
      </div>
    </div>
  );
};

const ComponentsManualAssessment = () => {
  const pathname = usePathname();

  return (
    <div className='space-y-5'>
      <CreateBreadCrumb pathname={pathname} key={1} />
      <div className='flex-1 space-y-4 rounded bg-white p-6 shadow'>
        <h2 className='mb-4 text-xl font-semibold'>Manual Assessment</h2>
        <AccordionItem title='Informasi Barang'>
          {/* Konten untuk Informasi Barang */}
          <p>Isi informasi barang di sini.</p>
        </AccordionItem>
        <AccordionItem title='Rincian Pengadaan'>
          {/* Konten untuk Rincian Pengadaan */}
          <p>Isi rincian pengadaan di sini.</p>
        </AccordionItem>
        <AccordionItem title='Rincian Aktual'>
          {/* Konten untuk Rincian Aktual */}
          <p>Isi rincian aktual di sini.</p>
        </AccordionItem>
        <AccordionItem title='Manual Assessment'>
          <ManualAssessment />
        </AccordionItem>
      </div>
    </div>
  );
};

export default ComponentsManualAssessment;
