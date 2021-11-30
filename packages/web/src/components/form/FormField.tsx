import classnames from 'classnames';
import { FormError, FormLabel, FormLabelDescription } from '@components';
import { Field as FormikField, useField } from 'formik';

interface FieldProps extends Pick<HTMLInputElement, 'type'> {
  name: string;
  label: string;
  children?: React.ReactElement;
  disabled?: boolean;
  description?: string;
  max?: string;
}

export const FormField: React.FC<FieldProps> = ({
  name,
  label,
  children,
  disabled,
  description,
}) => {
  const [field, meta] = useField(name);

  return (
    <div>
      <div className='mb-2'>
        <FormLabel htmlFor={name}>{label}</FormLabel>

        <FormLabelDescription id={`${name}-description`}>{description}</FormLabelDescription>
      </div>

      <FormikField
        name={name}
        id={name}
        aria-describedby={description ? `${name}-description` : null}
        className={classnames(
          'w-full rounded-none bg-gray-100 block h-10 border-b-2 border-bcBlack pl-1',
          { 'border-red-500': meta.touched && meta.error },
        )}
        value={field.value || ''}
        disabled={disabled}
      >
        {children}
      </FormikField>

      <FormError show={Boolean(meta.touched && meta.error)}>{meta.error}</FormError>
    </div>
  );
};
