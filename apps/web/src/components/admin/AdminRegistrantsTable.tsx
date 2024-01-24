import { useEffect, useState } from 'react';
import { Specialty } from '@constants';
import { RegistrantFilterDTO, RegistrantRO } from '@ehpr/common';
import { getAllRegistrantsEmails, getRegistrants } from '@services';
import { Spinner } from '../Spinner';
import { AdminSearch } from './AdminSearch';
import { Pagination } from '../Pagination';
import { GeneralCheckbox } from '../general';
import { Button } from '../Button';

interface FilterOptions {
  firstName?: string;
  lastName?: string;
  email?: string;
  skip?: number;
  take?: number;
  limit?: number;
}

interface PageOptions {
  pageIndex: number;
  pageSize: number;
}

export const DEFAULT_PAGE_SIZE = 10;

export const AdminRegistrantsTable = () => {
  const [registrants, setRegistrants] = useState<RegistrantRO[] | undefined>();
  const [emails, setEmails] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<RegistrantFilterDTO | undefined>();

  // pagination
  const [limit, setLimit] = useState<number>(DEFAULT_PAGE_SIZE);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  // used for page refreshes
  useEffect(() => {
    const skip = (pageIndex - 1) * limit;
    const options: FilterOptions = {
      limit,
      skip,
      ...filters,
    };

    searchRegistrants(options).then(data => data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, pageIndex]);

  const searchRegistrants = async (filters: RegistrantFilterDTO) => {
    setLoading(true);
    getRegistrants(filters).then(({ data, count }) => {
      if (data) {
        const updatedData = data.map(item => {
          // to save state between pagination changes and add checked field to object
          // if in email state, the item will already be 'checked'
          const isChecked = emails.some(email => email === item.email);
          if (isChecked) {
            return { ...item, checked: true };
          } else {
            return { ...item, checked: false };
          }
        });

        setRegistrants(updatedData);
        setTotal(count);

        if (count < limit) {
          setPageIndex(1);
        }
      }
      setLoading(false);
    });
  };

  // used for search inputs
  const search = async (filters: RegistrantFilterDTO, searchLimit: number) => {
    const options: FilterOptions = { ...filters, limit: searchLimit };
    setLimit(searchLimit);
    setPageIndex(1);
    setFilters(filters);
    await searchRegistrants(options);
  };

  // pagination page options
  const handlePageOptions = ({ pageIndex: pgIndex, pageSize: pgSize }: PageOptions) => {
    if (pgSize !== limit) {
      setLimit(pgSize);
      setPageIndex(1);
    } else {
      setPageIndex(pgIndex);
    }
  };

  // handle multiple specialties
  const displaySpecialties = (specialties: string | string[]) => {
    if (Array.isArray(specialties)) {
      return specialties.map(s => Specialty[s as keyof typeof Specialty]).join(', ');
    } else {
      return Specialty[specialties as keyof typeof Specialty];
    }
  };

  // function for selecting individual rows
  const handleCheckBoxSelect = (checked: boolean, email?: string) => {
    let updatedEmailsList: string[] = [];
    if (email) {
      const registrantIndex = registrants?.findIndex(e => e.email === email);

      // update registrants checked value
      if (registrants && registrantIndex !== -1 && registrantIndex !== undefined) {
        registrants[registrantIndex].checked = checked;
      }

      const emailExists = emails.some(e => e === email);

      // update email list if email is checked
      if (checked && !emailExists) {
        updatedEmailsList = [...emails, email];
        // filter out email if unchecked
      } else if (!checked && emailExists) {
        updatedEmailsList = emails.filter(e => e !== email);
      } else {
        updatedEmailsList = emails;
      }

      setEmails(updatedEmailsList);
    }
  };

  // function for Select All rows
  // includes items not shown through pagination
  const handleSelectAll = (checked: boolean) => {
    let updatedRegistrants: RegistrantRO[] | undefined = [];

    if (checked) {
      // get all the emails since pagination contains a 'skip' and 'limit' query
      // allows pagination to save checked value between pages
      // returns just the registrants email
      getAllRegistrantsEmails().then(data => setEmails(data));
    } else {
      setEmails([]);
    }

    updatedRegistrants = registrants?.map(registrant => ({
      ...registrant,
      checked,
    }));

    setRegistrants(updatedRegistrants || []);
  };

  return (
    <>
      <div className='flex flex-row items-center p-3 border border-bcLightGray rounded'>
        Filter:
        <AdminSearch search={search} />
      </div>
      <div className='flex justify-end w-full my-5'>
        {/* TODO: implement create mass email template/ button handler */}
        <Button variant='primary' disabled={!emails.length}>
          Create Mass Email
        </Button>
      </div>
      <div className='overflow-x-auto border border-bcLightGray rounded mb-5'>
        <Pagination
          pageOptions={{ pageIndex, pageSize: limit, total }}
          onChange={handlePageOptions}
        />

        <table className='text-left w-full'>
          <thead className='whitespace-nowrap  text-bcBlack'>
            <tr className='border-b-2 bg-bcLightGray border-yellow-300 text-sm'>
              <th className='py-4 pl-6' scope='col'>
                <GeneralCheckbox
                  label='Select All'
                  name='selectAll'
                  value='selectAll'
                  onChange={handleSelectAll}
                />
              </th>
              <th className='px-6' scope='col'>
                First Name
              </th>
              <th className='px-6' scope='col'>
                Last Name
              </th>
              <th className='px-6 ' scope='col'>
                Email
              </th>
              <th className='px-6' scope='col'>
                Specialization
              </th>
              <th className='px-6' scope='col'>
                Places Willing to Work
              </th>
            </tr>
          </thead>
          <tbody className='text-bcBlack'>
            {registrants && registrants.length > 0 ? (
              registrants.map((reg: RegistrantRO) => (
                <tr
                  key={reg.id}
                  className='text-left shadow-xs whitespace-nowrap text-sm border border-bcLightGray'
                >
                  <th className='py-4 pl-6' scope='col'>
                    <GeneralCheckbox
                      name={reg.email}
                      value={reg.email}
                      onChange={handleCheckBoxSelect}
                      checked={reg.checked}
                    />
                  </th>

                  <th className='py-4 px-6' scope='col'>
                    {reg.firstName}
                  </th>
                  <th className='px-6' scope='col'>
                    {reg.lastName}
                  </th>
                  <th className='px-6' scope='col'>
                    {reg.email}
                  </th>
                  <th className='px-6' scope='col'>
                    {displaySpecialties(reg.specialty)}
                  </th>
                  <th className='px-6' scope='col'>
                    {reg.deploymentLocations?.join(', ') || 'N/A'}
                  </th>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className='text-lg text-center shadow-xs whitespace-nowrap text-sm'>
                  No Registrants were founds
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination
          pageOptions={{ pageIndex, pageSize: limit, total }}
          onChange={handlePageOptions}
        />
      </div>
      {loading && (
        <div className='h-64'>
          <Spinner size='2x' />
        </div>
      )}
    </>
  );
};
