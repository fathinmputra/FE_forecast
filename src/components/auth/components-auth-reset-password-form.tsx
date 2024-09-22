'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

import IconMail from '@/components/icon/icon-mail';

const ComponentsAuthResetPasswordForm = () => {
  const router = useRouter();

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <form className='space-y-5' onSubmit={submitForm}>
      <div>
        <label htmlFor='Email' className='dark:text-white'>
          Email
        </label>
        <div className='text-white-dark relative'>
          <input
            id='Email'
            type='email'
            placeholder='Enter Email'
            className='form-input placeholder:text-white-dark ps-10'
          />
          <span className='absolute start-4 top-1/2 -translate-y-1/2'>
            <IconMail fill={true} />
          </span>
        </div>
      </div>
      <button
        type='submit'
        className='btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]'
      >
        RECOVER
      </button>
    </form>
  );
};

export default ComponentsAuthResetPasswordForm;
