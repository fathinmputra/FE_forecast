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
  title: 'Register Cover',
};

const CoverRegister = () => {
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
        <div className='relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0 dark:bg-black/50'>
          <div className='relative hidden w-full items-center justify-center bg-[linear-gradient(225deg,rgba(239,18,98,1)_0%,rgba(67,97,238,1)_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]'>
            <div className='from-primary/10 absolute inset-y-0 w-8 via-transparent to-transparent xl:w-16 ltr:-right-10 ltr:bg-gradient-to-r ltr:xl:-right-20 rtl:-left-10 rtl:bg-gradient-to-l rtl:xl:-left-20'></div>
            <div className='ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]'>
              <Link href='/' className='ms-10 block w-48 lg:w-72'>
                <Image
                  src='/assets/images/auth/logo-white.svg'
                  alt='ERP ITS Logo'
                  width={288}
                  height={64}
                  priority
                />
              </Link>
              <div className='mt-24 hidden w-full max-w-[430px] lg:block'>
                <Image
                  src='/assets/images/auth/register.svg'
                  alt='Register illustration'
                  width={430}
                  height={400}
                  layout='responsive'
                />
              </div>
            </div>
          </div>
          <div className='relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]'>
            <div className='flex w-full max-w-[440px] items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full'>
              <Link href='/' className='block w-8 lg:hidden'>
                <Image
                  src='/assets/images/logo.svg'
                  alt='Logo small'
                  width={40}
                  height={40}
                />
              </Link>
              <LanguageDropdown className='ms-auto w-max' />
            </div>
            <div className='w-full max-w-[440px] lg:mt-16'>
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
                  href='/src/app/(auth)/auth/cover-login'
                  className='text-primary uppercase underline transition hover:text-black dark:hover:text-white'
                >
                  SIGN IN
                </Link>
              </div>
            </div>
            <p className='absolute bottom-6 w-full text-center dark:text-white'>
              © {new Date().getFullYear()}.ERP ITS TEAM All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverRegister;
