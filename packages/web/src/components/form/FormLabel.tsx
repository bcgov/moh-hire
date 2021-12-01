interface FormLabelProps {
  htmlFor: string;
}

export const FormLabel: React.FC<FormLabelProps> = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className='block text-bcBlack text-base font-bold'>
      {children}
    </label>
  );
};
