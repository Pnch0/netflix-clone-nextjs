'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isValidToken = token && token !== 'null' && token !== 'undefined';

    if (!isValidToken) {
      router.replace('/login');
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return null;
  }

  return isAuthenticated ? <>{children}</> : null;
};

