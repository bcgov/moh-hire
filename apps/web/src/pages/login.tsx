import { useAuth } from 'react-oidc-context';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Login = () => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.isAuthenticated) {
      router.replace('/admin');
    }
  }, [auth, router]);

  const login = async () => {
    await auth.signinRedirect();
  };

  return (
    <div className='fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className='w-full h-full flex items-center justify-center'>
        <div className='flex flex-col items-center justify-center bg-bcLightBlueBackground rounded py-6 px-24'>
          <h1 className='font-bold text-4xl mb-3'>Login</h1>
          <div className='text-center mb-7'>
            <p>
              Welcome to the <b>EHPR</b> administration.
            </p>
            <p>To log in, please click the button below</p>
          </div>
          <button
            className='bg-bcBluePrimary h-12 w-24 text-white font-bold rounded'
            onClick={login}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
