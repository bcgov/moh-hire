import '../styles/globals.css';

import axios from 'axios';

import type { AppProps } from 'next/app';
import { Footer, Header } from '@components';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='h-full flex flex-col'>
      <Header />
      <main className='flex-grow flex justify-center'>
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
export default MyApp;
