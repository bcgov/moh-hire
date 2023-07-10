export const TEN_DIGIT_PHONE_REGEX = /^\(?(\d{3})\)?[ -.●]?(\d{3})[ -.●]?(\d{4})$/;

/**
 * Canadian postal codes only allow certain sets of characters
 * This regex helps to validate only those characters are used in the correct position
 * Also allows a space, dash, or nothing in the middle
 */
export const POSTAL_CODE_REGEX =
  /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][\s-]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
