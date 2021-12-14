import '../styles/globals.css';

import axios from 'axios';

import type { AppProps } from 'next/app';
import { Footer, Header } from '@components';

axios.defaults.baseURL = 'http://localhost:4000/api/v1';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='h-full flex flex-col'>
      <Header />
      <main className='flex-grow bg-bcLightBackground flex justify-center md:pt-11 pt-5'>
        <div className='h-min md:w-layout w-full md:mx-0 mx-2 mb-12'>
          <Component {...pageProps} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default MyApp;
