import { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';

import ComponentsAuthUnlockForm from '@/components/auth/components-auth-unlock-form';
import LanguageDropdown from '@/components/language-dropdown';

export const metadata: Metadata = {
  title: 'Unlock Box',
};

const BoxedLockScreen = () => {
  return (
    <div>
      <div className='absolute inset-0'>
        <Image
          src='/assets/images/auth/bg-gradient.png'
          alt=''
          layout='fill'
          objectFit='cover'
        />
      </div>

      <div className='relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 sm:px-16 dark:bg-[#060818]'>
        <Image
          src='/assets/images/auth/coming-soon-object1.png'
          alt=''
          className='absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2'
          layout='fill'
        />
        <Image
          src='/assets/images/auth/coming-soon-object2.png'
          alt=''
          className='absolute left-24 top-0 h-40 md:left-[30%]'
          layout='fill'
        />
        <Image
          src='/assets/images/auth/coming-soon-object3.png'
          alt=''
          className='absolute right-0 top-0 h-[300px]'
          layout='fill'
        />
        <Image
          src='/assets/images/auth/polygon-object.svg'
          alt=''
          className='absolute bottom-0 end-[28%]'
          layout='fill'
        />
        <div className='relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]'>
          <div className='relative flex flex-col justify-center rounded-md bg-white/60 px-6 py-20 backdrop-blur-lg lg:min-h-[758px] dark:bg-black/50'>
            <div className='absolute end-6 top-6'>
              <LanguageDropdown />
            </div>
            <div className='mx-auto w-full max-w-[440px]'>
              <div className='mb-10 flex items-center'>
                <div className='flex h-16 w-16 items-end justify-center overflow-hidden rounded-full bg-[#00AB55] ltr:mr-4 rtl:ml-4'>
                  <Image
                    src='/assets/images/auth/user.png'
                    alt='User'
                    width={64} // Specify width
                    height={64} // And height
                    objectFit='cover' // Cover the container
                  />
                </div>
                <div className='flex-1'>
                  <h4 className='text-2xl dark:text-white'>Shaun Park</h4>
                  <p className='text-white-dark'>
                    Enter your password to unlock your ID
                  </p>
                </div>
              </div>
              <ComponentsAuthUnlockForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxedLockScreen;
