import { useEffect, useState } from 'react';
import { Specialty } from '@constants';
import { RegistrantFilterDTO, RegistrantRO } from '@ehpr/common';
import { getRegistrants } from '@services';
import { Spinner } from '../Spinner';
import { AdminSearch } from './AdminSearch';
import { Pagination } from '../Pagination';

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
  const [loading, setLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(DEFAULT_PAGE_SIZE);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [filters, setFilters] = useState<RegistrantFilterDTO | undefined>();

  const searchRegistrants = async (filters: RegistrantFilterDTO) => {
    setLoading(true);
    getRegistrants(filters).then(({ data, count }) => {
      if (data) {
        setRegistrants(data);
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

  return (
    <>
      <div className='flex flex-row items-center mb-5 p-3 border border-bcLightGray rounded'>
        Filter:
        <AdminSearch search={search} />
      </div>
      <div className='overflow-x-auto border border-bcLightGray rounded mb-5'>
        <Pagination
          pageOptions={{ pageIndex, pageSize: limit, total }}
          onChange={handlePageOptions}
        />
        <table className='text-left w-full'>
          <thead className='whitespace-nowrap bg-bcLightGray text-bcBlack'>
            <tr className='border-b-2 border-yellow-300 text-sm'>
              <th className='pl-6 py-4' scope='col'>
                First Name
              </th>
              <th className='px-6' scope='col'>
                Last Name
              </th>
              <th className='px-6' scope='col'>
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
              registrants.map((reg: RegistrantRO, index: number) => (
                <tr
                  key={index}
                  className='text-left shadow-xs whitespace-nowrap text-sm border border-bcLightGray'
                >
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
