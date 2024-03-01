import { Authorities } from '../constants';

export const isMoh = (email?: string) => {
  if (!email) {
    return false;
  }

  const domain = email.split('@')[1];
  const isMohDomain = Authorities.MOH.domains.includes(domain);

  return isMohDomain;
};
