import React from 'react';
import { render, screen } from '@testing-library/react';
import { Download } from '@components';

describe('Download', () => {
  it('renders extension type properly', () => {
    render(<Download ext='pdf' icon='/assets/img/download.svg' />);

    const notice = screen.getByText('Download PDF');
    expect(notice).toBeInTheDocument();

    const image = screen.getByRole('img', { name: 'download' });
    expect(image).toBeInTheDocument();
  });
});
