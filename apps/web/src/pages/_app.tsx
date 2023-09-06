import '../styles/globals.css';

import axios from 'axios';
import Head from 'next/head';

import type { AppProps } from 'next/app';
import { Footer, Header } from '@components';
import { AuthProvider } from 'react-oidc-context';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const oidcConfig = {
  authority: `${process.env.NEXT_PUBLIC_KC_URL}/realms/${process.env.NEXT_PUBLIC_KC_REALM}`,
  client_id: `${process.env.NEXT_PUBLIC_KC_CLIENT_ID}`,
  redirect_uri: `${process.env.NEXT_PUBLIC_KC_REDIRECT_URI}`,
  onSigninCallback: () => void 0,
};

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider {...oidcConfig}>
      <>
        <Head>
          <title>Health Provider Registry for BC’s Emergency Response</title>
          <link rel='icon' href='/assets/img/bc_favicon.ico' />
        </Head>
        <div className='h-full flex flex-col'>
          <Header />
          <main className='flex-grow flex justify-center'>
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </>
    </AuthProvider>
  );
}

export default App;
