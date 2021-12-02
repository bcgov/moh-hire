import classnames from 'classnames';
import { Error, Label, Description } from '@components';
import { Field as FormikField, useField, FieldConfig } from 'formik';

export interface FieldProps extends FieldConfig {
  name: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export const Field: React.FC<FieldProps> = props => {
  const { name, label, children, disabled, description, type, as } = props;
  const [field, meta] = useField(name);

  return (
    <div>
      <div className='mb-2'>
        <Label htmlFor={name}>{label}</Label>

        <Description id={`${name}-description`}>{description}</Description>
      </div>

      <FormikField
        id={name}
        aria-describedby={description ? `${name}-description` : null}
        className={classnames(
          'w-full rounded-none bg-gray-100 block h-10 border-b-2 border-bcBlack pl-1',
          { 'border-red-500': meta.touched && meta.error },
        )}
        disabled={disabled}
        as={as}
        type={type}
        {...field}
      >
        {children}
      </FormikField>

      <Error show={Boolean(meta.touched && meta.error)}>{meta.error}</Error>
    </div>
  );
};
