import { render, screen } from '@testing-library/react';
import { Formik } from 'formik';
import { DatePickerField } from '../../src/components/form/DatePickerField';

describe('DatePicker', () => {
  const mock = jest.fn();
  const name = 'nameText';
  const label = 'labelText';
  const format = 'yyyy-mm-dd';

  it('should render a date picker', () => {
    render(
      <Formik initialValues={{ [name]: '' }} onSubmit={mock}>
        <DatePickerField name={name} label={label} format={format} />
      </Formik>,
    );

    const labelElement = screen.getByLabelText(label);
    const inputElement = screen.getByPlaceholderText(format);

    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
  });
});
