import { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';

import ComponentsAuthResetPasswordForm from '@/components/auth/components-auth-reset-password-form';
import LanguageDropdown from '@/components/language-dropdown';

export const metadata: Metadata = {
  title: 'Recover Id Box',
};

const BoxedPasswordReset = () => {
  return (
    <div>
      <div className='absolute inset-0'>
        <Image
          src='/assets/images/auth/bg-gradient.png'
          alt='' // Removed redundant words
          layout='fill' // Cover the container
          objectFit='cover'
        />
      </div>

      <div className='relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 sm:px-16 dark:bg-[#060818]'>
        {/* Convert all <img> tags below to <Image> components similar to the above example */}
        <Image
          src='/assets/images/auth/coming-soon-object1.png'
          alt=''
          layout='fill'
          objectFit='cover'
          className='absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2'
        />
        <Image
          src='/assets/images/auth/coming-soon-object2.png'
          alt=''
          layout='fill'
          objectFit='cover'
          className='absolute left-24 top-0 h-40 md:left-[30%]'
        />
        <Image
          src='/assets/images/auth/coming-soon-object3.png'
          alt=''
          layout='fill'
          objectFit='cover'
          className='absolute right-0 top-0 h-[300px]'
        />
        <Image
          src='/assets/images/auth/polygon-object.svg'
          alt=''
          layout='fill'
          objectFit='cover'
          className='absolute bottom-0 end-[28%]'
        />
        <div className='relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]'>
          <div className='relative flex flex-col justify-center rounded-md bg-white/60 px-6 py-20 backdrop-blur-lg lg:min-h-[758px] dark:bg-black/50'>
            <div className='absolute end-6 top-6'>
              <LanguageDropdown />
            </div>
            <div className='mx-auto w-full max-w-[440px]'>
              <div className='mb-7'>
                <h1 className='mb-3 text-2xl font-bold !leading-snug dark:text-white'>
                  Password Reset
                </h1>
                <p>Enter your email to recover your ID</p>
              </div>
              <ComponentsAuthResetPasswordForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxedPasswordReset;
