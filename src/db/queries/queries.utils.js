/**
 * @typedef {import('mongoose').Model} Model
 */

/**
 * @typedef {object} Props
 * @property {Model} model
 * @property {Object<string,any>} criterias
 * @property {Object<string,any>} projection
 * @property {number} skip
 * @property {number} limit
 *
 * @typedef {object} Ret
 * @property {number} count
 * @property {number} next
 * @property {number} totalData
 * @property {Array} data
 *
 * @param {Props} props
 * @returns {Promise<Ret>}
 */
export async function getData({
  model,
  skip,
  limit,
  criterias = {},
  projection = {},
}) {
  const data = await model
    .find({ ...criterias }, { ...projection })
    .skip(skip)
    .limit(limit)
    .lean()
    .exec();
  const totalData = await model.countDocuments({ ...criterias });
  const next = totalData ? skip + limit : -1;
  const nextStart = next > totalData ? totalData : next;
  const count = data.length;
  return { count, next: nextStart, totalData, data };
}
