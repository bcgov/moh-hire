import { PropsWithChildren, ReactNode } from 'react';

export const AdminSection = ({ children }: PropsWithChildren<ReactNode>) => {
  return <div className='border rounded p-4 mb-8'>{children}</div>;
};
