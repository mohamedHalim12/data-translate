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

/**
 * @typedef {object} Params
 * @property {number} start - Default to 0
 * @property {number} stop - Default to 10
 * @property {number} step - Default to 1
 *
 * @param {Params} params
 */

export const range = ({ start = 0, stop = 1, step = 1 }) => {
  const begin = Number(start);
  const end = Number(stop);
  const stepValue = Number(step);

  return Array.from(
    { length: (end - begin) / stepValue + 1 },
    (_, i) => begin + i * stepValue,
  );
};
