import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

export const Header: React.FC = () => {
  const router = useRouter();
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headerRef?.current?.focus();
  }, [router.asPath]);

  return (
    <header className='bg-bcBluePrimary w-full border-b-2 border-bcYellowPrimary flex justify-center h-20'>
      <div className='w-full 2xl:w-2/3 h-full flex flex-row items-center align-center justify-between md:px-12'>
        <div className='layout-grid gap-0 h-full flex flex-row items-center align-center'>
          <div className='w-40'>
            <Link href='/'>
              <a>
                <Image
                  src='/assets/img/bc_logo.png'
                  alt='government of british columbia'
                  width={160}
                  height={45}
                />
              </a>
            </Link>
          </div>
          <div className='ml-7 pl-7 border-l-2 border-bcYellowPrimary'>
            <h1
              tabIndex={-1}
              ref={headerRef}
              className=' font-semibold tracking-wider text-white lg:text-2xl text-sm focus:outline-none'
            >
              BC Emergency Response
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};
