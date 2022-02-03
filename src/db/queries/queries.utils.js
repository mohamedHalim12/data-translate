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
    .limit(limit || 10)
    .lean()
    .exec();
  return calculateData({ model, criterias, skip, limit, data });
}

/**
 * @param {Props} props
 * @returns {Promise<Ret>}
 */
export async function getRandomData({
  model,
  skip,
  limit,
  criterias = {},
  projection = {},
}) {
  const data = await model.aggregate([
    { $match: criterias },
    { $sample: { size: limit || 10 } },
    { $project: projection },
  ]);
  return calculateData({ model, criterias, skip, limit, data });
}

/**
 * @typedef {object} Data
 * @property {Array} data
 *
 * @param {Props & Data} props
 * @returns {Promise<Ret>}
 */
async function calculateData({ model, criterias, skip, limit, data }) {
  const totalData = await model.countDocuments({ ...criterias });
  const next = totalData ? skip + limit : -1;
  const nextStart = next > totalData ? totalData : next;
  const count = data.length;
  return { count, next: nextStart, totalData, data };
}
