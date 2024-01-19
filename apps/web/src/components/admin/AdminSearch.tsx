import React, { useEffect } from 'react';
import { useState } from 'react';
import { RegistrantFilterDTO } from '@ehpr/common';
import { SearchInput } from '../SearchInput';
import { DEFAULT_PAGE_SIZE } from './AdminRegistrantsTable';

interface SearchInputProps {
  search: (filters: RegistrantFilterDTO, limit: number) => void;
}

// delay to reduce api call count
const QUERY_DELAY = 300;

export const AdminSearch = (props: SearchInputProps) => {
  const { search } = props;

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(
      () => search({ firstName, lastName, email }, DEFAULT_PAGE_SIZE),
      QUERY_DELAY,
    );
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstName, lastName, email]);

  return (
    <div className='relative bg-white z-10 flex flex-row items-center pl-5'>
      {/* first name search input */}
      <SearchInput
        name='firstName'
        value={firstName}
        onChange={setFirstName}
        placeholder='First name'
      />
      {/* last name search input */}
      <SearchInput
        name='lastName'
        value={lastName}
        onChange={setLastName}
        placeholder='Last name'
      />
      {/* email search input */}
      <SearchInput name='email' value={email} onChange={setEmail} placeholder='Email' />
    </div>
  );
};
