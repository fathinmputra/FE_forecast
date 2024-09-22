'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AccountPayableMenu = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, [router]);

  return null;
};

export default AccountPayableMenu;
