import { FEATURE_MASS_EMAIL } from '@ehpr/common';

export enum AdminTab {
  USERS = 'users',
  DOWNLOADS = 'downloads',
  REGISTRANTS = 'registrants',
}

export const adminTabs = FEATURE_MASS_EMAIL
  ? [
      { title: 'Download Extract', value: AdminTab.DOWNLOADS },
      { title: 'Registrants', value: AdminTab.REGISTRANTS },
    ]
  : [{ title: 'Download Extract', value: AdminTab.DOWNLOADS }];
