import React from 'react';
import { render, screen } from '@testing-library/react';
import { Error } from '../../../src/components/form/Error';

describe('FormError', () => {
  it('renders an alert when show is false', () => {
    const errorText = 'error text';

    render(<Error show={false}>{errorText}</Error>);

    const alertContainer = screen.getByRole('alert');

    expect(alertContainer).toBeInTheDocument();
  });

  it('renders no children when show is false', () => {
    const errorText = 'error text';

    render(<Error show={false}>{errorText}</Error>);

    const alertContainer = screen.getByRole('alert');

    expect(alertContainer.firstChild).toBeNull();
  });

  it('renders children when show true', () => {
    const errorText = 'error text';

    render(<Error show={true}>{errorText}</Error>);

    const alertContainer = screen.getByRole('alert');
    const errorElement = screen.getByText(errorText);

    expect(alertContainer.firstChild).toHaveTextContent(errorText);
    expect(alertContainer).toContainElement(errorElement);
  });
});
