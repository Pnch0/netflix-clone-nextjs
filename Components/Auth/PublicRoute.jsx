'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const PublicRoute = ({ children }) => {
  const router = useRouter();
  const [isPublic, setIsPublic] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isValidToken = token && token !== 'null' && token !== 'undefined';

    if (isValidToken) {
      router.replace('/');
    } else {
      setIsPublic(true);
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return null;
  }

  return isPublic ? <>{children}</> : null;
};

