import React from 'react';
import { Formik } from 'formik';
import { render, screen } from '@testing-library/react';
import { BasicSelect, Option } from '@components';

describe('Select', () => {
  it('renders a select', () => {
    const mock = jest.fn();
    const testSelectName = 'input-id';
    const testSelectText = 'Select text';

    render(
      <Formik initialValues={{ [testSelectName]: '' }} onSubmit={mock}>
        <BasicSelect
          id={testSelectName}
          label={testSelectText}
          value=''
          options={[]}
          onChange={() => {}}
        />
      </Formik>,
    );

    const selectElement = screen.getByRole('button');

    expect(selectElement).toBeInTheDocument();
  });

  it('renders a label element with the correct accessible association', () => {
    const mock = jest.fn();
    const selectName = 'selectName';
    const selectLabel = 'select label';

    render(
      <Formik initialValues={{ [selectName]: '' }} onSubmit={mock}>
        <BasicSelect
          id={selectName}
          value={selectName}
          options={[]}
          onChange={() => {}}
          label={selectLabel}
        />
      </Formik>,
    );

    const labelElement = screen.getByText('select label');
    const selectElement = screen.getByRole('button');

    expect(labelElement).toBeInTheDocument();
    expect(selectElement).toHaveAccessibleName(selectLabel);
  });

  it('renders a description element with the proper accessible association', () => {
    const mock = jest.fn();
    const selectName = 'selectName';
    const selectLabel = 'select label';
    const selectDescription = 'field format description';

    render(
      <Formik initialValues={{ [selectName]: '' }} onSubmit={mock}>
        <BasicSelect
          label={selectLabel}
          description={selectDescription}
          id={selectName}
          value={selectName}
          options={[]}
          onChange={() => {}}
        />
      </Formik>,
    );

    const selectElement = screen.getByRole('button');
    const descriptionElement = screen.getByText('field format description');

    expect(descriptionElement).toBeInTheDocument();
    expect(selectElement).toHaveAccessibleDescription(selectDescription);
  });

  describe('Option', () => {
    it('renders an option', () => {
      const testValue = 'input-id';
      const testLabel = 'Select text';

      render(<Option value={testValue} label={testLabel} />);

      const optionElement = screen.getByRole('option');

      expect(optionElement).toBeInTheDocument();
    });

    it('renders an disabled and hidden option', () => {
      const testValue = 'input-id';
      const testLabel = 'Select text';

      render(<Option value={testValue} label={testLabel} disabled hidden />);

      const optionElement = screen.getByText('Select text');

      expect(optionElement).toHaveAttribute('disabled', '');
      expect(optionElement).toHaveAttribute('hidden', '');
    });
  });
});
