import React from 'react';
import { FieldProps as FormikFieldProps } from 'formik';
import ReactSelect, { StylesConfig } from 'react-select';
import { Field, FieldProps, OptionType } from '@components';

interface MultiSelectProps extends FieldProps {
  options: OptionType[];
}

/**
 * Description is not enabled for this component, it's not required by designs and
 * aria-describedby is not supported by react-select
 */
export const MultiSelect: React.FC<MultiSelectProps> = props => {
  const { label, name, options, disabled } = props;

  return (
    <Field
      name={name}
      label={label}
      component={({ field, form }: FormikFieldProps) => (
        <ReactSelect
          value={field.value}
          onChange={value => form.setFieldValue(name, value)}
          inputId={name}
          isMulti
          styles={selectStyleOverride}
          options={options}
          isDisabled={disabled}
          onBlur={field.onBlur}
        />
      )}
    />
  );
};

export const selectStyleOverride: StylesConfig<OptionType, true> = {
  indicatorSeparator: styles => ({ ...styles }),
  clearIndicator: styles => ({ ...styles, color: 'black' }),
  indicatorsContainer: styles => ({ ...styles, color: 'black' }),
  dropdownIndicator: styles => ({
    ...styles,
    paddingRight: '0',
    color: 'black',
    transform: 'scale(0.8, 0.85)',
  }),
  input: styles => ({ ...styles }),
  control: styles => ({
    ...styles,
    display: 'flex',
    padding: '2px',
    border: '0',
    borderBottom: '1px solid rgb(49, 49, 50)',
    background: 'rgb(243, 244, 246)',
    borderRadius: '0',
  }),
  option: styles => ({ ...styles, padding: '0', paddingLeft: '.5rem' }),
  menuList: styles => ({ ...styles }),
  menu: styles => ({
    ...styles,
    margin: 0,
    left: '0',
    padding: 0,
    borderRadius: 0,
    background: 'rgb(243, 244, 246)',
    boxShadow: '0',
    border: '1px solid black',
    borderTop: '0',
  }),
};
