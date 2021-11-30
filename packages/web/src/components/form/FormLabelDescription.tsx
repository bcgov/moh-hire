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
