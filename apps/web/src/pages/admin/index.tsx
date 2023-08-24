import { Role } from '@ehpr/common';
import { useAuthContext } from '../../components/AuthProvider';
import { UserTable } from '../../components/admin/UserTable';

const AdminPage = () => {
  const { user } = useAuthContext();

  if (user?.role === Role.Pending) {
    return (
      <div className='grid h-full place-items-center'>
        <div className='text-xl'>
          You have not been authorized for the features of administration.
        </div>
      </div>
    );
  }

  return (
    <div className='f-ull pt-12'>
      {user?.role === Role.Admin && (
        <div>
          <h1 className='text-2xl mb-4'>User Management</h1>
          <UserTable />
        </div>
      )}
    </div>
  );
};

export default AdminPage;
