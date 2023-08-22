import { useAuth } from 'react-oidc-context';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AdminPage = () => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth?.isAuthenticated && !auth.isLoading) {
      router.replace('/login');
    }
  }, [auth, router]);

  return (
    <div className='grid f-ull place-items-center'>
      <h1 className='text-4xl'>Admin Page</h1>
    </div>
  );
};

export default AdminPage;
