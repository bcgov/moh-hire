import { useEffect, useState } from 'react';
import _ from 'lodash';
import { Role, User } from '@ehpr/common';
import { Button } from '@components';
import { useAuthContext } from '../AuthProvider';
import { approveUser, getUsers, revokeUser } from '@services';

export const UserTable = () => {
  const { user: loggedUser } = useAuthContext();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then(setUsers).catch();
  }, []);

  const toggleApproval = async ({ id, role }: User) => {
    const user = role === Role.Pending ? await approveUser(id) : await revokeUser(id);
    if (user) {
      setUsers(_.map(users, u => (u.id === id ? user : u)));
    }
  };

  return (
    <div className='overflow-x-auto'>
      <table className='w-full table-fixed'>
        <thead className='whitespace-nowrap bg-bcLightGray text-bcDeepBlack'>
          <tr className='border-b-2 border-yellow-300 text-sm'>
            <th className='w-24' scope='col'>
              ID
            </th>
            <th className='w-24' scope='col'>
              Name
            </th>
            <th className='w-24' scope='col'>
              Role
            </th>
            <th className='py-4 w-24' scope='col'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className='text-center'>
              <td className='py-4'>{user.id.substring(0, 8)}</td>
              <td>{user.name}</td>
              <td>{_.capitalize(user.role)}</td>
              <td>
                {user.id !== loggedUser?.id && (
                  <Button variant='outline' onClick={() => toggleApproval(user)}>
                    <span className={user.role !== Role.Pending ? 'text-bcRedError' : ''}>
                      {user.role === Role.Pending ? 'Approve' : 'Revoke'}
                    </span>
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
