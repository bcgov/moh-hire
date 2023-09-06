import { Role } from '@ehpr/common';
import { AdminSection, ExtractSubmissions, useAuthContext, UserTable } from '@components';

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
    <div className='container pt-12'>
      <AdminSection title='Downloads'>
        <ExtractSubmissions />
      </AdminSection>
      {user?.role === Role.Admin && (
        <AdminSection title='Users'>
          <UserTable />
        </AdminSection>
      )}
    </div>
  );
};

export default AdminPage;
