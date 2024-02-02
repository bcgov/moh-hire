export enum AdminTab {
  USERS = 'users',
  DOWNLOADS = 'downloads',
  REGISTRANTS = 'registrants',
}

export const adminTabs = [
  { title: 'Download Extract', value: AdminTab.DOWNLOADS },
  { title: 'Registrants', value: AdminTab.REGISTRANTS },
];
