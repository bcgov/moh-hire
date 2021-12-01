export interface FormErrorProps {
  show: boolean;
}

export const FormError: React.FC<FormErrorProps> = ({ show, children }) => {
  return <div role='alert'>{show && <p className='block text-red-600 text-sm'>{children}</p>}</div>;
};
