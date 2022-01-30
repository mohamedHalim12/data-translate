/* eslint-disable camelcase */
import AppError from '../../lib/errors';
import { generateUniqueId } from '../../lib/utils';
import WaitingQueue from '../models/wainting_queue.model';

/**
 *  @typedef {import('mongoose').Model} Model
 *  @typedef {import('mongoose').Types.ObjectId} ObjectId
 * */

/**
 * @typedef {object} Props
 * @property {string|ObjectId} idText_vo
 * @property {string} translated_text
 * @property {string} translated_by
 * @property {Date} translation_date
 * @property {ObjectId} accepted_by
 * @property {Date} acception_date
 *
 * @param {Props} props
 */

export const createWaitingQueue = async ({
  idText_vo,
  translated_text,
  translated_by,
  translation_date = undefined,
  accepted_by = undefined,
  acception_date = undefined,
}) => {
  if (!idText_vo)
    throw new AppError('The text id is required but nothing was given', 400);
  if (!translated_text)
    throw new AppError(
      'The text translated is required but nothing wa given',
      400,
    );
  const _id = generateUniqueId(translated_text).id;
  return WaitingQueue.create({
    idText_vo,
    propositions: [{ _id, translated_text, translated_by, translation_date }],
    acception_date,
    accepted_by,
  });
};

/**
 * @param {number} skip
 * @param {number} limit
 * @param {Object<string,any>} criterias
 */
export const getProposedTranslations = async (
  skip = 0,
  limit = 10,
  criterias = {},
) => {
  const filter = {
    _id: 0,
  };
  const data = await WaitingQueue.find({ ...criterias }, filter)
    .skip(skip)
    .limit(limit)
    .populate('idText_vo')
    .lean()
    .exec();

  const totalProposed = await WaitingQueue.countDocuments(criterias).exec();
  const next = totalProposed ? skip + limit : -1;
  const nextStart = next > totalProposed ? totalProposed : next;
  const count = data.length;
  return { count, next: nextStart, totalProposed, data };
};

/**
 * @param {string} _id
 */
export const existsSameProposition = async (_id) => {
  return WaitingQueue.exists({ propositions: { $elemMatch: { _id } } });
};

/**
 * @param {string} idText_vo
 */
export const existsAPropositions = async (idText_vo) =>
  WaitingQueue.exists({ idText_vo });

/**
 * @typedef {object} Update
 * @property {string} _id
 * @property {string} translated_text
 * @property {string} translated_by
 * @property {Date} translation_date
 *
 * @param {string} idText_vo
 * @param {Update} update
 */

export const addAproposition = async (idText_vo, update) => {
  const { _id, translated_text, translated_by, translation_date } = update;
  const newProposition = {
    _id: _id || generateUniqueId(translated_text).id,
    translated_text,
    translated_by,
    translation_date: translation_date || new Date(Date.now()),
  };
  return WaitingQueue.findOneAndUpdate(
    { idText_vo },
    { $push: { propositions: newProposition } },
    { new: true },
  )
    .lean()
    .exec();
};
