import { Tab } from '@headlessui/react';
import { Role } from '@ehpr/common';
import {
  AdminProvider,
  AdminSection,
  ExtractSubmissions,
  InviteUser,
  useAuthContext,
  UserTable,
} from '@components';
import classNames from 'classnames';
import { useState } from 'react';
import { EmailCampaign } from '../../components/admin/EmailCampaign';

const classes = {
  tab: 'w-30 font-bold text-bcBluePrimary text-xl px-4 py-2',
  selected: 'border-b-2 border-bcBluePrimary',
};

const getClassNames = (selected: boolean) => {
  return classNames(classes.tab, selected && classes.selected);
};

const AdminPage = () => {
  const { user } = useAuthContext();
  const [index, setIndex] = useState(0);
  const isAdmin = user?.role === Role.Admin;

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
    <AdminProvider>
      <div className='container pt-6'>
        <Tab.Group onChange={setIndex}>
          <Tab.List className='font-bold border-b-2 border-bcLightGray mb-4'>
            {isAdmin && (
              <Tab tabIndex={0} className={getClassNames(index === 0)}>
                Users
              </Tab>
            )}
            <Tab tabIndex={1} className={getClassNames(index === 1)}>
              Email Campaign
            </Tab>
            <Tab tabIndex={2} className={getClassNames(index === 2)}>
              Downloads
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              {user?.role === Role.Admin && (
                <AdminSection>
                  <InviteUser />
                  <UserTable />
                </AdminSection>
              )}
            </Tab.Panel>
            <Tab.Panel>
              <AdminSection>
                <EmailCampaign />
              </AdminSection>
            </Tab.Panel>
            <Tab.Panel>
              <AdminSection>
                <ExtractSubmissions />
              </AdminSection>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </AdminProvider>
  );
};

export default AdminPage;
