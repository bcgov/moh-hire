import { Field, FieldProps } from '@components';

interface OptionType {
  label: string;
  value: string;
}

export const Select: React.FC<FieldProps> = props => {
  const { name, label, disabled, description, children } = props;

  return (
    <Field name={name} label={label} description={description} disabled={disabled} as='select'>
      <option value={''} key={''} className='hidden'></option>
      {children}
    </Field>
  );
};

export const Option: React.FC<OptionType> = ({ label, value }) => {
  return (
    <option value={value} key={value}>
      {label}
    </option>
  );
};
