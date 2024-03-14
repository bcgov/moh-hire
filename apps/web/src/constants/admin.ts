export enum AdminTab {
  USERS = 'users',
  DOWNLOADS = 'downloads',
  REGISTRANTS = 'registrants',
}

export const adminTabs =
  process.env.NEXT_PUBLIC_FEATURE_MASS_EMAIL === 'true'
    ? [
        { title: 'Download Extract', value: AdminTab.DOWNLOADS },
        { title: 'Registrants', value: AdminTab.REGISTRANTS },
      ]
    : [{ title: 'Download Extract', value: AdminTab.DOWNLOADS }];
