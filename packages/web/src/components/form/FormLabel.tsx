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

interface FormLabelDescriptionProps {
  id: string;
}

export const FormLabelDescription: React.FC<FormLabelDescriptionProps> = ({ id, children }) => {
  return (
    <span id={id} className='text-sm text-gray-500'>
      {children}
    </span>
  );
};
