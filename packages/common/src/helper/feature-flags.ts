const strToBoolean = (value: string | undefined) => value === 'true';

export const FEATURE_MASS_EMAIL = strToBoolean(process.env.FEATURE_MASS_EMAIL);
