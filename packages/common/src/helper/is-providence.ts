import { Authorities } from '../constants';

export const isPHC = (email?: string) => {
  if (!email) {
    return false;
  }

  const domain = email.split('@')[1];
  const isPHCDomain = Authorities.PHC.domains.includes(domain);

  return isPHCDomain;
};
