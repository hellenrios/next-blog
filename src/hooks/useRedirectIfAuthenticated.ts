import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useRedirectIfAuthenticated = () => {
  const router = useRouter();

  useEffect(() => {
    const authenticated = localStorage.getItem('authenticated');
    if (authenticated) {
      router.push('/');
    }
  }, [router]);
};

export default useRedirectIfAuthenticated;
