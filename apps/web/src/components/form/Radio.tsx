import { Error, OptionType } from '@components';
import classnames from 'classnames';
import { Field as FormikField } from 'formik';

interface RadioProps {
  legend: string;
  name: string;
  options: OptionType[];
  horizontal?: boolean;
}

export const Radio: React.FC<RadioProps> = ({ legend, name, options, horizontal }) => {
  return (
    <fieldset className='flex flex-col gap-4'>
      <legend className='text-bcBlack font-bold mb-4'>{legend}</legend>
      <div
        className={classnames(
          'flex',
          { 'flex-col gap-4': !horizontal },
          { 'flex-row gap-8': horizontal },
        )}
      >
        {options.map(option => (
          <label key={option.value} className='flex items-center cursor-pointer leading-none'>
            <FormikField type='radio' name={name} value={option.value} className='mr-2 h-5 w-5' />
            {option.label}
          </label>
        ))}
      </div>
      <Error name={name} />
    </fieldset>
  );
};
