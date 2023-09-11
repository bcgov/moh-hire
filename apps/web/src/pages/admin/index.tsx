import { Role } from '@ehpr/common';
import {
  AdminProvider,
  AdminSection,
  ExtractSubmissions,
  InviteUser,
  useAuthContext,
  UserTable,
} from '@components';

const AdminPage = () => {
  const { user } = useAuthContext();

  if (user?.role === Role.Pending || user?.revokedDate) {
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
      <AdminProvider>
        <AdminSection title='Downloads'>
          <ExtractSubmissions />
        </AdminSection>
        {user?.role === Role.Admin && (
          <AdminSection title='Users'>
            <InviteUser />
            <UserTable />
          </AdminSection>
        )}
      </AdminProvider>
    </div>
  );
};

export default AdminPage;
