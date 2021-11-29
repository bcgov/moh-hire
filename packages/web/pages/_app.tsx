import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { Footer, Header } from '@components';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <main className='flex-grow bg-bcLightBackground flex justify-center md:pt-11 pt-5'>
        <div className='h-min md:w-layout w-full md:mx-0 mx-2 mb-12'>
          <Component {...pageProps} />
        </div>
      </main>
      <Footer />
    </>
  );
}
export default MyApp;
