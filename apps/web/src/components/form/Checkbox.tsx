import { OptionType } from '@components';
import { Field as FormikField } from 'formik';

interface CheckboxProps {
  name: string;
  label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ name, label }) => {
  return (
    <div className='flex items-center'>
      <FormikField name={name} id={name} type='checkbox' className='mr-2 h-5 w-5' />
      <label htmlFor={name} className='cursor-pointer leading-none'>
        {label}
      </label>
    </div>
  );
};

interface CheckboxArrayProps {
  legend: string;
  options: OptionType[];
}

export const CheckboxArray: React.FC<CheckboxArrayProps> = ({ legend, options }) => {
  return (
    <fieldset className='flex flex-col gap-4'>
      <legend className='text-bcBlack font-bold mb-2'>{legend}</legend>
      {options.map(option => (
        <Checkbox key={option.value} name={option.value} label={option.label} />
      ))}
    </fieldset>
  );
};
