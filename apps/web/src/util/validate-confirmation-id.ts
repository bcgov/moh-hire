export const isValidConfirmationId = (id: string) => {
  const confirmationPattern = /^[0-9A-NP-Z]{13}$/;

  return confirmationPattern.test(id) && id.length === 13;
};
