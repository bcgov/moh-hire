import React, { useCallback, useRef } from 'react';
import { FieldProps } from 'formik';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';

import { Field } from '@components';
import calendarIcon from '@assets/img/calendar.svg';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerFieldProps {
  name: string;
  label: string;
  format?: string;
  bgColour?: string;
  max?: Date;
  min?: Date;
  numOfYears?: number;
  validate?: (value: string) => string | undefined;
}

export const DatePickerField = (props: DatePickerFieldProps) => {
  const {
    name,
    label,
    format,
    validate,
    min,
    max = new Date(9999, 12, 31),
    numOfYears = 20,
    bgColour,
  } = props;

  const valRef = useRef('');
  const ref = useRef<DatePicker>(null);

  const DatePickerFieldComponent = useCallback(
    ({ field, form }: FieldProps) => (
      <div
        className={classNames(
          'flex pr-2 border-b-2 border-bcBlack',
          bgColour ? bgColour : 'bg-bcGrayInput',
        )}
      >
        <DatePicker
          id={name}
          dateFormat={format}
          className={classNames(
            'w-full rounded-none block h-10 pl-1 disabled:bg-bcDisabled',
            bgColour ? bgColour : 'bg-bcGrayInput',
          )}
          placeholderText={format?.toLowerCase()}
          autoComplete='off'
          minDate={min}
          maxDate={max}
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={numOfYears}
          selected={field.value ? dayjs(field.value).toDate() : null}
          onFocus={e => (valRef.current = e.target.value)}
          onBlur={() => {
            form.setFieldTouched(name, true);
            valRef.current && form.setFieldValue(name, valRef.current);
          }}
          onChangeRaw={e => {
            if (dayjs(e.target.value, 'YYYY/MM/DD').isValid()) {
              valRef.current = e.target.value;
            }
          }}
          onChange={value => value || form.setFieldValue(name, '')}
          onSelect={value => {
            const newValue = value ? dayjs(value).format('YYYY-MM-DD') : '';
            form.setFieldValue(name, newValue);
          }}
          ref={ref}
        />
        <img
          src={calendarIcon.src}
          className=' h-5 m-auto'
          alt='calendar icon'
          onClick={() => ref.current?.setOpen(true)}
        />
      </div>
    ),
    [],
  );

  return (
    <Field
      name={name}
      label={label}
      min={min}
      validate={validate}
      component={DatePickerFieldComponent}
    />
  );
};
