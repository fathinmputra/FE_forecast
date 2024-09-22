'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const CreateRFQPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/procurement/create_rfq/general_info');
  }, [router]);

  return null;
};

export default CreateRFQPage;