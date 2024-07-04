import { ReactNode } from 'react';

interface LabelProps {
  htmlFor: string;
  children: ReactNode;
}

export const Label = ({ htmlFor, children }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className='block text-bcBlack text-base font-bold'>
      {children}
    </label>
  );
};
