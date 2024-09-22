import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import IconArrowWaveLeftUp from '@/components/icon/icon-arrow-wave-left-up';
import ComponentsPagesFaqWithTabs from '@/components/pages/components-pages-faq-with-tabs';

export const metadata: Metadata = {
  title: 'FAQ',
};

const Faq = () => {
  return (
    <div>
      <div className="bg-primary-light relative rounded-t-md bg-[url('/assets/images/knowledge/pattern.png')] bg-contain bg-left-top bg-no-repeat px-5 py-10 md:px-10 dark:bg-black">
        <div className='rtl:rotate-y-180 absolute -bottom-1 -end-6 hidden text-[#DBE7FF] lg:block xl:end-0 dark:text-[#1B2E4B]'>
          <Image
            src='/assets/images/faq/faq-dark.svg'
            alt='faqs'
            width={224}
            height={56}
            className='dark-img object-cover'
          />
          <Image
            src='/assets/images/faq/faq-light.svg'
            alt='faqs'
            width={224}
            height={56}
            className='light-img object-cover'
          />
        </div>
        <div className='relative'>
          <div className='flex flex-col items-center justify-center sm:-ms-32 sm:flex-row xl:-ms-60'>
            <div className='mb-2 flex gap-1 text-end text-base leading-5 sm:flex-col xl:text-xl'>
              <span>It&apos;s free </span>
              <span>For everyone</span>
            </div>
            <div className='rtl:rotate-y-180 me-4 ms-2 hidden text-[#0E1726] sm:block dark:text-white'>
              <IconArrowWaveLeftUp className='w-16 xl:w-28' />
            </div>
            <div className='mb-2 text-center text-2xl font-bold md:text-5xl dark:text-white'>
              FAQs
            </div>
          </div>
          <p className='mb-9 text-center text-base font-semibold'>
            Search instant answers & questions asked by popular users
          </p>
          <form action='' method='' className='mb-6'>
            <div className='relative mx-auto max-w-[580px]'>
              <input
                type='text'
                placeholder='Ask a question'
                className='form-input py-3 ltr:pr-[100px] rtl:pl-[100px]'
              />
              <button
                type='button'
                className='btn btn-primary absolute top-1 shadow-none ltr:right-1 rtl:left-1'
              >
                Search
              </button>
            </div>
          </form>
          <div className='flex flex-wrap items-center justify-center gap-2 font-semibold text-[#2196F3] sm:gap-5'>
            <div className='whitespace-nowrap font-medium text-black dark:text-white'>
              Popular topics :
            </div>
            <div className='flex items-center justify-center gap-2 sm:gap-5'>
              <Link href='#' className='duration-300 hover:underline'>
                Sales
              </Link>
              <Link href='#' className='duration-300 hover:underline'>
                Charts
              </Link>
              <Link href='#' className='duration-300 hover:underline'>
                Finance
              </Link>
              <Link href='#' className='duration-300 hover:underline'>
                Trending
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ComponentsPagesFaqWithTabs title='Frequently asked <span className="text-primary">questions</span>' />
      <div className='panel mt-10 text-center md:mt-20'>
        <h3 className='mb-2 text-xl font-bold md:text-2xl dark:text-white'>
          Still need help?
        </h3>
        <div className='text-white-dark text-lg font-medium'>
          Our specialists are always happy to help. Contact us during standard
          business hours or email us24/7 and we&apos;ll get back to you.
        </div>
        <div className='mt-8 flex flex-col items-center justify-center gap-6 sm:flex-row'>
          <button type='button' className='btn btn-primary'>
            Contact Us
          </button>
          <button type='button' className='btn btn-primary'>
            Visit our community
          </button>
        </div>
      </div>
    </div>
  );
};

export default Faq;
