import { createHash } from 'crypto';

/**
 * @summary Generate the same id (hash) for the same string of 64 characters
 * @param {string} str  - string to be hashed
 * @param {number} size  - Size of the hash
 * size can be positive or negative
 * - positive: the id will be the firsts size characters
 * - negative: the id will be the last size characters
 *
 * @returns fullId: ; id: string;
 * - fullId: the full hash
 * - id: the hash resized according to the size parameter
 */
export const generateUniqueId = (str, size = 24) => {
  if (!size) throw new Error('Size must not be 0');
  const decideStart = () => (size > 0 ? [0, size] : [size]);
  const fullId = createHash('sha256').update(str).digest('hex');
  return { fullId, id: fullId.slice(...decideStart()) };
};
