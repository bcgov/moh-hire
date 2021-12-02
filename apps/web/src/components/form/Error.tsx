export interface ErrorProps {
  show: boolean;
}

export const Error: React.FC<ErrorProps> = ({ show, children }) => {
  return (
    <div role='alert' className='min-h-4'>
      {show && <p className='block text-red-600 text-sm'>{children}</p>}
    </div>
  );
};
