import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import ComponentsAuthRegisterForm from '@/components/auth/components-auth-register-form';
import IconFacebookCircle from '@/components/icon/icon-facebook-circle';
import IconGoogle from '@/components/icon/icon-google';
import IconInstagram from '@/components/icon/icon-instagram';
import IconTwitter from '@/components/icon/icon-twitter';
import LanguageDropdown from '@/components/language-dropdown';

export const metadata: Metadata = {
  title: 'Register Boxed',
};

const BoxedSignUp = () => {
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
          alt='' // Removed redundant words
          layout='fill'
          objectFit='cover'
          className='absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2'
        />
        <Image
          src='/assets/images/auth/coming-soon-object2.png'
          alt='' // Removed redundant words
          layout='fill'
          objectFit='cover'
          className='absolute left-24 top-0 h-40 md:left-[30%]'
        />
        <Image
          src='/assets/images/auth/coming-soon-object3.png'
          alt='' // Removed redundant words
          layout='fill'
          objectFit='cover'
          className='absolute right-0 top-0 h-[300px]'
        />
        <Image
          src='/assets/images/auth/polygon-object.svg'
          alt='' // Removed redundant words
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
              <div className='mb-10'>
                <h1 className='text-primary text-3xl font-extrabold uppercase !leading-snug md:text-4xl'>
                  Sign Up
                </h1>
                <p className='text-white-dark text-base font-bold leading-normal'>
                  Enter your email and password to register
                </p>
              </div>
              <ComponentsAuthRegisterForm />
              <div className='relative my-7 text-center md:mb-9'>
                <span className='bg-white-light dark:bg-white-dark absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2'></span>
                <span className='text-white-dark dark:bg-dark dark:text-white-light relative bg-white px-2 font-bold uppercase'>
                  or
                </span>
              </div>
              <div className='mb-10 md:mb-[60px]'>
                <ul className='flex justify-center gap-3.5 text-white'>
                  <li>
                    <Link
                      href='#'
                      className='inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110'
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)',
                      }}
                    >
                      <IconInstagram />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110'
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)',
                      }}
                    >
                      <IconFacebookCircle />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110'
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)',
                      }}
                    >
                      <IconTwitter fill={true} />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='#'
                      className='inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110'
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)',
                      }}
                    >
                      <IconGoogle />
                    </Link>
                  </li>
                </ul>
              </div>
              <div className='text-center dark:text-white'>
                Already have an account ?&nbsp;
                <Link
                  href='/src/app/(auth)/auth/boxed-signin'
                  className='text-primary uppercase underline transition hover:text-black dark:hover:text-white'
                >
                  SIGN IN
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxedSignUp;
