/**
 * Capitalize the first character of a string
 * @param {string} str
 * @return {string}
 */
export const capitalize = (str) => {
  const first = str.charAt(0).toUpperCase();
  return str.replace(str.charAt(0), first);
}
